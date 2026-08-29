# 🎹 森林钢琴学校 — 钢琴启蒙互动网页 (设计稿 v2)

> 面向 5-10 岁的**钢琴启蒙**网页游戏,纯前端,GitHub Pages 部署,iPad/移动端优先

> **本文档为定稿版本**(2026-07-14)。配套产物见仓库根目录与 `src/` 目录。

---

## 0. 一句话产品

🐟"小鱼跳进钢琴键,音符变朋友" — 一只小鸟 Pip 帮助 7 条住在河里的小鱼 Do Re Mi Fa Sol La Si 找到它们在钢琴上的"家"。

---

## 1. 核心定位与方法论

- **不是"音乐理论学习站"**,而是"**钢琴启蒙第一步**":从 0 接触钢琴 → 认 C 大调 7 个白键 → 弹奏简单旋律 → 视奏
- **核心方法**:
  - **Kodály**:首调唱名 Do Re Mi + 柯尔文手势;**五声音阶起步**(Mi-Sol-La-Do-Re),后加 Fa 和 Si,降低认知负担
  - **Suzuki**:"先听后读" — 听到一个音再去认,而不是反过来
  - **屏幕钢琴键盘直接弹奏**:不教五线谱背谱,先让孩子听见+摸到
- **产品不教**:
  - 黑键(第 1-2 关)
  - 复杂节奏(留到第 4 关)
  - 双手协调(第 6 关才引入)
  - 抽象音乐理论术语(6 岁以下不教)

---

## 2. 世界观

| 元素 | 设定 |
|---|---|
| 主角 | 小鸟 **Pip** — 圆润、8px 圆眼、羽毛笔触 |
| 场景 | 森林 + 河流 + 河岸上一架**拟人化三角钢琴**(带眼睛/嘴巴贴纸) |
| 角色 | 7 条住在河里的小鱼 — Do Re Mi Fa Sol La Si |
| 每条鱼属性 | 颜色(七色:红橙黄绿蓝靛紫)+ 性格 + 柯尔文手势 + 真名(C/D/E/F/G/A/B) |
| 视觉隐喻 | 河面 = 五线谱水域;河水流动 = 音乐在响 |

---

## 3. 关键乐理校正(必须搞对)

高音谱号上 C 大调 7 个白键:

| 唱名 | 音名 | 五线谱位置 | 钢琴白键 |
|---|---|---|---|
| Do | **C4** | **下加一线** | 中央 C |
| Re | D4 | **下加一间** | D |
| Mi | E4 | **第 1 线** | E |
| Fa | F4 | **第 1 间** | F |
| Sol | G4 | **第 2 线** | G |
| La | A4 | **第 2 间** | A |
| Si | B4 | **第 3 线** | B |

⚠️ **第一关必须**: Do/Re 不在五条线内!五线谱可视区要画"加线区",且区分"线上 vs 间内"。

记忆口诀:
- 线: **E G B D F** — "Every Good Boy Does Fine"
- 间: **F A C E** — "FACE"

---

## 4. 视觉/听觉系统

### 4.1 色板(森林/河流主题,莫兰迪高级感)

```css
:root {
  --bg-cream:    #FFF8EC;  /* 奶油底 */
  --bg-paper:    #FAF3E0;  /* 米黄 */
  --water:       #A8DADC;  /* 河水 */
  --water-deep:  #5FA8B5;  /* 深水 */
  --fish-red:    #E63946;  /* Do */
  --fish-orange: #F4A261;  /* Re */
  --fish-yellow: #FFC971;  /* Mi */
  --fish-green:  #B5C99A;  /* Fa */
  --fish-blue:   #457B9D;  /* Sol */
  --fish-indigo: #6A4C93;  /* La */
  --fish-purple: #9B5DE5;  /* Si */
  --warm-cta:    #FFB347;  /* 蜜瓜橙 */
  --soft-error:  #E07A5F;  /* 温和错误 */
  --text-main:   #3D405B;  /* 深蓝灰,对比度 > 12:1 */
  --text-sub:    #6B7280;
}
```

### 4.2 形状 & 质感
- 大圆角(20-28px)+ squircle 不规则柔边
- 双层纸感投影:`box-shadow: 0 2px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)`
- 3% 噪点纸纹(SVG `<feTurbulence>` 滤镜)
- **不对称胜过完美**:每元素 ±2° 旋转
- **多色阴影胜过纯黑**(用主色调的暗色做阴影)

### 4.3 字体
- 标题:**Baloo 2** (Google Fonts, OFL)
- 中文:**ZCOOL KuaiLe 站酷快乐体** (OFL,Google Fonts)
- 正文/UI:**Nunito** (OFL)
- 数字音符:48-72px 巨大字号

### 4.4 动画
- GSAP 缓动:
  - `--ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275)` (童趣弹跳)
  - `--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1)` (柔和进入)
  - 答错摇头: `gsap.timeline().to(x, -8).to(x, 8).to(x, -6).to(x, 0)`
  - 答对弹跳: `gsap.to(scale, 1.3, ease: 'back.out(2.5)', yoyo, repeat:1)`
- 动画时长:
  - 微交互(按下/状态): 100-200ms
  - 元素入场: 300-500ms
  - 答对庆祝: 600-1200ms
  - 通关: 800-1500ms
  - **永远不超过 1.5s**,否则儿童失去耐心

### 4.5 听觉
- **钢琴音源**: Salamander Grand Piano,**自托管**到 `/assets/piano/`,CC BY 3.0 写 Credit
  - 文件命名: `C4.mp3`, `D4.mp3`, ... `B4.mp3`
  - 备用源: `https://nbrosowsky.github.io/tonejs-instruments/samples/piano/`
- **音效**: Mixkit Free License
  - 答对: `Correct positive notification`
  - 答错: `Cartoon failure piano` 或 `Slow sad trombone fail`
  - 通关: `Achievement bell`
  - 点击: `Video game retro click`
- **BGM**: Pixabay License,搜 `playful kids` 短曲循环

---

## 5. 技术栈定稿

| 层 | 选择 | 理由 |
|---|---|---|
| 框架 | **原生 JS + Vite** | 零依赖,体积小,iPad 顺滑 |
| 钢琴键盘 | **纯 SVG 自绘** | 互动层必须手画 |
| 五线谱 | **纯 SVG 自绘** | 同上 |
| 鱼角色 | **手绘 SVG**(勿用位图) | 风格统一、可改色、可动画 |
| 动画 | **GSAP 3.12+** | elastic/back 缓动,Timeline 编排 |
| 粒子 | **canvas-confetti** | 答对/通关彩纸 |
| 音频 | **Tone.js** | Sampler + ADSR + 多触点 polyphony |
| 拖拽 | **原生 Pointer Events + setPointerCapture** | iPad 触屏最稳 |
| 状态 | **LocalStorage** | 进度/星数/图鉴 |
| 部署 | **GitHub Pages** (gh-pages 分支) | 0 成本 |

### 5.1 iPad 触屏关键 3 条

1. **AudioContext.resume()** 必须在第一次 `pointerdown` **同步**触发(否则无声)
2. **多触点**: 用 `pointerId` 当键值存到 `Map`,松手才 delete — 和弦天然支持
3. **CSS** 必加:
   ```css
   .key, .fish { touch-action: none; -webkit-user-select: none; user-select: none; }
   ```
4. **viewport meta**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
   ```

### 5.2 钢琴键盘 SVG 规格
- 默认展示 **1 个八度 C4-B4,7 个白键 + 5 个黑键**
- iPad 横屏每个白键宽 60-80px,高 220px
- 白键上贴:**音名 (C/D/E...) + 唱名 (Do/Re/Mi...)** 双行
- 黑键窄高 130px
- 整条键盘 1.5-2 个八度可横向滚动

---

## 6. 关卡设计(8 关钢琴启蒙)

**顺序遵循 Kodály**: 起步只学五声音阶(Do Re Mi Sol La),后加 Fa 和 Si;先听后读。

| # | 关卡名 | 学习目标 | 核心交互 | 屏幕键盘 | 通关条件 |
|---|---|---|---|---|---|
| **1** | **小鱼跳进钢琴键** | 认 Do~Si 7 个唱名 + 钢琴白键位置 | 把 7 条鱼拖到对应琴键(下方同步显示五线谱位置) | ✅ | 7 条全归位 |
| **2** | **听!是谁在唱** | 听音辨唱名 | 播放一个音(Do~Si),从 7 条鱼里选对的 | ✅ 备听 | 连续对 5 题 |
| **3** | **Do 的好朋友 Mi-Sol** | 五声音阶 + 柯尔文手势 | 5 条鱼按高度排序 + 配手势图 | ✅ | 5 条全对 |
| **4** | **节奏小河** | 四分 ta + 八分 ti-ti | 看节奏图,敲屏幕或点击跟节拍 | — | 完成 4 小节 |
| **5** | **跟着小河弹一弹** | 视奏简单旋律(《小星星》前 4 小节) | 5 线谱上小泡泡依次掉到键上,孩子跟点 | ✅ | 弹对 1 曲 |
| **6** | **两只手打招呼** | 双手协调(双音 / 和弦) | 高音键亮 + 低音键亮,双手同时按 | ✅ | 完成 3 个双音 |
| **7** | **Fa 和 Si 来了** | 完整七声音阶 + C 大调音阶弹奏 | 第 1 关的变体,补齐 7 条 + 弹奏 7 音上下行 | ✅ | 弹对 7 音 |
| **8** | **森林音乐会** | 综合 | 选曲库(《小星星》《欢乐颂》《伦敦桥》),视奏 + 跟拍 | ✅ | 完成 1 首完整曲 |

**优先级**:
- **P0 (MVP)**: 第 1 关做到极致
- **P1**: 第 2、3、5、7 关
- **P2**: 第 4、6、8 关

---

## 7. 第一关详细规格(可立即开工)

### 7.1 场景布局(iPad 横屏 1024×768)

```
┌──────────────────────────────────────────┐
│  [左上]星数 ⭐⭐⭐        [右上]🔊 ❓ ⌂ │
│                                          │
│   ── ── ── ── ── (五线谱 + 加线区) ──    │
│        Do Re Mi Fa Sol La Si (位置标记)  │
│                                          │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐┌──┐            │
│  │C ││D ││E ││F ││G ││A ││B │  ← 钢琴键  │
│  │Do││Re││Mi││Fa││Sol││La││Si│           │
│  └──┘└──┘└──┘└──┘└──┘└──┘└──┘            │
│                                          │
│  🐟🐟🐟🐟🐟🐟🐟  (7 条鱼在河里游)         │
│                                          │
│  Pip: "帮我把它们送回家!"               │
└──────────────────────────────────────────┘
```

### 7.2 拖拽逻辑

- 鱼用 **Pointer Events**:
  - `pointerdown`: 抓起(放大 1.08 + 阴影加深 + 上移 10px)
  - `pointermove`: 跟手(用 `setPointerCapture` 锁)
  - `pointerup`: 吸附判定
- **吸附容差 50-60px**(儿童手抖容错)
- 鱼身上同时显示**音名 (C/D/E...) + 唱名 (Do/Re/Mi...)** + 颜色
- 拖到正确键:
  - `key.appendChild(fish)` (或定位到 key 中心)
  - 鱼跳一下
  - 钢琴键发光 + 弹该音(Tone.js)
  - 溅水粒子(canvas-confetti)
  - 柯尔文手势图标闪
- 拖到错误键:
  - 鱼摇头 → GSAP `elastic.out` 弹回原位(0.5s)
  - 错误音(温和下行)
  - **不显示"错误"字样**
- 完成 7 条:
  - 小河泛起金波
  - 7 条鱼齐唱 C 大调上行
  - 解锁"图鉴第一页"

### 7.3 状态( LocalStorage)

```js
{
  level: 1,
  stars: 0,
  unlocked: ['do','re','mi','fa','sol','la','si'],
  firstPass: '2026-07-14'
}
```

---

## 8. "做出质感、引起儿童兴趣"的 5 条铁律

1. **音乐贯穿始终**:每一秒都有声(流水、风、鸟鸣、按键音、唱名音)
2. **小鱼是有生命的角色**:待机时尾巴轻摆、眨眼、冒小泡
3. **永远不惩罚**:无"错误"字样、无红叉、无扣分;只"再试一次" + 摇头 + 弹回
4. **质感来自不完美**:±2° 旋转、纸纹噪点、多色阴影、撕边贴纸
5. **iPad 一指即玩**:64px+ 触屏目标、首次触摸同步解锁音频、pointerId 多触点支持

---

## 9. 素材清单(全部用 SVG 自绘,不依赖位图)

| 类别 | 来源 | 备注 |
|---|---|---|
| 钢琴键盘 | **手绘 SVG** | src/components/PianoKeyboard.js |
| 五线谱 | **手绘 SVG** | src/components/Staff.js |
| 7 条小鱼 | **手绘 SVG** (仿 Kenney 风格) | src/components/Fish.js |
| Pip 小鸟 | **手绘 SVG** | src/components/Pip.js |
| 森林/河流背景 | **CSS 渐变 + SVG 波浪/树** | src/components/Background.js |
| 钢琴采样 | **Tone.js Sampler + Salamander** | 暂用 CDN,生产环境自托管 |
| 答对/答错/通关/点击音效 | **Mixkit Free** | 暂用 CDN 链接,后续自托管 |
| BGM | **Pixabay Music** | 暂用 CDN 链接 |

> 设计稿早期提到 Kenney Fish Pack / ZCOOL KuaiLe 等 — **最终版改用全 SVG 自绘**以保证视觉一致性与可控性,且不依赖第三方 CDN 资源(避免 403)。

---

## 10. 部署

- 构建: `npm run build` (Vite 输出到 `dist/`)
- GitHub Pages: 推 `gh-pages` 分支,根目录指向 `dist/`
- 离线打开: 直接 `vite preview` 即可在本地/局域网打开

---

## 11. 后续(开发进度追踪)

详见仓库根目录的 `README.md` 与 git commit history。
