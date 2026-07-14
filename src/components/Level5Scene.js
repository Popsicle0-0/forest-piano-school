/**
 * Level 5 scene: 星空下的小星星
 *
 * 深蓝→紫黑夜空渐变 + 大量闪烁小星星 + 3 颗旋转大星 + 弯月 + 远树剪影.
 * 自带背景渲染, 不接管 Audio. Game 控制 audio.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level5Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level5-background';

    // 背景星空 (random 闪烁星星)
    let starsHtml = '';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 50;
      const r = 1 + Math.random() * 2;
      const delay = Math.random() * 3;
      starsHtml += `<circle class="level5-stars-tiny" cx="${x}%" cy="${y}%" r="${r}"
                          style="animation-delay: ${delay}s" />`;
    }

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 随机小星星 -->
        ${starsHtml}

        <!-- 新月 -->
        <g class="level5-moon">
          <circle cx="700" cy="80" r="40" fill="#fff8dc" />
          <circle cx="715" cy="68" r="38" fill="#1a1a3a" />
        </g>

        <!-- 闪烁星星 SVG (大颗, 3 个) -->
        <g class="level5-star-big-group">
          <g class="level5-star-big" transform="translate(200, 100)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
          <g class="level5-star-big" transform="translate(450, 60)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
          <g class="level5-star-big" transform="translate(550, 130)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
        </g>

        <!-- 远树剪影 (中景) -->
        <path class="level5-trees" d="M0,500 L0,360 L60,330 L80,360 L100,300 L150,360 L170,330 L210,360 L230,330 L260,360 L800,360 L800,500 Z" />
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
