# 🎹 森林钢琴学校 — 项目交接文档

> **新接手必读**:读完本文档,你应该能 100% 继续这个项目。

---

## 0. 项目一句话

面向 5-10 岁儿童的**钢琴启蒙**互动网页(纯前端 + Vite + GitHub Pages 部署,iPad/iPhone 优先)。第一关:森林河流场景里 7 条小鱼 Do Re Mi Fa Sol La Si,孩子把鱼拖到屏幕钢琴对应键上学习音符位置。

**线上地址**: https://popsicle0-0.github.io/forest-piano-school/

---

## 1. 仓库 & 部署信息

| 项 | 值 |
|---|---|
| **GitHub 用户名** | `Popsicle0-0` |
| **仓库地址** | https://github.com/Popsicle0-0/forest-piano-school |
| **部署分支** | `gh-pages` (强制 push,内容是 `dist/` 根目录结构) |
| **主分支** | `main` (源代码) |
| **GitHub Pages URL** | https://popsicle0-0.github.io/forest-piano-school/ |
| **Pages 设置** | 仓库 Settings → Pages → Source: gh-pages branch / root |
| **GitHub Token** | 在 `docs/CREDENTIALS.md` (gitignored, 不进 git), 30 天期限 |

**用户首次部署时已做**:
1. 浏览器创建仓库 `forest-piano-school` (Public)
2. 生成 Personal Access Token (PAT),只勾 `repo` 权限
3. 之后每次部署用 HTTPS + token 推 `gh-pages`

---

## 2. 当前线上版本

最新部署: **v15** (iPhone PWA 声音修复)

| 版本 | 内容 |
|---|---|
| v1-v8 | 初始第一关 + 基本钢琴/五线谱/鱼池 |
| v9 | iOS PWA 响应式 CSS |
| v10 | vh 单位 + 黄色调试底 |
| v11 | 加屏幕版本号 + cache-control meta |
| v12 | JS 直接 inline 强制布局 (iOS PWA vh/percent 失效) |
| v13 | 键盘 38% + PolySynth + 按钮 click handler + iPad 阈值 700 |
| v14 | 纯原生 Web Audio API + 禁缩放 JS + phone 检测 min(w,h)≤500 |
| v14.1 | iPad 键盘比例 0.55/0.45 (原 0.7/1.3 太大) |
| **v15** | **iPhone PWA 声音修复** (子代理): 同步 `unlockOnGesture` + 静音 oscillator + 静音 HTMLAudio 暖通 + Web Audio 时间轴调度 + pointerdown+click 双重绑定 + `_ensureUnlocked` 兜底 |

**版本号显示**: 左上角星星 ⭐⭐⭐ 旁边有个灰底 `vXX` 标签,用户可以一眼看出当前版本。

---

## 3. 文件结构

```
forest-piano-school/
├── docs/
│   ├── design-v2.md        # 完整设计文档(8 关教学路径 + 视觉规范)
│   └── HANDOFF.md          # 本文档
├── src/
│   ├── main.js             # 入口 + 版本号 + iOS PWA JS 布局 + 禁缩放 + 按钮
│   ├── style.css           # 全部 CSS (色板/动画/响应式断点)
│   ├── components/
│   │   ├── Background.js   # 远山+河岸+水波 SVG
│   │   ├── Pip.js          # 小鸟吉祥物
│   │   ├── Staff.js        # 五线谱(5 线 + 1 加线 + 7 slot)
│   │   ├── PianoKeyboard.js# 1 个八度 SVG 键盘 (C4-B4, 7 白 + 5 黑)
│   │   ├── Fish.js         # 7 条手绘 SVG 鱼
│   │   └── FishPool.js     # 拖拽交互层(鱼→五线谱)
│   ├── systems/
│   │   ├── Game.js         # 关卡 1 状态机
│   │   ├── Audio.js        # 音频(纯 Web Audio 合成器)
│   │   └── Progress.js     # LocalStorage 进度
│   └── utils/
│       └── svg.js          # SVG_NS 常量
├── index.html              # HTML 入口(meta viewport + apple PWA + 缓存头)
├── package.json
├── vite.config.js          # base: './', output dist/
├── .gitignore              # 排除 node_modules / dist / .claude/
└── README.md
```

---

## 4. 开发环境

```bash
cd "C:\Users\RiCha.Hu\project\practice\music"
npm install        # 装依赖
npm run dev        # 开发 → http://127.0.0.1:5173
npm run build      # 构建 → dist/
npm run preview    # 预览生产版
```

**Node 依赖**:
- vite ^5.4.0
- gsap ^3.12.5
- tone ^15.0.4 (目前只是动态 import 用,Salamander 钢琴采样)
- canvas-confetti ^1.9.3

---

## 5. 部署流程(每次修改后必走)

```bash
# 1. 改代码后,本地构建一次
cd "C:\Users\RiCha.Hu\project\practice\music"
npx vite build

# 2. commit + 部署 (替换 TOKEN)
TOKEN="ghp_你的token"
cp .gitignore .gitignore.bak
cat > .gitignore <<'EOF'
node_modules
.DS_Store
*.log
.vite
.cache
.env.local
.claude/
EOF

git add -f dist/ .gitignore src/ index.html
git -c user.email=你的邮箱 -c user.name=你的名字 commit -m "v15: 描述修改"

# 3. 推 main
git push https://${TOKEN}@github.com/Popsicle0-0/forest-piano-school.git main

# 4. 推 gh-pages (清空 + dist 内容)
TMP=/tmp/gh-pages-deploy
rm -rf $TMP && mkdir -p $TMP
cp -r dist/. $TMP/
git checkout --orphan gh-pages-clean
find . -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} \;
cp -r $TMP/* . && touch .nojekyll
git add . && git -c user.email=你的邮箱 -c user.name=你的名字 commit -m "deploy: v15"
git push -f https://${TOKEN}@github.com/Popsicle0-0/forest-piano-school.git gh-pages-clean:gh-pages
git checkout main
git branch -D gh-pages-clean
mv .gitignore.bak .gitignore
git add .gitignore && git -c user.email=你的邮箱 -c user.name=你的名字 commit -m "chore: restore .gitignore"
git push origin main
```

**注意**:
- 每次部署用 `gh-pages-clean:gh-pages` 强制推 (orphan 分支,只放 dist)
- `.nojekyll` 必须有,防止 Jekyll 忽略下划线开头的文件
- **Bump 版本号**: 改 `src/main.js` 里的 `APP_VERSION` 常量

---

## 6. iOS PWA 的各种坑(重要!)

iOS Safari + 添加到主屏幕(PWA)有大量行为差异,务必记住:

### 6.1 视口/布局
- **`<svg width="560" height="220">` HTML attribute 优先级 > CSS** → 必须删 attribute,只留 viewBox,让 CSS 完全控制
- **`position: absolute` + `bottom: N%` + `height: M%` 在 iOS PWA 计算高度时经常得 0** → 改用 JS 直接给元素设 inline pixel
- **`display: grid` + `1fr` + `position: fixed` + `100dvh` 组合行为不可靠** → 手机用 flex column,iPad 用 grid
- **`100dvh` 在 iOS PWA 可能算错** → 必要时用 `window.innerHeight` 直接拿 JS 算
- **`<meta viewport>`** 必须含 `viewport-fit=cover` 才能用 safe-area

### 6.2 音频
- **AudioContext 必须从用户手势里 resume**,但 `pointerdown` 在 PWA 模式有时不识别为有效手势
- `await this._webAudio.resume()` **必须** 同步在用户手势 handler 里调用,异步链可能丢失 gesture context
- 即使 Web Audio 100% 合规,iOS PWA 也不保证出声
- **备用方案**: silent HTMLAudioElement play 一下,再用 Web Audio

### 6.3 缓存
- iOS PWA 缓存 index.html **非常顽固**
- 加 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` 有一定帮助
- **最稳**: 让用户从主屏幕**删除 app 重新添加**
- PWA manifest 在 GitHub Pages 不需要,直接靠 apple-mobile-web-app-capable meta

### 6.4 触摸
- **300ms 双击延迟** → `touch-action: manipulation` 关掉
- **双指捏合缩放** → `gesturestart/change/end` preventDefault
- **双击放大** → `dblclick` preventDefault + 300ms debounce
- **多点触发的缩放** → `touchmove` with `touches.length > 1` preventDefault

### 6.5 设备尺寸(常见)
| 设备 | Portrait | Landscape |
|---|---|---|
| iPhone SE | 320 × 568 | 568 × 320 |
| iPhone 13/14 | 390 × 844 | 844 × 390 |
| iPhone 16 Pro | 402 × 874 | 874 × 402 |
| iPad mini | 768 × 1024 | 1024 × 768 |
| iPad Pro 11" | 834 × 1194 | 1194 × 834 |
| iPad Pro 12.9" | 1024 × 1366 | 1366 × 1024 |

**检测手机**:
```js
const isPhone = Math.min(window.innerWidth, window.innerHeight) <= 500;
// iPhone landscape 高 402, iPad 任何姿势 768+ → 准确
```

---

## 7. 当前已知问题 & 待办

### 7.1 🟢 声音 — v15 已部署, 待用户真机测试
- **状态**: v15 已部署 gh-pages,等用户在 iPhone PWA 上验证
- **v14 失败原因**:
  1. `unlockOnGesture` 是 `async`,`await` 丢失 gesture context
  2. `setTimeout(100ms)` 测试音不算"在用户手势内启动",iOS 拒绝播放
  3. AudioContext 在 PWA 模式没真的"激活"
- **v15 修复** (`src/systems/Audio.js` + `src/systems/Game.js`):
  1. `unlockOnGesture()` 改为**同步函数** (无 async/await)
  2. 同步播一个**静音 oscillator** (gain=0, 1ms 极短) — iOS 音频会话解锁核心 trick
  3. 同步 play 一个**静音 HTMLAudioElement** — PWA standalone 音频路由暖通
  4. 测试音调度到 **Web Audio 时间轴** (`osc.start(ctx.currentTime + 0.08)`) — 不算 setTimeout
  5. 同时绑 `pointerdown` + `click` 双重保险
  6. `_ensureUnlocked()` 兜底 — 后续手势给 iOS 第二次机会
- **待用户验证**: 真机 iPhone PWA 听到测试音 + 钢琴音

### 7.2 🟡 钢琴键 `data-color` CSS var 在 confetti 不解析
- **已修**: NOTES 用 hex 色值,`this.burst()` 传 hex 不用 `var(--fish-red)`

### 7.3 🟡 拖动时 svg `pointer-events: none` 把所有 SVG 点击废了
- **已修**: 改为只对 `img` 禁用,SVG 不动

### 7.4 🟡 Fish.js SVG width/height attribute 撑爆布局
- **已修**: 删 attribute,加 CSS `width:100% height:100%`

### 7.2 🟡 钢琴键 `data-color` CSS var 在 confetti 不解析
- **已修**: NOTES 用 hex 色值,`this.burst()` 传 hex 不用 `var(--fish-red)`

### 7.3 🟡 拖动时 svg `pointer-events: none` 把所有 SVG 点击废了
- **已修**: 改为只对 `img` 禁用,SVG 不动

### 7.4 🟡 Fish.js SVG width/height attribute 撑爆布局
- **已修**: 删 attribute,加 CSS `width:100% height:100%`

### 7.5 ⏳ 8 关设计(在 docs/design-v2.md)
- 第 1 关(小鱼跳进五线谱) ✅ MVP 完成
- 第 2 关(听音找鱼) ⏳ 规划
- 第 3 关(五声音阶 + 柯尔文手势) ⏳
- 第 4 关(节奏小河) ⏳
- 第 5 关(跟着小河弹一弹) ⏳
- 第 6 关(两只手打招呼) ⏳
- 第 7 关(Fa 和 Si 来了) ⏳
- 第 8 关(森林音乐会) ⏳

### 7.6 优化项
- 教学引导(新手提示气泡)
- 重玩机制
- 进度地图
- 静音/退出按钮(已加 click handler,功能 OK)

---

## 8. 关键架构决策(必读)

### 8.1 拖拽用原生 Pointer Events
- **不用** HTML5 drag API (iPad 不稳)
- 用 `pointerdown/move/up` + `setPointerCapture`
- 多触点天然支持(`pointerId` 当 Map key)
- 区分"点击" vs "拖动": `totalMove < 8px` 视为单击
- 文件: `src/components/FishPool.js`

### 8.2 五线谱位置(乐理必须搞对)
高音谱号 C 大调 7 个白键:

| 唱名 | 音名 | 五线谱位置 | Y 坐标(viewBox 0-220) |
|---|---|---|---|
| Do | C4 | **下加一线** | 180 |
| Re | D4 | **下加一间** | 170 |
| Mi | E4 | **第 1 线** | 80 |
| Fa | F4 | **第 1 间** | 90 |
| Sol | G4 | **第 2 线** | 100 |
| La | A4 | **第 2 间** | 110 |
| Si | B4 | **第 3 线** | 120 |

### 8.3 钢琴键盘 SVG
- 1 个八度 C4-B4, 7 白键 + 5 黑键
- 白键宽 80px, 高 220px
- 黑键宽 48px, 高 130px
- **绝对不要给 SVG 写 `width`/`height` HTML attribute**,只留 viewBox

### 8.4 颜色规范
- 7 条鱼对应 7 个色: `#e63946 #f4a261 #ffc971 #b5c99a #457b9d #6a4c93 #9b5de5`
- 背景奶油 `#fff8ec`, 河水 `#a8dadc`
- 文字主色 `#3d405b`
- 详细色板: `src/style.css` 顶部 `:root` 变量

### 8.5 教学法选择
- **Kodály**(首调唱名 Do Re Mi + 柯尔文手势)
- **Suzuki**("先听后读",所以有"单击听声"功能)
- 起步只学 7 个白键,黑键留到后续关卡
- 教学顺序: 看音符位置(关 1) → 听音(关 2) → 节奏(关 3) → 弹奏(关 5+)

---

## 9. 主要文件 API 速查

### `src/main.js` (v14)
```js
const APP_VERSION = 'v14';  // 改这个!

// boot() 流程:
// 1. 写版本号到 #version-tag
// 2. disableZoom() 阻止双击/双指
// 3. new Game({ stage, bubble, progress, audio })
// 4. game.start({ levelId: 1 })
// 5. applyPhoneLayout() — 多次调用 (load + resize + orientation + 500ms + 1500ms)
// 6. 给 #btn-sound 和 #btn-home 加 click handler

// applyPhoneLayout() 检测 isPhone = Math.min(w,h) <= 500
// 在 #app 上设 flex column, 直接给元素 inline pixel style
```

### `src/systems/Audio.js` (v14)
```js
import { Audio } from './systems/Audio.js';
const audio = new Audio();
await audio.unlockOnGesture();  // 必须在用户手势里调
audio.playNote('C4');           // 弹一个音
audio.correct();                 // 答对琶音
audio.wrong();                   // 答错下行
audio.hover();                   // 拖拽气泡
audio.playScale(['C4','D4',...]); // 通关上行
audio.toggleMute();              // 切静音
```

### `src/systems/Game.js`
```js
import { Game } from './systems/Game.js';
const game = new Game({ stageEl, bubbleEl, progress, audio });
game.start({ levelId: 1 });
// 内部: 渲染场景, 监听 fishPool.onDrop / onDragMove / onTap
//       onTap = 单击听声, onDragMove = 拖动时高亮最近 staff slot
//       onDrop = 拖完判断 (accepted, slotEl)
```

### `src/components/FishPool.js`
```js
import { FishPool } from './components/FishPool.js';
const pool = new FishPool(stageEl, notes);
pool.onDrop = (fish, slotEl, accepted) => { ... };
pool.onDragMove = (fish, nearestSlotEl) => { ... };
pool.onTap = (fish) => { ... };  // 单击
pool.intro();  // GSAP 入场动画
```

### `src/components/Staff.js`
```js
import { Staff } from './components/Staff.js';
const staff = new Staff(stageEl, notes);
staff.showHint(id);   // 拖动时高亮某个 slot
staff.clearHint();    // 清除所有 hint
staff.fillNote(id);   // 归位后填色(自动揭晓名字)
staff.reset();        // 重置 (用于重玩)
```

### `src/components/PianoKeyboard.js`
```js
import { PianoKeyboard } from './components/PianoKeyboard.js';
const kb = new PianoKeyboard(stageEl, notes);
kb.onPress = (keyEl) => { ... };  // 点击键盘
kb.glowKey(keyEl);  // 单键发光
kb.glowAll();        // 全部白键依次闪烁
```

---

## 10. 用户沟通要点(从对话历史提炼)

- 用户**不懂技术**,但有品味和观察力
- 喜欢直接、不啰嗦的回复
- 经常**用 iPhone 测试**,所以 PWA 兼容性是头号问题
- 之前**没有 git CLI**,但接受了安装 / 用了我们提供的脚本
- **会主动反馈 bug**,但不一定准确定位 (比如"iPhone 16 Pro 的宽度只有 320 像素吗?" — 其实他想问的是为什么布局把它当 320)
- 用户用 Chrome DevTools 模拟 iPad Pro 测试,所以 DevTools 的 iPad Pro 行为 ≠ 真 iPad
- **token 用完要建议 revoke** (https://github.com/settings/tokens)

---

## 11. 接手第一步流程

新电脑/新模型:

1. **拉取代码** (如果新电脑没源码)
   ```bash
   git clone https://github.com/Popsicle0-0/forest-piano-school.git
   cd forest-piano-school
   npm install
   ```

2. **读文档**: 本文件 + `docs/design-v2.md`

3. **检查子代理报告**: 如果有正在跑的子代理(在 background 任务),等它完成

4. **核实当前状态**:
   - `git log --oneline -20` 看最近修改
   - `npx vite build` 验证能编译
   - 浏览器打开 https://popsicle0-0.github.io/forest-piano-school/ 看 v14.1
   - 顶部应显示 `v14.1`

5. **继续任务**: 优先解决 iOS PWA 声音问题

---

## 12. 紧急预案

| 问题 | 解决 |
|---|---|
| `node_modules` 没了 | `npm install` |
| `dist/` 是脏的 | `rm -rf dist && npx vite build` |
| `main` 分支坏了 | `git reset --hard origin/main` |
| gh-pages 部署失败 | 检查 token, 检查 Pages 是否启用 |
| PWA 缓存太死 | 让用户**从主屏幕删除 app 重新添加** |
| Chrome 看起来对 iPhone 不对 | **别信 Chrome 模拟**,必须真机测试 |

---

## 13. 重要 URL 速查

- **线上 demo**: https://popsicle0-0.github.io/forest-piano-school/
- **GitHub 仓库**: https://github.com/Popsicle0-0/forest-piano-school
- **GitHub Pages 设置**: https://github.com/Popsicle0-0/forest-piano-school/settings/pages
- **GitHub Token 管理**: https://github.com/settings/tokens
- **VexFlow 库**(未来用): https://www.vexflow.com/
- **Tone.js Salamander 钢琴采样**: https://tonejs.github.io/audio/salamander/
- **MDN Pointer Events**: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
- **MDN Web Audio**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

**最后更新**: 2026-07-14 **v15** 已部署 (iPhone PWA 声音修复), 待用户真机测试声音

**TODO 优先级**:
1. 🔴 用户真机测试 iPhone PWA 声音 → 成功就继续第 2 关;还失败就继续调试
2. 🟡 继续后续关卡开发 (第 2 关: 听音找鱼)
3. 🟢 优化引导/重玩/进度地图
4. 🟢 真机测试 iPad 键盘比例是否合适

**⚠️ GitHub Push Protection 提示**: 之前尝试把 token 直接写进 HANDOFF.md 时被 GitHub 拦截(`GH013: Push cannot contain secrets`)。**token 不能 commit 进任何 push 的分支**(包括历史)。当前解决方案: token 在 `docs/CREDENTIALS.md` (gitignored),HANDOFF.md 只引用文件位置。
