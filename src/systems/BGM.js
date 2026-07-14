/**
 * 背景音乐 (BGM) — 4 个简单和弦循环
 * 仅用 Web Audio 合成, 不依赖外部资源
 */
export class BGM {
  constructor(audio) {
    this.audio = audio;
    this.playing = false;
    this.notes = [];
    this._stopFn = null;
  }

  start() {
    if (this.playing) return;
    if (!this.audio || !this.audio._webAudio) {
      console.warn('[BGM] Audio not ready, deferring');
      setTimeout(() => this.start(), 500);
      return;
    }
    this.playing = true;
    this._playLoop();
  }

  stop() {
    this.playing = false;
    if (this._stopFn) {
      clearTimeout(this._stopFn);
      this._stopFn = null;
    }
    this.notes.forEach(n => {
      try { n.stop(); } catch (_) {}
    });
    this.notes = [];
  }

  toggle() {
    if (this.playing) this.stop();
    else this.start();
    return this.playing;
  }

  _playLoop() {
    if (!this.playing) return;

    const ctx = this.audio._webAudio;
    if (!ctx) return;

    // 4 个和弦: C-Am-F-G (基础流行进行), 慢节奏
    const CHORDS = [
      // C major: C E G
      [261.63, 329.63, 392.00],
      // A minor: A C E
      [220.00, 261.63, 329.63],
      // F major: F A C
      [174.61, 220.00, 261.63],
      // G major: G B D
      [196.00, 246.94, 293.66],
    ];

    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;  // start silent
    masterGain.gain.linearRampToValueAtTime(0.10, t + 2); // fade in 2s
    masterGain.connect(this.audio._masterGain);

    const CHORD_DURATION = 4;   // 每和弦 4 秒
    const TOTAL_DURATION = CHORDS.length * CHORD_DURATION;

    CHORDS.forEach((chord, idx) => {
      chord.forEach(freq => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * CHORD_DURATION);
        osc.connect(oscGain).connect(masterGain);
        oscGain.gain.setValueAtTime(0, t + idx * CHORD_DURATION);
        oscGain.gain.linearRampToValueAtTime(0.5, t + idx * CHORD_DURATION + 0.5);
        oscGain.gain.linearRampToValueAtTime(0, t + (idx + 1) * CHORD_DURATION);
        osc.start(t + idx * CHORD_DURATION);
        osc.stop(t + (idx + 1) * CHORD_DURATION);
        this.notes.push(osc);
      });
    });

    // 循环: 在 loop 结束时再调一次
    this._stopFn = setTimeout(() => {
      this.notes = [];
      this._playLoop();
    }, TOTAL_DURATION * 1000);
  }
}
