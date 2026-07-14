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
const POOL_PAD_X = 50;   // 鱼左右边缘 padding (避免鱼靠边)
// 单条鱼的近似可视尺寸 (Fish.js 自适应,这里只用于布局估算)
const FISH_SLOT_W = 84;  // was 96 — 缩小 17% 让鱼更小更分散
const FISH_SLOT_H = 64;  // was 76 — 缩小给鱼更多垂直散开空间

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
      transform: rotate(var(--fish-rot, 0deg)); /* 静态旋转在 inner:视觉倾斜,不影响 hit area */
      width: 100%;
      height: 100%;
      pointer-events: none; /* 事件穿透到 .fish wrapper */
    }
    .fish-inner > * {
      pointer-events: none;
    }
    /* v17.6: 浮动动画放在 wrapper (.fish) 上, 让 hit area 跟随视觉位置
       (原来放 inner, wrapper 不动, 鱼浮起时 hit 区比鱼低 12px → 触屏"模糊") */
    /* v18.2: 把"小浮动"和"呼吸缩放"合并成单一 keyframe, 4s 一循环 */
    @keyframes fishFloat {
      0%, 100% { transform: translateY(0)    scale(1.00); }
      50%      { transform: translateY(-6px) scale(1.03); }
    }
    .fish.is-floating {
      animation: fishFloat var(--fish-float-dur, 4s) ease-in-out
                 var(--fish-float-delay, 0s) infinite;
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
    this._dragEnabled = true;  // 默认允许拖动 (level 1); level 2 关掉只允许点
    this._lastHoveredSlot = null;
    this.TAP_THRESHOLD = 12;  // 移动 < 12px 视为单击 (iOS 手指精度不为 0, 放宽更友好)

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

    // 打乱 notes 顺序: 鱼和音的对应关系每次开局都随机
    // (这样每次重玩 Do 不一定在同一个角)
    const shuffled = [...this.notes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Poisson-disc-like: 每条新鱼至少 MIN_DIST 远离已放置的鱼
    const OVERFLOW_X = 0;       // 鱼严格不超出左右边界 (避免靠边)
    const OVERFLOW_Y = 18;      // 允许鱼稍微越过 fish-pool 上边 (进入 staff 区域但仍在 stage 内)
    const padL = POOL_PAD_X;    // 50 — 左边距
    const padR = rect.width - POOL_PAD_X - FISH_SLOT_W;  // 严格不超出右边界
    const padT = -OVERFLOW_Y;   // -18 → cy range 起点 (允许向上溢出)
    const padB = rect.height - FISH_SLOT_H;  // 不超出下边界
    const MIN_DIST = 56;        // px, 鱼中心点之间的最小间距 (84x64 鱼新尺寸适配)
    const MIN_DIST_SQ = MIN_DIST * MIN_DIST;
    const MAX_TRIES_PER_FISH = 90;  // was 80 — 给更多机会
    const placedCenters = [];

    // Helper: candidate (cx, cy) 距所有已放置鱼是否 >= MIN_DIST
    function tryPlace(cx, cy) {
      for (let i = 0; i < placedCenters.length; i++) {
        const c = placedCenters[i];
        const dx = c.x - cx;
        const dy = c.y - cy;
        if (dx * dx + dy * dy < MIN_DIST_SQ) return false;
      }
      return true;
    }

    shuffled.forEach((note) => {
      const wrap = document.createElement('div');
      wrap.className = 'fish is-floating';  // v17.6: 浮动在 wrapper — hit area 跟视觉走
      wrap.dataset.id = note.id;
      wrap.dataset.color = note.color;
      wrap.dataset.solfege = note.solfege;
      wrap.dataset.pitch = note.pitch;

      // iPad 触屏保险 (CSS 已经覆盖,这里再 inline 一次)
      wrap.style.touchAction = 'manipulation';
      wrap.style.webkitUserSelect = 'none';
      wrap.style.userSelect = 'none';
      wrap.style.webkitTapHighlightColor = 'transparent';

      // 随机中心点范围 (注意这里算的是 CENTER)
      const cxMin = padL + FISH_SLOT_W / 2;
      const cxMax = padR - FISH_SLOT_W / 2;
      const cyMin = padT + FISH_SLOT_H / 2;
      const cyMax = padB - FISH_SLOT_H / 2;
      const cxRange = Math.max(1, cxMax - cxMin);
      const cyRange = Math.max(1, cyMax - cyMin);

      // Phase 1: 随机采样直到满足最小间距
      let cx = 0, cy = 0, found = false;
      for (let t = 0; t < MAX_TRIES_PER_FISH; t++) {
        const tcx = cxMin + Math.random() * cxRange;
        const tcy = cyMin + Math.random() * cyRange;
        if (tryPlace(tcx, tcy)) {
          cx = tcx;
          cy = tcy;
          found = true;
          break;
        }
      }

      // Phase 2: 实在找不到,挑 60 个候选里"最不挤"的那个位置
      if (!found) {
        let bestDist = -Infinity;
        let bestCx = cxMin;
        let bestCy = cyMin;
        for (let attempt = 0; attempt < 60; attempt++) {
          const tcx = cxMin + Math.random() * cxRange;
          const tcy = cyMin + Math.random() * cyRange;
          let minD = Infinity;
          for (let i = 0; i < placedCenters.length; i++) {
            const c = placedCenters[i];
            const dx = c.x - tcx;
            const dy = c.y - tcy;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < minD) minD = d;
          }
          if (minD > bestDist) {
            bestDist = minD;
            bestCx = tcx;
            bestCy = tcy;
          }
        }
        cx = bestCx;
        cy = bestCy;
      }

      const left = cx - FISH_SLOT_W / 2;
      const top = cy - FISH_SLOT_H / 2;
      wrap.style.left = `${left}px`;
      wrap.style.top = `${top}px`;
      wrap.style.width = `${FISH_SLOT_W}px`;
      wrap.style.height = `${FISH_SLOT_H}px`;
      placedCenters.push({ x: cx, y: cy });

      // 内层: 待机浮动 (CSS keyframes) + 静态旋转
      const rot = (Math.random() - 0.5) * 6; // ±3°
      const dur = 3.5 + Math.random() * 1.0;  // 3.5-4.5s (4s 呼吸缩放)
      const delay = -Math.random() * dur;     // 负 delay 错相位,避免同时浮

      // 动画在 wrapper 上 → 时长/相位变量也放 wrapper
      wrap.style.setProperty('--fish-float-dur', `${dur.toFixed(2)}s`);
      wrap.style.setProperty('--fish-float-delay', `${delay.toFixed(2)}s`);

      const inner = document.createElement('div');
      inner.className = 'fish-inner';        // v17.6: 移除 is-floating — wrapper 负责浮动
      inner.style.setProperty('--fish-rot', `${rot.toFixed(2)}deg`);

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
        locked: false,           // v17: 正确放置后设为 true, 不能拖
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
      // v17: 已正确放置的鱼锁定, 不让再拖
      if (fish.locked) return;
      if (this._dragEnabled === false) return; // 关拖动时 (level 2) 直接忽略, 只允许 click/tap
      if (activePointer !== null) return; // 单鱼只接一个触点
      // 鼠标: 只接受左键
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      // 不 preventDefault — 让浏览器也能合成 click 事件作为兜底
      // e.preventDefault();
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
      // v18.2 polish: 按下瞬间给 .pressing (depress 视觉), 等真正移动时再换成 dragging 视觉
      el.classList.add('pressing');
      fish.el.style.animationPlayState = 'paused';  // v17.6: 动画在 wrapper, 暂停 wrapper

      // 切到 fixed 跟手 (避开 offsetParent 抖动)
      el.style.position = 'fixed';
      el.style.left = `${e.clientX - grabOffsetX}px`;
      el.style.top = `${e.clientY - grabOffsetY}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      el.style.margin = '0';
      el.style.transform = '';  // 由 .pressing / .dragging CSS 接管 (避免 inline transform 覆盖 CSS class)

      if (typeof this.onDragStart === 'function') {
        try { this.onDragStart(el); } catch (err) { console.warn(err); }
      }
    };

    const onPointerMove = (e) => {
      if (activePointer !== e.pointerId) return;
      e.preventDefault();
      el.style.left = `${e.clientX - grabOffsetX}px`;
      el.style.top = `${e.clientY - grabOffsetY}px`;
      const dxm = e.clientX - downX;
      const dym = e.clientY - downY;
      const moved = Math.hypot(dxm, dym);
      totalMove = Math.max(totalMove, moved);

      // v18.2: 超过阈值后, 把 .pressing 切到 .dragging (从"按下去"变成"被拖着")
      if (totalMove > this.TAP_THRESHOLD && el.classList.contains('pressing')) {
        el.classList.remove('pressing');
      }

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
        el.classList.remove('pressing');
        el.style.position = '';
        el.style.left = `${fish.originalLeft}px`;
        el.style.top = `${fish.originalTop}px`;
        el.style.right = '';
        el.style.bottom = '';
        el.style.margin = '';
        el.style.transform = '';
        fish.el.style.animationPlayState = '';  // v17.6: 动画在 wrapper → 恢复 wrapper

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
      el.classList.remove('pressing');
      el.style.position = '';        // 回 CSS .fish (absolute)
      el.style.left = `${fish.originalLeft}px`;
      el.style.top = `${fish.originalTop}px`;
      el.style.right = '';
      el.style.bottom = '';
      el.style.margin = '';
      el.style.transform = '';
      fish.el.style.animationPlayState = '';  // v17.6: 动画在 wrapper → 恢复 wrapper

      // 清除位置提示
      if (typeof this.onDragMove === 'function') {
        this._lastHoveredSlot = null;
        try { this.onDragMove(el, null); } catch (err) { console.warn(err); }
      }

      // v18.2 polish: 正确放置后, 在鱼池原位留个淡淡的"鱼影", 1.2s 后淡出
      // (放在 onDrop 之前, 让 Game.js 后续的 gsap 鱼飞行不会盖到阴影)
      if (accepted) {
        this._spawnSourceShadow(fish);
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

    // 同时绑 click 作为 iOS 兜底 (有些 PWA 只 fire click 不 fire pointerdown)
    el.addEventListener('click', (e) => {
      if (fish.locked) return;
      // iOS 单独 fire click 时 (PWA 偶尔), 这里补触发 onTap
      // Game.onTap 幂等 (playNote + GSAP scale 可重放), 双触发只是重播同一音, 可接受
      if (typeof this.onTap === 'function') {
        try { this.onTap(el); } catch (err) { console.warn(err); }
      }
    });
  }

  // ============================================================
  // 入场动画 (GSAP)
  // ============================================================

  /**
   * v17: 锁定一条鱼 (正确放置后调用), 它再不能拖动也不能点
   * 通过 CSS .fish--locked (pointer-events:none) 实现
   * @param {string} id - 'do'|'re'|...
   */
  lockFish(id) {
    const fish = this.fishes.find((f) => f.note.id === id);
    if (!fish) return;
    fish.locked = true;
    fish.el.classList.add('fish--locked');
  }

  /**
   * v18.2 polish: 在鱼池原位生成一个"鱼影", 淡出后自动清理.
   * @param {{originalLeft:number,originalTop:number,note:{color:string}}} fish
   */
  _spawnSourceShadow(fish) {
    if (!this.pool) return;
    const shadow = document.createElement('div');
    shadow.className = 'fish-source-shadow';
    // 鱼色传入 CSS 变量, 让 .fish-source-shadow 拿到对应色 (默认深蓝灰兜底)
    const c = fish.note && fish.note.color ? fish.note.color : 'rgba(20,40,70,0.45)';
    shadow.style.setProperty('--shadow-color', c);
    shadow.style.left = `${fish.originalLeft + FISH_SLOT_W / 2}px`;
    shadow.style.top = `${fish.originalTop + FISH_SLOT_H / 2}px`;
    this.pool.appendChild(shadow);
    setTimeout(() => {
      try { shadow.remove(); } catch (_) {}
    }, 1400);
  }

  /**
   * 是否允许拖动 (level 2 关拖动, 只允许点选)
   * @param {boolean} enabled
   */
  setDragEnabled(enabled) {
    this._dragEnabled = enabled !== false;
  }

  /**
   * v17: 解除所有鱼的锁定 (重玩时调用)
   */
  unlockAll() {
    this.fishes.forEach((fish) => {
      fish.locked = false;
      fish.el.classList.remove('fish--locked');
      // 顺手清掉之前的拖拽/dragging 残留
      fish.el.classList.remove('dragging', 'shake');
      fish.el.style.position = '';
      fish.el.style.left = `${fish.originalLeft}px`;
      fish.el.style.top = `${fish.originalTop}px`;
      fish.el.style.right = '';
      fish.el.style.bottom = '';
      fish.el.style.margin = '';
      fish.el.style.transform = '';
      fish.el.style.animationPlayState = '';  // v17.6: 动画在 wrapper → 恢复 wrapper
    });
  }


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

  /**
   * 重置: 把鱼送回(新随机)位置 + 重新弹入 + 解锁所有鱼
   * (重玩时 Game.js 调用)
   *
   * 关键: 不能复用 _placeFishes() — 它会重建 DOM、丢失已绑的事件和 lock 状态
   * 所以这里复用 Poisson-disc 算法 (与 _placeFishes 同),但只更新 originalLeft/Top + DOM 位置
   */
  reset() {
    if (!this.pool) return;

    // 1. 为每条鱼计算新随机位置,更新 originalLeft/originalTop
    const rect = this.pool.getBoundingClientRect();
    if (rect.width >= 2 && rect.height >= 2) {
      const OVERFLOW_X = 0;       // 鱼严格不超出左右边界 (避免靠边)
      const OVERFLOW_Y = 18;      // 允许鱼稍微越过 fish-pool 上边 (进入 staff 区域但仍在 stage 内)
      const padL = POOL_PAD_X;    // 50
      const padR = rect.width - POOL_PAD_X - FISH_SLOT_W;  // 严格不超出右边界
      const padT = -OVERFLOW_Y;   // -18
      const padB = rect.height - FISH_SLOT_H;  // 不超出下边界
      const MIN_DIST = 56;
      const MIN_DIST_SQ = MIN_DIST * MIN_DIST;
      const MAX_TRIES_PER_FISH = 90;

      const placedCenters = [];
      const tryPlace = (cx, cy) => {
        for (let i = 0; i < placedCenters.length; i++) {
          const c = placedCenters[i];
          const dx = c.x - cx;
          const dy = c.y - cy;
          if (dx * dx + dy * dy < MIN_DIST_SQ) return false;
        }
        return true;
      };

      this.fishes.forEach((fish) => {
        const cxMin = padL + FISH_SLOT_W / 2;
        const cxMax = padR - FISH_SLOT_W / 2;
        const cyMin = padT + FISH_SLOT_H / 2;
        const cyMax = padB - FISH_SLOT_H / 2;
        const cxRange = Math.max(1, cxMax - cxMin);
        const cyRange = Math.max(1, cyMax - cyMin);

        // Phase 1: 随机采样直到满足最小间距
        let cx = 0, cy = 0, found = false;
        for (let t = 0; t < MAX_TRIES_PER_FISH; t++) {
          const tcx = cxMin + Math.random() * cxRange;
          const tcy = cyMin + Math.random() * cyRange;
          if (tryPlace(tcx, tcy)) {
            cx = tcx;
            cy = tcy;
            found = true;
            break;
          }
        }

        // Phase 2: 实在找不到,挑"最不挤"的位置
        if (!found) {
          let bestDist = -Infinity;
          let bestCx = cxMin;
          let bestCy = cyMin;
          for (let a = 0; a < 60; a++) {
            const tcx = cxMin + Math.random() * cxRange;
            const tcy = cyMin + Math.random() * cyRange;
            let minD = Infinity;
            for (let i = 0; i < placedCenters.length; i++) {
              const c = placedCenters[i];
              const dx = c.x - tcx;
              const dy = c.y - tcy;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < minD) minD = d;
            }
            if (minD > bestDist) {
              bestDist = minD;
              bestCx = tcx;
              bestCy = tcy;
            }
          }
          cx = bestCx;
          cy = bestCy;
        }

        fish.originalLeft = cx - FISH_SLOT_W / 2;
        fish.originalTop = cy - FISH_SLOT_H / 2;
        placedCenters.push({ x: cx, y: cy });
      });
    }

    // 2. 解锁所有鱼 + 把 DOM 复位到(新的)originalLeft/Top
    this.unlockAll();

    // 3. 重新入场动画 (用 fromTo, y 从下方偏移开始 + 随机 stagger)
    this.fishes.forEach((fish) => {
      gsap.fromTo(
        fish.el,
        { y: 60, opacity: 0.6, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)', delay: Math.random() * 0.15 }
      );
    });
  }

  /**
   * 拿到所有鱼 DOM (Game.js 重置星星等用)
   */
  getFishes() {
    return this.fishes.map((f) => f.el);
  }
}

export default FishPool;
