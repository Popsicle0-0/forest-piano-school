/**
 * 小鱼 — 单条 Do/Re/Mi/... 角色
 * - 手绘 SVG 风格:椭圆身体 + 三角尾巴 + 圆眼 + 背鳍 + 鳃线
 * - 身体用 noteMeta.color 上色(支持 var(--fish-xxx))
 * - 肚上大字唱名 + 下方小字音名
 * - 眼睛用 SVG <animate> 做轻微眨眼
 * - 整条鱼 96x72px,±3° 随机旋转赋予个性
 */
import { SVG_NS } from '../utils/svg.js';

export class Fish {
  /**
   * @param {{id:string,solfege:string,pitch:string,note:string,color:string}} noteMeta
   * @returns {HTMLElement} div.fish
   */
  constructor(noteMeta) {
    this.note = noteMeta;
    const el = document.createElement('div');
    el.className = 'fish';
    el.dataset.id = noteMeta.id;
    el.dataset.pitch = noteMeta.pitch;
    el.dataset.color = noteMeta.color;
    el.style.cssText = [
      'width: 96px',
      'height: 72px',
      'touch-action: none',
      '-webkit-user-select: none',
      'user-select: none',
      '-webkit-tap-highlight-color: transparent',
    ].join(';');

    this.el = el;
    this.render();
    return el;
  }

  render() {
    const { color, solfege, pitch } = this.note;
    // 轻微随机旋转,避免 7 条鱼像复制粘贴
    const rot = (Math.random() * 6 - 3).toFixed(1);
    // 随机延迟眨眼,让 7 条不同步
    const blinkOffset = (Math.random() * 2).toFixed(2);

    this.el.innerHTML = `
      <svg xmlns="${SVG_NS}" viewBox="0 0 96 72" width="96" height="72"
           style="display: block; overflow: visible;">
        <g class="fish-body" transform="rotate(${rot} 48 36)">
          <!-- 尾巴(在身体后面) -->
          <path d="M3 36 L20 18 L23 28 L23 44 L20 54 Z"
                style="fill: ${color}; stroke: rgba(0,0,0,0.18); stroke-width: 0.6; stroke-linejoin: round;" />

          <!-- 背鳍 -->
          <path d="M44 14 Q50 4 58 16 Z"
                style="fill: ${color}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;"
                opacity="0.9" />

          <!-- 身体 -->
          <ellipse cx="52" cy="38" rx="32" ry="22"
                   style="fill: ${color}; stroke: rgba(0,0,0,0.2); stroke-width: 0.8;" />

          <!-- 肚白高光 -->
          <ellipse cx="52" cy="46" rx="22" ry="8" fill="rgba(255,255,255,0.32)" />

          <!-- 鳃线 -->
          <path d="M28 30 Q26 38 28 46" fill="none"
                stroke="rgba(0,0,0,0.22)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 嘴巴 -->
          <path d="M82 38 Q85 40 82 42" fill="none"
                stroke="rgba(0,0,0,0.4)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 眼睛 1 (前眼,大) -->
          <ellipse class="fish-eye" cx="70" cy="30" rx="4.5" ry="4.5"
                   fill="white" stroke="rgba(0,0,0,0.5)" stroke-width="0.4">
            <animate attributeName="ry"
                     values="4.5;4.5;0.4;4.5;4.5"
                     keyTimes="0;0.46;0.5;0.54;1"
                     dur="4s" begin="${blinkOffset}s"
                     repeatCount="indefinite" />
          </ellipse>
          <circle class="fish-pupil" cx="70" cy="30" r="2" fill="#1a1a1a" />

          <!-- 眼睛 2 (后眼,小) -->
          <ellipse class="fish-eye" cx="60" cy="30" rx="4" ry="4"
                   fill="white" stroke="rgba(0,0,0,0.5)" stroke-width="0.4">
            <animate attributeName="ry"
                     values="4;4;0.3;4;4"
                     keyTimes="0;0.46;0.5;0.54;1"
                     dur="4s" begin="${(parseFloat(blinkOffset) + 0.15).toFixed(2)}s"
                     repeatCount="indefinite" />
          </ellipse>
          <circle class="fish-pupil" cx="60" cy="30" r="1.7" fill="#1a1a1a" />

          <!-- 大字唱名 (Do/Re/Mi/...) -->
          <text class="fish-label" x="46" y="46"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="22" font-weight="800"
                fill="white" stroke="rgba(0,0,0,0.75)" stroke-width="2.5"
                paint-order="stroke" text-anchor="middle"
                style="pointer-events: none;">${solfege}</text>

          <!-- 小字音名 (C4/D4/...) -->
          <text class="fish-name-en" x="46" y="59"
                font-family="'Nunito', sans-serif"
                font-size="9" font-weight="700"
                fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.55)" stroke-width="0.6"
                paint-order="stroke" text-anchor="middle"
                style="pointer-events: none;">${pitch}</text>
        </g>
      </svg>
    `;
  }
}

export default Fish;
