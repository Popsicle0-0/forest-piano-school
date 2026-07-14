/**
 * 五线谱组件
 * - viewBox 0 0 1400 260
 * - 5 条主线 x:80~1380;Do 的下方第 1 加线画成虚线,长度 60px
 * - 7 个 <g class="staff-slot"> 沿 x = 200 + i*130 均匀分布 (200..980)
 *   - mi @ y=80 (line 1), sol @ y=100 (line 2), si @ y=120 (line 3)
 *   - fa @ y=90 (space 1), la @ y=110 (space 2)
 *   - re @ y=170 (下加一间), do @ y=180 (第 1 加线)
 * - 每 slot:点上方写音名 C/D/...,点下方写唱名 Do/Re/...
 * - fillNote(id):把占位圆点上色,半径 23
 */
import { SVG_NS } from '../utils/svg.js';

const W = 1400;
const H = 260;
const STAFF_TOP = 80;     // 5 线区域顶部 y(第 1 线)
const STAFF_BOTTOM = 160; // 第 5 线 y
const LINE_GAP = (STAFF_BOTTOM - STAFF_TOP) / 4; // 20
const LEDGER_Y = STAFF_BOTTOM + LINE_GAP;        // 180, Do 第 1 加线
const SPACE_BELOW_Y = (STAFF_BOTTOM + LEDGER_Y) / 2; // 170, Re 下加一间

// 7 个白键在五线谱上的 y 位置
// 高音谱号 E4 在最底下一条线 (line 1 from bottom = y=160),
// 往上依次是 F4 (间), G4 (线 2), A4 (间), B4 (线 3 = middle)。
// Do/Re 在五线谱下方加线/间。
const POSITIONS = {
  mi:  STAFF_BOTTOM,                  // 160 第 1 线 (E4) — bottom
  fa:  STAFF_BOTTOM - LINE_GAP / 2,   // 150 第 1 间 (F4)
  sol: STAFF_BOTTOM - LINE_GAP,       // 140 第 2 线 (G4)
  la:  STAFF_BOTTOM - LINE_GAP * 1.5, // 130 第 2 间 (A4)
  si:  STAFF_BOTTOM - LINE_GAP * 2,   // 120 第 3 线 (B4) — middle
  re:  SPACE_BELOW_Y,                 // 170 下加一间 (D4)
  do:  LEDGER_Y,                      // 180 下加一线 (C4)
};

export class Staff {
  /**
   * @param {HTMLElement} root
   * @param {Array<{id:string,solfege:string,pitch:string,note:string,color:string}>} notes
   */
  constructor(root, notes) {
    this.root = root;
    this.notes = notes;
    this.filled = new Set();
    this.render();
  }

  render() {
    const wrap = document.createElement('div');
    wrap.className = 'staff-wrap stage__staff-area';

    // 5 条主线
    const lines = [0, 1, 2, 3, 4]
      .map(
        (i) =>
          `<line class="staff__line" x1="80" y1="${STAFF_TOP + i * LINE_GAP}" x2="${W - 20}" y2="${STAFF_TOP + i * LINE_GAP}"/>`
      )
      .join('');

    // Do 的加线(虚线,长 60px,中心对齐 x=200)
    const ledgerX = 200; // do 槽位的 x
    const ledger = `<line class="staff__ledger" x1="${ledgerX - 30}" y1="${LEDGER_Y}" x2="${ledgerX + 30}" y2="${LEDGER_Y}"/>`;

    // 7 个 slot — 初始无文字标签,只画空心圆点
    const slots = this.notes
      .map((n, i) => {
        const x = 200 + i * 130;
        const y = POSITIONS[n.id] ?? STAFF_TOP;
        return `
          <g class="staff-slot" data-id="${n.id}">
            <text class="staff__label staff__label--top" x="${x}" y="${y - 28}" text-anchor="middle" visibility="hidden">
              <tspan class="pitch">${n.note}</tspan>
            </text>
            <g class="staff-slot__placeholder" data-for="${n.id}">
              <circle class="staff__placeholder-ring" cx="${x}" cy="${y}" r="22" />
              <circle class="staff__dot empty" cx="${x}" cy="${y}" r="20" />
              <text class="staff__placeholder-label" x="${x}" y="${y + 5}" text-anchor="middle">?</text>
            </g>
            <text class="staff__label staff__label--bot" x="${x}" y="${y + 38}" text-anchor="middle" visibility="hidden">${n.solfege}</text>
            <!-- 透明大热区,扩大拖放容差 -->
            <circle class="staff__hit" cx="${x}" cy="${y}" r="55" fill="transparent" />
          </g>
        `;
      })
      .join('');

    wrap.innerHTML = `
      <svg class="staff" xmlns="${SVG_NS}" viewBox="0 0 ${W} ${H}"
           preserveAspectRatio="xMidYMid meet" aria-label="五线谱">
        <!-- 高音谱号 -->
        <text class="staff__clef" x="105" y="140" dominant-baseline="middle">𝄞</text>

        <!-- 5 条主线 -->
        ${lines}

        <!-- Do 的加线(下方第 1 加线,虚线) -->
        ${ledger}

        <!-- 7 个占位点 + 标签 -->
        ${slots}
      </svg>
    `;

    this.root.appendChild(wrap);
    this.svg = wrap.querySelector('svg');
    this.slots = new Map();
    this.svg.querySelectorAll('.staff-slot').forEach((el) => {
      this.slots.set(el.dataset.id, el);
    });
  }

  /**
   * 把某个 id 的占位点填上对应鱼的颜色,半径 23
   * @param {string} id 'do' | 're' | 'mi' | 'fa' | 'sol' | 'la' | 'si'
   */
  fillNote(id) {
    if (this.filled.has(id)) return;
    this.filled.add(id);
    const slot = this.slots.get(id);
    if (!slot) return;
    const note = this.notes.find((n) => n.id === id);
    if (!note) return;
    const dot = slot.querySelector('.staff__dot');
    if (!dot) return;
    dot.classList.remove('empty');
    dot.setAttribute('r', '23');
    // 鱼的颜色可能是 var(--fish-red) 形式,直接在 SVG 元素的 fill 上设,浏览器会解析
    dot.style.fill = note.color;
    // 归位成功后,标签永久显示
    slot.classList.add('filled');
    slot.querySelectorAll('.staff__label').forEach((l) => (l.style.visibility = 'visible'));

    // 隐藏占位符 ring 和 ? 标签
    const ring = slot.querySelector('.staff__placeholder-ring');
    if (ring) ring.style.display = 'none';
    const phLabel = slot.querySelector('.staff__placeholder-label');
    if (phLabel) phLabel.style.display = 'none';
  }

  /**
   * 拖动时的位置提示:只高亮圆点,不显示名字(教学:让孩子自己认位置)
   * @param {string} id
   */
  showHint(id) {
    this.clearHint();
    const slot = this.slots.get(id);
    if (!slot || this.filled.has(id)) return;
    slot.classList.add('hint');
    // 故意不显示 .staff__label 文字 — 名字只在校对(filled)时出现
  }

  /** 清除所有 hint(已 filled 的不受影响) */
  clearHint() {
    this.svg.querySelectorAll('.staff-slot.hint').forEach((s) => {
      s.classList.remove('hint');
    });
  }

  /** 重置整个 staff(用于重玩) */
  reset() {
    this.filled.clear();
    this.svg.querySelectorAll('.staff-slot').forEach((s) => {
      s.classList.remove('filled', 'hint');
      const dot = s.querySelector('.staff__dot');
      if (dot) {
        dot.classList.add('empty');
        dot.setAttribute('r', '20');
        dot.style.fill = '';
      }
      s.querySelectorAll('.staff__label').forEach((l) => (l.style.visibility = 'hidden'));
      // 重新显示占位符 ring 和 ? 标签
      const ring = s.querySelector('.staff__placeholder-ring');
      if (ring) ring.style.display = '';
      const phLabel = s.querySelector('.staff__placeholder-label');
      if (phLabel) phLabel.style.display = '';
    });
  }
}

export default Staff;
