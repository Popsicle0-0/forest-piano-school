#!/usr/bin/env python
"""Synchronize Vite's dist/ directory to the Forest Piano OSS bucket.

Credentials stay only in docs/CREDENTIALS.md (gitignored).  Never put an
AccessKey in source code, a commit, browser code, or a deploy command.

Usage:
    python scripts/sync-oss.py
    python scripts/sync-oss.py --dry-run
"""
from __future__ import annotations

import argparse
import hashlib
import mimetypes
import re
import sys
from pathlib import Path

try:
    import oss2
except ImportError:
    print("Missing Python package oss2. Run: python -m pip install oss2", file=sys.stderr)
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT / "dist"
CREDENTIALS = ROOT / "docs" / "CREDENTIALS.md"


def credential(label: str) -> str:
    """Read one `Label: value` entry without ever echoing its secret value."""
    if not CREDENTIALS.is_file():
        raise RuntimeError(f"Credentials file not found: {CREDENTIALS}")
    match = re.search(rf"^\s*{re.escape(label)}:\s*(\S+)\s*$", CREDENTIALS.read_text(encoding="utf-8"), re.M)
    if not match:
        raise RuntimeError(f"Missing `{label}` in docs/CREDENTIALS.md")
    return match.group(1)


def cache_control(key: str) -> str:
    # index.html points to each build's hashed assets.  Keep the HTML fresh,
    # while static hashed bundles can safely cache for a year.
    if key == "index.html":
        return "no-cache, no-store, must-revalidate"
    if key.startswith("assets/"):
        return "public, max-age=31536000, immutable"
    return "public, max-age=86400"


def local_md5(path: Path) -> str:
    digest = hashlib.md5()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync dist/ to Alibaba Cloud OSS")
    parser.add_argument("--dry-run", action="store_true", help="Show planned operations without writing OSS")
    args = parser.parse_args()

    if not DIST_DIR.is_dir():
        print("dist/ is missing. Run `npx vite build` first.", file=sys.stderr)
        return 1

    bucket_name = credential("Bucket")
    endpoint = credential("Endpoint")
    access_key_id = credential("AccessKey ID")
    access_key_secret = credential("AccessKey Secret")

    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    local_files = {
        path.relative_to(DIST_DIR).as_posix(): path
        for path in DIST_DIR.rglob("*")
        if path.is_file()
    }

    try:
        remote_files = {
            item.key: item
            for item in oss2.ObjectIterator(bucket)
            if not item.key.endswith("/")
        }
    except Exception as error:
        print(f"Cannot list OSS bucket `{bucket_name}`: {error}", file=sys.stderr)
        return 1

    uploads: list[tuple[str, Path]] = []
    for key, path in sorted(local_files.items()):
        remote = remote_files.get(key)
        # OSS ETag for simple single-part uploads is the MD5 hash.  Our site
        # files are small, so this avoids re-uploading unchanged files.
        if remote and remote.etag.strip('"') == local_md5(path):
            continue
        uploads.append((key, path))

    deletes = sorted(set(remote_files) - set(local_files))
    print(f"OSS sync plan: {len(uploads)} upload/update, {len(deletes)} stale delete, {len(local_files) - len(uploads)} unchanged")

    for key, path in uploads:
        print(f"  {'would upload' if args.dry_run else 'upload'} {key}")
        if args.dry_run:
            continue
        content_type = mimetypes.guess_type(key)[0] or "application/octet-stream"
        headers = {
            "Content-Type": content_type,
            "Cache-Control": cache_control(key),
        }
        bucket.put_object_from_file(key, str(path), headers=headers)

    for key in deletes:
        print(f"  {'would delete' if args.dry_run else 'delete'} {key}")
        if not args.dry_run:
            bucket.delete_object(key)

    print("OSS sync complete." if not args.dry_run else "OSS dry-run complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
