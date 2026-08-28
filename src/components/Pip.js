/**
 * Pip 小鸟 - 角落吉祥物
 * 简笔 SVG, 会待机呼吸 / 偶尔挥手 / 点击叽喳
 * 自带气泡提示, 每隔一会儿随机播一句
 *
 * 可选构造参数 (向下兼容):
 *   new Pip(stage, { audio?, hint?: string })
 *   - audio: 传入后用 audio.hover() 播气泡音; 不传则自己合成短促"叽"
 *   - hint:  启动时显示的提示文本
 */
export class Pip {
  constructor(root, opts = {}) {
    this.root = root;
    this.opts = opts || {};
    this.audio = opts.audio || null;
    this.defaultHint = opts.hint || '我帮你找五线谱位置~ 点我一下试试';
    this.hintTimer = null;
    this.waveTimer = null;
    this.sleepTimer = null;
    this._render();
    this._wireInteractions();
    this._startIdleLoop();
    // 启动一段时间后展示提示气泡
    setTimeout(() => this.setHint(this.defaultHint), 600);
  }

  _render() {
    const el = document.createElement('div');
    el.className = 'pip';
    el.innerHTML = `
      <div class="pip-speech-bubble" role="status" aria-live="polite"></div>
      <div class="pip-tap">
        <svg viewBox="0 0 100 100">
          <!-- 身体 -->
          <ellipse cx="50" cy="58" rx="34" ry="32" fill="#ffd166" />
          <ellipse cx="50" cy="64" rx="26" ry="22" fill="#fff3b0" />
          <!-- 翅膀 -->
          <ellipse class="pip-wing" cx="30" cy="58" rx="10" ry="16" fill="#f4a261" transform="rotate(-15 30 58)"/>
          <!-- 眼睛 -->
          <circle cx="42" cy="48" r="6" fill="white"/>
          <circle class="pip-pupil" cx="42" cy="48" r="3" fill="#1a1a1a">
            <animate attributeName="cx" values="42;45;42" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="62" cy="48" r="6" fill="white"/>
          <circle class="pip-pupil" cx="62" cy="48" r="3" fill="#1a1a1a">
            <animate attributeName="cx" values="62;65;62" dur="4s" repeatCount="indefinite"/>
          </circle>
          <!-- 嘴 -->
          <path d="M40 60 L50 70 L60 60 Z" fill="#e76f51"/>
          <!-- 腮红 -->
          <circle cx="30" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
          <circle cx="70" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
          <!-- 头羽 -->
          <path d="M50 18 Q 45 8 50 12 Q 55 8 50 18" fill="#f4a261"/>
          <!-- 腿 -->
          <line x1="44" y1="86" x2="44" y2="94" stroke="#5a3a2a" stroke-width="2"/>
          <line x1="56" y1="86" x2="56" y2="94" stroke="#5a3a2a" stroke-width="2"/>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
        </svg>
      </div>
    `;
    this.root.appendChild(el);
    this.element = el;
    this.bubble = el.querySelector('.pip-speech-bubble');
    this.tapTarget = el.querySelector('.pip-tap');
  }

  _wireInteractions() {
    const poke = (e) => {
      e.preventDefault?.();
      e.stopPropagation?.();
      this.react('chip');
      this._chirp();
    };
    this.tapTarget.addEventListener('click', poke);
    this.tapTarget.addEventListener('touchstart', poke, { passive: false });
  }

  _startIdleLoop() {
    // 每 8~14 秒随机"挥一下"打招呼
    const schedule = () => {
      const wait = 8000 + Math.random() * 6000;
      this.waveTimer = setTimeout(() => {
        this.react('wave');
        schedule();
      }, wait);
    };
    schedule();
  }

  /**
   * 触发一段动画: 'wave' | 'cheer' | 'chip' | 'sleep' | 'think'
   * 同一动画短时间内不会重复启动
   */
  react(action) {
    if (!this.element) return;
    if (this.element.classList.contains(`pip-${action}`)) return;
    this.element.classList.add(`pip-${action}`);
    const dur = ({ wave: 900, cheer: 700, chip: 600, sleep: 3000, think: 4000 })[action] || 700;
    setTimeout(() => {
      this.element.classList.remove(`pip-${action}`);
    }, dur);
  }

  /**
   * 显示气泡文字, 一段时间后淡出
   * 传空字符串 / 不传 = 只淡出现有气泡
   */
  setHint(text, holdMs = 3200) {
    if (!this.bubble) return;
    if (this.hintTimer) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
    if (text) {
      this.bubble.textContent = text;
      this.bubble.classList.add('show');
    } else {
      this.bubble.classList.remove('show');
      return;
    }
    this.hintTimer = setTimeout(() => {
      this.bubble.classList.remove('show');
      this.hintTimer = null;
    }, holdMs);
  }

  /**
   * 叽喳: 优先用传入的 audio.hover(), 否则自己用 WebAudio 合成短促 cute peep
   */
  _chirp() {
    if (this.audio) {
      try { this.audio.hover(); } catch (_) {}
      return;
    }
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;
      if (!this._ctx) this._ctx = new Ctor();
      const ctx = this._ctx;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      // 900Hz -> 600Hz 下扫, 短促可爱
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.12);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (_) {}
  }

  /**
   * 销毁 — 清理定时器与 DOM
   */
  destroy() {
    if (this.waveTimer) clearTimeout(this.waveTimer);
    if (this.sleepTimer) clearTimeout(this.sleepTimer);
    if (this.hintTimer) clearTimeout(this.hintTimer);
    if (this._ctx) {
      try { this._ctx.close(); } catch (_) {}
      this._ctx = null;
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }
}
