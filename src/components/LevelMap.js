/**
 * 关卡地图选择器 - 16 关卡的网格
 */
export const CONTINUE_KEY = 'forest-piano-last-level';

// mechanic → hover 提示图标 (鱼 + 玩法元素)
const MECHANIC_ICONS = {
  'drag-up':        '⬆️🐟',
  'listen-pick':    '🎵🐟',
  'mountain-sort':  '🏔️🎵',
  'drum-rhythm':    '🥁🫧',
  'staff-fall':     '⭐🎼',
  'two-hand':       '🖐️🎹',
  'treehouse-build':'🌳🏠',
  'concert-stage':  '🎭🎶',
  'black-keys':     '🖤🎹',
  'octave-pick':    '🎹⇅',
  'memory-match':   '🎴🃏',
  'tempo-cut':      '🥁🍅',
  'metronome-tap':  '⏱️🥁',
  'chord-build':    '🎶🐟',
  'staff-read':     '🎼⚡',
  'speed-ramp':     '🚀⚡',
};

export const LEVEL_META = [
  { id: 1,  name: '小鱼跳进五线谱', emoji: '🐟', desc: '帮 7 条小鱼找到五线谱的家',   theme: '#5fa8b5', mechanic: 'drag-up' },
  { id: 2,  name: '听!是谁在唱',    emoji: '🎵', desc: '系统播音, 找出对应的鱼',      theme: '#264653', mechanic: 'listen-pick' },
  { id: 3,  name: 'Mi-Sol 山谷',    emoji: '🏔️', desc: '柯尔文爷爷教五声音阶',        theme: '#e76f51', mechanic: 'mountain-sort' },
  { id: 4,  name: '节奏小河',       emoji: '🥁', desc: '跟着节拍泡泡敲鼓',            theme: '#1a3a4a', mechanic: 'drum-rhythm' },
  { id: 5,  name: '小星星视奏',     emoji: '⭐', desc: '跟着五线谱弹小星星',          theme: '#2a2050', mechanic: 'staff-fall' },
  { id: 6,  name: '双手协调',       emoji: '🎹', desc: '钢琴老师教双手按双音',        theme: '#d4a574', mechanic: 'two-hand' },
  { id: 7,  name: '树屋 7 音阶',    emoji: '🌳', desc: '爬上树屋看完整七音阶',        theme: '#65a30d', mechanic: 'treehouse-build' },
  { id: 8,  name: '森林音乐会',     emoji: '🎭', desc: '选曲并演奏森林音乐会',        theme: '#3d0a55', mechanic: 'concert-stage' },
  { id: 9,  name: '黑键世界',       emoji: '🖤', desc: '听声, 按顺序点黑键',          theme: '#2a0a55', mechanic: 'black-keys' },
  { id: 10, name: '八度之旅',       emoji: '🎹', desc: '听音 — 是低八度还是高八度?',  theme: '#1e3a5f', mechanic: 'octave-pick' },
  { id: 11, name: '翻牌记忆',       emoji: '🎴', desc: '翻开两张牌找一样的朋友',      theme: '#d96e8a', mechanic: 'memory-match' },
  { id: 12, name: '番茄节奏',       emoji: '🥁', desc: '跟着摆杆切菜 — 命中节拍!',   theme: '#c0392b', mechanic: 'tempo-cut' },
  { id: 13, name: '节奏大师',       emoji: '⏱️', desc: '跟随节拍器逐渐加速,敲准 30 拍', theme: '#8b4513', mechanic: 'metronome-tap' },
  { id: 14, name: '和弦建造',       emoji: '🎶', desc: '拖三只鱼组成 C 大调',         theme: '#9b5de5', mechanic: 'chord-build' },
  { id: 15, name: '视奏大师',       emoji: '🎼', desc: '快速读谱 + 按键',              theme: '#457b9d', mechanic: 'staff-read' },
  { id: 16, name: '节奏阶梯',       emoji: '🚀', desc: '速度阶梯挑战',                 theme: '#f4a261', mechanic: 'speed-ramp' },
];

export class LevelMap {
  constructor(stage, { progress, onSelect }) {
    this.stage = stage;
    this.progress = progress;
    this.onSelect = onSelect;
    this.element = null;
  }

  show() {
    // Build map HTML inside .stage (or as overlay)
    const wrap = document.createElement('div');
    wrap.className = 'level-map-overlay';
    wrap.innerHTML = `
      <div class="level-map-card">
        <div class="level-map-title">🌳 森林钢琴学校 🎹</div>
        <div class="level-map-subtitle">选一个关卡开始~</div>
        <div class="level-map-grid">
          ${LEVEL_META.map(m => {
            const stars = this.progress ? this.progress.getStars(m.id) : 0;
            const starStr = stars > 0 ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars) : '☆☆☆';
            const mechIcon = MECHANIC_ICONS[m.mechanic] || '';
            const solfegeHint = (m.id <= 7) ? ['Do','Re','Mi','Fa','Sol','La','Ti'][m.id - 1] : '';
            return `
              <button class="level-map-tile" data-id="${m.id}" data-mechanic="${m.mechanic}" style="--tile-accent: ${m.theme}">
                <div class="level-map-tile__mechanic" aria-hidden="true">${mechIcon}</div>
                <div class="level-map-tile__preview" aria-hidden="true">
                  <span class="level-map-tile__fish">🐟</span>
                  ${solfegeHint ? `<span class="level-map-tile__solfege">${solfegeHint}</span>` : ''}
                </div>
                <div class="level-map-tile__emoji">${m.emoji}</div>
                <div class="level-map-tile__id">第 ${m.id} 关</div>
                <div class="level-map-tile__name">${m.name}</div>
                <div class="level-map-tile__desc">${m.desc}</div>
                <div class="level-map-tile__stars">${starStr}</div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="level-map-footer">v17.8 · 点击卡片开始</div>
      </div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    // --- 继续上次 ---
    let lastLevel = 1;
    try {
      const raw = localStorage.getItem(CONTINUE_KEY);
      const parsed = parseInt(raw, 10);
      if (Number.isFinite(parsed) && parsed >= 1 && parsed <= LEVEL_META.length) {
        lastLevel = parsed;
      }
    } catch (_) { /* localStorage 不可用 */ }

    if (lastLevel && lastLevel !== 1) {
      const cardEl = wrap.querySelector('.level-map-card');
      const continueBtn = document.createElement('button');
      continueBtn.className = 'continue-btn';
      continueBtn.type = 'button';
      continueBtn.innerHTML = `▶ 继续上次: 第 ${lastLevel} 关`;
      continueBtn.addEventListener('click', () => {
        this.hide();
        if (this.onSelect) this.onSelect(lastLevel);
      });
      cardEl.insertBefore(continueBtn, cardEl.firstChild);
    }

    wrap.querySelectorAll('.level-map-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const id = parseInt(tile.dataset.id, 10);
        // 视觉反馈
        tile.classList.add('selected');
        // 记录最后关卡 (供"继续上次"使用)
        try { localStorage.setItem(CONTINUE_KEY, String(id)); } catch (_) {}
        setTimeout(() => {
          if (this.onSelect) this.onSelect(id);
        }, 200);
      });
    });
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}

// v18.8: 把 LEVEL_META 挂到 window, 让 Game.start() 不用 import 即可更新 HUD 徽章
if (typeof window !== 'undefined') {
  window.__forestPiano = window.__forestPiano || {};
  window.__forestPiano.LEVEL_META = LEVEL_META;
}
