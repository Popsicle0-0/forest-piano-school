/**
 * FishPool - 7 条小鱼的舞台 + 拖拽交互
 * 设计要点:
 * - Pure DOM + Pointer Events (iPad 触屏最稳,避开 HTML5 dragstart)
 * - GSAP 仅用于 intro 入场动画 (mouse/touch 跟手纯 CSS position)
 * - 鱼分两层: 外层 .fish (绝对定位 + GSAP transform) / 内层 .fish-inner (CSS keyframes 浮动)
 */
import { Fish } from './Fish.js';
import { gsap } from 'gsap';

// 吸附容差 (px) — 鱼在底部,五线谱在顶部,需要更大容错
const SNAP_RADIUS = 280;
const POOL_PAD_X = 16;
// 单条鱼的近似可视尺寸 (Fish.js 自适应,这里只用于布局估算)
const FISH_SLOT_W = 78;
const FISH_SLOT_H = 78;

const STYLE_ID = 'forest-piano-fishpool-keyframes';

/** 注入 CSS keyframes (避免改 style.css) */
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .fish-inner {
      transform-origin: 50% 50%;
      will-change: transform;
      width: 100%;
      height: 100%;
      pointer-events: none; /* 事件穿透到 .fish wrapper */
    }
    .fish-inner > * {
      pointer-events: none;
    }
    @keyframes fishFloat {
      from { transform: rotate(var(--fish-rot, 0deg)) translateY(0); }
      to   { transform: rotate(var(--fish-rot, 0deg)) translateY(-12px); }
    }
    .fish-inner.is-floating {
      animation: fishFloat var(--fish-float-dur, 2.6s) ease-in-out
                 var(--fish-float-delay, 0s) infinite alternate;
    }
    .fish {
      will-change: transform;
      transform-origin: 50% 50%;
    }
    .fish.dragging {
      animation: none;
    }
  `;
  document.head.appendChild(s);
}

export class FishPool {
  /**
   * @param {HTMLElement} root 舞台 (stage) 容器
   * @param {Array<{id, solfege, pitch, note, color}>} notes 7 条鱼元数据
   */
  constructor(root, notes) {
    injectStyles();

    this.stage = root;        // 保留原 stage 引用 (备用)
    this.notes = notes;
    this.fishes = [];         // [{ el, inner, note, originalLeft, originalTop, rot }]
    this.onDrop = null;       // (fishEl, slotEl, accepted) => void
    this.onDragStart = null;  // (fishEl) => void  可选 (触发 hover 音)
    this.onDragMove = null;   // (fishEl, nearestSlotEl|null) => void  可选 (位置提示)
    this.onTap = null;        // (fishEl) => void  可选 (单击听声)
    this._lastHoveredSlot = null;
    this.TAP_THRESHOLD = 8;   // 移动 < 8px 视为单击

    this._renderPool();

    // 等 DOM 布局完再定位鱼 (否则 getBoundingClientRect 全 0)
    requestAnimationFrame(() => this._placeFishes());
  }

  // ============================================================
  // 渲染
  // ============================================================

  _renderPool() {
    const pool = document.createElement('div');
    pool.className = 'fish-pool';
    pool.setAttribute('aria-label', '小鱼池');
    this.stage.appendChild(pool);
    this.pool = pool;
    // Game.js 期望 .root 可用于 getBoundingClientRect (拿池子尺寸做归位坐标)
    this.root = pool;
  }

  _placeFishes() {
    const rect = this.pool.getBoundingClientRect();
    // 若 stage 还没布局好,稍等再试
    if (rect.width < 2 || rect.height < 2) {
      requestAnimationFrame(() => this._placeFishes());
      return;
    }

    const usableW = rect.width - 2 * POOL_PAD_X;
    const slots = this.notes.length;
    const slotW = usableW / slots;
    const baseY = rect.height * 0.58; // 略偏中下,看起来像水里

    this.notes.forEach((note, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'fish';
      wrap.dataset.id = note.id;
      wrap.dataset.color = note.color;
      wrap.dataset.solfege = note.solfege;
      wrap.dataset.pitch = note.pitch;

      // iPad 触屏保险 (CSS 已经覆盖,这里再 inline 一次)
      wrap.style.touchAction = 'none';
      wrap.style.webkitUserSelect = 'none';
      wrap.style.userSelect = 'none';
      wrap.style.webkitTapHighlightColor = 'transparent';

      // 横向均匀分布 + 抖动 (避免太规整)
      const centerX = POOL_PAD_X + slotW * (i + 0.5)
        + (Math.random() - 0.5) * slotW * 0.30;
      const centerY = baseY + (Math.random() - 0.5) * rect.height * 0.32;
      const left = Math.max(POOL_PAD_X, Math.min(rect.width - FISH_SLOT_W - POOL_PAD_X,
        centerX - FISH_SLOT_W / 2));
      const top = Math.max(8, Math.min(rect.height - FISH_SLOT_H - 8,
        centerY - FISH_SLOT_H / 2));
      wrap.style.left = `${left}px`;
      wrap.style.top = `${top}px`;
      wrap.style.width = `${FISH_SLOT_W}px`;
      wrap.style.height = `${FISH_SLOT_H}px`;

      // 内层: 待机浮动 (CSS keyframes) + 静态旋转
      const rot = (Math.random() - 0.5) * 6; // ±3°
      const dur = 2 + Math.random();          // 2-3s
      const delay = -Math.random() * dur;     // 负 delay 错相位,避免同时浮

      const inner = document.createElement('div');
      inner.className = 'fish-inner is-floating';
      inner.style.setProperty('--fish-rot', `${rot.toFixed(2)}deg`);
      inner.style.setProperty('--fish-float-dur', `${dur.toFixed(2)}s`);
      inner.style.setProperty('--fish-float-delay', `${delay.toFixed(2)}s`);

      // Fish.js 内容 (兼容多种返回形式)
      let fishContent = null;
      try {
        const inst = new Fish(note);
        if (inst && inst.nodeType === 1) fishContent = inst;
        else fishContent = inst?.root || inst?.element || inst?.svg || null;
      } catch (err) {
        // 允许 Fish.js 暂时未完成 (子代理 A 在写);不影响布局
        console.warn('[FishPool] Fish creation failed (Agent A 还没就绪?):', err);
      }

      if (fishContent && fishContent.nodeType === 1) {
        inner.appendChild(fishContent);
      } else {
        // 降级渲染: 一个彩色圆 + 唱名,保证可视与可点
        inner.innerHTML = `
          <div style="
            width:100%;height:100%;
            background:${note.color};
            border-radius:50% 60% 55% 50% / 55% 50% 60% 50%;
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-family:'ZCOOL KuaiLe',sans-serif;
            font-size:24px;font-weight:900;
            text-shadow:0 1px 2px rgba(0,0,0,0.35);
            box-shadow:0 6px 0 rgba(0,0,0,0.18), 0 12px 24px rgba(0,0,0,0.2);
          ">${note.solfege}</div>
        `;
      }

      wrap.appendChild(inner);
      this.pool.appendChild(wrap);

      const fish = {
        el: wrap,
        inner,
        note,
        originalLeft: left,
        originalTop: top,
        rot,
      };
      this.fishes.push(fish);
      this._bindDrag(fish);
    });
  }

  // ============================================================
  // 拖拽 (Pointer Events)
  // ============================================================

  _bindDrag(fish) {
    const el = fish.el;
    let activePointer = null;
    let grabOffsetX = 0;
    let grabOffsetY = 0;
    let downX = 0;
    let downY = 0;
    let totalMove = 0;

    const onPointerDown = (e) => {
      if (activePointer !== null) return; // 单鱼只接一个触点
      // 鼠标: 只接受左键
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      e.preventDefault();
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      activePointer = e.pointerId;

      const r = el.getBoundingClientRect();
      grabOffsetX = e.clientX - r.left;
      grabOffsetY = e.clientY - r.top;
      downX = e.clientX;
      downY = e.clientY;
      totalMove = 0;

      // 抬起 z-index + 暂停浮动 (但保留相位)
      el.classList.add('dragging');
      fish.inner.style.animationPlayState = 'paused';

      // 切到 fixed 跟手 (避开 offsetParent 抖动)
      el.style.position = 'fixed';
      el.style.left = `${e.clientX - grabOffsetX}px`;
      el.style.top = `${e.clientY - grabOffsetY}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.margin = '0';
      el.style.transform = 'scale(1.08)';

      if (typeof this.onDragStart === 'function') {
        try { this.onDragStart(el); } catch (err) { console.warn(err); }
      }
    };

    const onPointerMove = (e) => {
      if (activePointer !== e.pointerId) return;
      e.preventDefault();
      el.style.left = `${e.clientX - grabOffsetX}px`;
      el.style.top = `${e.clientY - grabOffsetY}px`;
      totalMove = Math.max(totalMove, Math.hypot(e.clientX - downX, e.clientY - downY));

      // ---- 找最近的 staff slot 用于位置提示 ----
      if (typeof this.onDragMove === 'function') {
        const slots = document.querySelectorAll('.staff-slot');
        let nearest = null;
        let nearestDist = Infinity;
        slots.forEach((s) => {
          const r = s.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(cx - e.clientX, cy - e.clientY);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = s;
          }
        });
        // 只在变化时回调,减少抖动
        if (nearest !== this._lastHoveredSlot) {
          this._lastHoveredSlot = nearest;
          try { this.onDragMove(el, nearest); } catch (err) { console.warn(err); }
        }
      }
    };

    const onPointerEnd = (e) => {
      if (activePointer !== e.pointerId) return;
      activePointer = null;

      try { el.releasePointerCapture(e.pointerId); } catch (_) {}

      // ---- 区分单击 vs 拖动 ----
      if (totalMove < this.TAP_THRESHOLD) {
        // 单击: 复位 + 触发 onTap, 不做 drop 判定
        el.classList.remove('dragging');
        el.style.position = '';
        el.style.left = `${fish.originalLeft}px`;
        el.style.top = `${fish.originalTop}px`;
        el.style.right = '';
        el.style.bottom = '';
        el.style.margin = '';
        el.style.transform = '';
        fish.inner.style.animationPlayState = '';

        if (typeof this.onDragMove === 'function') {
          this._lastHoveredSlot = null;
          try { this.onDragMove(el, null); } catch (err) { console.warn(err); }
        }
        if (typeof this.onTap === 'function') {
          try { this.onTap(el); } catch (err) { console.warn(err); }
        }
        return;
      }

      // ---- 找最近的五线谱 slot (drop 目标) ----
      const slots = document.querySelectorAll('.staff-slot');
      let nearest = null;
      let nearestDist = Infinity;
      const fr = el.getBoundingClientRect();
      const fx = fr.left + fr.width / 2;
      const fy = fr.top + fr.height / 2;

      slots.forEach((slotEl) => {
        const r = slotEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(cx - fx, cy - fy);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = slotEl;
        }
      });

      const accepted = !!nearest
        && nearestDist < SNAP_RADIUS
        && nearest.dataset.id === fish.note.id;

      // ---- 复位 (为 handleWrong 的 gsap.to({x:0,y:0}) 做准备) ----
      el.classList.remove('dragging');
      el.style.position = '';        // 回 CSS .fish (absolute)
      el.style.left = `${fish.originalLeft}px`;
      el.style.top = `${fish.originalTop}px`;
      el.style.right = '';
      el.style.bottom = '';
      el.style.margin = '';
      el.style.transform = '';
      fish.inner.style.animationPlayState = '';

      // 清除位置提示
      if (typeof this.onDragMove === 'function') {
        this._lastHoveredSlot = null;
        try { this.onDragMove(el, null); } catch (err) { console.warn(err); }
      }

      if (typeof this.onDrop === 'function') {
        try { this.onDrop(el, nearest, accepted); } catch (err) { console.warn(err); }
      }
    };

    // 用了 setPointerCapture,move/up/cancel 都打到 el 自身
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerEnd);
    el.addEventListener('pointercancel', onPointerEnd);
  }

  // ============================================================
  // 入场动画 (GSAP)
  // ============================================================

  intro() {
    const start = () => {
      if (this.fishes.length < this.notes.length) {
        // _placeFishes 还没好 (rAF 未到),再等一帧
        requestAnimationFrame(start);
        return;
      }
      this.fishes.forEach((fish, i) => {
        gsap.fromTo(
          fish.el,
          { y: 140, opacity: 0, scale: 0.4 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'back.out(1.7)',
          }
        );
      });
    };
    start();
  }
}

export default FishPool;
