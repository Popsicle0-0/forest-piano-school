import { SVG_NS } from '../utils/svg.js';

export class Level9Scene {
  constructor(stage) {
    this.stage = stage;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level9-background';
    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 暗黑背景加紫色光晕 -->
        <radialGradient id="neonGlow" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#9b5de5" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#9b5de5" stop-opacity="0" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#neonGlow)" />

        <!-- 装饰星星 -->
        <circle cx="120" cy="80" r="2" fill="rgba(255,255,255,0.6)" class="level9-twinkle" />
        <circle cx="240" cy="60" r="1.5" fill="rgba(255,255,255,0.5)" class="level9-twinkle" />
        <circle cx="660" cy="70" r="2" fill="rgba(255,255,255,0.6)" class="level9-twinkle" />
        <circle cx="580" cy="100" r="1" fill="rgba(255,255,255,0.4)" class="level9-twinkle" />

        <!-- 标题 -->
        <text x="400" y="100" text-anchor="middle" class="level9-title">🖤 黑键世界 🖤</text>
        <text x="400" y="140" text-anchor="middle" class="level9-subtitle">听声, 找黑键</text>
      </svg>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
  }
}
