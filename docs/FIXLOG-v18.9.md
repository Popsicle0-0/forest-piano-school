# 🔧 v18.9 修复记录 — iPhone 17 Pro / iPad Pro 布局与交互问题

> **修复日期**: 2026-07-22
> **触发原因**: 用户要求"全面评估项目，尤其是一直存在问题的布局、无法点击、交互问题"，并明确要支持 iPhone 17 Pro 和 iPad Pro（含 2024 M4 新一代 11"/13"）
> **评估方式**: 纯代码审查（3 个后台 Explore 子代理因会话预算耗尽失败后，改为直接读代码逐一核实），所有结论均有文件行号做证据，排查中主动撤回了 2 条经交叉验证后证明不成立的担忧（避免虚报）
> **本次改动范围**: `src/main.js`、`src/style.css`、`src/systems/Game.js`、`src/components/FishPool.js`，共 4 个文件 / 162 行

---

## 0. 目标设备参数（本次评估的基准数据）

| 设备 | CSS Viewport（Portrait） | CSS Viewport（Landscape） | 来源 |
|---|---|---|---|
| iPhone 17 Pro | 402×874 | 874×402 | [Apple 官方规格](https://www.apple.com/iphone-17-pro/specs/) |
| iPhone 17 Pro Max | 440×956 | 956×440 | [webmobilefirst.com](https://www.webmobilefirst.com/en/devices/apple-iphone-17-pro-max-2025/) |
| iPad Pro 11" (M4, 2024) | 834×1194 | 1194×834 | [Apple Support](https://support.apple.com/en-us/119892) |
| iPad Pro 13" (M4, 2024) | 1032×1376 | 1376×1032 | [Apple Support](https://support.apple.com/en-us/119891) |

**关键点**：项目里旧注释假设的是上一代 "iPad Pro 12.9\" (1366×1024)"，M4 新一代 13" 横屏实际宽度是 **1376px**，比旧假设更宽 —— 这是本次发现的核心断点冲突的根源（见问题 #3）。

---

## 1. 严重问题（会导致真正"点不到 / 点了没反应"）

### 问题 #1：全局双击拦截误伤"快速点击两个不同元素"

**症状**：用户反馈"经常点了没反应"，尤其是快速操作时。

**根因**：`src/main.js` 的 `disableZoom()` 里，防双击缩放的逻辑用了**全局唯一**的时间戳变量，不区分点击的是哪个元素：

```js
// 修复前 (v18.8 及更早):
let lastTouch = 0;
document.addEventListener('touchstart', (e) => {
  const now = Date.now();
  if (now - lastTouch < 300) e.preventDefault();  // 不分位置!
  lastTouch = now;
}, { passive: false });
```

只要用户在 300ms 内触碰**任意两个不同的元素**——两个 HUD 按钮、两条鱼、两张关卡卡片——第二次触摸就会被 `preventDefault()` 吞掉。这是"点了没反应"投诉最可能的根因，因为它影响全站所有点击场景，HUD 按钮密集、关卡地图卡片密集时手快一点就会踩中。

**修复**（`src/main.js:352-378`）：改为同时判断**时间 + 坐标距离**，只有"同一位置附近的连续触摸"才当作双击拦截：

```js
let lastTouchTime = 0;
let lastTouchX = 0;
let lastTouchY = 0;
const DBLTAP_MAX_MS = 300;
const DBLTAP_MAX_DIST = 30; // px, 两次触摸中心点距离在此范围内才算"同一处"
document.addEventListener('touchstart', (e) => {
  const now = Date.now();
  const touch = e.touches && e.touches[0];
  const x = touch ? touch.clientX : 0;
  const y = touch ? touch.clientY : 0;
  const dt = now - lastTouchTime;
  const dist = Math.hypot(x - lastTouchX, y - lastTouchY);
  if (dt < DBLTAP_MAX_MS && dist < DBLTAP_MAX_DIST) {
    e.preventDefault();
  }
  lastTouchTime = now;
  lastTouchX = x;
  lastTouchY = y;
}, { passive: false });
```

**影响范围**：全站所有触摸交互。这是本次修复中优先级最高的一项。

**验证**：`node --check src/main.js` 通过；`npx vite build` 通过。

---

### 问题 #2：HUD 按钮从 4 个长到 11 个，小屏挤压变形

**症状**：v18.0 时 HUD 右侧只有 4 个按钮，到 v18.8 陆续加到 11 个（🔊↻🎶⌂⚙🏆📊🎹🎵📖🎨），左侧还有关卡徽章 + streak 徽章 + 7 个进度点 + 版本号。没人在功能堆叠过程中回头检查过响应式承载能力。

**根因**：`src/style.css` 里 `.hud`、`.hud__left`、`.hud__right` 全程**没有 `flex-wrap`**，`.hud__btn` 也没有 `flex-shrink:0`。iPhone 17 Pro 横屏可用宽度约 `874 - 2×62(safe-area) ≈ 750px`，11 个 48px 按钮 + gap 就已经 628px，加上左侧一堆徽章后，flex 默认会把所有子元素压扁变形，导致按钮越挤越难点准。

**修复方案**：不引入"更多菜单"这种大改动（风险高，需要重构 7 处按钮插入逻辑），改用更聚焦的方案——**固定按钮尺寸 + 允许横向滚动**：

1. `.hud`（`style.css:112-121`）加 `min-width:0`（这是让子元素 `overflow-x` 生效的必要前提，flex item 默认 `min-width:auto` 会撑开父容器阻止滚动）
2. `.hud__left`（`style.css:123-134`）加 `overflow-x:auto` + 隐藏滚动条（`scrollbar-width:none` + `::-webkit-scrollbar{display:none}`，滚动能力保留但视觉不出现滚动条）
3. `.hud__right`（`style.css:178-193`）同样处理
4. `.hud__btn`（`style.css:195-207`）加 `flex-shrink:0` —— 按钮固定 48px，绝不压缩，放不下就滚动而不是变形
5. 左侧的 `.hud__dots`、`.hud__version`、`.streak-badge`、`.level-badge`、`.hud__level2` 也统一加 `flex-shrink:0`（+ `white-space:nowrap` 防止文字换行破坏徽章形状）

**验证**：CSS 大括号配对检查通过（`brace balance: 0`）；`npx vite build` 通过。

**已知取舍**：这个方案没有解决"按钮太多不好找"的信息架构问题，只解决了"点不到"的技术问题。如果未来还要继续加按钮，建议做分级收纳（常用按钮留 HUD，低频按钮收进抽屉菜单）——这次先不做，避免一次改动范围过大。

---

### 问题 #3：CSS 断点（1366px）与 JS 判断阈值（1400px）不一致，iPad Pro 13" 横屏卡在夹缝里

**症状**：这是本次评估中最隐蔽也最关键的一处发现。

**根因**：
- `src/main.js:528` 的 `applyTabletLayout()` 用 `maxSide <= 1400` 判断是否为 iPad，从而决定是否用 JS 接管强制 inline 布局
- `src/style.css` 里有 3 处 `@media (... and max-width: 1366px ...)` 断点，负责给 JS 接管前"重置" `#app` 的 `display:grid` 为 `display:block`，否则 JS 的 absolute 定位会和 CSS grid 冲突

**这两个阈值不一致**（CSS 用 1366，JS 用 1400），而 **iPad Pro 13" (M4) 横屏实际宽度是 1376px**——正好落在"JS 认为该介入（≤1400）"但"CSS 认为不该重置 grid（>1366）"的夹缝里。旧代码注释明确写着是按上一代 "iPad Pro 12.9\" (1366×1024)" 的假设写的，M4 新一代变宽了没跟上。

**修复**（`src/style.css` 3 处断点全部改为 `max-width:1400px`，`src/main.js` 更新对应注释）：

```diff
- @media (min-width: 768px) and (max-width: 1366px) and (min-height: 700px) {
+ @media (min-width: 768px) and (max-width: 1400px) and (min-height: 700px) {
```

涉及行号：`style.css:1093`（主 iPad 区间重置）、`style.css:1126`（iPad Pro 竖屏高键盘空间）、`style.css:1139`（iPad 所有方向关掉 grid）。

同时更新了 `src/main.js:509-528` 的注释，把过时的 "iPad Pro 13\": 1366×1024" 改成准确的 "iPad Pro 13\" M4: 1376×1032"，并写明这次断点对齐的原因，方便后人理解。

**验证**：`grep -c "max-width: 1400px"` 返回 3，`grep -c "max-width: 1366px"` 返回 0（确认全部替换完毕，无遗漏）；`npx vite build` 通过。

---

## 2. 中等问题（影响体验，非阻断）

### 问题 #4：FishPool 鱼的坐标不响应设备旋转，转屏后可能跑出可视区域

**症状**：用户在游戏中途旋转设备（横转竖，或 iPad 分屏改变可用宽度），已经渲染在鱼池里的小鱼可能跑到新容器范围外，点不到也看不到。

**根因**：`src/components/FishPool.js` 的 `_placeFishes()` 在渲染时基于**当次**的 `pool.getBoundingClientRect()` 算好绝对像素坐标后写死到 `wrap.style.left/top`，全文件确认**没有任何 resize 监听**。而 `main.js` 的 `applyPhoneLayout`/`applyTabletLayout` 会在 `resize`/`orientationchange` 时重新计算 `.fish-pool` 容器尺寸——鱼的坐标却不会跟着重算。

**修复**（`src/components/FishPool.js`）：

1. 构造函数里新增 `resize`/`orientationchange` 监听（150ms 防抖），触发 `_clampFishesToPool()`
2. `_clampFishesToPool()` 方法：只把坐标**夹紧**回新容器边界内（不重新洗牌位置，避免打断正在进行的游戏），并且**跳过**已锁定（`fish.locked`）和正在拖拽中（`.dragging` class）的鱼，避免和游戏状态冲突；坐标变化用 200ms `transition` 做平滑过渡而不是瞬移
3. 新增 `destroy()` 方法，用于移除 `resize`/`orientationchange` 监听，避免每次切关都累积一个新监听器（内存泄漏）
4. 在 `src/systems/Game.js:159-161` 的 `start({levelId})` 里，清空 stage 前调用 `this.fishPool.destroy()`（因为 `resize` 监听绑在 `window` 上，`stage.innerHTML=''` 清空 DOM 并不会自动移除它）

**验证**：`node --check src/components/FishPool.js`、`node --check src/systems/Game.js` 均通过；`npx vite build` 通过。

**设计取舍**：没有选择"重新洗牌所有鱼的位置"（更彻底但会打断正在进行的拖拽/已放置状态），而是选择最小必要的边界修正（clamp），优先保证不破坏现有游戏状态。

---

### 问题 #5：Level 9 黑键固定像素宽度，窄屏可能溢出裁切

**症状**：Level 9（黑键世界）的 5 个黑键固定 `width:110px`，总宽 `5×110+4×14(gap)+32(padding)=638px`。这是硬编码像素，没有响应式处理。

**根因**：`src/style.css` 的 `.level9-key` 规则里 `width:110px; height:70px` 是写死的常量，`.level9-keys-container` 也没有 `flex-wrap`。虽然 L9 是横屏关卡通常有 750px+ 可用宽度能容纳，但完全没有"防御性"的响应式兜底——在极窄设备（如 iPhone SE 横屏 568px 宽）或未来加第 6 个黑键时会直接溢出裁切，点击热区也可能小于 iOS 推荐的 44×44px 最小标准。

**修复**（`src/style.css:3427-3470`）：

1. `.level9-key` 宽度改用 `clamp(60px, calc((100% - 32px - 4*14px) / 5), 110px)` —— 下限 60px 保证可点击，上限维持原设计 110px，中间按容器实际宽度动态计算，5 键之和永远不会溢出
2. 高度改用 `clamp(44px, 14vw, 70px)` —— 44px 下限满足 iOS 人机指南推荐的最小可点击热区
3. 字号同步用 `clamp(14px, 4vw, 20px)` 响应式收缩
4. `.level9-keys-container` 加 `flex-wrap:wrap` 作为极端情况的最后兜底（正常宽度下仍是一排，只有极窄屏才会换行）

**验证**：CSS 大括号配对检查通过；`npx vite build` 通过。

---

## 3. 已排查确认无问题（避免虚报，记录在案供后续参考）

在审查过程中，以下两条最初怀疑的问题经过用实际设备宽高数字交叉验证后，确认**不成立**，特此记录避免未来重复排查：

### ✅ "iPad 竖屏请横屏遮罩误判" — 不成立

最初担心 `@media (orientation:portrait) { .rotate-hint {display:flex} }` 会让 iPad 竖屏也被强制显示"请横屏"提示。用 Node 脚本核实所有目标设备宽高后：

```
iPadPro11 portrait w=834 h=1194 -> COVERED=true  (命中 768-1366(现1400) 且 min-height:700 的规则)
iPadPro13 portrait w=1032 h=1376 -> COVERED=true  (同上, 且也命中 min-width:1024 规则)
iPhone17Pro portrait w=402 h=874 -> COVERED=false (符合预期, iPhone 本来就该显示"请横屏")
```

两款 iPad 竖屏都被正确豁免，逻辑本身没问题，撤回此项担忧。

### ✅ "SVG preserveAspectRatio 裁切导致点击坐标错位" — 不成立

最初担心 16 关场景统一用的 `viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"` 在极端宽高比（iPhone 横屏 874×402 ≈2.17:1 vs iPad 横屏 1376×1032≈1.33:1）下会造成"看到的位置"和"点击判定位置"不一致。

实际上点击判定走的是真实渲染 DOM 元素的 `getBoundingClientRect()` 或原生 `pointerdown`/`click` 事件，浏览器会正确处理实际渲染后的命中测试，不受 SVG 内部坐标系裁切影响。撤回此项担忧。

---

## 4. 本次未处理的问题（有意搁置，附理由）

### Level13.js / Level16.js 用硬编码 SVG 坐标选择器抓取 DOM 元素

`src/systems/Level13.js:64` 用 `game.stage.querySelector('ellipse[cx="400"][cy="380"]')`、`Level16.js:93` 类似方式，通过精确匹配 SVG 坐标属性来获取鼓的 DOM 引用做点击判定。这是脆弱的耦合模式（如果 Scene 文件改了坐标，这里会静默失效，不会报错——只是 `querySelector` 返回 `null`），但**目前坐标是对齐的，能正常工作，不是导致"点不到"的当前问题**。

**为什么这次不改**：这是代码质量问题（可维护性），不是用户能感知到的功能 bug。改动它需要同时改 Scene 文件（约定用 data-attribute 代替坐标选择器），属于更大范围的重构，超出本次"修复布局/点击/交互问题"的范围。建议记录为技术债，未来单独排期处理。

### HUD 按钮信息架构（11 个按钮平铺 vs 分级收纳）

本次用"允许横向滚动"解决了"点不到"的技术问题，但没有解决"按钮太多不好找"的体验问题。更彻底的方案（低频按钮收进"更多"抽屉菜单）需要重构 `main.js` 里 7 处按钮插入逻辑，改动面较大，这次为了控制风险没有做。

---

## 5. 改动文件清单

| 文件 | 改动行数 | 改动内容 |
|---|---|---|
| `src/main.js` | +37 -8 | 问题#1(双击拦截) + 问题#3(注释更新) |
| `src/style.css` | +60 -9 | 问题#2(HUD溢出) + 问题#3(断点对齐) + 问题#5(L9响应式) |
| `src/systems/Game.js` | +6 | 问题#4(FishPool destroy 调用) |
| `src/components/FishPool.js` | +59 | 问题#4(resize监听 + clamp坐标 + destroy) |

**总计**：4 个文件，162 行改动（+162 -17）。

---

## 6. 验证记录

| 验证项 | 结果 |
|---|---|
| `node --check src/main.js` | ✅ 通过 |
| `node --check src/systems/Game.js` | ✅ 通过 |
| `node --check src/components/FishPool.js` | ✅ 通过 |
| `src/style.css` 大括号配对检查 | ✅ 通过 (balance: 0) |
| `grep -c "max-width: 1400px" src/style.css` | 3 (符合预期，3 处断点全部对齐) |
| `grep -c "max-width: 1366px" src/style.css` | 0 (确认无遗漏) |
| `npx vite build` | ✅ 通过 (1027 modules, 7.09s, dist 产物正常生成) |

**未做**（需要用户在真机上验证）：
- [ ] iPhone 17 Pro 真机横屏：HUD 按钮是否可正常滚动查看/点击
- [ ] iPad Pro 13" 横屏：布局是否不再撕裂（display:grid vs absolute 冲突已解决）
- [ ] 快速连续点击 HUD 上两个不同按钮：确认不再互相拦截
- [ ] Level 9 黑键：窄屏下 5 键是否完整可见可点
- [ ] 游戏中途旋转设备：小鱼是否还能正常点到（不再跑出容器）

---

## 7. 后续建议

1. **优先级最高**：真机验证问题 #1（双击拦截修复），这是影响面最广的一项
2. 如果真机验证后仍有"点不到"的具体场景，需要提供**复现步骤**（哪个页面/哪个操作序列），因为这次修复是基于代码审查发现的系统性问题，不排除还有场景相关的个例
3. 中长期建议对 HUD 按钮做信息架构重新设计（问题 #2 的"已知取舍"里提到的分级收纳）
4. 中长期建议把 Level13/16 的硬编码坐标选择器换成 data-attribute（问题 #4 的技术债）
