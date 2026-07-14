/**
 * Audio — 钢琴音源 + 音效
 *
 * 设计目标:
 *  - Tone.js Sampler 弹钢琴(C 大调 7 白键)
 *  - 答对/答错/通关/气泡:Web Audio API 合成(零依赖、CORS 友好)
 *  - 所有外部资源走 try/catch,任何 1 个挂了不影响其余
 *  - 首次用户手势里 await Tone.start() 解锁 iOS/Safari AudioContext
 *
 * CDN 实测 (curl 2026-07-14):
 *   - https://tonejs.github.io/audio/salamander/C4.mp3   ✅ 200
 *   - https://tonejs.github.io/audio/salamander/A4.mp3   ✅ 200
 *   - https://tonejs.github.io/audio/salamander/D4.mp3   ❌ 404 (Sampler 用邻近 A4/C4 pitch-shift 兜底,这是 Tone.js 官方 Salamander 包的常见情况)
 *   - https://assets.mixkit.co/...*.wav                  ❌ 403 Forbidden (CloudFront 拒)
 *   - https://cdn.pixabay.com/audio/...*.mp3             ❌ 403 (需 Referer)
 *   ⇒ 音效全部走 Web Audio 合成,不依赖任何外部 wav/mp3
 */
import * as Tone from 'tone';

export class Audio {
  constructor() {
    this.unlocked = false;
    this.muted = false;
    this.piano = null;        // Tone.Sampler
    this._synth = null;       // Tone.Synth (备用单音, 用于 hover/bubble)
    this._bus = null;         // 主音量总线
    this._webAudio = null;    // 原生 AudioContext (用于 SFX 合成)
    this._masterGain = null;  // SFX 总线 GainNode
  }

  /**
   * 等用户首次手势后调用 (立即返回, 不阻塞 UI):
   *  - 同步 resume AudioContext (满足 iOS 策略)
   *  - 立刻用合成器 fallback, 让 playNote 立即可用
   *  - 在后台慢慢加载 Salamander 钢琴采样, 加载完自动切换到真钢琴
   */
  async unlockOnGesture() {
    if (this.unlocked) return;

    // 1) Tone.js 主上下文 (必须在用户手势里同步触发)
    try { await Tone.start(); } catch (e) { console.warn('[Audio] Tone.start 失败:', e); }

    // 2) 主总线 + 合成器 fallback
    this._bus = new Tone.Gain(0.9).toDestination();
    this._synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.005, decay: 0.12, sustain: 0.0, release: 0.18 },
    }).connect(this._bus);
    // 立刻把 piano 设为合成器, 这样 playNote 永远可用
    this.piano = this._synth;

    // 3) 原生 Web Audio 总线 (SFX 用)
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        this._webAudio = new Ctx();
        this._masterGain = this._webAudio.createGain();
        this._masterGain.gain.value = 0.6;
        this._masterGain.connect(this._webAudio.destination);
      }
    } catch (e) {
      console.warn('[Audio] Web Audio 初始化失败:', e);
    }

    this.unlocked = true;

    // 4) 后台异步加载 Salamander 真钢琴采样 (不等, 不阻塞)
    this._loadPianoInBackground();
  }

  /** 后台加载真钢琴采样, 加载完无缝切换 (fire-and-forget) */
  _loadPianoInBackground() {
    let sampler;
    try {
      sampler = new Tone.Sampler({
        urls: {
          A1: 'A1.mp3', A2: 'A2.mp3', A3: 'A3.mp3',
          A4: 'A4.mp3', A5: 'A5.mp3', A6: 'A6.mp3',
          C1: 'C1.mp3', C2: 'C2.mp3', C3: 'C3.mp3',
          C4: 'C4.mp3', C5: 'C5.mp3', C6: 'C6.mp3',
          'D#4': 'Ds4.mp3',
          'F#4': 'Fs4.mp3',
        },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        release: 1.4,
        attack: 0.005,
      }).connect(this._bus);

      // 12s 超时 — 超过了就保持合成器
      const loadTimeout = new Promise((resolve) => setTimeout(() => resolve('timeout'), 12000));
      Promise.race([Tone.loaded(), loadTimeout]).then((result) => {
        if (result === 'timeout') {
          console.warn('[Audio] 钢琴采样加载超时, 保持合成器音色');
          return;
        }
        // 切换到真钢琴
        this.piano = sampler;
        console.log('[Audio] 钢琴采样加载完成, 切换到 Salamander');
      });
    } catch (e) {
      console.warn('[Audio] 钢琴采样初始化失败, 保持合成器:', e);
    }
  }

  /**
   * 拖拽起手: 轻气泡音 (原生 Web Audio, 不用 Tone.js 排队)
   */
  hover(_id) {
    if (!this.unlocked || this.muted) return;
    this._sfxBubble();
  }

  /**
   * 弹一个音, 例如 'C4' / 'D4' / 'G#4'
   */
  playNote(pitch) {
    if (!this.unlocked || this.muted) return;
    try {
      this.piano.triggerAttackRelease(pitch, '8n');
    } catch (e) {
      console.warn('[Audio] playNote 失败:', e);
      // 兜底: 用合成器
      try { this._synth.triggerAttackRelease(pitch, '8n'); } catch (_) {}
    }
  }

  /** 答对: 大三和弦上行琶音 C5 -> E5 -> G5 -> C6, sine, ADSR */
  correct() {
    if (!this.unlocked || this.muted) return;
    this._sfxArpeggio([523.25, 659.25, 783.99, 1046.5], { duration: 0.18, gap: 0.06, type: 'sine', peak: 0.32 });
  }

  /** 答错: 300Hz -> 150Hz 下行, triangle, 短促 */
  wrong() {
    if (!this.unlocked || this.muted) return;
    this._sfxSlide({ from: 320, to: 150, duration: 0.35, type: 'triangle', peak: 0.28 });
  }

  /** 通关: C 大调 7 音上行 + 末尾高频闪铃 */
  async playScale(pitches) {
    if (!this.unlocked || this.muted) return;
    try {
      const now = Tone.now();
      pitches.forEach((p, i) => {
        try {
          this.piano.triggerAttackRelease(p, '4n', now + i * 0.22);
        } catch (_) {}
      });
    } catch (e) {
      console.warn('[Audio] playScale Tone 失败, 降级:', e);
    }
    // 末尾叠一道清脆闪铃 (synth, ADSR)
    setTimeout(() => {
      try {
        this._synth.triggerAttackRelease('C6', '16n');
        setTimeout(() => this._synth.triggerAttackRelease('G6', '16n'), 90);
        setTimeout(() => this._synth.triggerAttackRelease('C7', '8n'), 200);
      } catch (_) {}
    }, pitches.length * 220 + 120);
  }

  /** 切静音 (外部 UI 用) */
  toggleMute() {
    this.muted = !this.muted;
    if (this._bus) this._bus.gain.rampTo(this.muted ? 0 : 0.9, 0.05);
    return this.muted;
  }

  // ──────────────────────────────────────────────
  // 内部: Web Audio API SFX 合成 (零外部资源)
  // ──────────────────────────────────────────────

  _resumeWebAudio() {
    if (this._webAudio && this._webAudio.state === 'suspended') {
      this._webAudio.resume().catch(() => {});
    }
  }

  /** 气泡: 200Hz sine 短促 + 一点 noise, 模拟 pop */
  _sfxBubble() {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);

    osc.connect(gain).connect(this._masterGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  /** 答对琶音: 多个 sine 音按时间间隔触发, ADSR-like 包络 */
  _sfxArpeggio(freqs, { duration = 0.18, gap = 0.06, type = 'sine', peak = 0.3 } = {}) {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const start = ctx.currentTime;

    freqs.forEach((f, i) => {
      const t0 = start + i * (duration * 0.5 + gap);
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(f, t0);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(peak, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

      osc.connect(g).connect(this._masterGain);
      osc.start(t0);
      osc.stop(t0 + duration + 0.05);
    });
  }

  /** 答错下行: 单 osc 从高频滑到低频, 短包络 */
  _sfxSlide({ from = 320, to = 150, duration = 0.35, type = 'triangle', peak = 0.28 } = {}) {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + duration);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(g).connect(this._masterGain);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }
}