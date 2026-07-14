/**
 * 钢琴键盘 — 1 个八度 C4-B4
 * - 7 个白键 + 5 个黑键(纯 SVG 绘制,g + path)
 * - iPad 触屏:touch-action: none 走 inline style(SVG g 不支持 class 形式的 touch-action)
 * - 每个键可点击触发 onPress,支持 glowKey 单键闪烁和 glowAll 顺序闪烁
 */
import { SVG_NS } from '../utils/svg.js';

const WHITE_W = 80;
const WHITE_H = 220;
const BLACK_W = 48;
const BLACK_H = 130;
const RADIUS_W = 12; // 白键底圆角
const RADIUS_B = 8;  // 黑键底圆角
const KBD_W = 7 * WHITE_W; // 560

// 5 个黑键 — 位置中心 x,以及对应的 sharp solfege(固定 Do 体系)
const BLACK_KEYS = [
  { id: 'do#',  pitch: 'C#4', note: 'C#', solfege: 'Di', x: 80  },
  { id: 're#',  pitch: 'D#4', note: 'D#', solfege: 'Ri', x: 160 },
  { id: 'fa#',  pitch: 'F#4', note: 'F#', solfege: 'Fi', x: 320 },
  { id: 'sol#', pitch: 'G#4', note: 'G#', solfege: 'Si', x: 400 },
  { id: 'la#',  pitch: 'A#4', note: 'A#', solfege: 'Li', x: 480 },
];

// 工具:把白键画成"上平下圆"的 path
function whiteKeyPath(x) {
  return `M ${x} 0
          H ${x + WHITE_W}
          V ${WHITE_H - RADIUS_W}
          Q ${x + WHITE_W} ${WHITE_H} ${x + WHITE_W - RADIUS_W} ${WHITE_H}
          H ${x + RADIUS_W}
          Q ${x} ${WHITE_H} ${x} ${WHITE_H - RADIUS_W}
          Z`;
}

// 工具:把黑键画成"上平下圆"的 path
function blackKeyPath(x) {
  return `M ${x} 0
          H ${x + BLACK_W}
          V ${BLACK_H - RADIUS_B}
          Q ${x + BLACK_W} ${BLACK_H} ${x + BLACK_W - RADIUS_B} ${BLACK_H}
          H ${x + RADIUS_B}
          Q ${x} ${BLACK_H} ${x} ${BLACK_H - RADIUS_B}
          Z`;
}

const TOUCH_NONE = 'touch-action: none; -webkit-user-select: none; user-select: none;';

export class PianoKeyboard {
  constructor(root, notes) {
    /** @type {HTMLElement} */ this.root = root;
    /** @type {Array<{id:string,solfege:string,pitch:string,note:string,color:string}>} */ this.notes = notes;
    /** @type {(keyEl: SVGElement) => void} */ this.onPress = null;
    /** @type {SVGSVGElement} */ this.svg = null;
    this.render();
  }

  render() {
    const wrap = document.createElement('div');
    wrap.className = 'keyboard-area stage__kb-area';

    let inner = '';

    // 1) 7 个白键 (先画,黑键后画会覆盖在上面)
    this.notes.forEach((n, i) => {
      const x = i * WHITE_W;
      const cx = x + WHITE_W / 2;
      const d = whiteKeyPath(x);
      inner += `
        <g class="key key--white" data-pitch="${n.pitch}" data-id="${n.id}" style="${TOUCH_NONE}">
          <path class="key__shape" d="${d}"
                fill="#fdfbf5" stroke="#d8d2c0" stroke-width="1.2" stroke-linejoin="round"/>
          <text class="key__label" x="${cx}" y="184" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="18" font-weight="800" fill="#3d405b"
                style="pointer-events: none;">${n.note}</text>
          <text class="key__label" x="${cx}" y="206" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="14" font-weight="500" fill="#6b7280"
                style="pointer-events: none;">${n.solfege}</text>
        </g>
      `;
    });

    // 2) 5 个黑键 (C-D, D-E, F-G, G-A, A-B 之间)
    BLACK_KEYS.forEach((b) => {
      const x = b.x - BLACK_W / 2;
      const cx = b.x;
      const d = blackKeyPath(x);
      inner += `
        <g class="key key--black" data-pitch="${b.pitch}" data-id="${b.id}" style="${TOUCH_NONE}">
          <path class="key__shape" d="${d}"
                fill="#2b2b3a" stroke="#0a0a15" stroke-width="0.6" stroke-linejoin="round"/>
          <text class="key__label" x="${cx}" y="100" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="12" font-weight="800" fill="#fdf6e3"
                style="pointer-events: none;">${b.note}</text>
          <text class="key__label" x="${cx}" y="118" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', sans-serif"
                font-size="10" font-weight="500" fill="#fdf6e3"
                style="pointer-events: none;">${b.solfege}</text>
        </g>
      `;
    });

    wrap.innerHTML = `
      <svg class="keyboard" xmlns="${SVG_NS}"
           viewBox="0 0 ${KBD_W} ${WHITE_H}"
           preserveAspectRatio="xMidYMid meet"
           aria-label="钢琴键盘(C4-B4)">
        ${inner}
      </svg>
    `;

    this.root.appendChild(wrap);
    this.svg = /** @type {SVGSVGElement} */ (wrap.querySelector('svg'));

    this.bindEvents();
  }

  bindEvents() {
    /** @type {NodeListOf<SVGGElement>} */
    const keys = this.svg.querySelectorAll('.key');
    keys.forEach((keyEl) => {
      const shape = keyEl.querySelector('.key__shape');
      const origFill = shape ? shape.getAttribute('fill') || '' : '';
      const isBlack = keyEl.classList.contains('key--black');
      const pressedFill = isBlack ? '#5a4f2a' : '#ffd166';

      const press = () => {
        keyEl.classList.add('pressed');
        if (shape) shape.setAttribute('fill', pressedFill);
      };
      const release = () => {
        keyEl.classList.remove('pressed');
        if (shape) shape.setAttribute('fill', origFill);
      };

      // pointerdown 立即触发 onPress(iOS 多触点用 setPointerCapture 锁住)
      keyEl.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        press();
        try { keyEl.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
        if (typeof this.onPress === 'function') this.onPress(keyEl);
      });
      keyEl.addEventListener('pointerup', release);
      keyEl.addEventListener('pointercancel', release);
      keyEl.addEventListener('pointerleave', release);
      // 防止 iOS Safari 在 click 时再次触发声音
      keyEl.addEventListener('click', (e) => e.preventDefault());
    });
  }

  /**
   * 单个键发光 — 600ms 淡黄光环
   * CSS .glow 动画用 box-shadow 对 SVG g 无效,这里直接用 SVG path.animate(filter)
   */
  glowKey(keyEl) {
    if (!keyEl) return;
    keyEl.classList.add('glow');
    const shape = keyEl.querySelector('.key__shape');
    if (shape && typeof shape.animate === 'function') {
      shape.animate(
        [
          { filter: 'drop-shadow(0 0 0px rgba(255, 209, 102, 0.95))' },
          { filter: 'drop-shadow(0 0 18px rgba(255, 209, 102, 0.7))' },
          { filter: 'drop-shadow(0 0 28px rgba(255, 209, 102, 0))' },
        ],
        { duration: 600, easing: 'ease-out', fill: 'forwards' }
      );
    }
    setTimeout(() => keyEl.classList.remove('glow'), 700);
  }

  /**
   * 所有白键依次闪烁 — 每隔 200ms 触发一个 glowKey
   * 通关庆祝用(Game.js handleWin)
   */
  glowAll() {
    /** @type {SVGGElement[]} */
    const whites = Array.from(this.svg.querySelectorAll('.key--white'));
    whites.forEach((key, i) => {
      setTimeout(() => this.glowKey(key), i * 200);
    });
  }
}

export default PianoKeyboard;
