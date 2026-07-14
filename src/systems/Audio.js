/**
 * Audio — 完全用原生 Web Audio API 合成 (零依赖, iOS PWA 100% 可用)
 *
 * 设计:
 *  - 不依赖 Tone.js 任何主路径 (iOS PWA 上 PolySynth/Sampler 不稳定)
 *  - 所有声音都用 OscillatorNode + GainNode 直接合成
 *  - 钢琴音: 三角波基音 + 4 个正弦泛音 (×2, ×3, ×4, ×5) + ADSR 包络
 *  - 50ms 高通鼓槌噪声瞬态 (hammer attack)
 *  - 延迟式混响总线 (feedback delay, 给所有音加"大厅"感)
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
    this._reverbBus = null;         // 混响发送总线 (delay-based)
    this._reverbDelay = null;
    // v18: 跟踪所有活跃的 oscillator, 关卡切换时方便统一停止, 避免余音
    this._activeOscillators = new Set();
    this._activeSources = new Set();
  }

  /**
   * v18: 跟踪一个 oscillator (level 切换或显式 stop() 时会被统一 stop)
   * @param {OscillatorNode} osc
   * @param {number} stopAt - Web Audio 时间线上的 stop 时间
   */
  _trackOsc(osc, stopAt) {
    if (!osc) return;
    this._activeOscillators.add(osc);
    const cleanup = () => {
      try { this._activeOscillators.delete(osc); } catch (_) {}
    };
    // onended fires when the oscillator is stopped (by schedule or by external stop())
    osc.onended = cleanup;
  }

  /**
   * v18: 跟踪一个 BufferSource (鼓槌噪声等) — 同样需要清理
   * @param {AudioBufferSourceNode} src
   */
  _trackSource(src) {
    if (!src) return;
    this._activeSources.add(src);
    src.onended = () => { try { this._activeSources.delete(src); } catch (_) {} };
  }

  /**
   * v18: 立即停止所有正在响的 oscillator + 缓冲源.
   * 关卡切换或显式 mute 时调用 — 比 setTimeout cleanup 更可靠, 杜绝余音.
   */
  stop() {
    if (!this._webAudio) return;
    const ctx = this._webAudio;
    const now = ctx.currentTime;
    // 1) 把所有 osc 在 now 立即 stop + 静音 (避免 click)
    this._activeOscillators.forEach((osc) => {
      try {
        // 静音 gain, 再 stop, 避免切断瞬间爆音
        osc.disconnect();
      } catch (_) {}
      try { osc.stop(now); } catch (_) { /* already stopped */ }
    });
    this._activeOscillators.clear();
    // 2) 缓冲源 (鼓槌噪声) — 直接 stop
    this._activeSources.forEach((src) => {
      try { src.stop(now); } catch (_) {}
      try { src.disconnect(); } catch (_) {}
    });
    this._activeSources.clear();
  }

  /**
   * 用户首次手势里调用: 初始化 Web Audio, resume context, 并同步在 gesture
   * handler 里 schedule 一个测试音.
   *
   * v17.2 关键修复: 测试音和 unlock oscillator 必须在同一个 gesture handler 里
   * 同步 schedule (用 ctx.currentTime + offset), 不能用 setTimeout. 因为
   * setTimeout 回调在 iOS PWA 上会脱离 gesture context, 导致 osc.start() 被拒.
   */
  async unlockOnGesture() {
    if (this.unlocked) return;

    console.log('[Audio] unlockOnGesture entered');

    // Step 1: 创建 AudioContext 同步进行 (不要塞到 callback)
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        console.warn('[Audio] Web Audio API not supported');
        return;
      }
      if (!this._webAudio) {
        this._webAudio = new Ctx();
        this._masterGain = this._webAudio.createGain();
        this._masterGain.gain.value = 0.75;
        this._masterGain.connect(this._webAudio.destination);
        this._setupReverb();
      }
    } catch (e) {
      console.warn('[Audio] 创建 AudioContext 失败:', e);
      return;
    }

    // Step 2: fire-and-forget resume (不要 await — 保持 gesture context)
    if (this._webAudio.state === 'suspended') {
      try {
        this._webAudio.resume();
        console.log('[Audio] resume() fired, state will become running');
      } catch (e) {
        console.warn('[Audio] resume() failed:', e);
      }
    }

    // Step 3: 静音 oscillator (iOS unlocker). gain=0, 在 gesture context 里 start.
    // 这是 iOS PWA 解锁 AudioContext 的标准做法.
    try {
      const osc = this._webAudio.createOscillator();
      const gain = this._webAudio.createGain();
      gain.gain.value = 0;
      osc.connect(gain).connect(this._masterGain);
      osc.start();
      osc.stop(this._webAudio.currentTime + 0.01);
      console.log('[Audio] silent osc started (unlocker)');
    } catch (e) {
      console.warn('[Audio] silent osc failed:', e);
    }

    // Step 4: AUDIBLE 测试音 — schedule 在 Web Audio 时间线上 (不用 setTimeout).
    // 关键: 同步在 gesture handler 里调用 osc.start(t), t 是未来的 ctx.currentTime.
    // osc.start 在 gesture context 里, 即使 t 在未来, iOS PWA 也能正常播放.
    try {
      const t = this._webAudio.currentTime + 0.05;  // 50ms in the future, on audio timeline
      const osc = this._webAudio.createOscillator();
      const gain = this._webAudio.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t);  // C5
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.6, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.connect(gain).connect(this._masterGain);
      osc.start(t);
      osc.stop(t + 0.45);
      console.log('[Audio] test tone scheduled at currentTime+0.05');
    } catch (e) {
      console.warn('[Audio] test tone schedule failed:', e);
    }

    // Step 5: HTML5 audio 暖通 (iOS PWA 有时需要 Web Audio + HTMLAudio 都暖一下)
    try {
      const a = new Audio();
      a.src = 'data:audio/mp3;base64,//uQx';
      a.play().catch(() => {});
    } catch (_) {}

    this.unlocked = true;

    // Step 6: Salamander 真钢琴采样后台加载
    this._loadPianoInBackground();

    console.log('[Audio] unlocked! state=', this._webAudio.state);
  }

  _resumeWebAudio() {
    if (this._webAudio && this._webAudio.state === 'suspended') {
      this._webAudio.resume().catch(() => {});
    }
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
   * 设置延迟式混响总线 (web audio 自反馈). 只在首次 createCtx 时调一次.
   */
  _setupReverb() {
    if (!this._webAudio || this._reverbBus) return;
    const ctx = this._webAudio;

    // 主混响发送总线
    this._reverbBus = ctx.createGain();
    this._reverbBus.gain.value = 0.18;

    // 主延迟 (250ms) + 自反馈 0.4, 形成"大厅"感
    this._reverbDelay = ctx.createDelay(1.0);
    this._reverbDelay.delayTime.value = 0.25;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.4;
    const wet = ctx.createGain();
    wet.gain.value = 1.0;

    // 反馈环路
    this._reverbBus.connect(this._reverbDelay);
    this._reverbDelay.connect(feedback);
    feedback.connect(this._reverbDelay);   // 自反馈
    feedback.connect(wet);
    wet.connect(this._masterGain);
  }

  /**
   * 原生 Web Audio 钢琴音:
   *  - 三角波基音 + 4 个正弦泛音 (×2, ×3, ×4, ×5)
   *  - 50ms 高通过滤噪声鼓槌瞬态
   *  - 20% 信号送混响总线
   *  - ADSR 包络
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

    // ─── 鼓槌噪声瞬态 (hammer strike, 50ms) ───────────────────────
    const noiseBufferSize = Math.floor(ctx.sampleRate * 0.05);
    const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBufferSize; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseBufferSize);
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1500;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.15;
    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this._masterGain);
    noiseSrc.start(t);
    noiseSrc.stop(t + 0.05);
    this._trackSource(noiseSrc);

    // ─── 基音 + 4 泛音 ─────────────────────────────────────────────
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t);

    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, t);

    // 4 次泛音 (新增, 更弱的成分, 加强钢琴金属感)
    const osc4 = ctx.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(freq * 4, t);
    // 5 次泛音 (新增, 极弱的音色细节)
    const osc5 = ctx.createOscillator();
    osc5.type = 'sine';
    osc5.frequency.setValueAtTime(freq * 5, t);

    // ADSR 包络
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.65, t + 0.01);    // attack
    env.gain.exponentialRampToValueAtTime(0.35, t + 0.15);    // decay
    env.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);    // release

    // 泛音量
    const g2 = ctx.createGain();
    g2.gain.value = 0.15;
    const g3 = ctx.createGain();
    g3.gain.value = 0.05;
    const g4 = ctx.createGain();
    g4.gain.value = 0.03;   // 4 次泛音更弱
    const g5 = ctx.createGain();
    g5.gain.value = 0.015;  // 5 次泛音更更弱

    osc1.connect(env);
    osc2.connect(g2); g2.connect(env);
    osc3.connect(g3); g3.connect(env);
    osc4.connect(g4); g4.connect(env);
    osc5.connect(g5); g5.connect(env);
    env.connect(this._masterGain);

    // 20% 信号送混响总线
    const sendGain = ctx.createGain();
    sendGain.gain.value = 0.2;
    env.connect(sendGain);
    sendGain.connect(this._reverbBus);

    const stopT = t + 0.85;
    osc1.start(t); osc1.stop(stopT);
    osc2.start(t); osc2.stop(stopT);
    osc3.start(t); osc3.stop(stopT);
    osc4.start(t); osc4.stop(stopT);
    osc5.start(t); osc5.stop(stopT);
    // v18: 跟踪活跃 osc, 关卡切换时 stop() 可一键静音
    this._trackOsc(osc1, stopT);
    this._trackOsc(osc2, stopT);
    this._trackOsc(osc3, stopT);
    this._trackOsc(osc4, stopT);
    this._trackOsc(osc5, stopT);
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
    this._sfxArpeggio([523.25, 659.25, 783.99, 1046.5], 0.18, 0.06, 'sine', 0.55);
  }

  /**
   * 答错: 320Hz -> 150Hz 下行
   */
  wrong() {
    if (!this.unlocked || this.muted) return;
    this._sfxSlide(320, 150, 0.35, 'triangle', 0.45);
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
    setTimeout(() => this._sfxArpeggio([1046.5, 1567.98, 2093], 0.12, 0.08, 'sine', 0.5),
      pitches.length * 220 + 200);
  }

  /**
   * 切静音
   */
  toggleMute() {
    this.muted = !this.muted;
    if (this._masterGain) {
      this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime);
      this._masterGain.gain.linearRampToValueAtTime(this.muted ? 0 : 0.75, 0.05);
    }
    // v18: 静音时立即停掉所有正在响的 osc, 避免长 envelope 余音
    if (this.muted) {
      try { this.stop(); } catch (_) {}
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
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(g).connect(this._masterGain);
    osc.start(t);
    osc.stop(t + 0.18);
    this._trackOsc(osc, t + 0.18);
  }

  _sfxArpeggio(freqs, duration = 0.18, gap = 0.06, type = 'sine', peak = 0.5) {
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
      this._trackOsc(osc, t0 + duration + 0.05);
    });
  }

  _sfxSlide(from = 320, to = 150, duration = 0.35, type = 'triangle', peak = 0.45) {
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
    this._trackOsc(osc, t + duration + 0.05);
  }
}
