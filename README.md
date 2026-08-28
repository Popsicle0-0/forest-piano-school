# 🎹 森林钢琴学校 / Forest Piano School

> 面向 5-10 岁儿童的**钢琴启蒙**互动网页 — 纯前端 Vite 应用，iPad/iPhone 优先。

[![正式站](https://img.shields.io/badge/正式站-piano.hrc.ac.cn-brightgreen)](https://piano.hrc.ac.cn)
[![备用站](https://img.shields.io/badge/GitHub%20Pages-备用-blue)](https://popsicle0-0.github.io/forest-piano-school/)

## 项目介绍

7 条住在河里的小鱼(Do Re Mi Fa Sol La Si)等待一只叫 Pip 的小鸟帮助它们找到钢琴上
对应的家。第一关把小鱼拖到五线谱正确位置,即可认识 C 大调 7 个白键。

## 设计哲学

- **教学法**: Kodály(首调唱名 + 柯尔文手势) + Suzuki(先听后读)
- **儿童友好**: 零惩罚反馈、莫兰迪色板、纸纹质感、弹性动画
- **iPad 优先**: Pointer Events 多触点、AudioContext 用户手势解锁

## 技术栈

- 原生 JS + Vite
- GSAP(动画) + Tone.js(钢琴采样) + canvas-confetti
- 全部素材手绘 SVG,无外部位图依赖

## 本地开发

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
npm run preview  # 预览构建产物
```

## 部署

正式站：**https://piano.hrc.ac.cn**

- 源码与备用站：GitHub `main` / `gh-pages`
- 正式静态文件：阿里云 OSS（中国香港）
- DNS 与 HTTPS：Cloudflare

日常发布由维护者执行一条命令：

```bash
bash scripts/deploy.sh --yes "vX.Y: 改动摘要"
```

它会构建 `dist/`、更新 GitHub Pages 备用站，并自动同步到 OSS 正式站。
完整的域名、凭证安全、新电脑接手和故障排查见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。

## 关卡

| # | 名称 | 状态 |
|---|---|---|
| 1 | 小鱼跳进五线谱 (Do Re Mi Fa Sol La Si 位置) | ✅ MVP |
| 2 | 听音找鱼 | ⏳ 规划中 |
| 3 | 五声音阶 + 柯尔文手势 | ⏳ |
| 4 | 节奏小河 | ⏳ |
| 5 | 跟着小河弹一弹 | ⏳ |
| ... | 共 8 关 | ⏳ |

详见 `docs/design-v2.md`。

## 素材许可

- 钢琴采样: Salamander Grand Piano (CC BY 3.0, Alexander Holm)
- 音效: Web Audio API 合成(零依赖)
- 所有视觉素材: 本项目自绘 SVG
