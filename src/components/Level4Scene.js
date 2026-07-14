/**
 * Level 4 场景: 水底小河 + 中央大鼓
 *
 * 元素:
 *  - 暗色水下渐变背景 (深青 + 墨绿)
 *  - 摇曳水草 (SVG path)
 *  - 河底小石头 (椭圆阴影)
 *  - 中央大鼓 (鼓身 + 鼓面 + 金边 + X 形鼓面扣绳)
 *  - 节拍提示红环 (随节拍闪烁)
 *
 * 节奏泡泡 (.level4-bubble) 是 Level4.js 创建的 DOM, 不归 Scene 管.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level4Scene {
  constructor(stage) {
    this.stage = stage;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level4-background';
    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 远景水草 -->
        <g class="level4-plants-far" opacity="0.55">
          <path class="level4-plant" d="M50,500 Q60,400 55,300 Q50,200 60,150" />
          <path class="level4-plant" d="M150,500 Q160,420 155,350" />
          <path class="level4-plant" d="M780,500 Q770,400 780,320 Q775,250 785,180" />
          <path class="level4-plant" d="M650,500 Q660,420 655,360" />
          <path class="level4-plant" d="M380,500 Q390,440 385,380" />
        </g>

        <!-- 河底小石头 (阴影 + 高光) -->
        <g class="level4-rocks">
          <ellipse cx="200" cy="490" rx="50" ry="8" fill="rgba(0,0,0,0.3)" />
          <ellipse cx="200" cy="487" rx="46" ry="5" fill="rgba(168,218,180,0.25)" />
          <ellipse cx="600" cy="495" rx="60" ry="7" fill="rgba(0,0,0,0.3)" />
          <ellipse cx="600" cy="492" rx="55" ry="4" fill="rgba(168,218,180,0.25)" />
          <ellipse cx="380" cy="492" rx="22" ry="4" fill="rgba(0,0,0,0.35)" />
        </g>

        <!-- 大鼓 (中央偏下). 外层 anchor 处理定位, 内层 wrap 处理点击动画 -->
        <g class="level4-drum-anchor" transform="translate(400 340)">
          <g class="level4-drum-wrap">
            <!-- 鼓底 (椭圆阴影) -->
            <ellipse cx="0" cy="65" rx="115" ry="14" fill="rgba(0,0,0,0.45)" />

            <!-- 鼓身 (圆柱体, 木头色) -->
            <ellipse cx="0" cy="55" rx="120" ry="30" fill="#3d2614" />
            <rect x="-120" y="-45" width="240" height="100" fill="#8b4513" />
            <!-- 鼓身木纹 -->
            <path d="M-120,-20 Q-60,-25 0,-20 T120,-20" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.6" />
            <path d="M-120,15 Q-60,10 0,15 T120,15" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.5" />
            <path d="M-120,40 Q-60,35 0,40 T120,40" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.5" />
            <!-- 鼓身金属环 -->
            <ellipse cx="0" cy="-45" rx="120" ry="28" fill="#deb887" stroke="#8b4513" stroke-width="2" />
            <ellipse cx="0" cy="55" rx="120" ry="30" fill="#5d3a1a" stroke="rgba(0,0,0,0.4)" stroke-width="2" />

            <!-- 鼓面 (顶视, 亮色) -->
            <ellipse cx="0" cy="-45" rx="115" ry="26" fill="#f5deb3" stroke="#8b4513" stroke-width="3" />
            <!-- 鼓面 X 形扣绳 -->
            <g class="level4-drum-lacing" stroke="#5d3a1a" stroke-width="2.5" fill="none">
              <line x1="-90" y1="-25" x2="90" y2="-65" />
              <line x1="-90" y1="-65" x2="90" y2="-25" />
              <!-- 周边小扣 -->
              <circle cx="-95" cy="-30" r="2" fill="#5d3a1a" />
              <circle cx="0" cy="-72" r="2" fill="#5d3a1a" />
              <circle cx="95" cy="-30" r="2" fill="#5d3a1a" />
              <circle cx="0" cy="-18" r="2" fill="#5d3a1a" />
            </g>
            <!-- 金边圈 -->
            <ellipse cx="0" cy="-45" rx="115" ry="26" fill="none" stroke="#ffd700" stroke-width="3" />

            <!-- 鼓面文字 "咚!" -->
            <text x="0" y="-40" text-anchor="middle" class="level4-drum-text">咚</text>
          </g>
        </g>

        <!-- 节拍提示红环 (中央鼓面上方, 与 anchor 同位置) -->
        <g class="level4-cue-anchor" transform="translate(400 295)">
          <circle class="level4-beat-cue" cx="0" cy="0" r="65"
                  fill="none" stroke="#ff5252" stroke-width="5" opacity="0" />
        </g>

        <!-- 鼓两侧装饰气泡 -->
        <g class="level4-deco-bubbles" opacity="0.7">
          <circle cx="180" cy="380" r="6" fill="rgba(255,255,255,0.5)">
            <animate attributeName="cy" values="380;360;340" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="410" r="4" fill="rgba(255,255,255,0.45)">
            <animate attributeName="cy" values="410;380;350" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="620" cy="380" r="6" fill="rgba(255,255,255,0.5)">
            <animate attributeName="cy" values="380;360;340" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="580" cy="410" r="4" fill="rgba(255,255,255,0.45)">
            <animate attributeName="cy" values="410;390;360" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0" dur="4.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  /** 查找节拍提示红环 DOM 引用 */
  getBeatCue() {
    return this.stage ? this.stage.querySelector('.level4-beat-cue') : null;
  }

  /** 查找大鼓 DOM 引用 */
  getDrum() {
    return this.stage ? this.stage.querySelector('.level4-drum-wrap') : null;
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}
