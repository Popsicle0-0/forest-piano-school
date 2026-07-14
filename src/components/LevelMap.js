import { SVG_NS } from '../utils/svg.js';

/**
 * 关卡地图选择器 - 8 关卡的网格
 */
export const LEVEL_META = [
  { id: 1,  name: '小鱼跳进五线谱', emoji: '🐟', desc: '帮 7 条小鱼找到五线谱的家',   theme: '#5fa8b5' },
  { id: 2,  name: '听!是谁在唱',    emoji: '🎵', desc: '系统播音, 找出对应的鱼',      theme: '#264653' },
  { id: 3,  name: 'Mi-Sol 山谷',    emoji: '🏔️', desc: '柯尔文爷爷教五声音阶',        theme: '#e76f51' },
  { id: 4,  name: '节奏小河',       emoji: '🥁', desc: '跟着节拍泡泡敲鼓',            theme: '#1a3a4a' },
  { id: 5,  name: '小星星视奏',     emoji: '⭐', desc: '跟着五线谱弹小星星',          theme: '#2a2050' },
  { id: 6,  name: '双手协调',       emoji: '🎹', desc: '钢琴老师教双手按双音',        theme: '#d4a574' },
  { id: 7,  name: '树屋 7 音阶',    emoji: '🌳', desc: '爬上树屋看完整七音阶',        theme: '#65a30d' },
  { id: 8,  name: '森林音乐会',     emoji: '🎭', desc: '选曲并演奏森林音乐会',        theme: '#3d0a55' },
  { id: 9,  name: '黑键世界',       emoji: '🖤', desc: '听声, 按顺序点黑键',          theme: '#2a0a55' },
  { id: 10, name: '八度之旅',       emoji: '🎹', desc: '听音 — 是低八度还是高八度?',  theme: '#1e3a5f' },
  { id: 11, name: '翻牌记忆',       emoji: '🎴', desc: '翻开两张牌找一样的朋友',      theme: '#d96e8a' },
  { id: 12, name: '番茄节奏',       emoji: '🥁', desc: '跟着摆杆切菜 — 命中节拍!',   theme: '#c0392b' },
  { id: 13, name: '节奏大师',       emoji: '⏱️', desc: '跟随节拍器逐渐加速,敲准 30 拍', theme: '#8b4513' },
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
            return `
              <button class="level-map-tile" data-id="${m.id}" style="--tile-accent: ${m.theme}">
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

    wrap.querySelectorAll('.level-map-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const id = parseInt(tile.dataset.id, 10);
        // 视觉反馈
        tile.classList.add('selected');
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
