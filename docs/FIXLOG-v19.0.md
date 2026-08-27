# 🔧 v19.0 — 布局体系完全重写 (手机/iPad 可玩性专项)

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

## 8. 真机验收清单 (交给用户)

iPhone 17 Pro / iPad Pro 任一设备：
1. 冷启动（任意朝向）→ 直接看到关卡地图（竖屏不再要求旋转）
2. 点第 1 关 → 三段布局完整：上方五线谱、中间 7 条分散的小鱼（不叠罗汉）、底部钢琴
3. 拖一条鱼到五线谱正确圈圈 → 吸附归位 + 琴键亮起
4. 游戏↻ 重玩、⌂ 直达地图（无确认弹窗）、点 16 格中任意一关可进入
5. 横竖屏来回转 → 内容不消失、鱼重新散开、无需重启
6. 快速连点两个不同 HUD 按钮 → 各自响应（互不吞）
