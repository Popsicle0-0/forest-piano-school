/**
 * Level 10 scene: 八度双键盘 (Octave)
 *
 * 视觉: 一个深紫蓝夜空 + 远星 + 中间一个大钢琴 (2 个八度)
 *   - 底部"低八度"用暖色 (橙红) 标识
 *   - 顶部"高八度"用冷色 (蓝紫) 标识
 *   - 中间一条虚线分隔
 *
 * Scene 只负责背景与静态装饰. 真正的交互键盘与游戏状态由 Level10.js 注入.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level10Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level10-background';

    // 背景小星星 (40 颗)
    let starsHtml = '';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 60;
      const r = 1 + Math.random() * 2;
      const delay = Math.random() * 3;
      starsHtml += `<circle class="level10-twinkle" cx="${x}%" cy="${y}%" r="${r}"
                          style="animation-delay: ${delay}s" />`;
    }

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 月亮 -->
        <circle class="level10-moon" cx="700" cy="80" r="36" fill="#fff8dc" opacity="0.9" />
        <circle cx="713" cy="70" r="33" fill="#1a1a3a" />

        <!-- 装饰小星 -->
        ${starsHtml}

        <!-- 标题 -->
        <text x="400" y="62" text-anchor="middle" class="level10-title">🎹 八度之旅 🎹</text>
        <text x="400" y="92" text-anchor="middle" class="level10-subtitle">听音, 选低或高</text>

        <!-- 远山剪影 -->
        <path class="level10-mountains"
              d="M0,500 L0,420 L80,360 L150,400 L240,330 L320,390 L420,310 L520,380 L620,330 L720,400 L800,360 L800,500 Z" />
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

export default Level10Scene;