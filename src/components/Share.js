/**
 * 分享 - 通关后分享成绩 (v18.5)
 *
 * 支持:
 *   - 复制文本 (优先 navigator.share,否则 navigator.clipboard,再退到 prompt)
 *   - 下载截图 (Canvas 生成 PNG, 写一个临时 <a download>)
 *   - 弹出分享菜单 (Toast 风格)
 */
import { gsap } from 'gsap';

const LEVEL_NAMES = {
  1: '🐟 小鱼跳进五线谱',
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

/** HTML 转义 - 防 XSS (用户改 location.href 时可能注入) */
function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export class Share {
  constructor(game) {
    this.game = game;
  }

  /**
   * 复制文本分享
   * @param {object} info { levelId, stars, wrongCount, totalQuestions }
   * @returns {Promise<boolean>}
   */
  async copyText(info) {
    const levelId = Number(info && info.levelId) || 1;
    const stars = Math.max(0, Math.min(3, Number(info.stars) || 0));
    const name = LEVEL_NAMES[levelId] || `第 ${levelId} 关`;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const safeUrl = escapeHtml(window.location.href);
    const text = `我在 ${name} 拿了 ${starStr}\n我在 森林钢琴学校 Forest Piano School 玩得开心 🎹\n(${safeUrl})`;

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        // Use native share if available (mobile)
        await navigator.share({ title: '森林钢琴学校', text });
        return true;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      // Fallback: prompt
      window.prompt('复制这段分享文字:', text);
      return false;
    } catch (e) {
      // User cancelled native share, fallback to prompt
      try { window.prompt('复制这段分享文字:', text); } catch (_) {}
      return false;
    }
  }

  /**
   * 下载截图 (Canvas-based PNG)
   * @param {object} info { levelId, stars }
   * @returns {Promise<boolean>}
   */
  async downloadScreenshot(info) {
    try {
      const levelId = Number(info && info.levelId) || 1;
      const stars = Math.max(0, Math.min(3, Number(info.stars) || 0));
      const name = LEVEL_NAMES[levelId] || `第 ${levelId} 关`;

      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      // 渐变背景
      const grad = ctx.createLinearGradient(0, 0, 600, 400);
      grad.addColorStop(0, '#ffd166');
      grad.addColorStop(1, '#f4a261');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 400);

      // 卡片背景
      ctx.fillStyle = '#fff8ec';
      const cardX = 60, cardY = 50, cardW = 480, cardH = 300, radius = 24;
      ctx.beginPath();
      ctx.moveTo(cardX + radius, cardY);
      ctx.lineTo(cardX + cardW - radius, cardY);
      ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius);
      ctx.lineTo(cardX + cardW, cardY + cardH - radius);
      ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH);
      ctx.lineTo(cardX + radius, cardY + cardH);
      ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius);
      ctx.lineTo(cardX, cardY + radius);
      ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
      ctx.closePath();
      ctx.fill();

      // 标题
      ctx.fillStyle = '#3d405b';
      ctx.font = 'bold 36px "ZCOOL KuaiLe", "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('森林钢琴学校', 300, 110);

      // 关卡名
      ctx.font = 'bold 26px "ZCOOL KuaiLe", "PingFang SC", sans-serif';
      ctx.fillText(name, 300, 170);

      // 星星
      const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
      ctx.font = '52px serif';
      ctx.fillText(starStr, 300, 250);

      // 标签
      ctx.font = '18px "ZCOOL KuaiLe", "PingFang SC", sans-serif';
      ctx.fillStyle = '#6a6a8a';
      ctx.fillText('5-10岁钢琴启蒙游戏', 300, 300);
      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#9a9ab0';
      ctx.fillText('popsicle0-0.github.io/forest-piano-school', 300, 330);

      // 下载
      const blob = await new Promise((resolve) => {
        try {
          canvas.toBlob(resolve, 'image/png');
        } catch (_) {
          resolve(null);
        }
      });
      if (!blob) return false;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forest-piano-L${levelId}-${stars}stars.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    } catch (err) {
      console.warn('Screenshot failed:', err);
      return false;
    }
  }

  /**
   * 显示分享按钮组 (Toast 风格)
   * @param {object} info { levelId, stars, wrongCount, totalQuestions }
   * @param {function} [onClose]
   */
  showShareMenu(info, onClose) {
    // 防止重复开
    document.querySelectorAll('.share-overlay').forEach((el) => el.remove());

    const levelId = Number(info && info.levelId) || 1;
    const stars = Math.max(0, Math.min(3, Number(info.stars) || 0));
    const name = LEVEL_NAMES[levelId] || `第 ${levelId} 关`;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="share-menu">
        <div class="share-menu__title">📤 分享你的成绩</div>
        <div class="share-menu__preview">
          <div class="share-menu__preview-lv">${escapeHtml(name)}</div>
          <div class="share-menu__preview-stars">${starStr}</div>
        </div>
        <button class="btn-primary share-menu__btn" id="share-text">📋 复制文字</button>
        <button class="btn-primary share-menu__btn" id="share-img">📸 下载图片</button>
        <button class="btn-secondary share-menu__btn" id="share-close">关闭</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // 进入动画
    requestAnimationFrame(() => {
      const menu = overlay.querySelector('.share-menu');
      if (menu) {
        gsap.fromTo(menu,
          { y: 24, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(1.4)' }
        );
      }
    });

    const close = () => {
      const menu = overlay.querySelector('.share-menu');
      if (menu) {
        gsap.to(menu, {
          y: 16, opacity: 0, scale: 0.96, duration: 0.18, ease: 'power2.in',
          onComplete: () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }
        });
      } else if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (typeof onClose === 'function') {
        try { onClose(); } catch (_) {}
      }
    };

    overlay.querySelector('#share-text').addEventListener('click', async () => {
      const ok = await this.copyText(info);
      this._flash(ok ? '已复制 ✓' : '已弹出复制提示');
    });

    overlay.querySelector('#share-img').addEventListener('click', async () => {
      const ok = await this.downloadScreenshot(info);
      this._flash(ok ? '图片已下载 ✓' : '截图失败');
    });

    overlay.querySelector('#share-close').addEventListener('click', close);

    // 点击蒙层关闭
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }

  /** 短暂的 toast 提示 */
  _flash(text) {
    // 防止叠加
    document.querySelectorAll('.share-flash').forEach((el) => el.remove());
    const t = document.createElement('div');
    t.className = 'share-flash';
    t.textContent = text;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 350);
    }, 1800);
  }
}

export default Share;
