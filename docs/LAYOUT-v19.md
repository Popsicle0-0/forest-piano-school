# v19 布局体系 — 关卡适配规范

> 给所有后续开发的唯一真相源。旧体系(applyPhoneLayout/applyTabletLayout JS 注入像素)
> 已于 v19 删除，不要再按 HANDOFF §6 的旧思路写布局代码。

## 新核心一句话
`#app` 是 flex column（HUD 自动高 / `#stage` flex:1 / bubble 自动高），
安全区由 `#app` 的 env() padding 统一负责；布局几何 **100% 由 CSS 决定**，
任何组件不得向 `.hud/.stage/.bubble/.staff-wrap/.fish-pool/.keyboard-area`
注入内联定位样式。

## 两类舞台模式（Game.start 已自动切换）
| 模式 | 适用 | stage 类名 |
|---|---|---|
| 三段栈 | L1、L2（Staff+FishPool+Keyboard 组合） | `#stage.stage--stack`：flex column。常态：五线谱(order:1, flex5, min84)/鱼池(order:2, flex6, min128)/键盘(order:3, clamp(92px,24%,170px))；**≤520px 高短横屏**由救生艇媒体块重排为五线谱 min102 / 鱼池 min92 / 键盘 min76，优先确保 L1 对位可见。规则在 style.css 文件末尾 STACK MODE/短视口救生艇章节 |
| 中性画布 | L3-L16（各场景自管） | `#stage` 无附加类：position:relative 的确定尺寸盒子 |

## 关卡层写法约定
1. 场景根节点继续用 `position:absolute; inset:0` 挂进 stage —— 这仍是官方姿势。
2. 禁止 `window.innerWidth/innerHeight` 做**场景内部**布点；要相对容器就用
   `container.getBoundingClientRect()`。（_floatScore 一类"屏幕级"反馈仍可用视口坐标。）
3. 场景需要自己的 keyframes/局部样式 → 在本文件里注入 `<style>`（项目已有先例：
   Background.js / FishPool.js），**不要**改 style.css，避免多人冲突。
4. 触控：交互目标必须是元素监听器（pointerdown/click 均可）；不要依赖
   `mouseenter/hover` 承载功能（触屏无意义）。全局的双击拦截现在只拦
   "300ms 内同一交互元素的第二次触碰"，跨元素快连不受影响 —— 不需要在
   关卡里再加自己的防抖来绕它。
5. 鱼池类玩法直接复用 FishPool（含 v19 参数化鱼体尺寸与转屏重散布），
   不要复制它的逻辑。**L1 调参要区分触控 wrapper 与视觉 inner**：v19.3 的
   wrapper 为 `68×52`、视觉 inner 缩为 78%、锁定后缩为 45%、最小鱼间距 72px；
   不要为了"更好抓"把视觉鱼重新放大，否则会遮挡五线谱邻位。
6. `viewBox="0 0 800 500"` + `slice` 的场景 SVG 允许保留（装饰性裁切可接受），
   但 L1 的 Staff/PianoKeyboard 不是装饰：必须维持 `meet`（谱）与横向撑满
   `preserveAspectRatio="none"`（键盘）的当前策略。所有**可交互目标**的摆放位置
   必须来自容器实测矩形，不能假设某个百分比映射后恰好在屏内。

## 回归清单（每组适配完成后自查）
- [ ] iPhone 17 Pro 横屏 874×402：内容完整可见（短屏救生艇媒体块已保证三段最小和 ~252px < 可用 ~285px）、HUD 图标钮 ≥36px / 主要玩法热区 ≥44px、无横向滚动条（HUD 内部滚动除外）
- [ ] iPhone 17 Pro 竖屏 402×874：一样可玩（v19 起不再有强制横屏遮罩）
- [ ] iPad Pro 11" 横竖屏 1194×834 / 834×1194：同上
- [ ] 桌面浏览器 1280×800：行为与 v18 完全一致
- [ ] 转屏中不报错（Node `node --check` 通过 + 本关无新增 window 监听泄漏）
