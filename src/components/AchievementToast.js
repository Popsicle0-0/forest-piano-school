/**
 * 解锁通知 Toast - 屏幕底部冒出的徽章
 *
 * 静态方法直接调用, 无须 new 实例:
 *   AchievementToast.show({ id, name, emoji, desc });
 *
 * 自动出现在屏幕底部 4.5s 后淡出
 */
export class AchievementToast {
  /**
   * @param {Object} achievementDef - { id, name, emoji, desc }
   * @param {Object} [opts] - { durationMs }
   */
  static show(achievementDef, opts = {}) {
    if (!achievementDef) return;
    const duration = Math.max(1500, Number(opts.durationMs) || 4500);

    // 防止同 id 同时出现多个 toast
    const existing = document.querySelector(
      `.achievement-toast[data-id="${cssEscape(achievementDef.id || '')}"]`
    );
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    if (achievementDef.id) toast.dataset.id = achievementDef.id;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div class="achievement-toast__icon">${
        achievementDef.emoji || '🏅'
      }</div>
      <div class="achievement-toast__body">
        <div class="achievement-toast__title">成就解锁!</div>
        <div class="achievement-toast__name">${escapeHtml(achievementDef.name || '')}</div>
        ${
          achievementDef.desc
            ? `<div class="achievement-toast__desc">${escapeHtml(achievementDef.desc)}</div>`
            : ''
        }
      </div>
    `;
    document.body.appendChild(toast);

    // 触发进入动画
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 500);
    }, duration);
  }
}

/** 简单 HTML 转义 */
function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 简易 CSS attribute 值转义 */
function cssEscape(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, '_');
}

export default AchievementToast;
