/**
 * 小鱼 — 单条 Do/Re/Mi/... 角色
 * - 手绘 SVG 风格:椭圆身体 + 多种尾巴 + 圆眼 + 背鳍 + 鳃线
 * - 身体用 noteMeta.color 上色(支持 var(--fish-xxx))
 * - 肚上大字唱名 + 下方小字音名
 * - 眼睛用 SVG <animate> 做轻微眨眼
 * - 整条鱼 96x72px,±15° 随机旋转 + 个性化尾巴/眼睛/泡泡/雀斑/侧鳍/配饰
 *
 * 每个 solfege (Do/Re/Mi/Fa/Sol/La/Si) 都有独特性格:
 *   Do  - 分叉尾,自信(小点 ̈_̈)+ 头顶小蝴蝶结,2 颗泡泡
 *   Re  - 圆尾,好奇(圆眼),1 颗泡泡
 *   Mi  - 尖尾,坚定(窄眼)+ 小帽子,2 颗泡泡
 *   Fa  - 波浪尾,害羞(闭眼),1 颗泡泡
 *   Sol - 铲形尾,大笑(眯眼)+ 小皇冠,3 颗泡泡
 *   La  - 羽毛尾,惊讶(大眼)+ 小耳环,2 颗泡泡
 *   Si  - 裂尾,酷(半闭眼),1 颗泡泡
 */
import { SVG_NS } from '../utils/svg.js';

// 每条鱼的尾巴路径 (d 属性, viewBox 0 0 96 72,鱼头在右)
const TAIL_PATHS = {
  do:  { main: 'M2,36 L24,18 L20,30 L20,42 L24,54 Z', stripes: 'M10,30 L16,24 M10,42 L16,48' },                                   // 分叉
  re:  { main: 'M2,36 Q22,18 24,36 Q22,54 2,36 Z',           stripes: 'M8,30 Q14,28 18,32 M8,42 Q14,44 18,40' },                  // 圆尾
  mi:  { main: 'M2,36 L26,20 L26,52 Z',                       stripes: 'M8,32 L22,28 M8,40 L22,44' },                            // 尖尾
  fa:  { main: 'M2,36 Q8,30 14,34 Q20,28 24,36 Q20,44 14,38 Q8,42 2,36 Z', stripes: 'M6,36 Q10,34 14,36 M14,36 Q18,34 22,36' },   // 波浪
  sol: { main: 'M2,36 L18,28 L22,34 L26,28 L26,44 L22,40 L18,46 Z', stripes: 'M10,34 L16,32 M10,38 L16,40' },                    // 铲形
  la:  { main: 'M2,36 L24,24 L20,32 L24,40 L2,36 Z M8,28 L18,28 M8,36 L18,36 M8,44 L18,44', stripes: 'M4,30 L10,30 M4,36 L10,36 M4,42 L10,42' }, // 羽毛
  si:  { main: 'M2,36 Q12,28 18,36 Q24,44 2,36 Q12,30 8,38 Z', stripes: 'M6,34 L14,34 M6,38 L14,38' },                          // 裂尾
};

// 每条鱼的眼睛性格
const EYE_STYLES = {
  do:  { front: { rx: 5.5, ry: 6,  pupil: 2.5 }, back: { rx: 4,   ry: 4.5, pupil: 1.8 }, extra: 'eyelashes' },     // 自信 ̈_̈
  re:  { front: { rx: 6,   ry: 6.5, pupil: 3 },   back: { rx: 4.5, ry: 5,   pupil: 2.2 }, extra: 'round' },        // 好奇
  mi:  { front: { rx: 5.5, ry: 3.5, pupil: 2.4 }, back: { rx: 4,   ry: 2.5, pupil: 1.8 }, extra: 'narrow' },       // 坚定
  fa:  { front: { rx: 5.5, ry: 0.5, pupil: 0 },   back: { rx: 4,   ry: 0.4, pupil: 0 },   extra: 'closed' },       // 害羞闭眼
  sol: { front: { rx: 5.5, ry: 4,   pupil: 2.2 }, back: { rx: 4,   ry: 3,   pupil: 1.6 }, extra: 'squint' },       // 大笑眯眼
  la:  { front: { rx: 7,   ry: 8,   pupil: 3.2 }, back: { rx: 5,   ry: 5.5, pupil: 2.4 }, extra: 'surprised' },    // 惊讶
  si:  { front: { rx: 5.5, ry: 3,   pupil: 2.4 }, back: { rx: 4,   ry: 2,   pupil: 1.8 }, extra: 'cool' },         // 酷
};

// 每条鱼的思考泡泡数量 (1, 2 或 3)
const BUBBLE_COUNTS = {
  do: 2, re: 1, mi: 2, fa: 1, sol: 3, la: 2, si: 1,
};

// 每条鱼的"配饰" (除了表情之外的额外装饰)
//   do  - 头顶蝴蝶结; mi - 帽子; sol - 皇冠; la - 耳环
//   re/fa/si 默认无配饰
const ACCESSORY_TYPES = {
  do: 'bow', mi: 'hat', sol: 'crown', la: 'earring',
};

// 简单的 mulberry32 PRNG — 让雀斑位置在重新渲染前保持稳定
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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
    const { id, color, solfege, pitch } = this.note;
    const idKey = (id || 'do').toLowerCase();

    // 大幅随机化 — 每条鱼都是独特的角色 (±15° + 大小变化 + 泡泡/腮红变化)
    const rot = (Math.random() * 30 - 15).toFixed(1);
    const scaleVar = (0.85 + Math.random() * 0.30).toFixed(2);
    const blinkOffset = (Math.random() * 2).toFixed(2);
    const hasBubble = Math.random() > 0.4;        // 60% 概率有思考泡泡
    const bubbleR = (1.5 + Math.random() * 1.5).toFixed(1);
    const blushOpacity = (0.4 + Math.random() * 0.35).toFixed(2);

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

    // 每条鱼的"体色微调"
    const tintDir = Math.floor(Math.random() * 3);
    const tintAmt = (8 + Math.random() * 8).toFixed(0);
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

    // 鱼身后小水泡 (trail)
    const trailBubbleCount = Math.random() > 0.5 ? 2 : 1;
    const trailBubbles = Array.from({ length: trailBubbleCount }).map((_, i) => {
      const rad = (1.5 + Math.random() * 1.2).toFixed(1);
      const x = -6 - i * 5;
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

    // ===== 个性化元素 =====

    // A. 尾巴 (按 note.id 切换)
    const tailKey = TAIL_PATHS[idKey] ? idKey : 'do';
    const tail = TAIL_PATHS[tailKey];
    const tailSvg = `
      <path d="${tail.main}"
            style="fill: ${bodyDarker}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
      <path d="${tail.stripes}"
            style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />`;

    // B. 眼睛 (按 note.id 切换)
    const eyeKey = EYE_STYLES[idKey] ? idKey : 'do';
    const eye = EYE_STYLES[eyeKey];
    const eyeFrontX = 68, eyeFrontY = 32;
    const eyeBackX = 56, eyeBackY = 32;

    // 眼睛眨眼动画 — 闭眼的鱼(fa)直接画细线,不动画
    const blinkFront = eye.extra === 'closed'
      ? ''
      : `<animate attributeName="ry"
                 values="${eye.front.ry};${eye.front.ry};0.4;${eye.front.ry};${eye.front.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${blinkOffset}s"
                 repeatCount="indefinite" />`;
    const blinkBack = eye.extra === 'closed'
      ? ''
      : `<animate attributeName="ry"
                 values="${eye.back.ry};${eye.back.ry};0.3;${eye.back.ry};${eye.back.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${(parseFloat(blinkOffset) + 0.15).toFixed(2)}s"
                 repeatCount="indefinite" />`;

    // 特殊装饰: 自信(Do)=眼下方两个小点 ̈_̈; 惊讶(La)=下方小弧线; 酷(Si)=单线眉
    let eyeExtras = '';
    if (eye.extra === 'eyelashes') {
      // Do ̈_̈ — 两个小点表示"自信下垂眼"
      eyeExtras = `
        <circle cx="66" cy="38" r="0.6" fill="#1a1a1a" />
        <circle cx="70" cy="38" r="0.6" fill="#1a1a1a" />`;
    } else if (eye.extra === 'surprised') {
      // La O_O — 眼睛下方一道小弧线表达惊讶张嘴
      eyeExtras = `<ellipse cx="68" cy="44" rx="1.2" ry="0.6" fill="rgba(0,0,0,0.5)" />`;
    } else if (eye.extra === 'cool') {
      // Si ¬_¬ — 半闭眼上方一条横线
      eyeExtras = `<path d="M62,28 L74,28" stroke="rgba(0,0,0,0.65)" stroke-width="0.7" stroke-linecap="round" />`;
    } else if (eye.extra === 'squint') {
      // Sol >_< — 眯眼旁两道笑纹
      eyeExtras = `
        <path d="M62,38 Q64,40 66,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M72,38 Q74,40 76,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />`;
    }

    // 闭眼画细线而非椭圆
    const frontEyeShape = eye.extra === 'closed'
      ? `<path d="M${eyeFrontX - eye.front.rx},${eyeFrontY} Q${eyeFrontX},${eyeFrontY - 0.6} ${eyeFrontX + eye.front.rx},${eyeFrontY}"
             stroke="rgba(0,0,0,0.7)" stroke-width="1.1" fill="none" stroke-linecap="round" />`
      : `<ellipse class="fish-eye" cx="${eyeFrontX}" cy="${eyeFrontY}" rx="${eye.front.rx}" ry="${eye.front.ry}"
                 fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">${blinkFront}</ellipse>`;
    const backEyeShape = eye.extra === 'closed'
      ? `<path d="M${eyeBackX - eye.back.rx},${eyeBackY} Q${eyeBackX},${eyeBackY - 0.4} ${eyeBackX + eye.back.rx},${eyeBackY}"
             stroke="rgba(0,0,0,0.6)" stroke-width="0.9" fill="none" stroke-linecap="round" />`
      : `<ellipse class="fish-eye" cx="${eyeBackX}" cy="${eyeBackY}" rx="${eye.back.rx}" ry="${eye.back.ry}"
                 fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">${blinkBack}</ellipse>`;

    // 瞳孔与高光(闭眼没有)
    const frontPupil = eye.extra === 'closed'
      ? ''
      : `<circle class="fish-pupil" cx="${eyeFrontX}" cy="${eyeFrontY}" r="${eye.front.pupil}" fill="#1a1a1a" />
         <circle cx="${eyeFrontX + 1.5}" cy="${eyeFrontY - 2}" r="1.3" fill="white" />
         <circle cx="${eyeFrontX - 1.5}" cy="${eyeFrontY + 1.5}" r="0.6" fill="rgba(255,255,255,0.8)" />`;
    const backPupil = eye.extra === 'closed'
      ? ''
      : `<circle class="fish-pupil" cx="${eyeBackX}" cy="${eyeBackY}" r="${eye.back.pupil}" fill="#1a1a1a" />
         <circle cx="${eyeBackX + 1.2}" cy="${eyeBackY - 1.5}" r="0.9" fill="white" />`;

    const eyesSvg = `
      ${backEyeShape}${backPupil}
      ${frontEyeShape}${frontPupil}
      ${eyeExtras}`;

    // C. 思考泡泡 (1, 2, 或 3 颗,按 note.id 决定数量)
    const thinkBubbleCount = BUBBLE_COUNTS[idKey] || 1;
    let thinkBubbles = '';
    if (hasBubble) {
      // 三颗泡泡按对角线排列 (右上 → 左下),大小递减
      const bubblePositions = [
        { x: 78, y: 10, r: parseFloat(bubbleR) },
        { x: 84, y: 4,  r: parseFloat(bubbleR) * 0.55 },
        { x: 88, y: 0,  r: parseFloat(bubbleR) * 0.32 },
      ];
      const visible = bubblePositions.slice(0, thinkBubbleCount);
      thinkBubbles = visible.map((b, i) =>
        `<circle cx="${b.x}" cy="${b.y}" r="${b.r.toFixed(1)}"
                 fill="rgba(255,255,255,${(0.85 - i * 0.12).toFixed(2)})"
                 stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />`
      ).join('');
    }

    // D. 雀斑/小点 — 3~5 个深色小圆 (随机种子基于 note.id 让位置稳定)
    const seedFromId = (id || 'do').split('').reduce((s, ch) => s + ch.charCodeAt(0), 0);
    const rng = mulberry32(seedFromId * 73 + 17);
    const freckleCount = 3 + Math.floor(rng() * 3);  // 3-5
    // 雀斑中心区在身体范围内 (cx 30~70, cy 30~46),避开眼睛
    const freckles = Array.from({ length: freckleCount }).map(() => {
      const fx = (32 + rng() * 36).toFixed(1);
      const fy = (30 + rng() * 16).toFixed(1);
      const fr = (0.5 + rng() * 0.9).toFixed(2);
      // 跳过眼睛区域 (60~72, 28~36)
      const x = parseFloat(fx), y = parseFloat(fy);
      if (x > 60 && x < 72 && y > 28 && y < 36) return '';
      return `<circle cx="${fx}" cy="${fy}" r="${fr}" fill="rgba(0,0,0,0.42)" />`;
    }).join('');

    // E. 侧鳍 (一片或两片,随鱼摇摆动画)
    const finSwayDur = (2.0 + Math.random() * 1.0).toFixed(2);
    const finSwayBegin = (Math.random() * 1).toFixed(2);
    // 上侧鳍 (在背鳍前下方)
    const topFin = `
      <path d="M40,22 Q34,18 32,24 Q36,26 40,26 Z"
            style="fill: ${bodyLighter}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 24;-8 40 24;0 40 24;6 40 24;0 40 24"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${finSwayDur}s" begin="${finSwayBegin}s" repeatCount="indefinite" />
      </path>`;
    // 下侧鳍 (肚皮下方)
    const bottomFin = `
      <path d="M40,52 Q34,58 32,52 Q36,50 40,50 Z"
            style="fill: ${bodyDarker}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round; opacity: 0.9;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 52;6 40 52;0 40 52;-6 40 52;0 40 52"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${finSwayDur}s" begin="${(parseFloat(finSwayBegin) + 0.3).toFixed(2)}s" repeatCount="indefinite" />
      </path>`;

    // F. 配饰 — 根据 note.id 切换
    //   do: 蝴蝶结 (头顶); mi: 帽子; sol: 皇冠; la: 耳环
    const accessoryKey = ACCESSORY_TYPES[idKey];
    let accessorySvg = '';
    const bobDur = (2.4 + Math.random() * 0.8).toFixed(2);
    const bobBegin = (Math.random() * 0.6).toFixed(2);
    if (accessoryKey === 'bow') {
      // Do 蝴蝶结 — 头顶位置 (x≈46, y≈12),带轻微浮动
      accessorySvg = `
        <g style="transform-origin: 46px 12px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-6 46 12;4 46 12;-6 46 12"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${bobDur}s" begin="${bobBegin}s" repeatCount="indefinite" />
          <!-- 蝴蝶结左瓣 -->
          <path d="M42,10 Q36,6 38,12 Q36,18 42,14 Z"
                style="fill: #ff5c8a; stroke: rgba(0,0,0,0.4); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 蝴蝶结右瓣 -->
          <path d="M50,10 Q56,6 54,12 Q56,18 50,14 Z"
                style="fill: #ff5c8a; stroke: rgba(0,0,0,0.4); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 中间结 -->
          <ellipse cx="46" cy="12" rx="2.4" ry="2.8" fill="#ff3d75" stroke="rgba(0,0,0,0.45)" stroke-width="0.4" />
          <!-- 高光 -->
          <circle cx="45.2" cy="11" r="0.6" fill="rgba(255,255,255,0.85)" />
        </g>`;
    } else if (accessoryKey === 'hat') {
      // Mi 小帽子 — 头顶位置 (x≈48, y≈8),带轻微点头
      accessorySvg = `
        <g style="transform-origin: 48px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-3 48 14;3 48 14;-3 48 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${bobDur}s" begin="${bobBegin}s" repeatCount="indefinite" />
          <!-- 帽顶 (圆顶) -->
          <path d="M40,14 Q40,4 48,4 Q56,4 56,14 Z"
                style="fill: #2c3e50; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 帽檐 -->
          <path d="M36,14 L60,14 L58,17 L38,17 Z"
                style="fill: #1a2530; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 帽带 -->
          <path d="M40,12 L56,12" stroke="#e74c3c" stroke-width="1.4" stroke-linecap="round" />
          <!-- 帽徽 -->
          <circle cx="48" cy="8" r="1.2" fill="#f1c40f" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
        </g>`;
    } else if (accessoryKey === 'crown') {
      // Sol 小皇冠 — 头顶位置 (x≈46, y≈8),微微闪烁
      const sparkleDur = (1.6 + Math.random() * 0.6).toFixed(2);
      accessorySvg = `
        <g style="transform-origin: 46px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-2 46 14;2 46 14;-2 46 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${bobDur}s" begin="${bobBegin}s" repeatCount="indefinite" />
          <!-- 皇冠底座 -->
          <path d="M38,16 L40,8 L44,12 L46,6 L48,12 L52,8 L54,16 Z"
                style="fill: #ffd700; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 皇冠底部装饰条 -->
          <rect x="38" y="14" width="16" height="2.4" fill="#ffb300" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
          <!-- 中央红宝石 -->
          <circle cx="46" cy="15.2" r="0.9" fill="#e74c3c" stroke="rgba(0,0,0,0.4)" stroke-width="0.25">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${sparkleDur}s" repeatCount="indefinite" />
          </circle>
          <!-- 左右小宝石 -->
          <circle cx="41" cy="15.4" r="0.6" fill="#3498db" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <circle cx="51" cy="15.4" r="0.6" fill="#2ecc71" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <!-- 高光 -->
          <circle cx="45.3" cy="10.5" r="0.5" fill="rgba(255,255,255,0.85)" />
        </g>`;
    } else if (accessoryKey === 'earring') {
      // La 耳环 — 嘴侧位置 (x≈80, y≈46),带轻微晃动
      accessorySvg = `
        <g style="transform-origin: 80px 46px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-8 80 46;8 80 46;-8 80 46"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${bobDur}s" begin="${bobBegin}s" repeatCount="indefinite" />
          <!-- 耳环钩 -->
          <circle cx="80" cy="46" r="0.8" fill="none" stroke="rgba(80,80,80,0.85)" stroke-width="0.5" />
          <!-- 珍珠 -->
          <circle cx="80" cy="49.5" r="1.6" fill="#fff8dc" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" />
          <!-- 高光 -->
          <circle cx="79.5" cy="49" r="0.55" fill="rgba(255,255,255,0.95)" />
        </g>`;
    }

    this.el.innerHTML = `
      <svg xmlns="${SVG_NS}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${rot} 48 36) scale(${scaleVar})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${trailBubbles}

          ${hasBubble ? `<!-- 思考泡泡 (${thinkBubbleCount} 颗,大小也随机) -->
          ${thinkBubbles}` : ''}

          <!-- 尾巴 (按 note.id 切换形状) -->
          ${tailSvg}

          <!-- 上侧鳍 (有摇摆动画) -->
          ${topFin}

          <!-- 下侧鳍 (有摇摆动画) -->
          ${bottomFin}

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

          <!-- 雀斑/小点 (基于 note.id 稳定位置) -->
          ${freckles}

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${blushOpacity})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 (按 note.id 切换表情) -->
          ${eyesSvg}

          <!-- 配饰 (按 note.id 切换: 蝴蝶结/帽子/皇冠/耳环) -->
          ${accessorySvg}

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