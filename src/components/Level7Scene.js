/**
 * Level 7 scene: 森林树屋 + 7 级台阶
 *
 * 元素:
 *  - 天空 + 远山 + 飘浮气泡 (黄绿渐变背景, 升入云端的氛围)
 *  - 中央: 一棵高耸的树 (树干 + 多层树冠)
 *  - 树顶: 树屋 (木头房子 + 三角顶 + 圆窗) — 7/7 时全树屋发光
 *  - 7 级台阶音符座环绕树干 (按 Do→Si 螺旋上升排列, Do 最低, Si 最高 = 接近树屋)
 *  - 太阳 / 飘浮小鸟 / 飘浮小气泡
 *
 * 真正的鱼池 (.fish-pool) 由 Level7.js 调用 FishPool 创建, 不在 Scene 中.
 *
 * 增强 (polish):
 *  - 加 .level7-treehouse-glow (圆窗周围大光圈), 7/7 时 JS 加 .level7-treehouse-lit
 *  - 加 .level7-ribbon-layer — DOM 层, 由 JS 在鱼飞过去时画 SVG 飘带
 *  - 小鸟更多, 飞行轨迹更明显 (3-4 只, 横向飞行)
 */
import { SVG_NS } from '../utils/svg.js';

export class Level7Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level7-background';
    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 太阳 -->
        <circle class="level7-sun" cx="700" cy="80" r="40" fill="#fff8a8" opacity="0.85" />
        <circle class="level7-sun-glow" cx="700" cy="80" r="60" fill="#fff8a8" opacity="0.25" />

        <!-- 远山 (背景层) -->
        <path class="level7-mountains"
              d="M0,300 L100,200 L200,250 L350,180 L500,220 L650,180 L800,250 L800,500 L0,500 Z" />

        <!-- 高树 + 树屋 (中央) -->
        <g class="level7-tree" transform="translate(400, 480)">
          <!-- 影子 -->
          <ellipse cx="0" cy="0" rx="120" ry="14" fill="rgba(0,0,0,0.28)" />

          <!-- 树干 -->
          <rect x="-20" y="-280" width="40" height="280" fill="#5d3a1a" />
          <!-- 树干纹路 -->
          <line x1="-10" y1="-260" x2="-10" y2="-40" stroke="#3d2410" stroke-width="2" opacity="0.4" />
          <line x1="8" y1="-240" x2="8" y2="-60" stroke="#3d2410" stroke-width="2" opacity="0.4" />

          <!-- 树冠 (多层) -->
          <ellipse class="level7-leaves" cx="0" cy="-310" rx="120" ry="70" fill="#2d5a2d" />
          <ellipse class="level7-leaves" cx="-60" cy="-340" rx="70" ry="45" fill="#3a6e3a" />
          <ellipse class="level7-leaves" cx="60" cy="-340" rx="70" ry="45" fill="#3a6e3a" />
          <ellipse class="level7-leaves" cx="0" cy="-380" rx="90" ry="55" fill="#457f45" />

          <!-- 树屋 -->
          <g class="level7-treehouse">
            <!-- 屋身 -->
            <rect x="-35" y="-420" width="70" height="55" fill="#8b4513" />
            <!-- 木纹 -->
            <line x1="-35" y1="-405" x2="35" y2="-405" stroke="#5d3a1a" stroke-width="1.5" opacity="0.5" />
            <line x1="-35" y1="-390" x2="35" y2="-390" stroke="#5d3a1a" stroke-width="1.5" opacity="0.5" />
            <!-- 屋顶 -->
            <polygon points="-40,-420 0,-445 40,-420" fill="#654321" />
            <!-- 圆窗外发光晕 (由 .level7-treehouse-lit 控制) -->
            <circle class="level7-treehouse-glow" cx="0" cy="-395" r="22" fill="#ffd166" opacity="0" />
            <!-- 圆窗 -->
            <circle cx="0" cy="-395" r="9" fill="#fff8a8" />
            <circle cx="0" cy="-395" r="9" fill="none" stroke="#3d2410" stroke-width="1.5" />
            <!-- 门 -->
            <rect x="-6" y="-380" width="12" height="15" fill="#3d2410" />
          </g>

          <!-- 7 级台阶 + 音符座 (螺旋上升: Do 最低 → Si 最高) -->
          <g class="level7-steps">
            <g class="level7-step" data-note="do" transform="translate(-80, -120)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="re" transform="translate(-50, -160)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="mi" transform="translate(0, -185)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="fa" transform="translate(50, -210)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="sol" transform="translate(50, -250)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="la" transform="translate(-40, -280)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="si" transform="translate(0, -340)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
          </g>
        </g>

        <!-- 飘浮气泡 (装饰) -->
        <g class="level7-bubbles">
          <circle class="level7-bubble" cx="100" cy="150" r="6" fill="rgba(255,255,255,0.55)" />
          <circle class="level7-bubble" cx="150" cy="100" r="4" fill="rgba(255,255,255,0.45)" />
          <circle class="level7-bubble" cx="60"  cy="220" r="5" fill="rgba(255,255,255,0.5)" />
          <circle class="level7-bubble" cx="700" cy="200" r="6" fill="rgba(255,255,255,0.55)" />
          <circle class="level7-bubble" cx="650" cy="160" r="4" fill="rgba(255,255,255,0.45)" />
          <circle class="level7-bubble" cx="750" cy="280" r="5" fill="rgba(255,255,255,0.5)" />
        </g>

        <!-- 飘浮小鸟 — 更多 + 飞行轨迹更明显 -->
        <g class="level7-birds" fill="none" stroke="rgba(54, 83, 20, 0.85)"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path class="level7-bird level7-bird--fly1" d="M-30,140 q6,-6 12,0 q6,-6 12,0" />
          <path class="level7-bird level7-bird--fly2" d="M-30,90 q5,-5 10,0 q5,-5 10,0" />
          <path class="level7-bird level7-bird--fly3" d="M-30,200 q5,-5 10,0 q5,-5 10,0" />
          <path class="level7-bird level7-bird--fly4" d="M-30,260 q6,-6 12,0 q6,-6 12,0" />
        </g>
      </svg>

      <!-- 飘带层 — DOM 元素, JS 在鱼飞向台阶时插入 SVG 飘带 -->
      <div class="level7-ribbon-layer"></div>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  /**
   * 在鱼飞向台阶的过程中画一条 SVG 飘带.
   *  @param {string} noteId  台阶 note (do/re/mi/fa/sol/la/si)
   *  @param {{x:number,y:number}} fromClient  起点 (viewport 坐标)
   *  @param {{x:number,y:number}} toClient    终点 (viewport 坐标)
   *  @param {string} color                       飘带颜色 (鱼的色)
   */
  drawRibbon(noteId, fromClient, toClient, color) {
    if (!this.background) return;
    const layer = this.background.querySelector('.level7-ribbon-layer');
    if (!layer) return;
    const bgRect = this.background.getBoundingClientRect();
    const x1 = fromClient.x - bgRect.left;
    const y1 = fromClient.y - bgRect.top;
    const x2 = toClient.x - bgRect.left;
    const y2 = toClient.y - bgRect.top;

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${bgRect.width} ${bgRect.height}`);
    svg.setAttribute('width', bgRect.width);
    svg.setAttribute('height', bgRect.height);
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.pointerEvents = 'none';
    svg.setAttribute('class', 'level7-ribbon-svg');

    // 贝塞尔曲线, 中间拱起
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 60 - Math.random() * 30;
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', `M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '6');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    path.setAttribute('opacity', '0.85');
    path.setAttribute('class', 'level7-ribbon-path');
    // stroke-dasharray 让飘带"画出来"
    path.setAttribute('stroke-dasharray', `${Math.hypot(x2 - x1, y2 - y1)}`);
    path.setAttribute('stroke-dashoffset', `${Math.hypot(x2 - x1, y2 - y1)}`);
    svg.appendChild(path);
    layer.appendChild(svg);

    // 触发动画
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 0.55s ease-out, opacity 0.55s ease-out';
      path.setAttribute('stroke-dashoffset', '0');
    });

    // 0.7s 后淡出移除
    setTimeout(() => {
      path.setAttribute('opacity', '0');
      setTimeout(() => { try { svg.remove(); } catch (_) {} }, 600);
    }, 700);
  }

  /** 触发树屋点亮 (7/7 通关时调用) */
  lightTreehouse() {
    if (!this.background) return;
    this.background.classList.add('level7-lit');
    // 给每个台阶添加 .level7-step-complete
    this.background.querySelectorAll('.level7-step').forEach((el) => {
      el.classList.add('level7-step-complete');
    });
  }

  /** 关闭树屋点亮 (teardown 时复位) */
  dimTreehouse() {
    if (!this.background) return;
    this.background.classList.remove('level7-lit');
    this.background.querySelectorAll('.level7-step').forEach((el) => {
      el.classList.remove('level7-step-complete');
    });
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}

export default Level7Scene;