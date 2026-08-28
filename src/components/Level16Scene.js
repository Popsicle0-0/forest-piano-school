/**
 * Level 16 scene: 节奏速度阶梯 (Rhythm Speed Ladder)
 *
 * 视觉: 暖橙色梯度 + 中央一架"火箭鼓" + 右侧"梯子"显示当前速度
 *   - 速度 BPM 显在梯子上方
 *   - 中央鼓 + 摆杆由 Level16.js 渲染
 *
 * 渲染纯装饰用背景和火箭形状.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level16Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level16-background';

    // 漂浮粒子
    let particlesHtml = '';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const sz = 6 + Math.random() * 12;
      const delay = Math.random() * 5;
      const dur = 4 + Math.random() * 4;
      particlesHtml += `<circle class="level16-particle" cx="${x}%" cy="${y}%" r="${sz}"
                                style="animation-delay: ${delay}s; animation-duration: ${dur}s" />`;
    }

    // 火箭 (右侧梯子上方装饰)
    const rocket = `
      <g class="level16-rocket" transform="translate(680, 110)">
        <path d="M0,-30 L-14,18 L-14,32 L-6,32 L-4,18 L4,18 L6,32 L14,32 L14,18 Z"
              fill="#fff8dc" stroke="#c0392b" stroke-width="2" />
        <circle cx="0" cy="-2" r="6" fill="#457b9d" stroke="#fff8dc" stroke-width="1.5" />
        <path d="M-6,32 L-12,42 M6,32 L12,42 M0,32 L0,44"
              stroke="#ff8c42" stroke-width="3" stroke-linecap="round" />
      </g>
    `;

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <defs>
          <linearGradient id="l16Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3a1a55" />
            <stop offset="45%" stop-color="#c0392b" />
            <stop offset="100%" stop-color="#f4a261" />
          </linearGradient>
        </defs>

        ${particlesHtml}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level16-title">🚀 节奏速度阶梯 🚀</text>
        <text x="400" y="78" text-anchor="middle" class="level16-subtitle">BPM 越爬越高, 看谁能到顶!</text>

        ${rocket}
      </svg>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}

export default Level16Scene;
