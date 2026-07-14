/**
 * Level 14 scene: 和弦建造者 (Chord Builder)
 *
 * 视觉: 紫色夜空 + 漂浮星星 + 月亮 + 中央"和弦卡"(鱼形式显示 3 个目标音)
 * - 顶部: 和弦名 + 三个 "🐟" 占位 (Do / Mi / Sol)
 * - 底部: 7 键白键 (PianoKeyboard 接管)
 *
 * 真正的"和弦目标卡"由 Level14.js 渲染.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level14Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level14-background';

    // 漂浮星星
    let starsHtml = '';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const r = 1 + Math.random() * 2.5;
      const delay = Math.random() * 4;
      starsHtml += `<circle class="level14-star" cx="${x}%" cy="${y}%" r="${r}"
                            style="animation-delay: ${delay}s" />`;
    }

    // 月亮
    const moon = `
      <g class="level14-moon">
        <circle cx="680" cy="90" r="46" fill="#fff8dc" />
        <circle cx="696" cy="76" r="42" fill="url(#l14Grad)" />
      </g>
    `;

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <defs>
          <linearGradient id="l14Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3a1a6b" />
            <stop offset="60%" stop-color="#5b2a8a" />
            <stop offset="100%" stop-color="#9b5de5" />
          </linearGradient>
        </defs>

        ${starsHtml}
        ${moon}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level14-title">🎶 和弦建造者 🎶</text>
        <text x="400" y="78" text-anchor="middle" class="level14-subtitle">按顺序点三个音组成和弦</text>
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

export default Level14Scene;
