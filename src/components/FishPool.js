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
// v19.3: wrapper 是稳定的触控热区，视觉鱼会在 inner 再缩放。
// 旧 84×64 视觉实体太大：进五线谱后遮住邻位，池中 7 条也会互压。
// 改为更紧凑的 68×52 热区 + 更大的防撞距离，既能抓住也不会挡谱。
const FISH_SLOT_W = 68;
const FISH_SLOT_H = 52;
const FISH_MIN_DIST = 72; // 必须 >= 视觉鱼宽，不能再用 56 让实体重叠

// 视觉鱼相对触控 wrapper 的缩放。触控区保留 68×52，儿童手指仍好抓；
// 真正看到的鱼约为 78%，从根上消除池中/谱上遮挡。

/**
 * v19 核心修复之一: 鱼体布局参数不再写死。
 * 旧版直接用 84×64 常量在"鱼池只剩 ~110px 高"(iPhone 横屏/iPad 横屏的
 * 分配结果)的容器里摆放, 数学上只装得下"一行半", 结果是 7 条鱼被钉成
 * 一条互相重叠的水平带 (iPad 上 cyRange 直接算出负数退化成 1px)。
 * 现在: 每次摆鱼前根据容器实测高度算缩放系数 k ∈ [0.55, 1],
 * 所有几何常量(鱼宽高/边距/最小间距/上溢)按 k 联动缩小,
 * 低矮容器自动变成"小鱼多行", 高容器保持原尺寸。
 */
function layoutMetrics(poolRect) {
  const availH = Math.max(48, poolRect.height - 8);
  // 以"能放下两行"为基准线; 视觉鱼已由 inner 缩放，故下限 0.62
  // 仍保留足够触控热区，避免短屏把鱼缩成不可抓的小点。
  const k = Math.min(1, Math.max(0.62, availH / (FISH_SLOT_H * 2 + 24)));
  return {
    slotW: Math.round(FISH_SLOT_W * k),
    slotH: Math.round(FISH_SLOT_H * k),
    padX: Math.round(POOL_PAD_X * Math.min(1, Math.max(0.6, k))),
    minDist: Math.max(44, Math.round(FISH_MIN_DIST * k)),
    overY: Math.round(18 * k),
  };
}

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
      /* v19.3: 内层缩小，外层 wrapper 保持完整手指热区 */
      transform: rotate(var(--fish-rot, 0deg)) scale(var(--fish-visual-scale, 0.78));
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
      /* v19.3: L1 目标很密，原 -6px/1.03 呼吸会让鱼看起来闪烁、
         彼此擦边；改为几乎静止的生命感，不干扰对位。 */
      0%, 100% { transform: translateY(0)    scale(1.00); }
      50%      { transform: translateY(-2px) scale(1.01); }
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

    // v18.9 起监听 resize/orientationchange; v19 升级为 _handleViewportChange:
    // 小幅变化只把越界鱼夹回容器; 大幅变化(转屏/分屏)时对未锁定的鱼整体
    // 重新散布(见该方法注释)。拖拽中/已锁定的鱼永远不被打断。
    this._onResize = () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this._handleViewportChange(), 150);
    };
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', this._onResize);
  }

  /**
   * v18.9: 把所有"未锁定且未在拖拽中"的鱼坐标夹紧回当前 .fish-pool 容器范围内。
   * 不重新洗牌位置(只做最小必要的边界修正), 避免打断正在进行的游戏。
   */
  _clampFishesToPool() {
    if (!this.pool) return;
    const rect = this.pool.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    // v19: 用与摆鱼时同一套参数化尺寸做边界
    const m = layoutMetrics(rect);
    const padL = m.padX;
    const padR = rect.width - m.padX - m.slotW;
    const padB = rect.height - m.slotH; // 底边不越过鱼池 (上溢仅是设计彩蛋, 夹紧时不需要保留)
    const maxLeft = Math.max(padL, padR);
    const maxTop = Math.max(0, padB);

    this.fishes.forEach((fish) => {
      if (fish.locked) return;              // 已归位的鱼交给 GSAP/Game.js 管理, 不动
      if (fish.el.classList.contains('dragging')) return;  // 拖拽中的鱼不打断

      const clampedLeft = Math.min(Math.max(fish.originalLeft, padL), maxLeft);
      const clampedTop = Math.min(Math.max(fish.originalTop, 0), maxTop);
      if (clampedLeft === fish.originalLeft && clampedTop === fish.originalTop) return;

      fish.originalLeft = clampedLeft;
      fish.originalTop = clampedTop;
      // 用 transition 让位置变化平滑, 而不是瞬移
      fish.el.style.transition = 'left 200ms ease-out, top 200ms ease-out';
      fish.el.style.left = `${clampedLeft}px`;
      fish.el.style.top = `${clampedTop}px`;
      setTimeout(() => { fish.el.style.transition = ''; }, 220);
    });
  }

  /**
   * v18.9: 停止监听 resize/orientationchange (关卡切换/teardown 时调用, 避免内存泄漏)
   */
  destroy() {
    if (this._onResize) {
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('orientationchange', this._onResize);
      this._onResize = null;
    }
    clearTimeout(this._resizeTimer);
  }

  /**
   * v19: 视口变化的统一入口。
   - 小幅变化(浏览器工具栏收展等): 仅把越界鱼夹回容器 (_clampFishesToPool)
   - 大幅变化(横竖屏旋转 / 分屏拖动 / 窗口大改): 对"未锁定且未在拖拽中"
     的鱼整体重新散布 — 旧版只做夹紧, 转屏后所有鱼会挤到同一条边或角上,
     仍然没法玩。已锁定(答对归位)的鱼位置由 Game.js 管理, 不动。
   */
  _handleViewportChange() {
    if (!this.pool) return;
    const rect = this.pool.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    const prevH = this._lastPoolH || 0;
    const prevW = this._lastPoolW || 0;
    this._lastPoolH = rect.height;
    this._lastPoolW = rect.width;

    const bigChange =
      prevH > 0 && Math.abs(rect.height - prevH) / Math.max(prevH, 1) > 0.3;

    if (bigChange && this.fishes.some((f) => !f.locked)) {
      this._redistributeUnlocked();
    } else {
      this._clampFishesToPool();
    }
  }

  /** v19: 大幅视口变化时重新散布未锁定的鱼 (保留相对"随机感", 不打断游戏状态) */
  _redistributeUnlocked() {
    const movable = this.fishes.filter(
      (f) => !f.locked && !f.el.classList.contains('dragging')
    );
    if (!movable.length) return;
    const rect = this.pool.getBoundingClientRect();
    const m = layoutMetrics(rect);
    this._m = m;

    // 已占用点: 锁定鱼 + 拖拽中鱼的当前中心 (新散布要避开它们)
    const occupied = [];
    this.fishes.forEach((f) => {
      if (f.locked || f.el.classList.contains('dragging')) {
        const r = f.el.getBoundingClientRect();
        const pr = this.pool.getBoundingClientRect();
        occupied.push({
          x: r.left + r.width / 2 - pr.left,
          y: r.top + r.height / 2 - pr.top,
        });
      }
    });

    const padL = Math.max(m.padX, m.slotW / 2);
    const padR = rect.width - m.padX - m.slotW / 2;
    const padT = m.slotH / 2 - m.overY;
    const padB = rect.height - m.slotH / 2;
    const minDistSq = m.minDist * m.minDist;

    movable.forEach((fish) => {
      let best = null;
      let bestScore = -Infinity;
      for (let t = 0; t < 70; t++) {
        const cx = padL + Math.random() * Math.max(1, padR - padL);
        const cy = padT + Math.random() * Math.max(1, padB - padT);
        let dmin = Infinity;
        for (const c of occupied) {
          const dx = c.x - cx, dy = c.y - cy;
          dmin = Math.min(dmin, dx * dx + dy * dy);
        }
        if (dmin >= minDistSq) { best = { cx, cy }; break; }
        if (dmin > bestScore) { bestScore = dmin; best = { cx, cy }; }
      }
      if (!best) return;
      const left = Math.round(best.cx - m.slotW / 2);
      const top = Math.round(best.cy - m.slotH / 2);
      fish.originalLeft = left;
      fish.originalTop = top;
      fish.el.style.width = `${m.slotW}px`;
      fish.el.style.height = `${m.slotH}px`;
      fish.el.style.transition = 'left 260ms ease-out, top 260ms ease-out';
      fish.el.style.left = `${left}px`;
      fish.el.style.top = `${top}px`;
      setTimeout(() => { fish.el.style.transition = ''; }, 300);
      occupied.push({ x: best.cx, y: best.cy });
    });
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

    // Poisson-disc-like: 每条新鱼至少 minDist 远离已放置的鱼
    // v19: 全部几何量来自 layoutMetrics(rect) — 容器矮时自动缩小鱼体,
    // 避免"7 条鱼挤成一条带"的退化布局。
    const m = layoutMetrics(rect);
    this._m = m; // _spawnSourceShadow 等后续读取同一套参数

    const padL = m.padX;
    const padR = rect.width - m.padX - m.slotW;
    const padT = -m.overY;
    const padB = rect.height - m.slotH;
    const MIN_DIST = m.minDist;
    const MIN_DIST_SQ = MIN_DIST * MIN_DIST;
    const MAX_TRIES_PER_FISH = 90;
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

      // v19 审查 F-08: 不再 inline 写 touchAction='manipulation' —
      // 它会反向覆盖 CSS 的 .fish{touch-action:none}, 让浏览器有机会
      // 把单指拖拽认领成 pan 手势后 pointercancel, 症状是"拖一半鱼自己飞回去"。
      wrap.style.webkitUserSelect = 'none';
      wrap.style.userSelect = 'none';
      wrap.style.webkitTapHighlightColor = 'transparent';

      // 随机中心点范围 (注意这里算的是 CENTER) — v19: 用 m.* 参数化
      const cxMin = padL + m.slotW / 2;
      const cxMax = padR - m.slotW / 2;
      const cyMin = padT + m.slotH / 2;
      const cyMax = padB - m.slotH / 2;
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

      const left = cx - m.slotW / 2;
      const top = cy - m.slotH / 2;
      wrap.style.left = `${left}px`;
      wrap.style.top = `${top}px`;
      wrap.style.width = `${m.slotW}px`;
      wrap.style.height = `${m.slotH}px`;
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
      // v19.2 真机修复 (L2 点鱼无反应): 点选模式不再把希望寄托在
      // iOS 是否合成 click。部分 PWA 会在 touch-action/全局手势拦截后
      // 不合成 click, 所以在 pointerdown 里直接触发一次 onTap；同时
      // 记住同一元素的时间戳, 下面的 click 兜底会自动被抑制，不会双播。
      if (this._dragEnabled === false) {
        const now = Date.now();
        if (now - (this._lastTapTime || 0) < 250 && this._lastTapEl === el) return;
        this._lastTapTime = now;
        this._lastTapEl = el;
        if (typeof this.onTap === 'function') {
          try { this.onTap(el); } catch (err) { console.warn(err); }
        }
        return;
      }
      // v19: 防重复只针对"同一条鱼"。旧版全池共用一把时间戳,
      // 孩子在两条鱼之间快速切换(<250ms)时第二条会被吞 —— 与全局
      // 拦截层的元素身份制保持同一哲学。
      const now = Date.now();
      if (now - (this._lastTapTime || 0) < 250 && this._lastTapEl === el) return;
      this._lastTapTime = now;
      this._lastTapEl = el;
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
      // 防重复点击 — 与 pointerdown 同一套"同一元素才拦截"规则
      const now = Date.now();
      if (now - (this._lastTapTime || 0) < 250 && this._lastTapEl === el) return;
      this._lastTapTime = now;
      this._lastTapEl = el;
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
    // v19: 用鱼元素的实际渲染尺寸而不是编译期常量
    const w = fish.el.offsetWidth || (this._m ? this._m.slotW : FISH_SLOT_W);
    const h = fish.el.offsetHeight || (this._m ? this._m.slotH : FISH_SLOT_H);
    shadow.style.left = `${fish.originalLeft + w / 2}px`;
    shadow.style.top = `${fish.originalTop + h / 2}px`;
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
      // v19: 参数化几何
      const m = layoutMetrics(rect);
      this._m = m;
      const padL = m.padX;
      const padR = rect.width - m.padX - m.slotW;
      const padT = -m.overY;
      const padB = rect.height - m.slotH;
      const MIN_DIST = m.minDist;
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
        const cxMin = padL + m.slotW / 2;
        const cxMax = padR - m.slotW / 2;
        const cyMin = padT + m.slotH / 2;
        const cyMax = padB - m.slotH / 2;
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

        fish.originalLeft = cx - m.slotW / 2;
        fish.originalTop = cy - m.slotH / 2;
        // v19: 鱼体尺寸也同步到当前参数化值 (reset 时容器可能已变化)
        fish.el.style.width = `${m.slotW}px`;
        fish.el.style.height = `${m.slotH}px`;
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
