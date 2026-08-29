/**
 * Level 12 scene: 节拍器厨房 (Tempo Challenge)
 *
 * 视觉: 暖橘红渐变, 像厨房里的番茄 + 切菜板
 *   - 中央一台节拍器 (摆杆)
 *   - 周围漂浮小番茄 / 洋葱 / 切菜板装饰
 *
 * 真正的节拍器 SVG + 切菜板 由 Level12.js 渲染.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level12Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level12-background';

    // 漂浮番茄 / 蔬菜
    let veggiesHtml = '';
    const veggies = ['🍅', '🧅', '🥕', '🥒', '🌽', '🍅', '🧄'];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const sz = 22 + Math.random() * 22;
      const delay = Math.random() * 5;
      const v = veggies[i % veggies.length];
      veggiesHtml += `<g class="level12-veggie" transform="translate(${x}%, ${y}%) scale(${sz / 30})"
                           style="animation-delay: ${delay}s">
        <text text-anchor="middle" dominant-baseline="middle" font-size="30">${v}</text>
      </g>`;
    }

    // 切菜板影子 (装饰)
    const cuttingBoard = `
      <g class="level12-board-shadow" transform="translate(400, 440)">
        <ellipse cx="0" cy="0" rx="240" ry="22" fill="rgba(139, 90, 43, 0.4)" />
        <rect x="-220" y="-40" width="440" height="36" rx="8" fill="#a0673a" />
        <rect x="-220" y="-40" width="440" height="6" rx="3" fill="#c08a55" opacity="0.7" />
      </g>
    `;

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        ${veggiesHtml}
        ${cuttingBoard}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level12-title">🥁 番茄节奏 🥁</text>
        <text x="400" y="80" text-anchor="middle" class="level12-subtitle">跟着摆杆切菜~</text>
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

export default Level12Scene;