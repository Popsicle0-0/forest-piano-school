/**
 * 森林制琴工坊航线地图 - 16 关的章节化探索入口。
 * 保留原有选关/继续进度逻辑，视觉从 emoji 卡片目录改为连续的工坊航线。
 */
import { icon } from '../utils/icons.js';

export const CONTINUE_KEY = 'forest-piano-last-level';

const CHAPTERS = [
  { range: [1, 4], name: '潮池启蒙', desc: '听见第一束回声', material: 'river' },
  { range: [5, 8], name: '月光航线', desc: '沿着灯塔读谱', material: 'moon' },
  { range: [9, 12], name: '深林工坊', desc: '触摸节奏机关', material: 'workshop' },
  { range: [13, 16], name: '回声高塔', desc: '抵达音乐之巅', material: 'tower' },
];

function chapterFor(levelId) {
  return CHAPTERS.find(({ range }) => levelId >= range[0] && levelId <= range[1]) || CHAPTERS[0];
}

function starsMarkup(stars) {
  return Array.from({ length: 3 }, (_, index) =>
    `<span class="route-star ${index < stars ? 'is-earned' : ''}" aria-hidden="true"></span>`
  ).join('');
}

export const LEVEL_META = [
  { id: 1,  name: '音符归航', emoji: '🐟', desc: '让七枚音色贝灵回到乐谱台', theme: '#5fa8b5', mechanic: 'drag-up' },
  { id: 2,  name: '回声寻音', emoji: '🎵', desc: '听见声音，找到回应它的贝灵', theme: '#264653', mechanic: 'listen-pick' },
  { id: 3,  name: '五音山谷', emoji: '🏔️', desc: '先听声音，再走上高低不同的山', theme: '#e76f51', mechanic: 'mountain-sort' },
  { id: 4,  name: '潮汐鼓点', emoji: '🥁', desc: '等回声抵达鼓面，再轻轻敲下', theme: '#1a3a4a', mechanic: 'drum-rhythm' },
  { id: 5,  name: '灯塔视奏', emoji: '⭐', desc: '沿着月光航线弹出第一段旋律', theme: '#2a2050', mechanic: 'staff-fall' },
  { id: 6,  name: '双手灯塔', emoji: '🎹', desc: '让两束灯光同时亮起', theme: '#d4a574', mechanic: 'two-hand' },
  { id: 7,  name: '音阶树屋', emoji: '🌳', desc: '用七个声音铺出上行阶梯', theme: '#65a30d', mechanic: 'treehouse-build' },
  { id: 8,  name: '月湾音乐会', emoji: '🎭', desc: '在月光甲板演奏一首歌', theme: '#3d0a55', mechanic: 'concert-stage' },
  { id: 9,  name: '黑曜琴键', emoji: '🖤', desc: '探索深林工坊里的黑键矿晶', theme: '#2a0a55', mechanic: 'black-keys' },
  { id: 10, name: '上下回声', emoji: '🎹', desc: '分辨来自低处还是高处的声音', theme: '#1e3a5f', mechanic: 'octave-pick' },
  { id: 11, name: '贝壳记忆', emoji: '🎴', desc: '翻开成对的音色印记', theme: '#d96e8a', mechanic: 'memory-match' },
  { id: 12, name: '工坊节拍', emoji: '🥁', desc: '看摆杆抵达中心，再切下节拍', theme: '#c0392b', mechanic: 'tempo-cut' },
  { id: 13, name: '回声加速', emoji: '⏱️', desc: '在风铃塔下追随越来越快的节拍', theme: '#8b4513', mechanic: 'metronome-tap' },
  { id: 14, name: '和弦铸造', emoji: '🎶', desc: '把三个声音铸成一枚和弦', theme: '#9b5de5', mechanic: 'chord-build' },
  { id: 15, name: '星图读谱', emoji: '🎼', desc: '读懂高塔投下的音乐星图', theme: '#457b9d', mechanic: 'staff-read' },
  { id: 16, name: '极光阶梯', emoji: '🚀', desc: '登上回声高塔的最后一层', theme: '#f4a261', mechanic: 'speed-ramp' },
];

export class LevelMap {
  constructor(stage, { progress, onSelect }) {
    this.stage = stage;
    this.progress = progress;
    this.onSelect = onSelect;
    this.element = null;
  }

  show() {
    const wrap = document.createElement('div');
    wrap.className = 'level-map-overlay atelier-route-overlay';

    const routes = CHAPTERS.map((chapter, chapterIndex) => {
      const levels = LEVEL_META.filter((level) => chapterFor(level.id) === chapter);
      return `
        <section class="route-chapter route-chapter--${chapter.material}" aria-labelledby="chapter-${chapterIndex}">
          <header class="route-chapter__header">
            <span class="route-chapter__index">0${chapterIndex + 1}</span>
            <div>
              <h2 id="chapter-${chapterIndex}">${chapter.name}</h2>
              <p>${chapter.desc}</p>
            </div>
            <span class="route-chapter__mark" aria-hidden="true"></span>
          </header>
          <div class="route-nodes">
            ${levels.map((level, nodeIndex) => {
              const stars = this.progress ? this.progress.getStars(level.id) : 0;
              return `
                <button class="route-node route-node--${chapter.material}" data-id="${level.id}" style="--node-accent:${level.theme}; --node-index:${nodeIndex}" aria-label="第 ${level.id} 关：${level.name}">
                  <span class="route-node__halo" aria-hidden="true"></span>
                  <span class="route-node__seal" aria-hidden="true"><span>${String(level.id).padStart(2, '0')}</span></span>
                  <span class="route-node__copy">
                    <strong>${level.name}</strong>
                    <small>${level.desc}</small>
                  </span>
                  <span class="route-node__stars">${starsMarkup(stars)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }).join('');

    wrap.innerHTML = `
      <div class="atelier-route-atmosphere" aria-hidden="true">
        <span class="atelier-route-atmosphere__mist"></span>
        <span class="atelier-route-atmosphere__light"></span>
      </div>
      <div class="level-map-card atelier-route-card">
        <header class="atelier-route-card__masthead">
          <div class="atelier-route-card__sigil" aria-hidden="true">${icon('piano')}</div>
          <div>
            <p class="atelier-route-card__eyebrow">PIP 的森林制琴工坊</p>
            <h1>回声航线</h1>
            <p class="atelier-route-card__intro">每弹响一个音，森林就多一束光。</p>
          </div>
        </header>
        <div class="atelier-route-scroll">${routes}</div>
        <footer class="atelier-route-card__footer">选择一枚航标，开始今天的音乐工坊。</footer>
      </div>
    `;

    this.stage.appendChild(wrap);
    this.element = wrap;

    let lastLevel = 1;
    try {
      const parsed = parseInt(localStorage.getItem(CONTINUE_KEY), 10);
      if (Number.isFinite(parsed) && parsed >= 1 && parsed <= LEVEL_META.length) lastLevel = parsed;
    } catch (_) { /* localStorage 不可用 */ }

    if (lastLevel > 1) {
      const continueBtn = document.createElement('button');
      continueBtn.className = 'continue-btn atelier-continue';
      continueBtn.type = 'button';
      continueBtn.innerHTML = `${icon('replay')}<span>继续航行 · 第 ${lastLevel} 关</span>`;
      continueBtn.addEventListener('click', () => {
        this.hide();
        this.onSelect?.(lastLevel);
      });
      wrap.querySelector('.atelier-route-card__masthead').appendChild(continueBtn);
    }

    wrap.querySelectorAll('.route-node').forEach((node) => {
      node.addEventListener('click', () => {
        const id = parseInt(node.dataset.id, 10);
        node.classList.add('is-selected');
        try { localStorage.setItem(CONTINUE_KEY, String(id)); } catch (_) {}
        setTimeout(() => this.onSelect?.(id), 160);
      });
    });
  }

  hide() {
    if (this.element?.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}

if (typeof window !== 'undefined') {
  window.__forestPiano = window.__forestPiano || {};
  window.__forestPiano.LEVEL_META = LEVEL_META;
}
