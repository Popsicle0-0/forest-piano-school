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
      } else {
        // v19.1: 无 overlay 时, Esc = 完整回关卡地图。
        // 不能只调用 _showStartOverlay(): L12 等关卡的计时器/音频会穿过
        // 地图继续运行。与 HUD ⌂ / 关卡徽章统一走 goHome() 清场。
        if (this.game && typeof this.game.goHome === 'function') {
          this.game.goHome();
          e.preventDefault();
          return;
        } else if (this.game && typeof this.game._showStartOverlay === 'function') {
          this.game._showStartOverlay();
          e.preventDefault();
          return;
        }
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
        // v19.1: 键盘直跳意图明确, L1 不弹开始地图。
        // 同时在首次用外接键盘直跳时解锁 Web Audio；地图选关路径原本
        // 会在 onSelect 中解锁, 直跳没有这个手势链路。
        this.game._skipStartOverlayOnce = true;
        this.game.audio?.unlockOnGesture?.().catch(() => {});
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