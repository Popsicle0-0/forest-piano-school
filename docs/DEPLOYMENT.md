# 森林钢琴学校 — 部署与域名运行手册

> **当前正式站**：https://piano.hrc.ac.cn  
> **最后核对**：2026-08-28  
> **本文件是部署、域名和凭证的唯一运行规范。** 不要根据旧版 `HANDOFF.md` 中 v18 的手工 orphan 分支命令操作。

---

## 1. 当前架构

```text
源码 / 版本历史
  GitHub main
      │
      ├── GitHub Pages 备用站（海外/调试）
      │   https://popsicle0-0.github.io/forest-piano-school/
      │
      └── scripts/deploy.sh（唯一发布入口）
              │
              ├── 构建 dist/
              ├── 更新 GitHub Pages gh-pages
              └── 同步 dist/ 到阿里云 OSS
                        │
Cloudflare DNS / HTTPS ──→ piano.hrc.ac.cn ──→ 阿里云 OSS（中国香港）
```

| 角色 | 当前配置 | 说明 |
|---|---|---|
| 正式访问地址 | `https://piano.hrc.ac.cn` | 用户、手机/iPad、PWA 应使用此地址 |
| 源码仓库 | `Popsicle0-0/forest-piano-school`，`main` | 唯一源码与提交历史 |
| GitHub Pages | `gh-pages` orphan 内容分支 | 备用部署；不要当正式国内访问地址 |
| OSS Bucket | `forest-piano-kino` | 中国香港地域，静态网站托管已开启，根目录直接存放 `dist/` 内容 |
| OSS Endpoint | `oss-cn-hongkong.aliyuncs.com` | 上传 API 端点；不是用户访问地址 |
| DNS / HTTPS | Cloudflare，zone `hrc.ac.cn` | DNS 和 Edge HTTPS 都在 Cloudflare，不在阿里云云解析 DNS |
| 网站 DNS | `piano` 的 CNAME 指向 `forest-piano-kino.oss-cn-hongkong.aliyuncs.com` | 当前由 Cloudflare 橙色云（Proxied）代理 |
| Cloudflare SSL | Flexible + Always Use HTTPS | 浏览器→Cloudflare 为 HTTPS；Cloudflare→OSS 为 HTTP |

### 邮件转发不受影响

`hrc.ac.cn` 使用 Cloudflare Email Routing。网站只使用独立子域名 `piano.hrc.ac.cn`：

- **绝不修改**根域名 `@` 的 MX/TXT/SPF/DKIM/DMARC 记录；
- **绝不修改** Cloudflare Nameserver；
- 仅维护 `piano` 这一条 CNAME，网站发布不会影响邮件转发。

---

## 2. 一键发布（唯一日常流程）

执行者使用：

```bash
bash scripts/deploy.sh --yes "vX.Y: 改动摘要"
```

或 npm 入口：

```bash
npm run deploy -- --yes "vX.Y: 改动摘要"
```

该脚本会依次完成：

1. 检查 Git 仓库、Node 依赖、GitHub token、双处版本号；
2. `npx vite build` 生成 `dist/`；
3. 提交源码和构建产物并推送 `main`；
4. 使用一次性 orphan 分支强制更新 `gh-pages`（附 `.nojekyll`）；
5. 同步 `dist/` 根目录到 OSS Bucket：上传新/变化文件、删除旧 hash 资源；
6. 为 `index.html` 设置不缓存，为 `assets/` hash 资源设置一年 immutable 缓存。

### 发布成功的最低验收

```text
Git main 已推送
GitHub Pages 显示 deploy: vX.Y
OSS sync complete
https://piano.hrc.ac.cn 能打开新版本
```

### 版本号规则（必须遵守）

每次正式版本要同步修改两处：

```text
src/main.js   const APP_VERSION = 'vX.Y'
index.html    /src/main.js?v=X.Y
```

部署脚本会检查两处一致；不一致会拒绝发布。第二处是为了打穿 iOS PWA 缓存。

---

## 3. OSS 同步工具

文件：`scripts/sync-oss.py`

```bash
python scripts/sync-oss.py --dry-run  # 只查看上传/删除计划
python scripts/sync-oss.py            # 实际同步
```

它依赖 Python 包 `oss2`；正常日常部署时，`scripts/deploy.sh` 会在缺失时自动执行：

```bash
python -m pip install oss2
```

### 凭证（严禁提交/发送）

本机 `docs/CREDENTIALS.md`（已在 `.gitignore`）必须包含以下结构：

```md
## Alibaba Cloud OSS Deploy

Bucket: forest-piano-kino
Endpoint: oss-cn-hongkong.aliyuncs.com
AccessKey ID: <RAM部署用户的ID>
AccessKey Secret: <RAM部署用户的Secret>
```

安全规则：

- 仅允许使用专门的 RAM 部署用户（建议名：`forest-piano-deploy`）；
- 权限仅限 `forest-piano-kino` 的 `ListObjects/GetObject/PutObject/DeleteObject`；
- 绝不将 AccessKey ID/Secret 贴到聊天、Issue、Git、截图或网页代码；
- 换电脑时，重新创建或安全转移 RAM 部署凭证，再本地写入这个 gitignored 文件；
- 部署脚本在 orphan `gh-pages` 清场前会将该文件备份到仓库外临时位置、回 `main` 后恢复；**该机制从 v19.5.1 起才存在**。旧版本脚本可能会删掉 gitignored 凭证，部署后必须检查该文件仍在；
- 怀疑泄露时，立即在阿里云 RAM 禁用/删除该 AccessKey 并创建新的。

---

## 4. 新电脑 / 新会话接手

```bash
git clone https://github.com/Popsicle0-0/forest-piano-school.git
cd forest-piano-school
npm install
python -m pip install oss2
```

然后需要人工安全恢复（不会从 Git 获得）：

1. `docs/CREDENTIALS.md`：GitHub PAT + OSS RAM 部署凭证；
2. 确认 `piano.hrc.ac.cn` 的 Cloudflare CNAME/橙色云仍在；
3. `npx vite build`；
4. 先执行 `python scripts/sync-oss.py --dry-run` 验证 OSS 权限；
5. 开始工作后只用 `bash scripts/deploy.sh --yes "..."` 发版。

> Windows 注意：PowerShell/CMD 的裸 `bash` 会命中 `C:\Windows\System32\bash.exe` 的 WSL 残桩并静默挂起。直接用 Git Bash，或由 `npm run deploy` 调 `scripts/deploy.cmd` 的 Git Bash 绝对路径。

---

## 5. 域名 / HTTPS 故障排查

### 正常状态

```text
https://piano.hrc.ac.cn → Cloudflare（橙云）→ OSS
http://piano.hrc.ac.cn  → Cloudflare 301 → HTTPS
```

首次配置或证书更新后，普通浏览器可能缓存旧 TLS 状态；无痕窗口显示安全即说明服务端正常。关闭所有该域名标签页、清除站点数据或重启浏览器即可刷新。

### 常见问题

| 症状 | 先检查 |
|---|---|
| 域名访问 OSS `403 AccessDenied` | Cloudflare `piano` CNAME 是否仍指向正确 Bucket 外网域名；OSS 域名管理是否显示 `piano.hrc.ac.cn` 已生效；Bucket 是否公共读 |
| HTTPS 不安全 | Cloudflare 橙云是否开启；SSL/TLS 为 Flexible；Always Use HTTPS 开启；等待边缘证书签发/用无痕验证 |
| 页面空白或 CSS/JS 404 | OSS 根目录必须直接有 `index.html`、`assets/`、`icons/`、`manifest.json`，不能嵌套一个 `dist/` 目录；重新运行 `python scripts/sync-oss.py` |
| 手机仍是旧版 | `index.html` 已 no-cache；iOS PWA 仍可能顽固缓存，删除主屏幕 App 后从 `https://piano.hrc.ac.cn` 重新添加 |
| 邮件不能转发 | 检查 Cloudflare Email Routing 与 MX/TXT 记录；网站发布不应修改这些记录，只有 `piano` CNAME 与网站有关 |

---

## 6. 关于账号与进度

当前进度仍是浏览器的 `localStorage`：同一设备、同一浏览器、同一**域名**下有效。

- 从 `github.io` 切换到 `piano.hrc.ac.cn` 后，浏览器会视为另一份本地进度，这是正常的同源隔离；
- 清浏览器数据、换设备不会自动同步；
- OSS 是静态文件存储，不能让网页直接持有 OSS AccessKey 上传用户进度 JSON —— 会泄露 Bucket 写权限；
- 若需要账号、跨设备同步、找回进度，需要再接认证 + 数据库/API（推荐托管方案，如 Supabase，或阿里云函数计算 + 表格存储），不需要传统 ECS/VPS。
