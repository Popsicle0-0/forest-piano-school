#!/usr/bin/env bash
# ============================================================
# Forest Piano School — safe one-command release
#
# Usage:
#   bash scripts/deploy.sh --yes "vX.Y: summary"
#   bash scripts/deploy.sh --dry-run
#
# Publishes three independent targets:
#   1. origin/main      source + dist history
#   2. origin/gh-pages  disposable static backup
#   3. Alibaba OSS      official https://piano.hrc.ac.cn origin
#
# IMPORTANT: gh-pages is built in a TEMPORARY GIT WORKTREE. Never create an
# orphan branch in the developer's source worktree: doing so can delete ignored
# local credentials and even stage source deletions.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

GREEN='\033[32m'; RED='\033[31m'; YEL='\033[33m'; NC='\033[0m'
ok()   { printf "  ${GREEN}✅ %s${NC}\n" "$1"; }
warn() { printf "  ${YEL}⚠️  %s${NC}\n" "$1"; }
die()  { printf "  ${RED}❌ %s${NC}\n" "$1"; exit 1; }
hdr()  { printf "\n${YEL}▶ %s${NC}\n" "$1"; }

DRY_RUN=0; ASSUME_YES=0; DESC=""
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --yes|-y) ASSUME_YES=1 ;;
    *) DESC="$arg" ;;
  esac
done

hdr "预检"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "不在 git 仓库里"

if [ ! -d node_modules ]; then
  warn "node_modules 缺失，正在 npm install..."
  npm install --no-audit --no-fund || die "npm install 失败"
fi
ok "Node 依赖已就绪"

APP_V=$(sed -n "s/^const APP_VERSION = '\([^']*\)';.*/\1/p" src/main.js | head -1)
HTML_V=$(sed -n 's|.*src="/src/main.js?v=\([0-9][0-9.]*\)".*|\1|p' index.html | head -1)
[ -n "$APP_V" ] || die "找不到 src/main.js 的 APP_VERSION"
[ -n "$HTML_V" ] || die "找不到 index.html 的 main.js?v="
[ "${APP_V#v}" = "$HTML_V" ] || die "版本号不一致：${APP_V} vs ?v=${HTML_V}"
ok "版本号一致：${APP_V}"

if [ "$DRY_RUN" = "1" ]; then
  warn "DRY-RUN：只构建，不提交、不推送、不上传"
fi

hdr "构建 (Vite)"
npx vite build || die "构建失败；已中止，git 未被修改"
ok "构建完成 → dist/"
[ "$DRY_RUN" = "1" ] && exit 0

COMMIT_MSG="${APP_V}: ${DESC:-代码更新}"
printf "\n  将执行：提交[%s] → 推 main → 独立 worktree 发布 gh-pages → 同步 OSS\n" "$COMMIT_MSG"
if [ "$ASSUME_YES" != "1" ]; then
  printf "  确认发布？ [y/N] "
  read -r answer
  [ "$answer" = "y" ] || [ "$answer" = "Y" ] || die "用户取消"
fi

hdr "阶段 A：提交源码和构建产物 → main"
git add -f dist/
git add -A
git -c core.safecrlf=false commit -m "$COMMIT_MSG" || warn "没有新的 main 变更可提交"
git push origin main || die "推送 main 失败；请检查网络或 GitHub 凭证"
ok "main 已推送"

hdr "阶段 B：临时 worktree 发布 gh-pages"
DEPLOY_WT="$(mktemp -d)"
rmdir "$DEPLOY_WT"
DEPLOY_BRANCH="gh-pages-deploy-$(date +%s)-$$"
cleanup_worktree() {
  git worktree remove --force "$DEPLOY_WT" >/dev/null 2>&1 || true
  git branch -D "$DEPLOY_BRANCH" >/dev/null 2>&1 || true
}
trap cleanup_worktree EXIT

git worktree add --detach "$DEPLOY_WT" HEAD >/dev/null || die "无法创建临时发布 worktree"
git -C "$DEPLOY_WT" checkout --orphan "$DEPLOY_BRANCH" >/dev/null
find "$DEPLOY_WT" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -r dist/. "$DEPLOY_WT/"
touch "$DEPLOY_WT/.nojekyll"
git -C "$DEPLOY_WT" add -f .nojekyll index.html manifest.json assets icons
git -C "$DEPLOY_WT" -c core.safecrlf=false commit -m "deploy: ${APP_V}" >/dev/null
git -C "$DEPLOY_WT" push -f origin "$DEPLOY_BRANCH:gh-pages" || die "推送 gh-pages 失败"
cleanup_worktree
trap - EXIT
ok "gh-pages 已更新（源工作区与本地凭证未触碰）"

hdr "阶段 C：同步阿里云 OSS（正式站）"
OSS_SYNC="scripts/sync-oss.py"
if [ -f "$OSS_SYNC" ] && [ -f docs/CREDENTIALS.md ] && grep -q "AccessKey Secret:" docs/CREDENTIALS.md; then
  if ! python -c "import oss2" >/dev/null 2>&1; then
    warn "缺少 oss2 上传组件，正在安装..."
    python -m pip install oss2 --disable-pip-version-check --quiet || die "无法安装 oss2"
  fi
  python "$OSS_SYNC" || die "OSS 同步失败；main/gh-pages 已成功，但正式站未确认更新"
  ok "OSS 已同步"
else
  warn "本机没有 OSS 凭证，跳过正式站同步（GitHub Pages 已更新）"
fi

hdr "发布完成 🎉"
echo "  版本：${APP_V}"
echo "  正式站：https://piano.hrc.ac.cn"
echo "  备用站：https://popsicle0-0.github.io/forest-piano-school/"
warn "iOS PWA 若仍显示旧版本：从主屏幕删除后，用正式 HTTPS 地址重新添加"
