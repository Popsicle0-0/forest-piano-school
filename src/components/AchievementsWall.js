/**
 * 成就墙 (Achievements Wall)
 * 满屏 overlay 展示所有成就, 解锁的发光, 锁住的灰显
 *
 * 用法:
 *   const wall = new AchievementsWall(document.body, {
 *     achievementSystem: game.achievements,
 *     onClose: () => { ... },
 *   });
 *   wall.show();
 */
import { ACHIEVEMENT_DEFS } from '../systems/Achievements.js';

export class AchievementsWall {
  /**
   * @param {HTMLElement} stage - 挂载节点 (通常 document.body)
   * @param {Object} opts
   * @param {Object} opts.achievementSystem - AchievementSystem 实例
   * @param {Function} [opts.onClose] - 关闭回调
   */
  constructor(stage, opts = {}) {
    this.stage = stage || document.body;
    this.system = opts.achievementSystem;
    this.onClose = opts.onClose;
    this.element = null;
  }

  show() {
    if (!this.system) {
      console.warn('[AchievementsWall] No achievement system given');
      return;
    }

    // 关掉其他 overlay (但保留自己)
    document.querySelectorAll('.overlay').forEach((el) => el.remove());

    const all = this.system.getAll();
    const unlocked = all.filter((a) => a.unlocked).length;
    const total = all.length;
    const percent = this.system.getProgressPercent();

    const wrap = document.createElement('div');
    wrap.className = 'achievements-wall';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', '成就墙');
    wrap.innerHTML = `
      <div class="achievements-wall__card">
        <div class="achievements-wall__header">
          <div class="achievements-wall__title">🏆 成就墙</div>
          <button class="btn-primary achievements-wall__close" id="close-achievements">关闭</button>
        </div>
        <div class="achievements-wall__progress">
          <div class="achievements-wall__progress-text">
            解锁 ${unlocked} / ${total}  (${percent}%)
          </div>
          <div class="achievements-wall__progress-bar">
            <div class="achievements-wall__progress-fill" style="width: ${percent}%"></div>
          </div>
        </div>
        <div class="achievements-wall__grid">
          ${all
            .map(
              (a) => `
            <div class="achievement-badge ${a.unlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-badge__emoji">${a.unlocked ? a.emoji : '🔒'}</div>
              <div class="achievement-badge__name">${escapeHtml(a.name)}</div>
              <div class="achievement-badge__desc">${escapeHtml(a.desc)}</div>
              ${
                a.unlocked
                  ? '<div class="achievement-badge__state">✓ 已解锁</div>'
                  : '<div class="achievement-badge__state state-locked">未解锁</div>'
              }
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    const closeBtn = wrap.querySelector('#close-achievements');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    // 点遮罩背景也关闭 (但点 card 不关闭)
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) this.hide();
    });

    // ESC 关闭
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.hide();
    };
    document.addEventListener('keydown', this._escHandler);
  }

  hide() {
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
    if (typeof this.onClose === 'function') {
      try {
        this.onClose();
      } catch (_) {}
    }
  }
}

/** 简单 HTML 转义防 XSS */
function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default AchievementsWall;
