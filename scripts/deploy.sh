#!/usr/bin/env bash
# ============================================================
# 森林钢琴学校 — 一键构建部署脚本 (实现 HANDOFF.md §5 全流程)
#
# 用法:
#   npm run deploy                      # 正式部署 (会询问确认)
#   npm run deploy -- --yes             # 跳过确认
#   npm run deploy -- "修复描述文字"     # 自定义提交描述
#   npm run deploy -- --dry-run         # 只跑预检+构建, 不动 git/不推送
#
# 流程: 预检(token/依赖/版本号) → vite build → 改写.gitignore
#       → commit(dist+源码) → 推 main → orphan 分支发 gh-pages
#       → 恢复 .gitignore 并补推
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_URL="${REMOTE_URL:-$(git remote get-url origin)}"
GREEN='\033[32m'; RED='\033[31m'; YEL='\033[33m'; NC='\033[0m'
ok()   { printf "  ${GREEN}✅ %s${NC}\n" "$1"; }
warn() { printf "  ${YEL}⚠️  %s${NC}\n" "$1"; }
die()  { printf "  ${RED}❌ %s${NC}\n" "$1"; exit 1; }
hdr()  { printf "\n${YEL}▶ %s${NC}\n" "$1"; }

DRY_RUN=0; ASSUME_YES=0; DESC=""
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --yes|-y)  ASSUME_YES=1 ;;
    *) DESC="$arg" ;;
  esac
done

if [ "$DRY_RUN" = "1" ]; then
  warn "DRY-RUN 模式: 只做预检和构建, 不改 git 状态、不推送"
fi

# ---------- 1. 预检 ----------
hdr "预检"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "不在 git 仓库里"

# 依赖
if [ ! -d node_modules ]; then
  warn "node_modules 缺失, 先执行 npm install ..."
  npm install --no-audit --no-fund || die "npm install 失败"
fi
ok "依赖已就绪"

# token 健康检查 (只提醒, 不阻断 — 推送走 origin 内嵌凭证)
TOKEN=$(sed -n 's/^\(ghp_[A-Za-z0-9]*\)$/\1/p' docs/CREDENTIALS.md | head -1 || true)
if [ -n "${TOKEN:-}" ]; then
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $TOKEN" https://api.github.com/user)
  if [ "$CODE" = "401" ] || [ "$CODE" = "403" ]; then
    warn "GitHub token 已失效(HTTP $CODE)! 可去 https://github.com/settings/tokens 续期,"
    warn "然后更新 docs/CREDENTIALS.md 和 remote: git remote set-url origin https://<新TOKEN>@github.com/Popsicle0-0/forest-piano-school.git"
    [ "$ASSUME_YES" = "1" ] || die "请先更新 token 再部署 (或加 --yes 赌一把推送凭证还活着)"
  else
    ok "GitHub token 有效 (HTTP $CODE)"
  fi
else
  warn "docs/CREDENTIALS.md 里没找到 token, 跳过健康检查 (推送仍用 origin 凭证)"
fi

# 版本号一致性: src/main.js 的 APP_VERSION vs index.html 的 ?v=
APP_V=$(sed -n "s/^const APP_VERSION = '\([^']*\)';.*/\1/p" src/main.js | head -1)
HTML_V=$(sed -n 's|.*src="/src/main.js?v=\([0-9][0-9.]*\)".*|\1|p' index.html | head -1)
[ -n "$APP_V" ]  || die "在 src/main.js 里找不到 APP_VERSION 常量"
[ -n "$HTML_V" ] || die "在 index.html 里找不到 main.js?v= 引用"
if [ "${APP_V#v}" != "$HTML_V" ]; then
  die "版本号不一致: src/main.js 是 ${APP_V}, index.html ?v=${HTML_V}。两处必须一起改!"
fi
ok "版本号一致: ${APP_V} (需发新版时记得同时改这两处)"

# 工作区已有未提交改动 → 列出来
DIRTY=$(git status --porcelain | grep -v '^ M dist/' || true)
if [ -n "$DIRTY" ]; then
  echo "$DIRTY" | sed 's/^/      /'
  [ "$ASSUME_YES" = "1" ] || [ "$DRY_RUN" = "1" ] || {
    printf "  把以上改动随本次版本一起提交? [y/N] "
    read -r ANS; [ "$ANS" = "y" ] || [ "$ANS" = "Y" ] || die "用户取消"
  }
fi

# ---------- 2. 构建 ----------
hdr "构建 (npx vite build)"
npx vite build || die "构建失败, 已中止 (git 未被改动)"
ok "构建完成 → dist/"
[ "$DRY_RUN" = "1" ] && { hdr "DRY-RUN 结束, 到此为止"; exit 0; }

# ---------- 3. 部署标签 ----------
STAGE_STAMP=$(date +%Y%m%d-%H%M%S)
DEPLOY_MSG="deploy: ${APP_V}"
COMMIT_MSG="${APP_V}: ${DESC:-代码更新}"

printf "\n  将执行: 提交[%s] → 推 main → 发布 gh-pages\n" "$COMMIT_MSG"
if [ "$ASSUME_YES" != "1" ]; then
  printf "  确认发布? [y/N] "
  read -r ANS2; [ "$ANS2" = "y" ] || [ "$ANS2" = "Y" ] || die "用户取消"
fi

cleanup_main_side() {
  git checkout main >/dev/null 2>&1 || true
  git branch -D gh-pages-clean >/dev/null 2>&1 || true
}

# ---------- 4. 提交并推 main (HANDOFF §5 步骤 1-3) ----------
hdr "阶段 A: 提交源码 + dist, 推 main"
# v19.1: 不再用 .bak 备份/恢复 — 孤儿分支清场(find rm)会连同未入库的
# 备份一起删掉, checkout 回来时 mv 必然失败(v19.0 部署踩过一次)。
# 现在阶段 C 直接幂等重写规范内容, 副本文件彻底退场。
cat > .gitignore <<'EOF'
node_modules
.DS_Store
*.log
*.bak
.vite
.cache
.env.local
.claude/
docs/CREDENTIALS.md
EOF

git add -f dist/
git add -A
git -c core.safecrlf=false commit -m "$COMMIT_MSG" || warn "没有可提交的变更"
git push origin main || {
  cleanup_main_side
  mv .gitignore.bak .gitignore 2>/dev/null || true
  die "推 main 失败 — 检查网络/token。注意: 本次提交已在本地, 修好后重跑即可"
}
echo "  (推送 main 成功)"

# ---------- 5. 发 gh-pages (HANDOFF §5 步骤 4) ----------
hdr "阶段 B: 用 dist/ 内容强刷 gh-pages"
DEPLOY_TMP="$(mktemp -d)"
trap 'rm -rf "$DEPLOY_TMP"' EXIT
cp -r dist/. "$DEPLOY_TMP/"

FAIL_FLAG=0
(
  git checkout --orphan gh-pages-clean &&
  find . -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} + &&
  cp -r "$DEPLOY_TMP"/. . &&
  touch .nojekyll &&
  git add . &&
  git -c core.safecrlf=false commit -m "$DEPLOY_MSG" &&
  git push -f origin gh-pages-clean:gh-pages
) || FAIL_FLAG=1

cleanup_main_side

# ---------- 6. 恢复 .gitignore 并补推 ----------
# 阶段 C: 幂等重写规范 .gitignore (不再依赖任何备份文件)
cat > .gitignore <<'EOF'
node_modules
.DS_Store
*.log
*.bak
.vite
.cache
.env.local
.claude/
docs/CREDENTIALS.md
EOF
if git status --porcelain | grep -q .; then
  git add -A
  git -c core.safecrlf=false commit -m "chore: 规范化 .gitignore(幂等重写, 无需备份)"
  git push origin main || warn "chore 补推失败, 下次部署时会带上去"
else
  echo "  (.gitignore 无净变化, 跳过 chore 提交)"
fi

if [ "$FAIL_FLAG" = "1" ]; then
  die "gh-pages 发布环节出错! 源码已安全(本地+远程 main 都是新的), 只有线上页面没更新。排查: 重新跑本脚本, 或看 https://github.com/Popsicle0-0/forest-piano-school/actions"
fi

# ---------- 7. 同步阿里云 OSS (可选: 配好凭证后自动执行) ----------
# 凭证仅存于 gitignored 的 docs/CREDENTIALS.md。若还没有 OSS 配置,
# GitHub Pages 部署照常成功，只打印提示而不阻断发版。
OSS_SYNC="scripts/sync-oss.py"
if [ -f "$OSS_SYNC" ] && grep -q "AccessKey Secret:" docs/CREDENTIALS.md 2>/dev/null; then
  hdr "阶段 C: 同步阿里云 OSS (forest-piano-kino)"
  # 会话/环境重置可能清掉 Python 包；缺失时自动补上，不需要用户操作。
  if ! python -c "import oss2" >/dev/null 2>&1; then
    warn "缺少 oss2 上传组件，正在安装..."
    python -m pip install oss2 --disable-pip-version-check --quiet || warn "oss2 安装失败"
  fi
  python "$OSS_SYNC" || warn "OSS 同步失败 — GitHub Pages 已成功; 检查 docs/CREDENTIALS.md/网络后运行 python scripts/sync-oss.py 重试"
else
  warn "未配置 OSS 凭证，跳过阿里云同步 (GitHub Pages 已照常部署)"
fi

# ---------- 8. 完成 ----------
hdr "部署成功 🎉"
echo "  main:     $(git log --oneline -1 | sed 's/^/  /')"
echo "  源码版本: ${APP_V}"
echo "  GitHub:   https://popsicle0-0.github.io/forest-piano-school/"
if [ -f "$OSS_SYNC" ]; then
  echo "  OSS:      http://piano.hrc.ac.cn (HTTPS/CDN 配好后改用 https://)"
fi
warn "iPhone/iPad 上如果看到的还是旧版: 从主屏幕删掉 app 重新添加 (iOS PWA 缓存最顽固)"
