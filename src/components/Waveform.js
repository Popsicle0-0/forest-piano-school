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
    // v19 审查修复: Game 构造时 show() 挂进 stage 的画布会被随后的
    // Game.start() 清场 innerHTML='' 带走, 旧代码的 `if (this.canvas)
    // return` 把悬空的旧引用挡在门口 → 波形从此失明且循环空转。
    // 现在: 只要画布不在文档里就重建; 已有的 rAF 循环按属性读取
    // this.canvas, 会自动接上新画布, 不产生第二个循环。
    if (this.canvas && this.canvas.isConnected) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'waveform-canvas';
    canvas.width = 320;
    canvas.height = 80;
    this.stage.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (!this._running) {
      this._running = true;
      this._loop();
    }
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
