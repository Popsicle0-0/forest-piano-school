/**
 * Level 3 scene: 五声音阶山谷
 *
 * 自带背景渲染, 不接管 Audio. Game 控制 audio.
 * 3 座山 (Do 在谷底, Mi 在山坡, Sol 在山顶) + 远山 + 河 + 太阳 + 浮动手势符号.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level3Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level3-background';
    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 太阳 (右上角) -->
        <circle cx="650" cy="100" r="55" class="level3-sun" />

        <!-- 飞鸟剪影 (远景点缀) -->
        <path class="level3-bird" d="M120,90 q6,-6 12,0 q6,-6 12,0" />
        <path class="level3-bird" d="M260,60 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-bird" d="M460,75 q5,-5 10,0 q5,-5 10,0" />

        <!-- 远山 3 层 -->
        <path class="level3-mountain level3-mountain-far"
              d="M0,300 L150,150 L250,220 L380,80 L500,200 L640,140 L800,250 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-mid"
              d="M0,360 L100,260 L220,300 L350,200 L480,290 L620,240 L800,310 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-near"
              d="M0,420 L80,360 L210,380 L350,310 L490,370 L640,340 L800,400 L800,500 L0,500 Z" />

        <!-- 河 -->
        <path class="level3-river" d="M0,440 Q200,420 400,440 T800,430 L800,500 L0,500 Z" />

        <!-- 3 个音阶台 (从低到高) -->
        <g class="level3-platforms">
          <!-- Do (低) -->
          <g class="level3-platform" data-note="do">
            <ellipse cx="180" cy="370" rx="60" ry="10" class="level3-platform-base" />
            <rect x="160" y="320" width="40" height="50" class="level3-platform-body" />
            <rect x="155" y="316" width="50" height="8" class="level3-platform-top" />
            <text x="180" y="350" text-anchor="middle" class="level3-platform-label">Do</text>
          </g>

          <!-- Mi (中) -->
          <g class="level3-platform" data-note="mi">
            <ellipse cx="400" cy="280" rx="60" ry="10" class="level3-platform-base" />
            <rect x="380" y="220" width="40" height="60" class="level3-platform-body" />
            <rect x="375" y="216" width="50" height="8" class="level3-platform-top" />
            <text x="400" y="255" text-anchor="middle" class="level3-platform-label">Mi</text>
          </g>

          <!-- Sol (高) -->
          <g class="level3-platform" data-note="sol">
            <ellipse cx="620" cy="180" rx="60" ry="10" class="level3-platform-base" />
            <rect x="600" y="110" width="40" height="70" class="level3-platform-body" />
            <rect x="595" y="106" width="50" height="8" class="level3-platform-top" />
            <text x="620" y="150" text-anchor="middle" class="level3-platform-label">Sol</text>
          </g>
        </g>

        <!-- 浮动手势符号 (柯尔文 do 立掌) -->
        <g class="level3-hand-gesture">
          <text x="400" y="50" text-anchor="middle" class="level3-hand-text">&#9995;</text>
        </g>
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

export default Level3Scene;