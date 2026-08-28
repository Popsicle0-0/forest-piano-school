/**
 * Level 3 scene: 五声音阶山谷
 *
 * v20 教学版：背景 SVG 只承担装饰；五座可投放山使用真实 DOM 热区，
 * 横竖屏都完整可见。山不显示唱名、不用鱼色编码，答案只能通过"先听再放"得到。
 */
import { SVG_NS } from '../utils/svg.js';

const TARGETS = [
  { id: 'do', height: '42%', texture: 'moss' },
  { id: 're', height: '52%', texture: 'stone' },
  { id: 'mi', height: '62%', texture: 'fern' },
  { id: 'sol', height: '72%', texture: 'cloud' },
  { id: 'la', height: '82%', texture: 'star' },
];

export class Level3Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.targets = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level3-background';
    bg.innerHTML = `
      <!-- meet: 竖屏完整保留左右山景，剩余空间由背景渐变承接，不再 slice 裁边 -->
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="${SVG_NS}">
        <circle cx="650" cy="100" r="55" class="level3-sun" />
        <path class="level3-bird" d="M120,90 q6,-6 12,0 q6,-6 12,0" />
        <path class="level3-bird" d="M260,60 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-bird" d="M460,75 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-mountain level3-mountain-far" d="M0,300 L150,150 L250,220 L380,80 L500,200 L640,140 L800,250 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-mid" d="M0,360 L100,260 L220,300 L350,200 L480,290 L620,240 L800,310 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-near" d="M0,420 L80,360 L210,380 L350,310 L490,370 L640,340 L800,400 L800,500 L0,500 Z" />
        <path class="level3-river" d="M0,440 Q200,420 400,440 T800,430 L800,500 L0,500 Z" />
        <text x="400" y="62" text-anchor="middle" class="level3-hand-text">👂</text>
      </svg>
      <div class="level3-sunset-overlay level3-progress-0"></div>
      <div class="level3-bloom-layer"></div>
    `;
    this.stage.appendChild(bg);
    this.background = bg;

    // 互动热区作为 stage 直接子层：不会被 SVG meet 的留白缩小，也不裁切左右。
    const targets = document.createElement('div');
    targets.className = 'level3-targets';
    targets.setAttribute('aria-label', '五座高低不同的山');
    targets.innerHTML = TARGETS.map((target, index) => `
      <div class="level3-target level3-target--${target.texture}" data-note="${target.id}" style="--mountain-h:${target.height}; --target-i:${index}">
        <div class="level3-target__halo"></div>
        <div class="level3-target__mountain"><span class="level3-target__peak"></span></div>
      </div>
    `).join('');
    this.stage.appendChild(targets);
    this.targets = targets;
  }

  getTarget(noteId) {
    return this.targets?.querySelector(`[data-note="${noteId}"]`) || null;
  }

  getClosestTarget(point) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
    let closest = null;
    let distance = Infinity;
    this.targets?.querySelectorAll('.level3-target').forEach((target) => {
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height * 0.58;
      const d = Math.hypot(point.x - x, point.y - y);
      if (d < distance) {
        closest = target;
        distance = d;
      }
    });
    return { target: closest, distance };
  }

  /** 已试听时让所有山呈现中性接收态；绝不泄露哪一座是正确答案。 */
  setListening(listening) {
    this.targets?.classList.toggle('is-listening', Boolean(listening));
  }

  /** 拖动时只高亮手指当前临近的山，不按答案高亮。 */
  setHoverTarget(target) {
    this.targets?.querySelectorAll('.is-hover-target').forEach((el) => el.classList.remove('is-hover-target'));
    if (target) target.classList.add('is-hover-target');
  }

  markPlaced(noteId) {
    const target = this.getTarget(noteId);
    if (target) {
      target.classList.remove('is-hover-target');
      target.classList.add('is-placed');
    }
  }

  setProgress(count) {
    if (!this.background) return;
    const overlay = this.background.querySelector('.level3-sunset-overlay');
    if (!overlay) return;
    const step = Math.min(3, Math.ceil((count / TARGETS.length) * 3));
    overlay.className = `level3-sunset-overlay level3-progress-${step}`;
  }

  bloomAt(clientX, clientY, color = '#ffd166') {
    if (!this.background) return;
    const layer = this.background.querySelector('.level3-bloom-layer');
    if (!layer) return;
    const rect = this.background.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    for (let i = 0; i < 12; i++) {
      const sp = document.createElement('div');
      sp.className = 'level3-bloom-sparkle';
      sp.style.left = `${x}px`;
      sp.style.top = `${y}px`;
      sp.style.background = color;
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 45 + Math.random() * 35;
      sp.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
      sp.style.setProperty('--by', `${Math.sin(angle) * dist}px`);
      layer.appendChild(sp);
      setTimeout(() => { try { sp.remove(); } catch (_) {} }, 1100);
    }
  }

  teardown() {
    this.background?.remove();
    this.targets?.remove();
    this.background = null;
    this.targets = null;
  }
}

export default Level3Scene;
