/**
 * 森林制琴工坊的远景舞台。
 * 只绘制不接收事件的环境层；玩法对象由 Game / FishPool / PianoKeyboard 叠在上面。
 * 视觉命题：雾、木、河玻璃与一束稳定的左上工坊光。
 */
import { SVG_NS } from '../utils/svg.js';

export class Background {
  constructor(root) {
    this.root = root;
    this.render();
  }

  render() {
    const layer = document.createElement('div');
    layer.className = 'bg atelier-bg';
    layer.innerHTML = `
      <svg class="atelier-bg__art" viewBox="0 0 1024 600" preserveAspectRatio="xMidYMax slice" xmlns="${SVG_NS}" aria-hidden="true">
        <defs>
          <linearGradient id="atelier-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#dce9df"/>
            <stop offset="0.52" stop-color="#b8d1c6"/>
            <stop offset="1" stop-color="#719aa0"/>
          </linearGradient>
          <linearGradient id="atelier-water" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0" stop-color="#94c4c4"/>
            <stop offset="0.5" stop-color="#669ba2"/>
            <stop offset="1" stop-color="#385d68"/>
          </linearGradient>
          <linearGradient id="atelier-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#79563c"/>
            <stop offset="0.55" stop-color="#533a2f"/>
            <stop offset="1" stop-color="#30272a"/>
          </linearGradient>
          <filter id="atelier-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#213f46" flood-opacity=".22"/>
          </filter>
          <filter id="atelier-paper-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="11"/>
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .08 0"/>
          </filter>
        </defs>
        <rect width="1024" height="600" fill="url(#atelier-sky)"/>
        <!-- 远景纸雕山脊 -->
        <path d="M0 238 C110 174 190 208 280 166 S450 176 536 132 S720 170 824 126 S950 168 1024 142 V360 H0Z" fill="#9ebdaf" opacity=".55"/>
        <path d="M0 302 C120 246 208 274 306 226 S490 260 594 206 S770 252 876 210 S970 232 1024 218 V410 H0Z" fill="#789b91" opacity=".72"/>
        <!-- 左上工坊光 -->
        <path d="M0 0 H410 Q300 118 250 278 Q118 238 0 262Z" fill="#fff8e8" opacity=".18"/>
        <circle cx="160" cy="104" r="90" fill="#f7dfad" opacity=".16"/>
        <!-- 木质近岸 -->
        <path d="M0 398 C160 362 260 406 380 382 S620 370 744 396 S910 362 1024 388 V480 H0Z" fill="url(#atelier-wood)" opacity=".9" filter="url(#atelier-soft-shadow)"/>
        <path d="M0 414 C140 382 262 424 386 402 S610 392 760 414 S920 390 1024 406" fill="none" stroke="#a67d55" stroke-width="3" opacity=".38"/>
        <path d="M0 430 C150 402 260 444 390 420 S610 414 760 434 S910 414 1024 426" fill="none" stroke="#2b2530" stroke-width="2" opacity=".34"/>
        <!-- 河玻璃 -->
        <path d="M0 448 C150 420 280 466 412 442 S660 430 780 458 S920 438 1024 450 V600 H0Z" fill="url(#atelier-water)"/>
        <path d="M0 480 C140 460 270 496 410 474 S650 468 790 490 S920 472 1024 482" fill="none" stroke="#d8f0e6" stroke-width="3" opacity=".42"/>
        <path d="M0 522 C160 500 280 536 430 516 S670 506 820 532 S930 514 1024 520" fill="none" stroke="#d8f0e6" stroke-width="2" opacity=".25"/>
        <!-- 手工木桩剪影 -->
        <g fill="#3c3030" opacity=".82">
          <path d="M94 415 V250 Q116 220 138 250 V415Z"/>
          <path d="M70 282 Q116 228 162 282 Q146 272 116 276 Q88 272 70 282Z"/>
          <path d="M884 410 V236 Q908 206 932 236 V410Z"/>
          <path d="M850 270 Q908 202 966 270 Q940 256 908 262 Q876 256 850 270Z"/>
        </g>
        <!-- 克制的水面反光，不使用持续发光粒子 -->
        <g class="atelier-bg__ripples" fill="none" stroke="#f4f0dc" stroke-linecap="round">
          <path d="M118 510 q45 -13 90 0" opacity=".38" stroke-width="3"/>
          <path d="M690 548 q58 -16 116 0" opacity=".3" stroke-width="3"/>
          <path d="M360 570 q34 -9 68 0" opacity=".24" stroke-width="2"/>
        </g>
        <rect width="1024" height="600" filter="url(#atelier-paper-grain)" opacity=".32"/>
      </svg>
      <div class="atelier-bg__vignette" aria-hidden="true"></div>
    `;
    this.root.appendChild(layer);
    this.layer = layer;
  }
}
