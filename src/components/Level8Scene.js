/**
 * Level 8 场景: 森林音乐会 + 舞台
 *
 * 元素:
 *  - 暗紫/深蓝天幕 (夜晚剧场, 渐变)
 *  - 红色帷幕左右 (SVG path, 带金色流苏线)
 *  - 3 道聚光灯 (中心最大, 缓动呼吸)
 *  - 钢琴剪影 (中下方)
 *  - 萤火虫 (6 颗小圆点, 摆动动画)
 *  - 顶部灯牌文字 "🎵 森林音乐会 🎵"
 *
 * 选曲界面 (.level8-song-list) 与五线谱 (.level8-staff-area) 是 Level8.js
 * 创建的 DOM, 不归 Scene 管.
 */
import { SVG_NS } from '../utils/svg.js';

export class Level8Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level8-background';

    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 帷幕左 -->
        <path class="level8-curtain"
              d="M0,0 L0,500 L80,500 Q120,400 100,300 Q150,200 80,150 Q120,80 60,0 Z"
              fill="#8c2434" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
        <!-- 帷幕右 -->
        <path class="level8-curtain level8-curtain-r"
              d="M800,0 L800,500 L720,500 Q680,400 700,300 Q650,200 720,150 Q680,80 740,0 Z"
              fill="#8c2434" stroke="rgba(0,0,0,0.3)" stroke-width="1" />

        <!-- 帷幕花纹 (金色流苏线) -->
        <line x1="0" y1="0" x2="80" y2="500"
              stroke="rgba(255, 200, 100, 0.4)" stroke-width="2" />
        <line x1="800" y1="0" x2="720" y2="500"
              stroke="rgba(255, 200, 100, 0.4)" stroke-width="2" />

        <!-- 聚光灯 3 道 (中心最大) -->
        <polygon class="level8-spotlight level8-spotlight-c"
                 points="400,0 200,500 600,500"
                 fill="rgba(255, 235, 168, 0.15)" />
        <polygon class="level8-spotlight"
                 points="250,0 100,500 250,500"
                 fill="rgba(255, 235, 168, 0.08)" />
        <polygon class="level8-spotlight"
                 points="550,0 550,500 700,500"
                 fill="rgba(255, 235, 168, 0.08)" />

        <!-- 钢琴剪影 (中下方) -->
        <g class="level8-piano-shape" transform="translate(400, 400)">
          <rect x="-140" y="-50" width="280" height="60" rx="4" fill="#1a1420" />
          <rect x="-130" y="-45" width="260" height="50" fill="#3d2b1a" />
          <rect x="-130" y="-45" width="260" height="20" fill="rgba(0,0,0,0.4)" />
        </g>

        <!-- 萤火虫 (6 颗) -->
        <g class="level8-fireflies">
          <circle cx="150" cy="200" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
          <circle cx="180" cy="250" r="2" fill="rgba(255, 235, 100, 0.7)" class="level8-firefly" />
          <circle cx="660" cy="180" r="3" fill="rgba(255, 235, 100, 0.8)" class="level8-firefly" />
          <circle cx="630" cy="240" r="2" fill="rgba(255, 235, 100, 0.7)" class="level8-firefly" />
          <circle cx="120" cy="350" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
          <circle cx="680" cy="380" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
        </g>

        <!-- 顶部舞台灯牌 -->
        <text x="400" y="60" text-anchor="middle" class="level8-stage-text">
          🎵 森林音乐会 🎵
        </text>
      </svg>
    `;

    this.stage.appendChild(bg);
    this.background = bg;
  }

  /**
   * 渲染 6 个曲目卡片到指定容器, 点击触发 onSelect(song).
   * 包含难度 (★ / ★★ / ★★★) 标识, 供孩子直观看到曲子难度.
   * @param {HTMLElement} container
   * @param {(song: {id:string,name:string,emoji:string,diff:string,difficulty:number,melody:string[]}) => void} onSelect
   */
  showSongSelector(container, onSelect) {
    const songs = [
      { id: 'twinkle',  name: '小星星',   emoji: '⭐',  diff: '★',   difficulty: 1, melody: ['C4','C4','G4','G4','A4','A4','G4','F4','F4','E4','E4','D4','D4','C4'] },
      { id: 'birthday', name: '生日快乐', emoji: '🎂',  diff: '★',   difficulty: 1, melody: ['C4','C4','D4','C4','F4','E4','C4','C4','D4','C4','G4','F4'] },
      { id: 'london',   name: '伦敦桥',   emoji: '🌉',  diff: '★★',  difficulty: 2, melody: ['C4','D4','E4','F4','G4','G4','A4','G4','F4','E4','D4','C4'] },
      { id: 'joy',      name: '欢乐颂',   emoji: '🎉',  diff: '★★',  difficulty: 2, melody: ['E4','E4','F4','G4','G4','F4','E4','D4','C4','C4','D4','E4','E4','D4','D4'] },
      { id: 'frog',     name: '小青蛙',   emoji: '🐸',  diff: '★★',  difficulty: 2, melody: ['C4','D4','E4','F4','E4','D4','C4'] },
      { id: 'molihua',  name: '茉莉花',   emoji: '🌸',  diff: '★★★', difficulty: 3, melody: ['C4','E4','G4','A4','G4','E4','C4','D4','E4','F4','E4','D4','C4'] },
    ];

    const html = songs.map((s) => `
      <button class="level8-song-card level8-diff-${s.difficulty}" data-song="${s.id}">
        <div class="level8-song-emoji">${s.emoji}</div>
        <div class="level8-song-name">${s.name}</div>
        <div class="level8-song-len">${s.melody.length} 音</div>
        <div class="level8-song-diff">${s.diff}</div>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="level8-song-list">
        <div class="level8-song-list-title">🎼 选一首曲子开始演奏</div>
        <div class="level8-song-cards">${html}</div>
      </div>
    `;

    container.querySelectorAll('.level8-song-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.song;
        const song = songs.find((s) => s.id === id);
        if (song && typeof onSelect === 'function') onSelect(song);
      });
    });
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}

export default Level8Scene;
