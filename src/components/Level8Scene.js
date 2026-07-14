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
 *
 * v18.1: 加 🎤 麦克风 (钢琴左前方) + 4 位动物观众 (兔子/熊/鹿/狐狸)
 *        答对时 .level8-cheer 加给整组, 举手摆动一次
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

        <!-- v18.1: 🎤 麦克风 (钢琴左前方) -->
        <g class="level8-mic" transform="translate(255, 380)">
          <!-- 底座 -->
          <ellipse cx="0" cy="34" rx="14" ry="3" fill="#1a1420" />
          <rect x="-2" y="-2" width="4" height="34" fill="#444" />
          <!-- 麦克风头 -->
          <ellipse class="level8-mic-head" cx="0" cy="-10" rx="11" ry="14" fill="#3d2b1a" />
          <ellipse class="level8-mic-head" cx="0" cy="-10" rx="9" ry="12" fill="#ffd166" opacity="0.9" />
          <line x1="-7" y1="-14" x2="7" y2="-14" stroke="#3d2b1a" stroke-width="1" />
          <line x1="-7" y1="-10" x2="7" y2="-10" stroke="#3d2b1a" stroke-width="1" />
          <line x1="-7" y1="-6" x2="7" y2="-6" stroke="#3d2b1a" stroke-width="1" />
          <line x1="0" y1="-22" x2="0" y2="-26" stroke="#ffd166" stroke-width="1.4" />
          <line x1="-4" y1="-24" x2="4" y2="-24" stroke="#ffd166" stroke-width="1.4" />
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

        <!-- v18.1: 动物观众 (4 位, 站在台前, cheer 时举手) -->
        <g class="level8-audience" id="level8-audience">
          <!-- 🐰 兔子 -->
          <g class="level8-animal level8-animal--rabbit" transform="translate(110, 430)">
            <ellipse cx="0" cy="22" rx="22" ry="6" fill="rgba(0,0,0,0.25)" />
            <!-- 头 -->
            <circle cx="0" cy="0" r="14" fill="#f7e1d0" />
            <!-- 长耳朵 -->
            <ellipse cx="-6" cy="-14" rx="3" ry="10" fill="#f7e1d0" />
            <ellipse cx="6" cy="-14" rx="3" ry="10" fill="#f7e1d0" />
            <ellipse cx="-6" cy="-13" rx="1.5" ry="7" fill="#f4b5b5" />
            <ellipse cx="6" cy="-13" rx="1.5" ry="7" fill="#f4b5b5" />
            <!-- 眼/嘴 -->
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <path d="M-2,3 Q0,5 2,3" stroke="#1a1420" stroke-width="0.8" fill="none" />
            <!-- 身体 -->
            <ellipse cx="0" cy="18" rx="14" ry="10" fill="#fff" />
            <!-- 左手臂 (静止下垂, cheer 时举起) -->
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="14" x2="-18" y2="22" stroke="#f7e1d0" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="14" x2="18" y2="22" stroke="#f7e1d0" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🐻 熊 -->
          <g class="level8-animal level8-animal--bear" transform="translate(220, 440)">
            <ellipse cx="0" cy="20" rx="24" ry="6" fill="rgba(0,0,0,0.3)" />
            <circle cx="0" cy="0" r="16" fill="#a37148" />
            <circle cx="-11" cy="-10" r="5" fill="#a37148" />
            <circle cx="11" cy="-10" r="5" fill="#a37148" />
            <circle cx="-11" cy="-10" r="2.5" fill="#d4a373" />
            <circle cx="11" cy="-10" r="2.5" fill="#d4a373" />
            <circle cx="-5" cy="-2" r="1.8" fill="#1a1420" />
            <circle cx="5" cy="-2" r="1.8" fill="#1a1420" />
            <ellipse cx="0" cy="5" rx="4" ry="3" fill="#f4d4a8" />
            <circle cx="0" cy="5" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="18" ry="12" fill="#8b5a3c" />
            <g class="level8-animal-arm-l">
              <line x1="-14" y1="12" x2="-20" y2="22" stroke="#a37148" stroke-width="5" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="14" y1="12" x2="20" y2="22" stroke="#a37148" stroke-width="5" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🦌 鹿 -->
          <g class="level8-animal level8-animal--deer" transform="translate(580, 440)">
            <ellipse cx="0" cy="20" rx="24" ry="6" fill="rgba(0,0,0,0.3)" />
            <ellipse cx="0" cy="0" rx="13" ry="14" fill="#c08552" />
            <!-- 鹿角 -->
            <path d="M-7,-12 L-12,-22 L-9,-18 L-14,-26 M-7,-12 L-5,-20"
                  stroke="#3d2b1a" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M7,-12 L12,-22 L9,-18 L14,-26 M7,-12 L5,-20"
                  stroke="#3d2b1a" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="4" rx="2" ry="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="15" ry="10" fill="#a37148" />
            <!-- 鹿斑 -->
            <circle cx="-6" cy="14" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="6" cy="14" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="0" cy="18" r="1.5" fill="#fff" opacity="0.6" />
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="12" x2="-18" y2="22" stroke="#c08552" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="12" x2="18" y2="22" stroke="#c08552" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🦊 狐狸 -->
          <g class="level8-animal level8-animal--fox" transform="translate(690, 440)">
            <ellipse cx="0" cy="20" rx="22" ry="6" fill="rgba(0,0,0,0.3)" />
            <!-- 狐狸头 (尖脸朝右, 但我们居中画) -->
            <ellipse cx="0" cy="0" rx="13" ry="13" fill="#e07a3f" />
            <polygon points="-9,-9 -16,-15 -7,-12" fill="#e07a3f" />
            <polygon points="9,-9 16,-15 7,-12" fill="#e07a3f" />
            <polygon points="-7,-9 -12,-13 -7,-12" fill="#1a1420" />
            <polygon points="7,-9 12,-13 7,-12" fill="#1a1420" />
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="5" rx="3" ry="2" fill="#fff" />
            <circle cx="0" cy="5" r="1.2" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="15" ry="10" fill="#c25e1f" />
            <ellipse cx="0" cy="14" rx="6" ry="5" fill="#fff" opacity="0.85" />
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="12" x2="-18" y2="22" stroke="#e07a3f" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="12" x2="18" y2="22" stroke="#e07a3f" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>
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
