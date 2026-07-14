/**
 * Level 15 scene: 视奏大师 (Sight Reading Pro)
 *
 * 视觉: 蓝灰色调 + 五线谱 + 远处隐约山形 + 中央一颗大音符
 *   - 五线谱 background + cleff + 中央音符由 Level15.js 渲染
 *
 * 不接管 Audio — Game 自行驱动.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level15Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level15-background';

    // 远处山形剪影 (3 层)
    const mountains = `
      <g class="level15-mountain-far">
        <path d="M0,500 L0,400 L100,360 L200,400 L320,350 L420,400 L560,360 L680,400 L800,370 L800,500 Z"
              fill="rgba(30, 60, 95, 0.4)" />
      </g>
      <g class="level15-mountain-mid">
        <path d="M0,500 L0,440 L80,400 L180,440 L300,410 L380,440 L520,400 L640,440 L760,410 L800,430 L800,500 Z"
              fill="rgba(50, 100, 140, 0.5)" />
      </g>
    `;

    // 漂浮音符装饰
    let notesHtml = '';
    const symbols = ['♪', '♫', '♬', '🎵'];
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const sz = 16 + Math.random() * 22;
      const delay = Math.random() * 6;
      const sym = symbols[i % symbols.length];
      notesHtml += `<text x="${x}%" y="${y}%" class="level15-note-deco"
                          style="font-size: ${sz}px; animation-delay: ${delay}s">${sym}</text>`;
    }

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <defs>
          <linearGradient id="l15Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0e1e3a" />
            <stop offset="55%" stop-color="#1e3a5f" />
            <stop offset="100%" stop-color="#457b9d" />
          </linearGradient>
        </defs>

        ${notesHtml}
        ${mountains}

        <!-- 标题 -->
        <text x="400" y="46" text-anchor="middle" class="level15-title">🎼 视奏大师 🎼</text>
        <text x="400" y="74" text-anchor="middle" class="level15-subtitle">看谱 → 按键 — 越对越快</text>
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

export default Level15Scene;
