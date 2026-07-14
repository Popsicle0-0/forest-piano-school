/**
 * 音频波形可视化 - 实时显示 playNote 的波形
 */
export class Waveform {
  constructor(stage) {
    this.stage = stage;
    this.canvas = null;
    this.ctx = null;
    this.analyser = null;
    this.dataArray = null;
    this._running = false;
  }

  init(audio) {
    if (!audio || !audio._webAudio) return;
    // 接 MasterGain
    try {
      this.analyser = audio._webAudio.createAnalyser();
      this.analyser.fftSize = 256;
      audio._masterGain.connect(this.analyser);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch (_) {}
  }

  show() {
    if (this.canvas) return;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'waveform-canvas';
    this.canvas.width = 320;
    this.canvas.height = 80;
    this.stage.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this._running = true;
    this._loop();
  }

  hide() {
    this._running = false;
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }
  }

  _loop() {
    if (!this._running || !this.canvas) return;
    requestAnimationFrame(() => this._loop());
    if (!this.analyser) return;

    this.analyser.getByteTimeDomainData(this.dataArray);

    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // 中央线
    this.ctx.strokeStyle = 'rgba(255, 209, 102, 0.5)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, h / 2);
    this.ctx.lineTo(w, h / 2);
    this.ctx.stroke();

    // 波形
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ffd166';
    this.ctx.beginPath();

    const sliceWidth = w / this.dataArray.length;
    let x = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = (v * h) / 2;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
      x += sliceWidth;
    }
    this.ctx.stroke();
  }
}
