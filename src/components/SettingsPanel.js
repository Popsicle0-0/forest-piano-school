/**
 * 设置面板 - 重置进度, 关于, 帮助
 */
export class SettingsPanel {
  constructor(stage, { onReset, onClose, version }) {
    this.stage = stage;
    this.onReset = onReset;
    this.onClose = onClose;
    this.version = version;
    this.element = null;
  }

  show() {
    const wrap = document.createElement('div');
    wrap.className = 'settings-panel';
    wrap.innerHTML = `
      <div class="settings-panel__card">
        <div class="settings-panel__header">
          <div class="settings-panel__title">⚙ 设置</div>
          <button class="btn-primary" id="settings-close">关闭</button>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">🎮 游戏进度</div>
          <p class="settings-panel__desc">重置后所有关卡解锁但需要重新打</p>
          <button class="btn-secondary" id="settings-reset" style="background: var(--soft-error); color: white; border: none;">
            🗑 重置所有进度
          </button>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">📖 关于</div>
          <div class="settings-panel__about">
            <p><strong>森林钢琴学校</strong></p>
            <p>给 5-10 岁孩子的钢琴启蒙游戏</p>
            <p>${this.version} · Web Audio API · GSAP</p>
            <p class="settings-panel__credits">
              概念: Kodály (柯尔文) 首调唱名 + Solfege<br>
              美学: 莫兰迪森林 + 河流 + 暖色调<br>
              技术: 纯前端 + GitHub Pages
            </p>
          </div>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">📚 关卡一览</div>
          <ul class="settings-panel__levels">
            <li>1. 🐟 小鱼跳进五线谱</li>
            <li>2. 🎵 听!是谁在唱</li>
            <li>3. 🏔️ Mi-Sol 山谷</li>
            <li>4. 🥁 节奏小河</li>
            <li>5. ⭐ 小星星视奏</li>
            <li>6. 🎹 双手协调</li>
            <li>7. 🌳 树屋 7 音阶</li>
            <li>8. 🎭 森林音乐会</li>
            <li>9. 🖤 黑键世界 (BONUS)</li>
          </ul>
        </div>
      </div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    wrap.querySelector('#settings-close').addEventListener('click', () => this.hide());
    wrap.querySelector('#settings-reset').addEventListener('click', () => {
      if (confirm('确定要重置所有进度吗? 这不可恢复!')) {
        try {
          localStorage.removeItem('forest-piano-progress');
          localStorage.removeItem('forest-piano-achievements');
          if (this.onReset) this.onReset();
          alert('进度已重置! 刷新页面开始新游戏');
        } catch (e) {
          alert('重置失败: ' + e.message);
        }
      }
    });
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
    if (this.onClose) this.onClose();
  }
}
