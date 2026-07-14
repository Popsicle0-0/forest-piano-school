/**
 * 排行榜 - 用户个人最佳 + 每个关卡的最高分历史
 */
export class Leaderboard {
  constructor(stage, progress, achievementSystem) {
    this.stage = stage;
    this.progress = progress;
    this.achievementSystem = achievementSystem;
    this.element = null;
  }

  show() {
    const data = this.progress.getSnapshot();

    const totalStars = Object.values(data.stars).reduce((sum, n) => sum + (Number(n) || 0), 0);
    const totalLevels = Object.keys(data.stars).length;
    const avgStars = totalLevels > 0 ? (totalStars / (totalLevels * 3) * 100).toFixed(0) : 0;

    const wrap = document.createElement('div');
    wrap.className = 'leaderboard-overlay';
    wrap.innerHTML = `
      <div class="leaderboard-card">
        <div class="leaderboard-header">
          <div class="leaderboard-title">🏆 我的成就</div>
          <button class="btn-primary" id="leaderboard-close">关闭</button>
        </div>

        <div class="leaderboard-summary">
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${totalStars}</div>
            <div class="leaderboard-summary__label">总星数</div>
          </div>
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${totalLevels}/16</div>
            <div class="leaderboard-summary__label">通过关卡</div>
          </div>
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${avgStars}%</div>
            <div class="leaderboard-summary__label">平均完美度</div>
          </div>
        </div>

        <div class="leaderboard-table">
          ${this._renderTable(data.stars)}
        </div>

        ${this.achievementSystem ? `
          <div class="leaderboard-achievements">
            <div class="leaderboard-achievements__title">🎯 成就墙</div>
            <div class="leaderboard-achievements__list">
              ${this.achievementSystem.getAll().map(a => `
                <div class="leaderboard-ach ${a.unlocked ? 'unlocked' : 'locked'}">
                  <span class="leaderboard-ach__emoji">${a.unlocked ? a.emoji : '🔒'}</span>
                  <span class="leaderboard-ach__name">${a.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    wrap.querySelector('#leaderboard-close').addEventListener('click', () => this.hide());
    // ESC close
    const escHandler = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.hide();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  _renderTable(stars) {
    const LEVEL_NAMES = {
      1: '🐟 小鱼跳进',
      2: '🎵 听音找鱼',
      3: '🏔️ Mi-Sol 山谷',
      4: '🥁 节奏小河',
      5: '⭐ 小星星视奏',
      6: '🎹 双手协调',
      7: '🌳 树屋 7 音阶',
      8: '🎭 森林音乐会',
      9: '🖤 黑键世界',
      10: '✨ 八度之夜',
      11: '💕 翻牌记忆',
      12: '🍅 番茄节拍',
      13: '⏱️ 节奏大师',
      14: '🎶 和弦建造',
      15: '🎼 视奏大师',
      16: '🚀 节奏阶梯',
    };

    return Object.entries(LEVEL_NAMES).map(([id, name]) => {
      const s = stars[id] || 0;
      const starStr = '⭐'.repeat(s) + '☆'.repeat(3 - s);
      return `
        <div class="leaderboard-row">
          <div class="leaderboard-row__name">${name}</div>
          <div class="leaderboard-row__stars">${starStr}</div>
        </div>
      `;
    }).join('');
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}
