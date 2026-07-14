/**
 * Level 3 scene: 五声音阶山谷
 *
 * 自带背景渲染, 不接管 Audio. Game 控制 audio.
 * 3 座山 (Do 在谷底, Mi 在山坡, Sol 在山顶) + 远山 + 河 + 太阳 + 浮动手势符号.
 *
 * 增强:
 *  - 每个平台顶部加彩色色块提示 (Do 红 / Mi 黄 / Sol 蓝), 孩子一眼能看出 "这座山收什么音"
 *  - 增加日落渐变遮罩层 .level3-sunset-overlay, 由 Level3.js 动态加 .progress-N class
 *    触发从亮黄到紫橙的过渡
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

        <!-- 3 个音阶台 (从低到高) — 顶部色块 + 平台身色提示 (Do 红, Mi 黄, Sol 蓝) -->
        <g class="level3-platforms">
          <!-- Do (低) -->
          <g class="level3-platform" data-note="do">
            <ellipse cx="180" cy="370" rx="60" ry="10" class="level3-platform-base" />
            <rect x="160" y="320" width="40" height="50" class="level3-platform-body level3-platform-body--do" />
            <rect x="155" y="316" width="50" height="8" class="level3-platform-top level3-platform-top--do" />
            <!-- 色块提示 (贴在平台身内) -->
            <rect x="170" y="328" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--do" />
            <text x="180" y="350" text-anchor="middle" class="level3-platform-label">Do</text>
          </g>

          <!-- Mi (中) -->
          <g class="level3-platform" data-note="mi">
            <ellipse cx="400" cy="280" rx="60" ry="10" class="level3-platform-base" />
            <rect x="380" y="220" width="40" height="60" class="level3-platform-body level3-platform-body--mi" />
            <rect x="375" y="216" width="50" height="8" class="level3-platform-top level3-platform-top--mi" />
            <rect x="390" y="228" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--mi" />
            <text x="400" y="255" text-anchor="middle" class="level3-platform-label">Mi</text>
          </g>

          <!-- Sol (高) -->
          <g class="level3-platform" data-note="sol">
            <ellipse cx="620" cy="180" rx="60" ry="10" class="level3-platform-base" />
            <rect x="600" y="110" width="40" height="70" class="level3-platform-body level3-platform-body--sol" />
            <rect x="595" y="106" width="50" height="8" class="level3-platform-top level3-platform-top--sol" />
            <rect x="610" y="118" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--sol" />
            <text x="620" y="150" text-anchor="middle" class="level3-platform-label">Sol</text>
          </g>
        </g>

        <!-- 浮动手势符号 (柯尔文 do 立掌) -->
        <g class="level3-hand-gesture">
          <text x="400" y="50" text-anchor="middle" class="level3-hand-text">&#9995;</text>
        </g>
      </svg>

      <!-- 日落渐变遮罩 — 由 .progress-N 控制颜色 (初始 .progress-0) -->
      <div class="level3-sunset-overlay level3-progress-0"></div>

      <!-- 答对粒子绽放层 (DOM 注入由 Level3.js 触发) -->
      <div class="level3-bloom-layer"></div>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  /** 设置当前进度 (0/1/2/3), 触发日落渐变过渡 */
  setProgress(count) {
    if (!this.background) return;
    const overlay = this.background.querySelector('.level3-sunset-overlay');
    if (!overlay) return;
    overlay.classList.remove('level3-progress-0', 'level3-progress-1', 'level3-progress-2', 'level3-progress-3');
    overlay.classList.add(`level3-progress-${Math.min(Math.max(count, 0), 3)}`);
  }

  /** 在指定 (相对背景) 坐标触发粒子绽放 */
  bloomAt(clientX, clientY, color = '#ffd166') {
    if (!this.background) return;
    const layer = this.background.querySelector('.level3-bloom-layer');
    if (!layer) return;
    const rect = this.background.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // 创建 12 个小光斑 DOM, 各自做扩散动画
    const N = 12;
    for (let i = 0; i < N; i++) {
      const sp = document.createElement('div');
      sp.className = 'level3-bloom-sparkle';
      sp.style.left = x + 'px';
      sp.style.top = y + 'px';
      sp.style.background = color;
      const angle = (Math.PI * 2 * i) / N;
      const dist = 60 + Math.random() * 40;
      sp.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      sp.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      sp.style.animationDelay = (Math.random() * 0.08).toFixed(2) + 's';
      layer.appendChild(sp);
      // 移除
      setTimeout(() => { try { sp.remove(); } catch (_) {} }, 1100);
    }
  }

  /** 让 3 座山一起抖动 (distractor 提示) */
  shakePlatforms() {
    if (!this.background) return;
    const els = this.background.querySelectorAll('.level3-platform');
    els.forEach((el) => {
      el.classList.remove('level3-shake');
      // 强制 reflow, 重启动画
      void el.offsetWidth;
      el.classList.add('level3-shake');
      setTimeout(() => el.classList.remove('level3-shake'), 500);
    });
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}

export default Level3Scene;