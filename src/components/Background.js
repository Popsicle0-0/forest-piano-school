/**
 * 背景 - 远山 / 树 / 河岸 / 流水
 * 全用 SVG + CSS 渐变,不依赖位图
 */
export class Background {
  constructor(root) {
    this.root = root;
    this.render();
  }

  render() {
    const layer = document.createElement('div');
    layer.className = 'bg';
    layer.style.cssText = `
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background: linear-gradient(180deg,
        #d4ecdd 0%,
        #b6dcc6 25%,
        #a8dadc 50%,
        #79c2c8 75%,
        #5fa8b5 100%);
    `;
    layer.innerHTML = `
      <svg viewBox="0 0 1024 600" preserveAspectRatio="xMidYMax slice" style="width:100%;height:100%;position:absolute;inset:0;">
        <!-- 远山 -->
        <path d="M0 220 Q 150 140 320 200 T 640 200 T 1024 220 L 1024 320 L 0 320 Z"
              fill="#9bc6a3" opacity="0.55"/>
        <path d="M0 260 Q 200 200 400 240 T 800 240 T 1024 260 L 1024 340 L 0 340 Z"
              fill="#7fb591" opacity="0.6"/>

        <!-- 河岸树 -->
        <g opacity="0.85">
          <ellipse cx="120" cy="160" rx="80" ry="60" fill="#6fa078"/>
          <rect x="115" y="180" width="10" height="40" fill="#5a3a2a"/>
          <ellipse cx="900" cy="170" rx="100" ry="70" fill="#6fa078"/>
          <rect x="895" y="195" width="10" height="40" fill="#5a3a2a"/>
        </g>

        <!-- 河面水波 -->
        <g stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none">
          <path d="M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460;
                      M0 460 Q 80 465 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460;
                      M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460"/>
          </path>
          <path d="M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500">
            <animate attributeName="d" dur="7s" repeatCount="indefinite"
              values="M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500;
                      M0 500 Q 100 505 200 500 T 400 500 T 600 500 T 800 500 T 1024 500;
                      M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500"/>
          </path>
        </g>

        <!-- 漂浮气泡 -->
        <g fill="white" opacity="0.6">
          <circle cx="200" cy="500" r="5"><animate attributeName="cy" from="500" to="300" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.6;0" dur="8s" repeatCount="indefinite"/></circle>
          <circle cx="420" cy="520" r="3"><animate attributeName="cy" from="520" to="320" dur="10s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="10s" repeatCount="indefinite"/></circle>
          <circle cx="650" cy="510" r="4"><animate attributeName="cy" from="510" to="310" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="9s" repeatCount="indefinite"/></circle>
          <circle cx="850" cy="530" r="3"><animate attributeName="cy" from="530" to="330" dur="11s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="11s" repeatCount="indefinite"/></circle>
        </g>
      </svg>
    `;
    this.root.appendChild(layer);
  }
}

// 前景由 FishPool + PianoKeyboard 自行覆盖(本类只画最远的远山/树/河岸/水波)
