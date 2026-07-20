# 🎹 森林钢琴学校 — 项目交接文档 (v18.7)

> **新接手必读**:读完本文档,你应该能 100% 继续这个项目。
>
> **最后更新**: 2026-07-20 · 当前部署版本 **v18.7** · main HEAD `48fcf09` · gh-pages `54c2424`

---

## 0. 项目一句话

面向 5-10 岁儿童的**钢琴启蒙**互动网页(纯前端 + Vite + GitHub Pages 部署,iPad/iPhone 优先)。

**v18.7 已远超最初的"单关卡小鱼拖拽"**:完整 16 关钢琴启蒙路径 + 关卡地图 + 主题切换 + 自由演奏沙盒 + 12 首歌曲库 + 成就墙 + 排行榜 + 分享 + 每日登录 streak + 教程 + 键盘快捷键 + 音频波形可视化 + PWA manifest。

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

## 2. 当前线上版本 + 版本演进时间线

### 2.1 当前版本: **v18.7**

| 提交 | 标题 |
|---|---|
| `main:48fcf09` | v18.7: Leaderboard + Progress map (Continue + mechanic icons) + SongLibrary 12 首歌 + Pip mascot 互动 |
| `gh-pages:54c2424` | deploy: v18.7 |

- 版本号同时在两处维护(双重防缓存):
  - `src/main.js:21` 的 `APP_VERSION = 'v18.7'`
  - `index.html:93` 的 `<script src="/src/main.js?v=18.7">`
- 版本号渲染:左上角星星 ⭐⭐⭐ 旁边有个灰底 `v18.7` 标签,用户一眼可看当前版本。

### 2.2 版本演进 (v15 → v18.7 一图速读)

| 版本 | 关键变化 |
|---|---|
| v15 (旧 HANDOFF 描述) | 仅 Level 1,iPhone PWA 声音修复 (`unlockOnGesture` 同步化) |
| v16 | Level 1 体验优化: 引导气泡状态机 + 重玩 + 星级 |
| v17.2 | iOS 音频时间轴修复,小鱼撒开 |
| v17.4 | 重玩随机化鱼位置,Win 评级 |
| v17.6–17.7 | L2 听音找鱼 (5 题) |
| **v17.8** | **多关卡调度器骨架** (`import.meta.glob` 自动加载 LevelN.js) |
| v18.0 | 8 关完整游戏 + LevelMap + L1–L8 场景 |
| v18.1 | 成就墙 + BGM + 设置面板 + L8 6 首歌 + L9 黑键 BONUS |
| v18.2 | L1/L4 优化 + Particles + Tutorial + L10/L11/L12 |
| v18.3 | 3 主题切换 + PWA manifest/icons + 钢琴合成 (锤击+5 谐波+混响) + 8 关打磨 |
| v18.4 | Splash 启动屏 + Streak 每日登录 + 键盘快捷键 |
| v18.5 | 音频波形可视化 + Settings 增强 + L13 + 每鱼独特造型 + iOS 防抖 |
| v18.6 | L14/15/16 + PracticeRoom + Share + Audio CONSTS 重构 |
| **v18.7 (当前)** | **Leaderboard + Continue last level + 12 首歌 SongLibrary + mechanic icons + Pip 互动** |

---

## 3. 文件结构 (v18.7 现状)

```
forest-piano-school/
├── docs/
│   ├── design-v2.md        # 完整设计文档(8 关教学路径 + 视觉规范)
│   ├── HANDOFF.md          # 本文档
│   └── CREDENTIALS.md      # ⚠️ GitHub PAT (gitignored, 不进 git)
├── src/
│   ├── main.js             # 入口 + 版本号 + iOS PWA JS 布局 + 禁缩放 + 9 按钮绑定
│   ├── style.css           # 全部 CSS (色板/动画/响应式断点)
│   ├── components/         # 32 个组件
│   │   ├── 装饰层
│   │   │   ├── Background.js        # L1/L2 用 — 远山+河岸+水波 SVG
│   │   │   ├── Pip.js               # 小鸟吉祥物 (L1 用)
│   │   │   ├── Particles.js         # 粒子 (singleton) — burst/celebrate/fountain/firework
│   │   │   └── Waveform.js          # 音频波形可视化 (320×80 canvas,常驻)
│   │   ├── 乐理元素
│   │   │   ├── Staff.js             # 五线谱(5 线 + 1 加线 + 7 slot)
│   │   │   ├── PianoKeyboard.js     # 1 个八度 SVG 键盘 (C4-B4, 7 白 + 5 黑)
│   │   │   ├── Fish.js              # 7 条手绘 SVG 鱼
│   │   │   └── FishPool.js          # 拖拽交互层(鱼→五线谱)
│   │   ├── 关卡调度
│   │   │   └── LevelMap.js          # 16 关卡网格选择器 + Continue 按钮
│   │   ├── 关卡场景 (L3-L16, L1/L2 用 Background.js)
│   │   │   ├── Level3Scene.js .. Level16Scene.js   # 12 个装饰层
│   │   └── v18 功能组件
│   │       ├── ThemeSwitcher.js     # 3 主题 (cream/night/forest)
│   │       ├── SettingsPanel.js     # ⚙ 设置浮层
│   │       ├── Tutorial.js          # 📖 4 页分步教学
│   │       ├── Keyboard.js          # ⌨️ 键盘快捷键
│   │       ├── AchievementsWall.js  # 🏆 成就墙
│   │       ├── AchievementToast.js  # 成就解锁 toast (静态方法 show())
│   │       ├── Leaderboard.js       # 📊 个人成就总览 (注意:实际只显示个人进度)
│   │       ├── PracticeRoom.js      # 🎹 自由演奏沙盒 (2 八度)
│   │       ├── SongLibrary.js       # 🎵 12 首歌 × 3 种玩法
│   │       └── Share.js             # 📤 分享 (复制文字 + PNG 截图)
│   ├── systems/            # 19 个系统
│   │   ├── Game.js         # 关卡调度器 + L1/L2 内置逻辑 (双轨制警告)
│   │   ├── Audio.js        # v18 重构: Web Audio + 5 谐波 + 混响 + osc 跟踪
│   │   ├── BGM.js          # 4 和弦循环背景音乐
│   │   ├── Progress.js     # LocalStorage 进度 (森林-piano-progress)
│   │   ├── Streak.js       # 每日登录 streak
│   │   ├── Achievements.js # 12 个成就定义 + check(snapshot) => bool
│   │   └── Level1.js .. Level16.js  # 16 个默认导出 (game) => teardownFn
│   └── utils/
│       └── svg.js          # SVG_NS 常量
├── index.html              # HTML 入口 (meta viewport + apple PWA + 缓存头 + ?v=18.7)
├── public/
│   ├── manifest.json       # PWA manifest
│   └── icons/icon.svg      # PWA 图标
├── package.json
├── vite.config.js          # base: './', output dist/
├── .gitignore              # 排除 node_modules / dist / .claude / docs/CREDENTIALS.md
└── README.md
```

---

## 4. 开发环境

```bash
cd "C:\Users\RiCha.Hu\project\practice\music"
npm install        # 装依赖
npm run dev        # 开发 → http://localhost:5173 (host:true 局域网可访问)
npm run build      # 构建 → dist/
npm run preview    # 预览生产版
```

**Node 依赖** (`package.json`):
- vite ^5.4.0 (dev)
- gsap ^3.12.5
- tone ^15.0.4 (Salamander 钢琴采样,后台加载)
- canvas-confetti ^1.9.3

---

## 5. 部署流程 (每次修改后必走)

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
git -c user.email=你的邮箱 -c user.name=你的名字 commit -m "v18.7: 描述修改"

# 3. 推 main
git push https://${TOKEN}@github.com/Popsicle0-0/forest-piano-school.git main

# 4. 推 gh-pages (清空 + dist 内容)
TMP=/tmp/gh-pages-deploy
rm -rf $TMP && mkdir -p $TMP
cp -r dist/. $TMP/
git checkout --orphan gh-pages-clean
find . -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} \;
cp -r $TMP/* . && touch .nojekyll
git add . && git -c user.email=你的邮箱 -c user.name=你的名字 commit -m "deploy: v18.7"
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
- **Bump 版本号**: 改两处:
  - `src/main.js:21` 的 `APP_VERSION` 常量
  - `index.html:93` 的 `<script src="/src/main.js?v=XX">`
- PAT 切记只推 `main` + `gh-pages-clean:gh-pages`,**不要**直接推 `gh-pages` (会失败)

---

## 6. iOS PWA 的各种坑 (重要! 仍是事实)

iOS Safari + 添加到主屏幕(PWA)有大量行为差异,v18.7 全部继承并继续踩坑:

### 6.1 视口/布局
- **`<svg width="560" height="220">` HTML attribute 优先级 > CSS** → 必须删 attribute,只留 viewBox,让 CSS 完全控制
- **`position: absolute` + `bottom: N%` + `height: M%` 在 iOS PWA 计算高度时经常得 0** → 改用 JS 直接给元素设 inline pixel
- **`display: grid` + `1fr` + `position: fixed` + `100dvh` 组合行为不可靠** → 手机用 flex column,iPad 用 grid
- **`100dvh` 在 iOS PWA 可能算错** → 必要时用 `window.innerHeight` 直接拿 JS 算
- **`<meta viewport>`** 必须含 `viewport-fit=cover` 才能用 safe-area

**v18 强制布局函数** (`src/main.js`):
- `applyPhoneLayout()`: `Math.min(w, h) <= 500 && w > h` (iPhone landscape)
- `applyTabletLayout()`: `minSide >= 700 && minSide < 1400 && maxSide <= 1400` (iPad mini/Pro 11/12.9)
- 多次重试机制: 立即 + 500ms + 1500ms + resize + orientationchange (100ms+400ms)

### 6.2 音频 (v18 重构详见 §10)
- **AudioContext 必须从用户手势里 resume**,但 `pointerdown` 在 PWA 模式有时不识别为有效手势
- `await this._webAudio.resume()` **必须** 同步在用户手势 handler 里调用,异步链可能丢失 gesture context
- 即使 Web Audio 100% 合规,iOS PWA 也不保证出声
- **备用方案**: silent HTMLAudioElement play 一下,再用 Web Audio
- v18 解锁核心 (`src/systems/Audio.js:125-206`):
  1. `unlockOnGesture()` 同步函数 (无 async/await 在关键路径)
  2. 同步播一个**静音 oscillator** (gain=0, 1ms 极短) — iOS 音频会话解锁核心 trick
  3. 同步 play 一个**静音 HTMLAudioElement** — PWA standalone 音频路由暖通
  4. 测试音调度到 **Web Audio 时间轴** (`osc.start(ctx.currentTime + 0.08)`)
  5. 同时绑 `pointerdown` + `click` 双重保险

### 6.3 缓存 (双重保险)
- iOS PWA 缓存 index.html **非常顽固**
- 加 `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` 有一定帮助
- **v18 双重保险**: `index.html:93` 用 `<script src="/src/main.js?v=18.7">`,每次 bump 版本号强刷
- **最稳**: 让用户从主屏幕**删除 app 重新添加**
- PWA manifest (`public/manifest.json`) + `apple-mobile-web-app-capable` meta 都用

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

## 7. 入口与启动流程 (`src/main.js`)

### 7.1 `APP_VERSION` 双保险

- **位置**: `src/main.js:21` → `const APP_VERSION = 'v18.7';`
- **第二处**: `index.html:93` → `<script type="module" src="/src/main.js?v=18.7"></script>`
- 写入 `#version-tag` (`.hud__version`,`index.html:66`) 显示给用户
- 暴露 `window.__forestPiano.version` 给控制台

### 7.2 boot() 启动时序 (严格按代码顺序)

```
DOMContentLoaded / 立即执行:
1. new ThemeSwitcher()            # ⚠️ 在 boot 之前实例化,首屏渲染前主题已应用 (避免 FOUC)

boot():
├── #version-tag.textContent = APP_VERSION
├── disableZoom()                 # 绑 gesturestart/change/end/touchstart/dblclick/touchmove
├── new Game({ stage, bubble, progress, audio })
│     ├── new AchievementSystem(progress)   # 内部 _backfill() 兼容旧进度
│     └── new Waveform(stage).init(audio).show()  # 320×80 canvas 常驻波形
├── new BGM(game.audio)           # 默认 playing=false
├── game.start({ levelId: 1 })    # 实际进入 _showStartOverlay → LevelMap
├── new Streak().checkIn()        # 每日签到
│     └── streak >= 3 + isNew 时 3.2s 后弹 .streak-toast (5.5s 自动消失)
├── appendChild(.streak-badge)    # 🔥 N → .hud__left
├── applyPhoneLayout() / applyTabletLayout()    # 立即 + resize + orientationchange + 500ms + 1500ms
│
├── 静态按钮 click 绑定 (HTML 写死):
│     ├── 🔊 #btn-sound     → audio.toggleMute()
│     ├── ↻  #btn-replay    → game.restartLevel() (无遮罩/无 reload)
│     ├── 🎶 #btn-bgm       → bgm.toggle() + emoji 切 🔇
│     └── ⌂ #btn-home       → confirm + location.reload()
│
├── 动态按钮插入 + 绑定 (main.js 内创建):
│     ├── ⚙️  #btn-settings       → new SettingsPanel(body)
│     ├── 🏆 #btn-achievements    → import('./AchievementsWall.js') (首位插入)
│     ├── 📊 #btn-leaderboard     → import('./Leaderboard.js')
│     ├── 🎹 #btn-practice        → import('./PracticeRoom.js')
│     ├── 🎵 #btn-songs           → import('./SongLibrary.js')
│     ├── 📖 #btn-help            → new Tutorial(body)
│     └── 🎨 #btn-theme           → theme.cycle() + flash 提示
│
├── 首次启动 1.2s 后弹 Tutorial (localStorage['forest-piano-tutorial-shown'] !== '1')
│     └── 看完后写 'forest-piano-tutorial-shown' = '1'
│
├── 2.2s 后移除 #splash
├── new KeyboardShortcuts(game).enable()    # 1-9/M/Esc/?/Space 全局键
└── 全局 keydown '?' → 弹 .keyboard-help 浮层
```

### 7.3 动态 import 的原因

- 避免循环依赖 (`Achievements.js` ↔ `Game.js`)
- 减小首屏 JS 体积 (非首屏必须的功能按需加载)
- 性能: 不点就不加载

---

## 8. 关卡调度 (v17.8+ 引入, v18 完善)

### 8.1 自动加载 LevelN.js (`src/systems/Game.js:30-41`)

```js
const LEVEL_FILES = import.meta.glob('./Level*.js', { eager: true });
const levelStarters = new Map();
for (const [path, mod] of Object.entries(LEVEL_FILES)) {
  const m = path.match(/Level(\d+)\.js$/);
  if (m && typeof mod.default === 'function') {
    levelStarters.set(parseInt(m[1], 10), mod.default);
  }
}
```

- Vite `import.meta.glob` 编译期把所有 `./Level*.js` 打包,`{ eager: true }` 立即求值
- 正则抽出数字 → 关卡号 (1-16)
- 暴露 `window.__forestPiano.levels = levelStarters` 给控制台

### 8.2 每个 LevelN.js 的导出格式 (严格签名)

```js
// 模板:
export default function startLevelN(game) {
  // 1. 渲染场景 (可选 LevelNScene)
  // 2. 调 game._startLevelX() 或完全自管
  // 3. hook game 的方法 (L2 模式)
  // 4. 返回 teardown 函数 — 切关卡时由 Game.start() 调用清理 DOM/timer/事件
  return () => { /* cleanup */ };
}
```

- `game.start({ levelId })` 查表 → `starter(this)` → 拿到 `teardown` 存到 `this._teardownCurrentLevel`
- 下次 `start()` 时,先调 `teardown()` → `_stage.innerHTML = ''` → 调 `audio.stop()` 清余音

### 8.3 LevelMap (`src/components/LevelMap.js`) — 关卡地图

- `_showStartOverlay()` (`src/main.js:447-465`) 替代了 v15 的"点我开始"遮罩
- 创建 `new LevelMap(this.stage, { progress, onSelect })`,`onSelect` 回调:
  `audio.unlockOnGesture().catch()` → `map.hide()` → `this.start({ levelId: id })`
- `LEVEL_META` 数组 (16 关元数据) 在 `LevelMap.js:26-43`,字段:`id/name/emoji/desc/theme/mechanic`
- **关键 localStorage**:
  - `CONTINUE_KEY = 'forest-piano-last-level'` (LevelMap.js:4)
  - 玩家点任意 tile 时写入 → 下次进入 LevelMap 顶部显示 "▶ 继续上次: 第 N 关" 按钮
  - **注意**: 从地图选关时写入,而非通关时写入

### 8.4 新增关卡流程 (3 步搞定)

1. 写 `src/systems/LevelN.js`,默认导 `(game) => teardownFn`
2. 可选: 写 `src/components/LevelNScene.js` (装饰背景)
3. 在 `src/components/LevelMap.js:26-43` 的 `LEVEL_META` 加一项 `{ id, name, emoji, desc, theme, mechanic }`
4. **无需改 `Game.js`**

### 8.5 ⚠️ L1/L2 双轨制警告 (重要!)

L1 和 L2 是**模块壳 + Game.js 内置**双轨制,**不要尝试合并**:

| 关卡 | 模块文件 | Game.js 内置方法 |
|---|---|---|
| L1 | `Level1.js` (39 行壳) | `_startLevel1()` (`Game.js:210-275`) — 渲染 + 拖拽 + hint 状态机 |
| L2 | `Level2.js` (341 行 polish) | `_startLevel2()` (`Game.js:281-338`) — 题目播放 |

**L2.js 里 monkey-patch 的钩子** (绝对别动 Game.js 里这些方法的签名):
- `game._markLevel2FishCorrect` — 答对鱼处理
- `game._replayQuestion` — 重听
- `game._handleLevel2Answer` — 判定
- `game._level2NextQuestion` — 下一题

这是 v17.8 接入模块化时**故意保留的历史遗产**,因为 v18 polish 全靠这些钩子,合并会破坏。

---

## 9. 16 关卡实现状态一览 (v18.7)

**核心结论**:16/16 完整可通关,**0 半成品**,**0 TODO**。

| # | 关卡名 | 核心玩法 | 关键文件 | 共享组件 |
|---|---|---|---|---|
| 1 | 小鱼跳进五线谱 | 拖 7 鱼 Do-Re-Si 到五线谱位置 | `Level1.js` + Game.js `_startLevel1` | Staff, FishPool, Pip, Background |
| 2 | 听!是谁在唱 | 听音找鱼 (5 题) | `Level2.js` + Game.js `_startLevel2` | FishPool, PianoKeyboard, Background |
| 3 | Mi-Sol 山谷 | 7 鱼挑 Do/Mi/Sol 拖 3 山 | `Level3.js` + `Level3Scene.js` | FishPool |
| 4 | 节奏小河 + 鼓 | 节奏泡泡流过 + 敲鼓 | `Level4.js` + `Level4Scene.js` | Scene 暴露 getDrum/getFxLayer |
| 5 | 小星星视奏 | Twinkle Twinkle 14 音下落 | `Level5.js` + `Level5Scene.js` | PianoKeyboard |
| 6 | 双手协调 | 5 道双音 (2s 内两手同按) | `Level6.js` + `Level6Scene.js` | PianoKeyboard;Scene 暴露 setChordLabel/celebrateClap |
| 7 | 树屋 7 音阶 | 7 阶拖鱼 + 树屋点亮 | `Level7.js` + `Level7Scene.js` | FishPool, Particles;Scene 暴露 drawRibbon/lightTreehouse |
| 8 | 森林音乐会 | 6 首旋律视奏 | `Level8.js` + `Level8Scene.js` | PianoKeyboard |
| 9 | 黑键世界 | 按顺序点 5 黑键 + 连击 | `Level9.js` + `Level9Scene.js` (42 行,**最小场景**) | — |
| 10 | 八度之旅 | 听音判断低/高八度 (8 题) | `Level10.js` + `Level10Scene.js` | 自合成高八度 C5-B5 |
| 11 | 翻牌记忆 | 4 对 8 张配对 | `Level11.js` + `Level11Scene.js` | — |
| 12 | 番茄节奏 | 节拍器摆杆 + 切菜按钮 | `Level12.js` + `Level12Scene.js` | — |
| 13 | 节奏大师 | 80→180 BPM 累进 30 拍 | `Level13.js` + `Level13Scene.js` | — |
| 14 | 和弦建造 | 5 个三和弦 root→3rd→5th | `Level14.js` + `Level14Scene.js` | PianoKeyboard |
| 15 | 视奏大师 | 五线谱 + 随机 6 音下落 | `Level15.js` + `Level15Scene.js` | PianoKeyboard |
| 16 | 节奏阶梯 | 8 轮 × 6 拍 BPM 60→130 | `Level16.js` + `Level16Scene.js` | — |

**特殊说明**:
- L1/L2 **没有 Scene 文件**,用 `Background.js` 共享背景
- L9 场景最小 (42 行, 仅紫色光晕+星星+标题)
- L4/L6/L7 Scene 暴露额外 API 给 LevelN.js 调用 (鼓位 / 和弦标签 / 树屋点亮 / 飘带)
- 其他 12 个 LevelN.js 完全独立 (自己 SVG DOM/事件/状态)

**完全独立的关卡** (无跨关依赖): L4, L9, L10, L11, L12, L13, L14, L15, L16

**核心 Game API (所有关卡都依赖)**:
- `game.audio.{playNote/correct/wrong/hover/playScale}`
- `game.say(text)`
- `game.showWinOverlay(stars, levelId)`
- `game.progress.markLevelComplete(id, stars)`
- `game._floatScore(x, y, text)` / `game._flashScreen()` / `game._calcStars()`
- `game.wrongCount` / `game.stage`

---

## 10. 音频系统 v18 重构 (替代 v15 旧"声音"章节)

### 10.1 关键方法 (`src/systems/Audio.js`)

| 方法 | 输入 | 输出 | 行为 |
|---|---|---|---|
| `unlockOnGesture()` | — | Promise<void> | 同步创 AudioContext / resume / 静音 osc / 时间轴调度 50ms C5 测试音 / 暖通 HTMLAudio;后台加载 Salamander |
| `playNote(pitch)` | `'C4'`..`'B4'` | void | 合成三角波基音 + 4 泛音 + 锤击噪声 + ADSR + 20% 混响发送;Salamander 加载好则叠加 |
| `correct()` | — | void | 大三和弦琶音 C5→E5→G5→C6 |
| `wrong()` | — | void | 320Hz→150Hz 下行 slide |
| `hover(id)` | `_id` 任意 | void | 420→180Hz 气泡音 |
| `playScale(pitches)` | `['C4'..'B4']` | Promise<void> | 7 音 220ms 间隔上行 + 末尾闪铃 |
| `toggleMute()` | — | boolean | 改 masterGain + 调 `stop()` 立即静音所有活跃 osc |
| `stop()` | — | void | 立即 disconnect+stop 所有活跃 osc/source |

### 10.2 CONSTS 集中表 (`Audio.js:25-50`)

```js
const CONSTS = {
  MASTER_GAIN_NORMAL: 0.75, MASTER_GAIN_MUTED: 0, TEST_BEEP_PEAK: 0.6,
  PLAYNOTE_ATTACK: 0.65, PLAYNOTE_DECAY: 0.35, PLAYNOTE_RELEASE: 0.8,
  PLAYNOTE_HARMONIC_2: 0.15, PLAYNOTE_HARMONIC_3: 0.05,
  PLAYNOTE_HARMONIC_4: 0.03, PLAYNOTE_HARMONIC_5: 0.015,
  HOVER_PEAK: 0.35, CORRECT_PEAK: 0.55, WRONG_PEAK: 0.45,
  ARPEGGIO_DEFAULT_PEAK: 0.5,
  REVERB_BUS_GAIN: 0.18, REVERB_WET: 1.0,
  REVERB_FEEDBACK: 0.4, REVERB_DELAY: 0.25, REVERB_SEND: 0.20,
  HAMMER_NOISE_PEAK: 0.15, HAMMER_NOISE_DURATION: 0.05,
  ADSR_ATTACK: 0.01, ADSR_DECAY: 0.15, ADSR_RELEASE: 0.85,
};
```

### 10.3 osc/source 跟踪机制 (v18 新增)

```js
// 构造函数:
this._activeOscillators = new Set();
this._activeSources = new Set();

// 每次 createOscillator 后:
_trackOsc(osc, stopAt)   // 加入 Set,绑 onended 自动清理
_trackSource(src)         // 同样 (BufferSource: 锤击噪声)

// 关卡切换 / 静音时:
stop() {
  this._activeOscillators.forEach(osc => {
    try { osc.disconnect(); } catch (_) {}
    try { osc.stop(now); } catch (_) {}
  });
  this._activeSources.forEach(src => {
    try { src.stop(now); src.disconnect(); } catch (_) {}
  });
}
```

**解决长 envelope 尾音跨关卡泄漏问题** — `Game.start({...})` 调 `audio.stop()` 清场。

### 10.4 BGM (`src/systems/BGM.js`)

- 4 和弦循环 (C-Am-F-G,每和弦 4s),正弦+三角交替,2s fade-in,masterGain 0.10
- **默认关闭** — 用户显式按 🎶 按钮开启
- 内部用 `setTimeout` 循环 (16s 一轮);不参与 `_trackOsc`

### 10.5 Salamander 真钢琴后台加载

- `import('tone').then(Tone => ...)` 动态加载,避免阻塞首屏
- 12s timeout 兜底 (timeout 后保持 Web Audio 合成)
- 加载完成后通过 `_realPiano.triggerAttackRelease` 叠加到 `playNote`

### 10.6 已知限制

- `Audio.freqMap` 仅 C4-B4 (line 267-271)
  - **C3-B3 静默**: `PracticeRoom` 显示 2 八度 (C3-B4),但 C3-B3 按键 UI 正常但无声
  - **C5 静默**: `SongLibrary` 粉刷匠用了 C5,B4 上方无法点击发声
  - **L10 解决方案**: `Level10.js` 自己合成高八度 C5-B5,绕开 freqMap 限制
- Salamander CDN (`https://tonejs.github.io/audio/salamander/`) 偶现加载失败

---

## 11. v18 新增组件全景

### 11.1 全局入口速查

`main.js#boot()` 中除了 `index.html` 写死的 `🔊 ↻ 🎶 ⌂`,还**动态注入** 7 个按钮到 `.hud__right`:

| HUD 按钮 | emoji | 触发组件 | 版本 |
|---|---|---|---|
| ⚙ 设置 | ⚙ | `SettingsPanel` | v18 |
| 🏆 成就墙 | 🏆 (首位插入) | `AchievementsWall` | v18 |
| 📊 我的成就 | 📊 | `Leaderboard` | v18.7 |
| 🎹 自由演奏 | 🎹 | `PracticeRoom` | v18.6 |
| 🎵 歌曲库 | 🎵 | `SongLibrary` | v18.7 |
| 📖 教程 | 📖 | `Tutorial` | v18 |
| 🎨 主题 | 🎨 (动态) | `ThemeSwitcher` | v18.3 |

### 11.2 各组件逐一

#### `ThemeSwitcher.js`
- **入口**: HUD `🎨` 按钮,图标动态切 `🍑/🌙/🌲`
- **职责**: 3 套主题 (cream/night/forest) 循环切换,覆盖 `:root` CSS 变量 + `body[data-theme]`
- **API**: `THEMES[]`, `THEME_ICONS{}`, `new ThemeSwitcher()` (单例,构造时立即 apply), `theme.cycle() → {id, name, icon}`, `theme.set(id)`, `theme.current`
- **依赖**: DOM `style.setProperty` + localStorage

#### `SettingsPanel.js`
- **入口**: HUD `⚙` 按钮 + 通关 overlay "重看教程"
- **职责**: 浮层 (重置进度 / 动画开关 / BGM 开关 / 大字体开关 / 教程 / 关于 / 9 关一览)
- **API**: `new SettingsPanel(stage, { onReset, onClose, version }).show() / .hide()`
- **存储 4 键**: `forest-piano-animations` / `forest-piano-bgm` / `forest-piano-large-text` + 直接删 `forest-piano-progress` + `forest-piano-achievements`
- **依赖**: 动态 `import('./Tutorial.js')` 避免循环

#### `Tutorial.js`
- **入口**: HUD `📖` 按钮 + 首次启动 1.2s 后自动弹
- **职责**: 4 页分步教学 (欢迎 / 拖拽 / 拿星 / 8 关 + 成就),滑入动画
- **API**: `new Tutorial(stage, { onDone, isFirstTime })`.show()/.hide()
- **标志位**: `localStorage['forest-piano-tutorial-shown']='1'`

#### `Keyboard.js`
- **入口**: 无 HUD,启动时 `new KeyboardShortcuts(game).enable()`
- **职责**: 全局 keydown
  - `Esc` 关栈顶 overlay
  - `Enter` 触发开始遮罩
  - `M` 模拟 `#btn-sound` 静音切换
  - `1`-`9` 直接跳关 `game.start({ levelId })`
  - `Space` L4 鼓 / L12 切按钮 pointerdown
  - `?` 弹键盘帮助浮层

#### `AchievementsWall.js`
- **入口**: HUD `🏆` + 通关 overlay "🏆 成就"
- **职责**: 满屏卡片,展示 12 成就解锁状态 + 进度条
- **API**: `new AchievementsWall(stage, { achievementSystem, onClose }).show()/.hide()`

#### `AchievementToast.js`
- **入口**: 通关瞬间 `Game.showWinOverlay` 调,无 HUD
- **API**: **静态方法** `AchievementToast.show({ id, name, emoji, desc }, { durationMs=4500 })` — 无须 new
- 同名 id 自动去重 (新 toast 替换旧)

#### `Leaderboard.js`
- **入口**: HUD `📊` (title="我的成就")
- **职责**: 个人成就总览 — 3 张统计卡 (总星数 / 通过关卡 X/16 / 平均完美度%) + 16 关星表 + 成就墙列表
- **API**: `new Leaderboard(stage, progress, achievementSystem).show()/.hide()`
- **⚠️ 注意**: 名字"排行榜"略带误导 — 实际只显示**个人进度**,无外部排行榜

#### `PracticeRoom.js`
- **入口**: HUD `🎹`
- **职责**: 沙盒 — 2 八度钢琴 (C3-B4,实际只有 C4-B4 出声),点键发声 + 顶部大唱名
- **API**: `new PracticeRoom(stage, game).show()/.hide()`
- **依赖**: `PianoKeyboard` + `game.audio.playNote`

#### `SongLibrary.js`
- **入口**: HUD `🎵`
- **职责**: 12 首歌 × 3 玩法 (▶ 听完整曲 / 🎹 跟我弹 / 📝 看谱)
- **曲目清单**: twinkle / birthday / london / joy / frog / molihua / donkey / tigers / abcsong / threepigs / painter / fishlight
- **API**: `new SongLibrary(stage, game).show()/.hide()`
- **依赖**: `PianoKeyboard` + `gsap` 落音动画 + `game.audio.playNote`

#### `Share.js`
- **入口**: 通关 overlay "📤 分享"
- **职责**: 复制文字 (`navigator.share` → `clipboard` → `prompt` 降级) + 下载 600×400 PNG 截图
- **API**: `new Share(game).showShareMenu(info, onClose)`
- **依赖**: `gsap` 菜单动效;硬编码 `LEVEL_NAMES` (与 Leaderboard 重复)

#### `Waveform.js` (`src/components/Waveform.js`)
- **入口**: `Game` 构造时 `new Waveform(stage).init(audio).show()` — **无 HUD,常驻**
- **职责**: 实时可视化 `_masterGain` 音频波形 (`AnalyserNode` fftSize=256),320×80 canvas
- **API**: `new Waveform(stage).init(audio).show()/.hide()`

#### `Particles.js`
- **入口**: 游戏内多处调用 (答对 / 通关 / L7 树屋)
- **职责**: 基于 `canvas-confetti` 的粒子效果集
- **API**: **单例** `particles` (default 也是它),方法 `burst({x,y,color})` / `celebrate()` / `fountain({x,y,color})` / `confettiFromSides()` / `firework({x,y,color})` / `drop({x,y,color})`

---

## 12. 数据持久化 — 9 个 localStorage 键速查

| 键 | 类型 | 写入方 | 字段 / 含义 |
|---|---|---|---|
| `forest-piano-progress` | object | `Progress` | `{ level, stars: {[id]:N}, completedLevels: string[], unlockedNotes: string[], firstPass: ISO }` |
| `forest-piano-achievements` | object | `AchievementSystem` | `{ unlockedIds: string[] }` (12 个成就 id) |
| `forest-piano-streak` | object | `Streak` | `{ lastDate, streakCount, longestStreak }` |
| `forest-piano-last-level` | string | `LevelMap` (选 tile 时) | 单一数字字符串,如 `"5"` → "▶ 继续上次" 按钮 |
| `forest-piano-theme` | string | `ThemeSwitcher` | `'cream'`/`'night'`/`'forest'` |
| `forest-piano-tutorial-shown` | `'1'` | `main.js` | 首次看完教程后写 |
| `forest-piano-animations` | `'true'/'false'` | `SettingsPanel` | 动画开关 |
| `forest-piano-bgm` | `'true'/'false'` | `SettingsPanel` | ⚠️ BGM 开关 — **无监听者,实际不生效** (见 §15) |
| `forest-piano-large-text` | `'true'/'false'` | `SettingsPanel` | 大字体开关 |

**Progress.js 关键**:
- `markLevelComplete(levelId, starsEarned)`: stars 取 max,推 `state.level = id+1`,首次完成写 `firstPass`,MVP 全解锁 7 note
- `isLevelUnlocked(id)` 永远返回 `true` (MVP: 全关卡开放)
- 所有 I/O 用 try/catch (iOS 无痕模式会抛 SecurityError)

**AchievementSystem 关键**:
- `ACHIEVEMENT_DEFS` 12 项 (Tier 1-7 + 自定义里程碑)
- 每个 def 有 `check(snapshot) => bool`,基于 `Progress.getSnapshot()` 深拷贝
- 构造时 `_backfill()` 升级用户兼容 (已完成但未登记的旧进度自动解锁)
- `checkAndUnlock()` 在 `Game.showWinOverlay()` 调 — 通关瞬间触发
- 12 个成就 id: `first-graduate` / `forest-master` / `perfect-pitch` / `diamond-ear` / `repeat-master` / `starter` / `listener` / `mountaineer` / `drumming-kid` / `two-hands` / `treehouse-climber` / `concert-master`

**Streak.js 关键**:
- `checkIn()` 比对 `todayISO()`:
  - 同日已签到 → `{streak, isNew: false}`
  - 昨日已签到 → `streak += 1`
  - 间隔 > 1 天 → 重置为 1
  - 首访 → 1
- 返回 `{ streak, isNew }` 给 main.js,后者按 `streak >= 3` 决定是否弹 toast

---

## 13. 关键架构决策 (必读)

### 13.1 拖拽用原生 Pointer Events
- **不用** HTML5 drag API (iPad 不稳)
- 用 `pointerdown/move/up` + `setPointerCapture`
- 多触点天然支持 (`pointerId` 当 Map key)
- 区分"点击" vs "拖动": `totalMove < 8px` 视为单击
- 文件: `src/components/FishPool.js`

### 13.2 五线谱位置 (乐理必须搞对)
高音谱号 C 大调 7 个白键:

| 唱名 | 音名 | 五线谱位置 | Y 坐标 (viewBox 0-220) |
|---|---|---|---|
| Do | C4 | **下加一线** | 180 |
| Re | D4 | **下加一间** | 170 |
| Mi | E4 | **第 1 线** | 80 |
| Fa | F4 | **第 1 间** | 90 |
| Sol | G4 | **第 2 线** | 100 |
| La | A4 | **第 2 间** | 110 |
| Si | B4 | **第 3 线** | 120 |

### 13.3 钢琴键盘 SVG
- 1 个八度 C4-B4, 7 白键 + 5 黑键
- 白键宽 80px, 高 220px
- 黑键宽 48px, 高 130px
- **绝对不要给 SVG 写 `width`/`height` HTML attribute**,只留 viewBox

### 13.4 颜色规范
- 7 条鱼对应 7 个色: `#e63946 #f4a261 #ffc971 #b5c99a #457b9d #6a4c93 #9b5de5`
- 背景奶油 `#fff8ec`, 河水 `#a8dadc`
- 文字主色 `#3d405b`
- 详细色板: `src/style.css` 顶部 `:root` 变量

### 13.5 教学法选择
- **Kodály** (首调唱名 Do Re Mi + 柯尔文手势)
- **Suzuki** ("先听后读",所以有"单击听声"功能)
- 起步只学 7 个白键,黑键留到 L9
- 教学顺序: 看音符位置 (L1) → 听音 (L2) → 节奏 (L3/L4) → 弹奏 (L5+) → 高级 (L9-L16)

### 13.6 关卡调度 (v17.8+)
- `import.meta.glob('./Level*.js', { eager: true })` 自动注册
- 新关卡: 写 LevelN.js + 改 LEVEL_META,**不动 Game.js**
- **L1/L2 双轨制**: 业务逻辑住 Game.js#_startLevel1/2,模块只是壳 (v17.8 接入模块化时故意保留)

### 13.7 进度模型 (MVP)
- `Progress.isLevelUnlocked(id)` 恒 true — 全关卡开放
- Continue 按钮从 `LevelMap` 选 tile 时写入,通关时不写
- 失败/重玩不扣星

### 13.8 osc/source 跟踪 (v18 关键修复)
- `_activeOscillators`/`_activeSources` Set 跟踪活跃 osc/source
- `stop()` 一键静音 — 关卡切换 / 静音时调
- 解决长 envelope 尾音跨关卡泄漏

### 13.9 AchievementSystem 与 Progress 解耦
- `Progress.getSnapshot()` 深拷贝,成就只读
- `achievement.check(snapshot) => bool` 纯函数,易测试
- 升级兼容: 构造时 `_backfill()` 补齐旧进度

---

## 14. 主要文件 API 速查

### 14.1 `src/main.js`
```js
const APP_VERSION = 'v18.7';   // 同时改 index.html:93 的 ?v=

// boot() 流程 (详见 §7)
// 1. ThemeSwitcher 提前实例化
// 2. disableZoom() 阻止双击/双指
// 3. new Game({ stage, bubble, progress, audio }) → 内部 AchievementSystem + Waveform
// 4. game.start({ levelId: 1 }) → 实际进入 LevelMap 选择
// 5. Streak.checkIn() → 弹 🔥 toast (streak>=3)
// 6. applyPhoneLayout/applyTabletLayout() 多次调用
// 7. 9 个 HUD 按钮 click handler (4 静态 + 5 动态插入)
// 8. Tutorial 1.2s 后首启,Splash 2.2s 后移除
// 9. KeyboardShortcuts 启用 + ? 键帮助
```

### 14.2 `src/systems/Audio.js`
```js
import { Audio } from './systems/Audio.js';
const audio = new Audio();
await audio.unlockOnGesture();        // 必须在用户手势里调
audio.playNote('C4');                 // 弹一个音
audio.playNote('C5');                 // ⚠️ C5 静默 (freqMap 限制)
audio.correct();                       // 答对琶音
audio.wrong();                         // 答错下行
audio.hover('do');                     // 拖拽气泡
audio.playScale(['C4','D4','E4','F4','G4','A4','B4']);   // 通关上行
audio.toggleMute();                    // 切静音 (立即 stop() 所有活跃 osc)
audio.stop();                          // 一键静音 (关卡切换时调)
```

### 14.3 `src/systems/Game.js`
```js
import { Game } from './systems/Game.js';
const game = new Game({ stageEl, bubbleEl, progress, audio });
game.start({ levelId: 1 });            // 实际进 LevelMap
game.restartLevel();                   // 当前关卡无遮罩重玩

// game.audio / game.achievements / game.progress / game.waveform (singleton)
// game.fishPool / game.kb / game.staff / game.pip (L1 内置组件引用)
```

### 14.4 `src/components/LevelMap.js`
```js
import { LevelMap, LEVEL_META, CONTINUE_KEY } from './components/LevelMap.js';
const map = new LevelMap(stage, { progress, onSelect: (id) => game.start({ levelId: id }) });
map.show();
map.hide();
// CONTINUE_KEY = 'forest-piano-last-level' (LevelMap.js:4)
```

### 14.5 `src/components/ThemeSwitcher.js`
```js
import { ThemeSwitcher, THEMES, THEME_ICONS } from './components/ThemeSwitcher.js';
const theme = new ThemeSwitcher();    // 构造时立即 apply localStorage
theme.cycle();                         // 切下一主题 → { id, name, icon }
theme.set('night');                    // 直接设某主题
theme.current;                         // 当前主题 id
```

### 14.6 `src/components/AchievementsWall.js`
```js
import { AchievementsWall } from './components/AchievementsWall.js';
new AchievementsWall(body, { achievementSystem, onClose }).show();
```

### 14.7 `src/components/AchievementToast.js`
```js
import { AchievementToast } from './components/AchievementToast.js';
AchievementToast.show({ id, name, emoji, desc }, { durationMs: 4500 });   // 静态方法
```

### 14.8 `src/components/SettingsPanel.js`
```js
import { SettingsPanel } from './components/SettingsPanel.js';
new SettingsPanel(body, { version: APP_VERSION, onReset: () => location.reload(), onClose: () => {} }).show();
```

### 14.9 `src/components/Tutorial.js`
```js
import { Tutorial } from './components/Tutorial.js';
new Tutorial(body, { isFirstTime: true, onDone: () => localStorage.setItem('forest-piano-tutorial-shown', '1') }).show();
```

### 14.10 `src/components/Keyboard.js`
```js
import { KeyboardShortcuts } from './components/Keyboard.js';
new KeyboardShortcuts(game).enable();   // 绑全局 keydown (1-9/M/Esc/?/Space)
```

### 14.11 `src/components/Leaderboard.js`
```js
import { Leaderboard } from './components/Leaderboard.js';
new Leaderboard(body, game.progress, game.achievements).show();
```

### 14.12 `src/components/PracticeRoom.js`
```js
import { PracticeRoom } from './components/PracticeRoom.js';
new PracticeRoom(body, game).show();
```

### 14.13 `src/components/SongLibrary.js`
```js
import { SongLibrary } from './components/SongLibrary.js';
new SongLibrary(body, game).show();
```

### 14.14 `src/components/Share.js`
```js
import { Share } from './components/Share.js';
const share = new Share(game);
share.showShareMenu({ levelId, stars, wrongCount, totalQuestions }, onClose);
// share.copyText(info) / share.downloadScreenshot(info) 可独立调
```

### 14.15 `src/components/FishPool.js`
```js
import { FishPool } from './components/FishPool.js';
const pool = new FishPool(stageEl, notes);
pool.onDrop = (fish, slotEl, accepted) => { ... };
pool.onDragMove = (fish, nearestSlotEl) => { ... };
pool.onTap = (fish) => { ... };
pool.intro();                           // GSAP 入场动画
pool.setDragEnabled(true|false);
pool.lockFish(id);                      // v17 答对后锁定
pool.reset();                           // 重置
```

### 14.16 `src/components/Staff.js`
```js
import { Staff } from './components/Staff.js';
const staff = new Staff(stageEl, notes);
staff.showHint(id);
staff.clearHint();
staff.setTarget(id);                    // v18: targeting 比 hint 更显眼
staff.clearTarget();
staff.fillNote(id);
staff.flashFill(id);                    // v18: flash fill 动画
staff.reset();
```

### 14.17 `src/components/PianoKeyboard.js`
```js
import { PianoKeyboard } from './components/PianoKeyboard.js';
const kb = new PianoKeyboard(stageEl, notes);
kb.onPress = (keyEl) => { ... };
kb.glowKey(keyEl);
kb.glowAll();
kb.markPlaced(id, colorHex);            // v18: 永久标记已放置
kb.resetMarks();
```

### 14.18 `src/components/Particles.js`
```js
import { particles } from './components/Particles.js';   // 单例
particles.burst({ x, y, color, count, spread, startVelocity });
particles.celebrate();                  // 通关全屏
particles.fountain({ x, y, color, count });
particles.confettiFromSides({ count });
particles.firework({ x, y, color });
particles.drop({ x, y, color });
```

### 14.19 `src/systems/BGM.js`
```js
import { BGM } from './systems/BGM.js';
const bgm = new BGM(game.audio);
bgm.toggle();                           // 返回新 playing 布尔
bgm.start();                            // 幂等, audio 未就绪 500ms 重试
bgm.stop();
```

### 14.20 `src/systems/Streak.js`
```js
import { Streak } from './systems/Streak.js';
const streak = new Streak();
const { streak, isNew } = streak.checkIn();   // 每日首次调
const { streak, longest } = streak.get();
```

---

## 15. 当前已知问题 & 待办 (v18.7)

### 15.1 🔴 SettingsPanel BGM 开关实际不生效
- **症状**: 在 ⚙ 设置面板勾选/取消 BGM,无任何效果
- **原因**: `SettingsPanel.js` 派发 `window` 自定义事件 `toggle-bgm`,但 `main.js#boot()` 没监听
- **修复**: 在 `boot()` 加 `window.addEventListener('toggle-bgm', () => bgm.toggle())` — 这是 v18.7 当前**唯一的"声音"待办**

### 15.2 🔴 v18.6/v18.7 新增功能真机回归
- 新增组件 (PracticeRoom / SongLibrary / Leaderboard / AchievementsWall / Share) 都是动态 import
- 必须在 iPhone/iPad PWA 真机逐一点开验证
- Chrome DevTools 模拟不准确

### 15.3 🟡 Leaderboard 显示 X/16 但只实装 L1+L2
- `Leaderboard.js` 硬编码 16 关名字表 + `/16` 总数
- L3-L16 是名字硬编码但 stars 全 0 — 视觉上像"未解锁"
- 等所有 16 关打磨后,实际数据会逐步填上

### 15.4 🟡 C5 在 SongLibrary 无法发声
- `Audio.freqMap` 仅 C4-B4,粉刷匠用了 C5,B4 上方按了不出声
- L10 通过自己合成高八度解决了类似问题 — 可参考 `Level10.js`
- 修复方向: 扩展 `Audio.js#freqMap` 到 C5-B5,或换粉刷匠的曲

### 15.5 🟡 Salamander CDN 加载偶现失败
- `https://tonejs.github.io/audio/salamander/` 偶现 12s timeout
- 已有 Web Audio 合成器兜底,功能不受影响
- 长期方案: 自托管到 `public/assets/piano/` (见 design-v2 §4.5)

### 15.6 🟢 iPad 键盘比例 (30vh) 真机长按体验待验证
- `applyTabletLayout` 把 kb 设 30vh (min 140px),staff 50vh,fish 11vh
- 等待用户真机体验反馈

### 15.7 🟢 `Share.js` 与 `Leaderboard.js` 的 `LEVEL_NAMES` 重复硬编码
- 未来增 L17+ 要两处都改
- 应提取到 `LevelMap.js` 的 `LEVEL_META` 导出复用

### 15.8 🟢 SettingsPanel "重置" 不清 `theme/streak/settings-*/last-level`
- 只删 `forest-piano-progress` + `forest-piano-achievements`
- 若要彻底重置需手动 `localStorage.clear()`

### 15.9 🟢 ThemeSwitcher(stage) 参数没用
- 保留仅为未来扩展 — 当前构造时立即 apply localStorage,无需 stage

### 15.10 ✅ 已完成 (v18 规划)
- ✅ 8 关钢琴启蒙路径全部上线
- ✅ 关卡地图选择器
- ✅ 教学引导气泡状态机 (L1)
- ✅ 重玩机制 (无遮罩/无 reload)
- ✅ 进度地图 (Continue 按钮 + LevelMap 星数显示)
- ✅ 静音/退出/重玩按钮 (click handler)
- ✅ 自由演奏沙盒 + 12 首歌曲库 + 3 种玩法
- ✅ 成就墙 + 排行榜 + 分享
- ✅ Streak 每日登录
- ✅ PWA manifest + Splash + 3 主题
- ✅ 音频波形可视化
- ✅ 键盘快捷键

---

## 16. 用户沟通要点 (从对话历史提炼)

- 用户**不懂技术**,但有品味和观察力
- 喜欢直接、不啰嗦的回复
- 经常**用 iPhone 测试**,所以 PWA 兼容性是头号问题
- 之前**没有 git CLI**,但接受了安装 / 用了我们提供的脚本
- **会主动反馈 bug**,但不一定准确定位 (比如"iPhone 16 Pro 的宽度只有 320 像素吗?" — 其实他想问的是为什么布局把它当 320)
- 用户用 Chrome DevTools 模拟 iPad Pro 测试,所以 DevTools 的 iPad Pro 行为 ≠ 真 iPad
- **token 用完要建议 revoke** (https://github.com/settings/tokens)

---

## 17. 接手第一步流程

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
   - `git log --oneline -10` 看最近修改
   - `npx vite build` 验证能编译
   - 浏览器打开 https://popsicle0-0.github.io/forest-piano-school/ 看 v18.7
   - 顶部应显示 `v18.7`

5. **继续任务**: 优先修复 SettingsPanel BGM 开关 (§15.1) + 真机回归测试新增功能 (§15.2)

---

## 18. 紧急预案

| 问题 | 解决 |
|---|---|
| `node_modules` 没了 | `npm install` |
| `dist/` 是脏的 | `rm -rf dist && npx vite build` |
| `main` 分支坏了 | `git reset --hard origin/main` |
| gh-pages 部署失败 | 检查 token, 检查 Pages 是否启用 |
| PWA 缓存太死 | 让用户**从主屏幕删除 app 重新添加** |
| Chrome 看起来对 iPhone 不对 | **别信 Chrome 模拟**,必须真机测试 |
| **改 LevelN.js 不生效** | 检查导出签名 `(game) => teardownFn`;LevelMap 的 `LEVEL_META` 也加上对应 id |
| **16 关列表只展示部分** | `import.meta.glob` 模式不变,确认文件名匹配 `Level\d+.js` |
| **静态按钮 toggle 无反应** | 动态按钮用 `document.getElementById('btn-XXX')` 防重 (重复插入),检查 HUD 顺序 |
| **Achievements 不解锁** | `Progress.markLevelComplete` 已调,但 `AchievementSystem.checkAndUnlock()` 只在 `showWinOverlay()` 里调用 |
| **Continue 按钮不显示** | 必须从 LevelMap 选 tile (直接刷关不写入);`CONTINUE_KEY` 读异常 try/catch 兜底 |
| **SettingsPanel BGM 无效** | 监听 `toggle-bgm` 事件 (见 §15.1) |
| **L2 polish 异常** | 别动 Game.js 里 `_markLevel2FishCorrect/_replayQuestion/_handleLevel2Answer/_level2NextQuestion` 的签名 (§8.5 警告) |
| **iOS 仍有无声** | 确认是 PWA 真机 (Standalone);DOMContentLoaded → boot → unlockOnGesture(在首用户手势内) 链路不能断 |

---

## 19. 重要 URL 速查

- **线上 demo**: https://popsicle0-0.github.io/forest-piano-school/
- **GitHub 仓库**: https://github.com/Popsicle0-0/forest-piano-school
- **GitHub Pages 设置**: https://github.com/Popsicle0-0/forest-piano-school/settings/pages
- **GitHub Token 管理**: https://github.com/settings/tokens
- **Tone.js Salamander 钢琴采样** (远程加载, 12s timeout): https://tonejs.github.io/audio/salamander/
- **MDN Pointer Events**: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
- **MDN Web Audio**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

**最后更新**: 2026-07-20 · **v18.7** 已部署 (`48fcf09` / `54c2424`)

**TODO 优先级**:
1. 🔴 **修复 SettingsPanel BGM 开关** (§15.1) — 在 `boot()` 加 `window.addEventListener('toggle-bgm', () => bgm.toggle())`
2. 🔴 **真机回归 v18.6/v18.7 新增组件** (PracticeRoom / SongLibrary / Leaderboard / AchievementsWall / Share)
3. 🟡 扩展 `Audio.freqMap` 到 C5-B5 解决粉刷匠无声
4. 🟡 Salamander 自托管避免 CDN 加载失败
5. 🟢 抽 `LEVEL_NAMES` 到 `LevelMap.js` 消除 `Share.js`/`Leaderboard.js` 重复
6. 🟢 iPad 键盘比例真机长按体验验证

**⚠️ GitHub Push Protection 提示**: 之前尝试把 token 直接写进 HANDOFF.md 时被 GitHub 拦截(`GH013: Push cannot contain secrets`)。**token 不能 commit 进任何 push 的分支**(包括历史)。当前解决方案: token 在 `docs/CREDENTIALS.md` (gitignored),HANDOFF.md 只引用文件位置。