# 森林制琴工坊视觉规范（v21）

> **世界观**：森林制琴工坊 / Forest Luthier Atelier
>
> 不是泛森林卡通、通用彩色卡片或 emoji 拼贴。这里是一个由手工纸、胡桃木、河玻璃、黄铜与釉面音符组成的微缩音乐工坊。

## 一句视觉命题

**每一个被弹响的音，都会在森林工坊里留下可触摸的光。**

## 反 AI 味硬规则

1. **结构图标不用 emoji**：导航、设置、声音、地图、功能入口必须使用 `src/utils/icons.js` 的统一 SVG 线条图标；emoji 只允许作为少量内容奖励文本。
2. **一个确定光源**：左上暖光、右下环境阴影。交互物最多使用：顶部高光 + 接触阴影 + 环境投影三层。
3. **材质可解释**：全局只使用纸张、木头、黄铜、河玻璃四种基础材质。禁止无意义的彩色 mesh、无穷光晕、玻璃卡堆叠。
4. **角色身份固定**：Do–Si 外形、配饰、纹样与轻微不对称都由音名 seed 决定；不要重新引入 `Math.random()` 造成每次渲染像新角色。
5. **一屏一个主句**：背景慢、HUD 静、当前玩法物清楚；同一屏最多一个高频反馈动画。
6. **视觉不碰命中层**：装饰层 `pointer-events:none`。真实操作物使用 DOM button 或稳定的 DOM/SVG target，最小触控目标 44px。

## Material token

定义于 `src/style.css`：

```text
--atelier-paper / --atelier-paper-deep
--atelier-wood / --atelier-brass
--atelier-ink / --atelier-shadow
--depth-contact / --depth-raised / --depth-floating
```

组件优先引用这些 token；不要在新组件中随手增加孤立 hex 和阴影。

## 2.5D 技术边界

- 允许：CSS 渐变描述实体表面、轻 `drop-shadow`、SVG 多平面远中近景、短暂 `transform` 压感。
- 不允许：Three.js/WebGL、全屏持续 blur、多层滤镜叠加、透视变形真实命中层、绑定拖拽手指的大范围背景镜头。
- `prefers-reduced-motion` 下环境浮动、路线光流、粒子必须停止或降级；正确/错误仍要以颜色、形状与文字可读。

## 分层协议

```text
0  远景环境 / 材质纹理（绝不接收事件）
1  场景中景
2  关卡目标 / 世界物体
3–10 鱼、琴键、可交互玩法层
12–30 短暂反馈层（pointer-events:none）
40 原生关键热区（例如 L4 drum hit button）
100+ 全屏浮层
```

## 首期实现（v21.0）

- 启动页：纸雕工坊信标，替换 emoji 琴键 Logo。
- 关卡地图：章节化“工坊航线”，替换 16 个同质 emoji 卡片。
- L1/L2：纸张乐谱台、河玻璃鱼池、胡桃木琴键 dock。
- 背景：`Background.js` 提供纸雕远山、木岸、河玻璃、低频水面反光。
- HUD：纸张/黄铜控制条 + 自定义 SVG 系统图标。

## 后续批次

1. **样板完成**：精修 Pip、七音角色、Staff、PianoKeyboard、L1 成功光迹；以 L1 作为所有关卡美术验收样板。
2. **章节场景**：L2–L8（河流/灯塔章节）→ L9–L12（深林工坊）→ L13–L16（回声高塔）。
3. **外围页面**：成就、歌曲、自由演奏、分享、设置迁入同一材质与图标语言。
4. **真机质量关**：iPhone 横竖、iPad 横竖、PWA standalone、reduced-motion、触控命中与性能。

## 当前已知边界

- L1/L2 是 CSS Stack Mode，绝不可让新背景/材质层改变 staff、fish-pool、keyboard-area 的布局高度。
- L3/L7 目标山/台阶的 DOM 几何是玩法判定的一部分；视觉只可作为非交互背景或同尺寸材质皮肤。
- L4 真实点击热区是 `level4-drum-hit-button`，任何鼓皮、波纹、光效必须在其下方或 `pointer-events:none`。
- 发布唯一入口：`bash scripts/deploy.sh --yes "vX.Y: ..."`。它现在用临时 worktree 发布 gh-pages，不得改回源工作区 orphan 流程。
