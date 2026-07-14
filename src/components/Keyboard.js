/**
 * 键盘快捷键 - 全局监听
 */
export class KeyboardShortcuts {
  constructor(game) {
    this.game = game;
    this.enabled = true;
    this._handler = (e) => this._onKeyDown(e);
  }

  enable() {
    if (!this.enabled) {
      this.enabled = true;
      document.addEventListener('keydown', this._handler);
    }
  }

  disable() {
    if (this.enabled) {
      this.enabled = false;
      document.removeEventListener('keydown', this._handler);
    }
  }

  _onKeyDown(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    if (e.key === 'Escape' || e.key === 'Esc') {
      // 关掉所有 overlay
      const overlays = document.querySelectorAll('.overlay, .achievements-wall, .settings-panel, .tutorial');
      if (overlays.length > 0) {
        const top = overlays[overlays.length - 1];
        if (top.classList.contains('achievements-wall')) {
          top.querySelector('#close-achievements')?.click();
        } else {
          top.remove();
        }
        e.preventDefault();
      }
    }

    if (e.key === 'Enter') {
      // Enter 关掉开始遮罩
      const startOverlay = document.querySelector('.overlay__card');
      const startBtn = startOverlay?.querySelector('#start-btn');
      if (startBtn) {
        startBtn.click();
        e.preventDefault();
        return;
      }
    }

    if (e.key === 'm' || e.key === 'M') {
      // 静音切换
      const btnSound = document.getElementById('btn-sound');
      if (btnSound) btnSound.click();
      e.preventDefault();
    }

    if (/^[1-9]$/.test(e.key)) {
      // 1-9 = 启动对应关卡
      const levelId = parseInt(e.key, 10);
      try {
        this.game.start({ levelId });
        e.preventDefault();
      } catch (err) { /* ignore */ }
    }

    if (e.key === ' ') {
      // 空格 = L4/L12 鼓/切按钮
      // 委托给 L4/L12 (可以监听自定义事件或直接查询)
      const drum = document.querySelector('.level4-drum-anchor, .level12-cut-btn');
      if (drum) {
        drum.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
        e.preventDefault();
      }
    }
  }
}