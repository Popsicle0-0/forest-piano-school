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
      'touch-action: manipulation',
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
    // 大幅随机化 — 每条鱼都是独特的角色 (±15° + 大小变化 + 泡泡/腮红变化)
    const rot = (Math.random() * 30 - 15).toFixed(1);   // ±15° (was ±3°)
    const scaleVar = (0.85 + Math.random() * 0.30).toFixed(2);  // 0.85-1.15
    const blinkOffset = (Math.random() * 2).toFixed(2);
    const hasBubble = Math.random() > 0.4;        // 60% 概率有思考泡泡
    const bubbleR = (1.5 + Math.random() * 1.5).toFixed(1);
    const blushOpacity = (0.4 + Math.random() * 0.35).toFixed(2);  // 0.4-0.75

    // 派生同色系的深/浅色(尾巴/背鳍),让身体更有层次
    const shadeHex = (hex, percent) => {
      const m = (hex || '#999').replace('#', '').match(/.{2}/g);
      if (!m) return hex;
      const [r, g, b] = m.map((h) => parseInt(h, 16));
      const adj = (v) => {
        const t = percent < 0 ? 0 : 255;
        const p = Math.abs(percent) / 100;
        return Math.round((t - v) * p + v).toString(16).padStart(2, '0');
      };
      return `#${adj(r)}${adj(g)}${adj(b)}`;
    };
    const colorDarker = shadeHex(color, -25);
    const colorLighter = shadeHex(color, 22);

    // 每条鱼的"体色微调": 在原色基础上再向某个方向轻推,让 7 条 Do/Re/... 看起来颜色相近但不雷同
    const tintDir = Math.floor(Math.random() * 3);   // 0=偏暖 1=偏冷 2=更亮
    const tintAmt = (8 + Math.random() * 8).toFixed(0); // 8~15
    const tintRgb = { r: 0, g: 0, b: 0 };
    if (tintDir === 0) { tintRgb.r = +tintAmt; tintRgb.g = +Math.floor(tintAmt / 2); }
    else if (tintDir === 1) { tintRgb.b = +tintAmt; tintRgb.g = +Math.floor(tintAmt / 2); }
    else { tintRgb.r = +Math.floor(tintAmt / 2); tintRgb.g = +Math.floor(tintAmt / 2); tintRgb.b = +Math.floor(tintAmt / 2); }
    const origMatch = (color || '#999999').replace('#', '').match(/.{2}/g);
    let bodyColor = color;
    if (origMatch) {
      const [r0, g0, b0] = origMatch.map((h) => parseInt(h, 16));
      bodyColor = '#' + [r0 + tintRgb.r, g0 + tintRgb.g, b0 + tintRgb.b]
        .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
        .join('');
    }
    const bodyDarker = shadeHex(bodyColor, -25);
    const bodyLighter = shadeHex(bodyColor, 22);

    // 鱼在水里游 → 画 1~2 颗身后小水泡 (浮到画面外结束)
    const trailBubbleCount = Math.random() > 0.5 ? 2 : 1;
    const trailBubbles = Array.from({ length: trailBubbleCount }).map((_, i) => {
      const rad = (1.5 + Math.random() * 1.2).toFixed(1);
      const x = -6 - i * 5;     // 在鱼身后
      const y = 32 + (i % 2 === 0 ? 0 : 6);
      const dur = (2.4 + Math.random() * 1.6).toFixed(2);
      const begin = (Math.random() * 2).toFixed(2);
      return `
        <circle cx="${x}" cy="${y}" r="${rad}" fill="rgba(255,255,255,0.55)">
          <animate attributeName="cy" from="${y}" to="${y - 18}" dur="${dur}s"
                   begin="${begin}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1"
                   dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
        </circle>`;
    }).join('');

    this.el.innerHTML = `
      <svg xmlns="${SVG_NS}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${rot} 48 36) scale(${scaleVar})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${trailBubbles}

          ${hasBubble ? `<!-- 思考泡泡 (60% 鱼有,大小也随机) -->
          <circle cx="78" cy="10" r="${bubbleR}" fill="rgba(255,255,255,0.85)"
                  stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />
          <circle cx="84" cy="5" r="${(bubbleR * 0.5).toFixed(1)}" fill="rgba(255,255,255,0.75)" />` : ''}

          <!-- 尾巴 (更圆润,带条纹) -->
          <path d="M2 36 Q8 20 22 28 L24 38 L24 42 L22 56 Q8 52 2 36 Z"
                style="fill: ${bodyDarker}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
          <path d="M14 28 L18 24 M14 52 L18 56"
                style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />

          <!-- 背鳍 (圆角三角帽) -->
          <path d="M36 18 Q44 4 52 18 Z"
                style="fill: ${bodyLighter}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;" />

          <!-- 身体 (微调过的色) -->
          <ellipse cx="50" cy="38" rx="32" ry="22"
                   style="fill: ${bodyColor}; stroke: rgba(0,0,0,0.22); stroke-width: 0.9;" />

          <!-- 肚白高光 (大肚皮) -->
          <ellipse cx="50" cy="50" rx="22" ry="9" fill="rgba(255,255,255,0.42)" />

          <!-- 闪光鳞片 (波浪装饰) -->
          <path d="M40 32 Q44 28 48 32 M52 28 Q56 24 60 28 M62 28 Q66 24 70 28"
                stroke="rgba(255,255,255,0.55)" stroke-width="0.7" fill="none" stroke-linecap="round" />

          <!-- 鳃线 -->
          <path d="M28 32 Q26 40 28 48" fill="none"
                stroke="rgba(0,0,0,0.28)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${blushOpacity})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 1 (前眼,大 + 双高光) -->
          <ellipse class="fish-eye" cx="68" cy="32" rx="5.5" ry="6"
                   fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">
            <animate attributeName="ry"
                     values="6;6;0.4;6;6"
                     keyTimes="0;0.46;0.5;0.54;1"
                     dur="3.6s" begin="${blinkOffset}s"
                     repeatCount="indefinite" />
          </ellipse>
          <circle class="fish-pupil" cx="68" cy="32" r="2.5" fill="#1a1a1a" />
          <circle cx="69.5" cy="30" r="1.3" fill="white" />
          <circle cx="66.5" cy="33.5" r="0.6" fill="rgba(255,255,255,0.8)" />

          <!-- 眼睛 2 (后眼,小 + 高光) -->
          <ellipse class="fish-eye" cx="56" cy="32" rx="4" ry="4.5"
                   fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">
            <animate attributeName="ry"
                     values="4.5;4.5;0.3;4.5;4.5"
                     keyTimes="0;0.46;0.5;0.54;1"
                     dur="3.6s" begin="${(parseFloat(blinkOffset) + 0.15).toFixed(2)}s"
                     repeatCount="indefinite" />
          </ellipse>
          <circle class="fish-pupil" cx="56" cy="32" r="1.8" fill="#1a1a1a" />
          <circle cx="57.2" cy="30.5" r="0.9" fill="white" />

          <!-- 大字唱名 (Do/Re/Mi/...) -->
          <text class="fish-label" x="44" y="48"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="20" font-weight="900"
                fill="white" stroke="rgba(0,0,0,0.7)" stroke-width="2.5"
                paint-order="stroke" text-anchor="middle"
                style="pointer-events: none;">${solfege}</text>

          <!-- 小字音名 (C4/D4/...) -->
          <text class="fish-name-en" x="44" y="60"
                font-family="'Nunito', sans-serif"
                font-size="8" font-weight="700"
                fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.5)" stroke-width="0.5"
                paint-order="stroke" text-anchor="middle"
                style="pointer-events: none;">${pitch}</text>
        </g>
      </svg>
    `;
  }
}

export default Fish;
