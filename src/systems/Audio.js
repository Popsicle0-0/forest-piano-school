/**
 * Audio — 完全用原生 Web Audio API 合成 (零依赖, iOS PWA 100% 可用)
 *
 * 设计:
 *  - 不依赖 Tone.js 任何主路径 (iOS PWA 上 PolySynth/Sampler 不稳定)
 *  - 所有声音都用 OscillatorNode + GainNode 直接合成
 *  - 钢琴音: 三角波基音 + 2 个正弦泛音 + ADSR 包络
 *  - Salamander 真钢琴采样 (Tone.js) 在后台加载, 加载完可选叠加
 *
 * 关键 API (供 Game.js 调用):
 *  - unlockOnGesture()      - 在用户首次手势里初始化 + resume AudioContext
 *  - playNote(pitch)        - 弹一个音 (C4~B4)
 *  - correct() / wrong()    - 答对/答错 SFX
 *  - hover()                - 拖拽气泡
 *  - playScale(pitches)     - 通关上行 7 音
 *  - toggleMute()           - 切静音
 */
export class Audio {
  constructor() {
    this.unlocked = false;
    this.muted = false;
    this._webAudio = null;
    this._masterGain = null;
    this._bus = null;              // Tone.js bus (后台 Salamander 用)
    this._realPianoLoaded = false;
  }

  /**
   * 用户首次手势里调用: 初始化 Web Audio, resume context
   */
  async unlockOnGesture() {
    if (this.unlocked) return;

    // 1) 原生 Web Audio (主路径)
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        this._webAudio = new Ctx();
        this._masterGain = this._webAudio.createGain();
        this._masterGain.gain.value = 0.5;
        this._masterGain.connect(this._webAudio.destination);
        // 立即 resume
        if (this._webAudio.state === 'suspended') {
          await this._webAudio.resume();
        }
      }
    } catch (e) {
      console.warn('[Audio] Web Audio 初始化失败:', e);
    }

    this.unlocked = true;
    // 测试音: 让用户立刻知道声音工作了
    setTimeout(() => this._testBeep(), 100);

    // 2) 后台加载 Salamander 真钢琴 (fire-and-forget, 用 Tone.js)
    this._loadPianoInBackground();
  }

  _resumeWebAudio() {
    if (this._webAudio && this._webAudio.state === 'suspended') {
      this._webAudio.resume().catch(() => {});
    }
  }

  /** 测试音: C5 sine 0.2s, 让用户知道声音 OK */
  _testBeep() {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.4, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    osc.connect(gain).connect(this._masterGain);
    osc.start(t);
    osc.stop(t + 0.22);
  }

  /**
   * 弹一个音 (C4~B4), 用原生 Web Audio 直接合成
   * 同时如果 Salamander 加载好了, 用真钢琴叠加
   */
  playNote(pitch) {
    if (!this.unlocked || this.muted) return;
    this._playNoteWebAudio(pitch);
    if (this._realPianoLoaded && this._realPiano && this._realPiano.triggerAttackRelease) {
      try { this._realPiano.triggerAttackRelease(pitch, '8n'); } catch (_) {}
    }
  }

  /**
   * 原生 Web Audio 钢琴音:
   * 三角波基音 + 二次正弦泛音(15%) + 三次正弦泛音(5%) + ADSR
   */
  _playNoteWebAudio(pitch) {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const t = ctx.currentTime;

    // 频率表 (C4~B4)
    const freqMap = {
      'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
      'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
      'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
    };
    const freq = freqMap[pitch];
    if (!freq) return;

    // 基音 (三角波, 钢琴主体音色)
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);

    // 二次泛音 (正弦, 提亮)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t);

    // 三次泛音 (正弦, 微弱, 模拟击锤)
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, t);

    // ADSR 包络
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.45, t + 0.01);    // attack
    env.gain.exponentialRampToValueAtTime(0.25, t + 0.15);    // decay
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);     // release

    // 泛音量
    const g2 = ctx.createGain();
    g2.gain.value = 0.15;
    const g3 = ctx.createGain();
    g3.gain.value = 0.05;

    osc1.connect(env).connect(this._masterGain);
    osc2.connect(g2).connect(env);
    osc3.connect(g3).connect(env);

    const stopT = t + 0.85;
    osc1.start(t); osc1.stop(stopT);
    osc2.start(t); osc2.stop(stopT);
    osc3.start(t); osc3.stop(stopT);
  }

  /**
   * 拖拽起手: 轻气泡音
   */
  hover(_id) {
    if (!this.unlocked || this.muted) return;
    this._sfxBubble();
  }

  /**
   * 答对: 大三和弦上行琶音 C5 -> E5 -> G5 -> C6
   */
  correct() {
    if (!this.unlocked || this.muted) return;
    this._sfxArpeggio([523.25, 659.25, 783.99, 1046.5], 0.18, 0.06, 'sine', 0.32);
  }

  /**
   * 答错: 320Hz -> 150Hz 下行
   */
  wrong() {
    if (!this.unlocked || this.muted) return;
    this._sfxSlide(320, 150, 0.35, 'triangle', 0.28);
  }

  /**
   * 通关: 7 音上行 + 末尾高频闪铃
   */
  async playScale(pitches) {
    if (!this.unlocked || this.muted) return;
    // 7 音用 Web Audio 立刻播
    pitches.forEach((pitch, i) => {
      setTimeout(() => this._playNoteWebAudio(pitch), i * 220);
    });
    // 末尾闪铃
    setTimeout(() => this._sfxArpeggio([1046.5, 1567.98, 2093], 0.12, 0.08, 'sine', 0.3),
      pitches.length * 220 + 200);
  }

  /**
   * 切静音
   */
  toggleMute() {
    this.muted = !this.muted;
    if (this._masterGain) {
      this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime);
      this._masterGain.gain.linearRampToValueAtTime(this.muted ? 0 : 0.5, 0.05);
    }
    return this.muted;
  }

  // ──────────────────────────────────────────────
  // 后台加载 Salamander 真钢琴 (可选叠加)
  // ──────────────────────────────────────────────
  async _loadPianoInBackground() {
    try {
      const Tone = await import('tone');
      await Tone.start();
      this._bus = new Tone.Gain(0.9).toDestination();
      const sampler = new Tone.Sampler({
        urls: {
          A1: 'A1.mp3', A2: 'A2.mp3', A3: 'A3.mp3',
          A4: 'A4.mp3', A5: 'A5.mp3', A6: 'A6.mp3',
          C1: 'C1.mp3', C2: 'C2.mp3', C3: 'C3.mp3',
          C4: 'C4.mp3', C5: 'C5.mp3', C6: 'C6.mp3',
        },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        release: 1.4,
      }).connect(this._bus);
      const timeout = new Promise((r) => setTimeout(() => r('timeout'), 12000));
      const result = await Promise.race([Tone.loaded(), timeout]);
      if (result !== 'timeout') {
        this._realPiano = sampler;
        this._realPianoLoaded = true;
        console.log('[Audio] Salamander 钢琴加载完成');
      } else {
        console.warn('[Audio] 钢琴采样加载超时, 保持 Web Audio 合成器');
      }
    } catch (e) {
      console.warn('[Audio] Salamander 加载失败:', e);
    }
  }

  // ──────────────────────────────────────────────
  // SFX 合成辅助
  // ──────────────────────────────────────────────
  _sfxBubble() {
    if (!this._webAudio) return;
    this._resumeWebAudio();
    const ctx = this._webAudio;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(g).connect(this._masterGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  _sfxArpeggio(freqs, duration = 0.18, gap = 0.06, type = 'sine', peak = 0.3) {
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

  _sfxSlide(from = 320, to = 150, duration = 0.35, type = 'triangle', peak = 0.28) {
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
