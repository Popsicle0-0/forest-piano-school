# 🔧 v19.0 / v19.1 — 布局体系完全重写与真机热修复 (手机/iPad 可玩性专项)

> **日期**: 2026-08-27
> **触发**: 用户反馈"目前最大的问题还是布局……连第一关都完全不可玩""没办法回到第一关"，要求完全重写布局相关、以第一关为基准、手机和 iPad 都要真实可玩。
> **方法**: 主线程精读全链路 (index.html / main.js / Game.js / FishPool / Staff / PianoKeyboard / LevelMap) + 子代理全局侦察交叉验证；随后 4 组并行子代理逐关适配；改动全程构建校验。
> **原则**: 布局几何 100% 归 CSS 单一所有；删除一切 JS 注入像素。规范见 `docs/LAYOUT-v19.md`。

---

## 1. 根因链 (为什么"第一关完全不可玩")

按因果强度排序，全部有代码证据：

| # | 根因 | 位置 | 后果 |
|---|---|---|---|
| R1 | **JS 布局只在 boot 时机执行**，从地图选关重建 DOM 后无人重算（L2 有合成 resize 补丁、L1 没有） | 原 main.js L105-122 + Game.js `_startLevel1` | 手机/iPad 上选完第 1 关后整个场景只剩基础 CSS（无高度 grid），几何全乱——这是"第一关不可玩"的首要根因 |
| R2 | **竖屏 = 设计性死屏**：`@media portrait` 把 hud/stage/bubble/fish-pool 全部 visibility:hidden 并盖全屏"请横过来"遮罩 | style.css 原 L991-996 | iPhone 竖屏打开什么都点不了；iPad mini 竖屏也命中遮罩 |
| R3 | **鱼池高度数学死局**：JS 给鱼池分配 ≥110px 但鱼体写死 84×64，iPhone 横屏 stageH≈326 时池高仅 ~110px → `cyRange` 塌缩，7 条鱼挤成一条重叠横带；iPad 横屏 `cyRange` 直接算成负数退化为 1px，7 条鱼钉死同一 y | 原 applyPhoneLayout/TabletLayout + FishPool 常量 | "抓错鱼/点不准/鱼叠一起" |
| R4 | **双击拦截用坐标距离判重**：300ms 内两次触碰中心距 <30px 一律吞掉，相邻 HUD 按钮(间距≈6px)/相邻关卡卡都中招，且与业务层 4 处 250ms 防抖叠乘 | disableZoom() v18.9 版 | "点了没反应"高频误伤 |
| R5 | **安全区保护失效**：#app 有 env(safe-area-inset) padding，但子元素被 JS 改成 absolute 定位后以 padding-box 为偏移基准，刘海/Home 条遮挡保护形同虚设 | 原 phone/tablet 分支 | PWA 下 HUD 顶进状态栏区域 |
| R6 | 键盘/五线谱高度在 CSS 里有 4 个互相覆盖的来源（vh 字面量/媒体块/JS inline），外加 920px 断点使 iPhone Pro Max 横屏(932 宽)漏出所有手机规则 | style.css 多处 | 布局随加载时序随机漂移 |

## 2. 新架构

```
#app  flex column
├── .hud      自动高 (内容 clamp 撑开, 安全区由 #app padding 保证)
├── #stage    flex:1 · position:relative · overflow:hidden   ← 永远有确定尺寸
│     ├─ 模式A .stage--stack (L1/L2): 弹性三段栈
│     │    [五线谱 order:1 flex5] [鱼池 order:2 flex6 min128px] [键盘 order:3 clamp(92,24%,170)]
│     └─ 模式B 中性画布 (L3-16): 场景 absolute inset:0 自挂 (与旧语义兼容)
└── .bubble   自动高 clamp(36,7vh,52)
```

- `Game.start()` 新增 `_syncStageMode(levelId)`：进 L1/L2 前 toggle `.stage--stack`，保证 FishPool 首次测量读到的就是最终盒子。
- FishPool 新增 `layoutMetrics(rect)`：鱼宽高/边距/最小间距随容器实测高度联动缩放 k∈[0.55,1]——低矮容器自动变"小鱼多行"，根治 R3。转屏等大幅变化改走 `_redistributeUnlocked()` 整体重散布（避开已锁定/拖拽中的鱼），小幅变化仍只夹边。
- ⌂ 主页按钮：弃用 `confirm()+location.reload()`（PWA 缓存风险+儿童摩擦），改为原地清浮层直接回关卡地图。
- 关卡地图：自适应列数 + 卡片内滚动 + 跟随安全区，竖横屏都能完整到达每一格。

## 3. 删除清单

| 删除物 | 说明 |
|---|---|
| main.js `applyPhoneLayout()` (~120行) | JS 手机像素布局 |
| main.js `applyTabletLayout()` (~145行) | JS iPad 像素布局 |
| resize/orientationchange 监听 + 500ms/1500ms 重试定时器组 | 为上述函数服务的时序补丁 |
| style.css `@media max-width:768/920` 大块 vh 布局 | 与核心冲突的手机断点（保留组件级微调） |
| style.css 两个重复的 iPad 媒体块 | 只为旧 JS 清场而存在 |
| 强制横屏遮罩体系 (`#rotate-hint` 元素 + portrait 隐藏规则 + !important 救援块) | 竖屏成为一等公民 |
| Level2.js 合成 resize dispatch | 栈模式不再需要 |
| Level8.js 同上 + 过时注释 | 由适配代理替换为 v19 说明 |

main.js 从 662 行减到 383 行；bundle 减 ~2.3kB。

## 4. 触控判定修正

`disableZoom()` 双击拦截改为**元素身份制**：只有 300ms 内连续触碰**同一个交互元素**
(button/a/.fish/.key/.level-map-tile/[role=button] 及其后代) 才拦截；
跨元素快连（快速切两个按钮/两条鱼/两张卡）永不再被吞。
坐标距离方案废除（相邻元素中心距可小于 30px，本质会误伤）。

## 5. 逐关适配摘要（4 组并行代理完成）

| 组 | 结果 |
|---|---|
| L2-L4 | L2/L4Scene 确认无需改动；L3 删除误导性死代码 PLATFORM_HINTS；**L4 两处视口→容器坐标系修正**（泡泡轨迹、FX 层鼓位粒子原本整体偏移一个 HUD 高度） |
| L5-L8 | 共性缺口修复：中性画布下键盘 SVG 无尺寸约束会失控 → 各关注入局部 `<style>` 兜底（`#stage >` 直接子级限定作用域 + 贴底 clamp 高度，teardown 时摘除）；L6 和弦牌从 800×500 设计稿绝对像素改为容器百分比 + min() 保证悬于键盘上方；L8 选曲列表双向锚定+内部可滚动（原小横屏第二排点不到）；L7/各 Scene 实测后确认干净（rect 转换已有正确姿势） |
| L9-L12 | L9/各 Scene 确认干净。**L10 致命缺陷修复：`SVG_NS` 从未 import，进关即抛 ReferenceError 整关不可玩**（存量 bug，与布局无关但顺带根除）。三关注入小横屏(max-height:480px)压缩样式：L10 答题区不再被 64px 顶垫挤出屏；L11 记忆板改由可用高度反推宽度+内部坐标基准对齐（原粒子偏移 ~160px）；L12 节拍器按 vh 反推上限防整列被裁。另修两处 `[hidden]` 被 author display:flex 击穿的显示缺陷（L10/L12 连击胶囊常驻） |
| L13-L16 | 脆弱耦合根除：L13/L16 的"按 SVG 设计稿坐标抓鼓"选择器改为 `data-l13/l16-drum` 语义化属性（判定元素与旧目标逐一同一对）。L14 短屏(max-height:520px)压缩：原 padding-top:92px 会把三条鱼槽位整个盖进键盘带；L15 **修正任务前提**——`.level15-staff-area` 实为写死 `top:92px;height:260px`，矮屏被裁/叠键盘，改为双向锚定+svg `min(260px,100%)`（桌面渲染几何与原版一致）；两关注入键盘兜底样式并清掉过时合成 resize dispatch |

## 6. 双审代理结论与本轮追加修复

两份独立审查(正确性 0 Critical/1 Major; 触控合规 1 P0/4 P1)全部在发版前修复:

| 审查发现 | 修复 |
|---|---|
| **P0**: iPhone 横屏三段最小和 312px > 可用 ~285px, 键盘被裁唱名不可见 | 新增 `@media (max-height:520px)` 救生艇块: 三段下限整体让步(min 和降至 ~252px)+HUD/气泡收紧, 与最坏情形留余量 |
| **Major**: ⌂ 回地图不清场 — L12 节拍器穿地图继续咔哒作响(计时器/GSAP 泄漏) | 新增 `Game.goHome()`: teardown→fishPool.destroy→清浮层→清舞台→HUD 复位(连带修掉"L2 后进度点不回来"瑕疵)→回地图; ⌂ 与徽章按钮统一走它 |
| **P1**: 鱼池/琴键/Game 三层共享时间戳锁吞跨元素快连 | 全部改为"同一元素才拦"身份锁(FishPool×2 处、Game×3 处、PianoKeyboard 滑奏解锁) |
| **P1**: 鱼 inline `touchAction='manipulation'` 反向覆盖 CSS none → 拖拽偶发 pointercancel | 删除该 inline |
| **P1**: Pip 吉祥物热区压住鱼池左下角拖拽落点 | 栈模式隐藏 `.stage--stack .pip` |
| **P1**: 全部 body 级浮层无安全区处理 | 统一接入 `--safe-*` env padding; streak-toast/theme-flash 补 `pointer-events:none`(曾挡右下点击) |
| Minor: 存量 Waveform 失明(Game 构造的画布被 start 清场带走+旧引用挡重建) | show() 改为离文档即重建, rAF 循环自动接新画布 |
| Minor: starter 抛错的 fallback 路径漏切栈模式 / L10-12 残留合成 resize | 已补齐/清除 |

**有意保留**(记录避免后人重复排查): SNAP_RADIUS 维持 280(儿童容错优先, 距离条件实际由 id 匹配主导, `wrong_drop_far` 文案因此极少触发属预期); normTarget 对少量 SVG 内部目标(鼓面/tap-zone 等)不做归并——pointerdown 先于 touchstart preventDefault 执行, 无实害。

## 6.5 验证记录

- `node --check`: main.js / Game.js / FishPool.js / PianoKeyboard.js / Waveform.js / 全部被改关卡文件 ✅
- `npx vite build` ✅ (产物正常)
- 正确性审查确认的关键面: Game.start 流程态切换次序 ✓ FishPool 边界数学(极矮容器/全锁定/padR<padL/首帧) ✓ L13 data 属性与旧坐标选择器同元素 ✓ L15 桌面渲染几何逐像素等价声明成立(H≥532 区间) ✓ [hidden] 补救特异度必胜 ✓ #stage> 作用域对 PracticeRoom/SongLibrary 零命中 ✓
- 真机矩阵（需用户验收）：见 §8

## 7.1 v19.1 真机反馈热修复

用户在 v19.0 真机反馈三项问题，均已修复：

| 反馈 | 根因 | 修复 |
|---|---|---|
| 点第一关立即退回关卡页 | `Game._startLevel1()` 在地图选关后仍无条件调用 `_showStartOverlay()`，把刚关闭的地图重新打开 | 增加一次性 `_skipStartOverlayOnce`，地图选关/通关重玩/键盘直跳明确表示直入；冷启动仍显示地图 |
| 第二关点鱼没反应 | `FishPool` 在 `dragEnabled=false` 时 pointerdown 先写入 250ms 防抖锁再 return，随后 iOS 合成 click 被同一锁拦截 | 点选模式在防抖前直接 return，不污染 click 通道；click 自己负责同鱼防抖 |
| 第三关完全看不到鱼 | `.level3-background` 的不透明背景 `z-index:1` 覆盖 z-auto 鱼池 | 鱼池统一 `z-index:3`，高于背景/渐变，仍低于 HUD/浮层 |

追加复核修复：
- `Esc` 回地图改走 `Game.goHome()`，清理关卡 teardown/计时器/FishPool 监听/音频，不再让节拍器穿透地图运行。
- 外接键盘数字直跳时调用 `unlockOnGesture()`，首次直跳也有声音。
- Waveform 检测 stage 清场后的孤儿 canvas 并重建。

## 7.2 v19.2 第二轮真机反馈热修复

| 反馈 | 根因 | 修复 |
|---|---|---|
| L1 横屏钢琴太窄 | 短屏键盘盒高度缩到 72px 后，SVG 使用 `preserveAspectRatio="meet"`；560×220 固有比例为保全高度而只占中间窄带 | 键盘 SVG 改为横向撑满盒子的 `preserveAspectRatio="none"`，短屏键盘高度同步提高到 88–122px；白键覆盖完整舞台宽度 |
| 归位鱼挡住其他五线谱位置 | 正确鱼仍保留原 66–84px 实体，飞进相邻仅几十像素的 slot 区后遮挡 | 锁定鱼的内层 SVG 缩为 42% + 降低透明度；完成状态由五线谱自身彩色音符和唱名承担，鱼不再挡落点 |
| 横屏中右侧卡半透明矩形 | 常驻 320×80 音频 Waveform canvas 的毛玻璃背景 | 关闭该非玩法调试 UI；不再创建/重建 canvas |
| L2 点鱼仍无任何反应 | 部分 iOS PWA 不合成 click；即使 pointerdown 触发回调，Game 内第二层时间戳锁又立即把第一次答案判定 return | 点选模式改为 pointerdown 直接触发 onTap，click 仅作去重兜底；删除 Game 的重复防抖，题目锁本身负责防重复结算 |

## 7.3 v19.3 第一关精准对位热修复

第二轮真机确认 L2 已恢复、Waveform 矩形已消失；L1 仍存在“鱼大、谱小、互相遮挡、对位闪烁”。本轮只调整 L1/FishPool 的几何与视觉，不碰 L2 的点选路径：

- 鱼 wrapper 从 `84×64` 收紧为 `68×52`，视觉内层另缩至 78%，但 wrapper 仍是完整触控热区。
- 防撞距离由 56 提至 72px，Poisson 取样不再允许 7 条实体鱼互相穿插；浮动动效从 `-6px/1.03` 降为 `-2px/1.01`，消掉会干扰对位的闪烁。
- 正确归位鱼固定为内层 45%，透明度 42%；五线谱彩色音符/唱名成为唯一清晰完成反馈，不挡邻近 slot。
- iPhone 横屏短视口重分配：五线谱最小高度 `64→102px`，鱼池 `112→92px`，键盘 `86→76px`；总最小值仍低于最坏 285px 舞台高度。
- 拖动目标的 pulse 从 1.55 倍降至 1.12 倍，提示仍在但不再“跳眼睛”。

## 7.4 v19.4 课程进度链路修复

- 原通关弹窗只保留了 v17 两关时代的分支：`wonLevel === 1` 才去第二关，任何其他关都进“全部完成”。
- 现在统一为 L1–L15 完成后进入下一关，只有 L16 后显示真正的 16 关课程通关页。
- 16 关终点页同步更新文案，并提供“回关卡地图”与“从第一关再玩一次”。

## 7.5 v19.5 L3–L5 玩法链路与导航热修复

| 反馈 | 根因 | 修复 |
|---|---|---|
| L3 拖到山上永远匹配不上 | `FishPool` 先把鱼复位才回调 `onDrop`；L3 用 `fish.getBoundingClientRect()` 取到的是鱼池原位，不是松手位置 | FishPool 第 4 个回调参数传复位前真实 `dropPoint`；L3 基于此计算最近山，答对后山顶持久绿环 |
| L3 没有“放这里”提示 | L3 的 `onDragMove` 是空实现，误以为可以复用 L1 staff slot 提示 | 拖起 Do/Mi/Sol 时直接高亮其对应色平台；干扰音不高亮；松手清除 |
| L4 不知道何时该打/是否打对 | cue 仅持续 320ms，且反馈只在鼓的局部动画/粒子，没有明确文本规则 | 加入可访问状态卡：等待/现在敲/对上/错敲/漏拍 + 节拍计数；cue 延长到 620ms |
| L5 没有键盘 | 键盘虽已创建且贴底，但 z-index:auto 被 L5 星空背景(`z-index:1`)盖住 | L5 局部键盘规则设 `z-index:2`，低于五线谱、在背景之上 |
| HUD 永远显示第一关、回地图入口语义不清 | main.js 整体覆盖 `window.__forestPiano`，丢失 `LEVEL_META`；徽章用关卡 emoji 伪装为导航 | Game 直接 import `LEVEL_META`；main 保留全局对象；徽章统一为 `🗺️ 回地图 · 第 N 关` |

## 7.6 v20.0 自适应舞台与渐进教学重构

### 全局视觉 / L1–L2

- 横屏移除 stage 左右固定内边距，玩法区域吃满可用宽度；谱区仍保留最小安全边距。
- 键盘白键可以随舞台横向铺满，但唱名/音名移出非等比 SVG，改为 DOM 网格文字，彻底避免字体横向拉伸。
- 五线谱 viewBox 改为接近横屏可用比例并拉开 7 个 slot，短横屏谱区也有足够的实体间距。
- FishPool 尺寸同时依据实际池子高度与宽度，短屏缩小防重叠、大屏可放大到 1.25 倍；不再所有设备一刀切。内部 Fish SVG 现强制跟随参数化 wrapper，修复了“小 wrapper 但 96×72 SVG 仍溢出叠在一起”的旧层级问题。

### L3：听一听，再放一放

- 玩法从 “3 个标有 Do/Mi/Sol 的彩色答案山 + 7 鱼干扰” 改为完整五声音阶 `Do Re Mi Sol La` 的 5 条探索鱼。
- 鱼身和山在匹配前均不显示唱名/音名，也不使用对应色；只能先点击试听，再按高低拖放。
- 拖动未试听鱼不计错；试听后拖动只给当前手指临近山的中性接收环，绝不高亮正确答案。
- 背景 SVG 从 `slice` 改为 `meet`；五座真实 DOM 山热区使用 grid，在竖屏不裁左右且每个目标不小于 44px。

### L4：先学后练

- 第一次进入先看一次不扣分的“泡泡碰到鼓才敲”示范；随后跟亮鼓成功两拍；再进入正式挑战。
- 教学阶段状态卡可见，成功两拍后自动缩为右上角小角标，后续仅用泡泡和亮鼓提示，避免遮挡手机玩法区域。
- 未通关前重新进入会重复教学；已通关玩家直接进入紧凑挑战。

## 8. 真机验收清单 (交给用户)

iPhone 17 Pro / iPad Pro 任一设备：
1. 冷启动（任意朝向）→ 直接看到关卡地图（竖屏不再要求旋转）
2. 点第 1 关 → 三段布局完整：上方五线谱、中间 7 条分散的小鱼（不叠罗汉）、底部钢琴
3. 拖一条鱼到五线谱正确圈圈 → 吸附归位 + 琴键亮起
4. 游戏↻ 重玩、⌂ 直达地图（无确认弹窗）、点 16 格中任意一关可进入
5. 横竖屏来回转 → 内容不消失、鱼重新散开、无需重启
6. 快速连点两个不同 HUD 按钮 → 各自响应（互不吞）
