/**
 * Level 11 scene: 翻牌记忆 (Memory Match)
 *
 * 视觉: 桃粉 + 奶油色背景, 像童话故事书里的"翻牌找朋友"
 *   - 远处散落一些心形 / 圆点装饰
 *   - 中央一块"翻牌桌" (桃粉)
 *
 * 真正的卡片由 Level11.js 渲染, 不在 Scene 中.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level11Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level11-background';

    // 装饰小圆点
    let dotsHtml = '';
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const r = 2 + Math.random() * 4;
      const delay = Math.random() * 4;
      dotsHtml += `<circle class="level11-dot" cx="${x}%" cy="${y}%" r="${r}"
                          style="animation-delay: ${delay}s" />`;
    }

    // 装饰心
    let heartsHtml = '';
    for (let i = 0; i < 6; i++) {
      const x = 8 + Math.random() * 84;
      const y = 8 + Math.random() * 80;
      const sz = 16 + Math.random() * 14;
      const delay = Math.random() * 5;
      heartsHtml += `<g class="level11-heart" transform="translate(${x}, ${y}) scale(${sz / 30})"
                          style="animation-delay: ${delay}s">
        <path d="M0,-2 C-6,-10 -16,-10 -16,0 C-16,8 -8,16 0,22 C8,16 16,8 16,0 C16,-10 6,-10 0,-2 Z"
              fill="rgba(255,182,193,0.55)" />
      </g>`;
    }

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        ${dotsHtml}
        ${heartsHtml}

        <!-- 标题 -->
        <text x="400" y="58" text-anchor="middle" class="level11-title">🎴 翻牌记忆 🎴</text>
        <text x="400" y="88" text-anchor="middle" class="level11-subtitle">找两个一样的音符朋友</text>
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

export default Level11Scene;