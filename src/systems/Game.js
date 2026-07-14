/**
 * Game 控制器 - 关卡 1 状态机
 * 负责: 加载场景、驱动关卡逻辑、判定通关、调度反馈
 *
 * 启动流程(关键):
 *   1) 渲染场景(背景/五线谱/键盘/鱼池/Pip)→ 用户能看到
 *   2) 弹出"点我开始"遮罩 → 用户首次触摸触发 Tone.start()
 *   3) 遮罩关闭 → 鱼入场动画 → 接受拖拽
 */
import { Staff } from '../components/Staff.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';
import { FishPool } from '../components/FishPool.js';
import { Background } from '../components/Background.js';
import { Pip } from '../components/Pip.js';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';

/** C 大调 7 个白键的元数据 (color 用真实 hex, confetti 需要) */
const NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

export class Game {
  constructor({ stageEl, bubbleEl, progress, audio }) {
    this.stage = stageEl;
    this.bubble = bubbleEl;
    this.progress = progress;
    this.audio = audio;
    this.placed = new Set();
    this.gate = false; // 必须等用户首次点击后才放行
  }

  /**
   * 启动关卡 (同步):
   *   - 渲染场景
   *   - 显示"点我开始"遮罩
   *   - 遮罩上的点击会触发 audio.unlockOnGesture() 并开始游戏
   */
  start({ levelId }) {
    this.say('点屏幕开始呀～');

    // 1) 渲染场景(不依赖音频,先让用户看到东西)
    this.bg = new Background(this.stage);
    this.staff = new Staff(this.stage, NOTES);
    this.kb = new PianoKeyboard(this.stage, NOTES);
    this.fishPool = new FishPool(this.stage, NOTES);
    this.pip = new Pip(this.stage);

    // 2) 鱼 → 五线谱 落点回调
    this.fishPool.onDrop = (fish, slotEl, accepted) => this.onFishDrop(fish, slotEl, accepted);
    this.fishPool.onDragStart = (fish) => this.audio.hover(fish.dataset.id);
    this.fishPool.onDragMove = (_fish, slotEl) => {
      if (slotEl && this.staff) this.staff.showHint(slotEl.dataset.id);
      else if (this.staff) this.staff.clearHint();
    };
    this.fishPool.onTap = (fish) => {
      // 单击 = 听这条鱼的音
      try { this.audio.playNote(fish.dataset.pitch); } catch (_) {}
      try { this.audio.hover(fish.dataset.id); } catch (_) {}
      // 鱼弹一下作反馈
      gsap.fromTo(fish, { scale: 1 }, { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
    };

    // 3) 钢琴键直接弹奏(辅助听声)
    this.kb.onPress = (keyEl) => {
      this.audio.playNote(keyEl.dataset.pitch);
      this.kb.glowKey(keyEl);
    };

    // 4) 展示开始遮罩(用户点击是唯一的 iOS 解锁入口)
    this._showStartOverlay();
  }

  /** 通关后的开始遮罩 */
  _showStartOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__card">
        <div class="overlay__title" style="font-size:56px;margin-bottom:8px">🐤</div>
        <h2 class="overlay__title">森林钢琴学校</h2>
        <p class="overlay__text">帮 7 条小鱼 Do Re Mi Fa Sol La Si<br>找到它们在钢琴上的家!</p>
        <button class="btn-primary" id="start-btn">点我开始 ›</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // iOS Safari: pointerdown 比 click 灵敏得多, 立即响应 + 立即解锁音频
    let started = false;
    const onStart = async (e) => {
      if (started) return;
      started = true;
      if (e) e.preventDefault();

      // 关键: 不 await 音频加载! 立刻进游戏, 钢琴采样在后台慢慢加载
      // unlockOnGesture 内部用合成器做 fallback, 立刻能出声
      this.audio.unlockOnGesture().catch((err) => console.warn(err));
      overlay.remove();
      this._beginLevel();
    };

    // 用 pointerdown 立即响应, 不用 click (iOS 有 300ms 延迟)
    const btn = overlay.querySelector('#start-btn');
    btn.addEventListener('pointerdown', onStart);
    // 整张遮罩也可点 (兜底)
    overlay.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#start-btn')) return;
      onStart(e);
    });
  }

  _beginLevel() {
    this.gate = true;
    this.say('把小鱼拖到上面的五线谱上!看唱名对应位置～');
    this.fishPool.intro();
    // 让五线谱 7 个 slot 依次脉冲,作为视觉提示
    this._pulseStaff();
  }

  _pulseStaff() {
    if (!this.staff || !this.staff.svg) return;
    const slots = this.staff.svg.querySelectorAll('.staff-slot');
    slots.forEach((s, i) => {
      setTimeout(() => {
        s.classList.add('pulse-hint');
        setTimeout(() => s.classList.remove('pulse-hint'), 2400);
      }, i * 100);
    });
  }

  // ============================================================
  // 拖拽回调
  // ============================================================

  onFishDrop(fish, slotEl, accepted) {
    if (!this.gate) return;
    if (accepted && slotEl) {
      this.handleCorrect(fish, slotEl);
    } else {
      this.handleWrong(fish);
    }
  }

  handleCorrect(fish, slotEl) {
    const id = fish.dataset.id;
    if (this.placed.has(id)) return;
    this.placed.add(id);

    // 1) 计算 staff slot 中心在鱼池坐标系的位置
    const rect = slotEl.getBoundingClientRect();
    const poolRect = this.fishPool.root.getBoundingClientRect();
    const targetX = rect.left - poolRect.left + rect.width / 2;
    const targetY = rect.top - poolRect.top + rect.height / 2;

    // 2) 鱼飞过去
    const curLeft = parseFloat(fish.style.left) || 0;
    const curTop = parseFloat(fish.style.top) || 0;
    const dx = targetX - curLeft - fish.offsetWidth / 2;
    const dy = targetY - curTop - fish.offsetHeight / 2;

    gsap.to(fish, {
      x: dx,
      y: dy,
      scale: 0.85,
      duration: 0.5,
      ease: 'back.out(1.7)',
      onComplete: () => {
        // 3) 五线谱占位点填色
        try { this.staff.fillNote(id); } catch (_) {}

        // 4) 找到对应的钢琴键(同 data-id),让它发光 + 弹音
        const matchingKey = this.kb && this.kb.svg
          ? this.kb.svg.querySelector(`.key--white[data-id="${id}"]`)
          : null;
        if (matchingKey) {
          try { this.kb.glowKey(matchingKey); } catch (_) {}
          try { this.audio.playNote(matchingKey.dataset.pitch); } catch (_) {}
        }
        try { this.audio.correct(); } catch (_) {}

        // 5) 粒子 (用真实 hex 色, 不用 var()) — 围绕 staff slot
        const colorHex = (NOTES.find((n) => n.id === id) || {}).color || '#ffc971';
        this.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, colorHex);

        // 6) 鱼原地弹一下
        gsap.fromTo(fish, { scale: 0.85 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });

        // 7) 加星
        this.addStar();

        // 8) 检查通关
        if (this.placed.size === NOTES.length) {
          setTimeout(() => this.handleWin(), 600);
        }
      },
    });
  }

  handleWrong(fish) {
    try { this.audio.wrong(); } catch (_) {}
    if (this.staff) this.staff.clearHint();
    fish.classList.add('shake');
    setTimeout(() => fish.classList.remove('shake'), 400);
    gsap.to(fish, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  handleWin() {
    this.gate = false;
    this.say('太棒了!你认识了 7 个音符!');
    try { this.progress.markLevelComplete(1, NOTES.length); } catch (_) {}
    try { this.kb.glowAll(); } catch (_) {}
    try { this.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']); } catch (_) {}
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#e63946', '#f4a261', '#ffc971', '#b5c99a', '#457b9d', '#9b5de5'],
    });
    setTimeout(() => this.showWinOverlay(), 1800);
  }

  // ============================================================
  // UI helpers
  // ============================================================

  addStar() {
    const stars = document.querySelectorAll('#hud-stars .star');
    const idx = this.placed.size - 1;
    if (idx >= 0 && idx < stars.length) {
      stars[idx].textContent = '⭐';
      stars[idx].classList.remove('on');
      void stars[idx].offsetWidth; // restart animation
      stars[idx].classList.add('on');
    }
  }

  showWinOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__card">
        <h2 class="overlay__title">🎉 第一关完成!</h2>
        <p class="overlay__text">你已经认识了 Do Re Mi Fa Sol La Si<br>准备好听更多声音了吗?</p>
        <button class="btn-primary" id="next-btn">下一关 ›</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#next-btn').addEventListener('click', () => {
      overlay.remove();
      this.say('下一关马上来…');
    });
  }

  burst(x, y, color) {
    confetti({
      particleCount: 18,
      spread: 50,
      startVelocity: 22,
      ticks: 60,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [color, '#fff8ec', '#ffc971'],
      shapes: ['circle'],
      scalar: 0.7,
    });
  }

  say(text) {
    if (this.bubble) this.bubble.textContent = text;
  }
}
