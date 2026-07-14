/**
 * Game 控制器 - 关卡 1 状态机
 * 负责: 加载场景、驱动关卡逻辑、判定通关、调度反馈、引导气泡、重玩
 *
 * 引导气泡状态机 (v16 新增):
 *   pre_start  →  intro   →  hint_listen  →  hint_first_drop
 *   →  hint_keep_going (按 N 调整文案)
 *   →  wrong_drop (鱼 id 决定文案)
 *   →  idle_stuck (15s 无活动触发)
 *   →  win (通关, 显示星级)
 *
 * 重玩支持 (v16 新增):
 *   restartLevel() → 清空 staff + 鱼归位 + 重置 placed + 错误计数 + 星星
 *
 * 星级 (v16 新增):
 *   wrongCount 决定星数: 0 错=3⭐, 1-2 错=2⭐, 3-5 错=1⭐, 6+ 错=0⭐
 */
import { Staff } from '../components/Staff.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';
import { FishPool } from '../components/FishPool.js';

// v17.8+: 多关卡注册表. 自动扫描 src/systems/Level*.js, 每个文件 default 导出
// 一个 (game) => teardownFn 的启动函数. Game.start({levelId}) 通过本表分发.
// 新增关卡只需创建一个 LevelN.js, 无需修改 Game.js.
const LEVEL_FILES = import.meta.glob('./Level*.js', { eager: true });
const levelStarters = new Map();
for (const [path, mod] of Object.entries(LEVEL_FILES)) {
  const m = path.match(/Level(\d+)\.js$/);
  if (m && typeof mod.default === 'function') {
    levelStarters.set(parseInt(m[1], 10), mod.default);
  }
}
if (typeof window !== 'undefined') {
  window.__forestPiano = window.__forestPiano || {};
  window.__forestPiano.levels = levelStarters;
}
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

const ENCOURAGE = [
  '真棒!',
  '太厉害了~',
  '不错哟!',
  '加油加油!',
  '马上就完成了!',
];

export class Game {
  constructor({ stageEl, bubbleEl, progress, audio }) {
    this.stage = stageEl;
    this.bubble = bubbleEl;
    this.progress = progress;
    this.audio = audio;
    this.placed = new Set();
    this.wrongCount = 0;           // v16: 错误数 (算星用)
    this.hasTappedFish = false;    // v16: 是否单击听过鱼声
    this.hasStartedDrag = false;   // v16: 是否拖过任何一条
    this.gate = false;             // 必须等用户首次点击后才放行
    this._lastActivityAt = 0;      // v16: 用户最后操作时间
    this._idleNudgeScheduled = false;
    this._hintTimer = null;
  }

  /**
   * 启动关卡 (同步): 清场 + 重置状态 + 按 levelId 分发
   *
   * 新版: 用 levelStarters Map 分发. 每个关卡 (LevelN.js) 默认导出一个函数
   *   (game) => teardownFn, 调用后游戏进该关卡状态, teardownFn 在切换关卡时调用.
   * 这让新增关卡无需修改 Game.js — 直接添加 src/systems/LevelN.js 文件即可.
   */
  start({ levelId }) {
    // 关闭所有 overlay
    document.querySelectorAll('.overlay').forEach((el) => el.remove());
    // 清空舞台 (重建场景, 避免叠加上一关的 DOM)
    if (this.stage) this.stage.innerHTML = '';

    // 重置状态
    this.placed.clear();
    this.wrongCount = 0;
    this.hasTappedFish = false;
    this.hasStartedDrag = false;
    this._firstCorrectNote = null;
    this.firstCorrectNote = null;
    this._lastCorrectNote = '';
    this._lastWrongHint = '';
    this._clearHintTimer();
    this._idleNudgeScheduled = false;
    this.gate = false;

    // 第二关状态
    this._level2AnswerNote = null;
    this._level2Current = 0;
    this._level2Done = new Set();

    // teardown 旧关卡 (如有)
    if (typeof this._teardownCurrentLevel === 'function') {
      try { this._teardownCurrentLevel(); } catch (_) {}
      this._teardownCurrentLevel = null;
    }

    const starter = levelStarters.get(levelId);
    if (starter) {
      try {
        const teardown = starter(this);
        this._teardownCurrentLevel = typeof teardown === 'function' ? teardown : null;
      } catch (err) {
        console.error(`Level ${levelId} failed to start:`, err);
        this._fallbackToLevel1();
      }
      return;
    }

    // fallback - 默认第一关
    console.warn(`Level ${levelId} not registered, falling back to Level 1`);
    this._startLevel1();
  }

  _fallbackToLevel1() {
    const starter = levelStarters.get(1) || this._startLevel1.bind(this);
    try { starter(this); } catch (err) { console.error(err); }
  }

  /**
   * 第一关: 拖鱼归位 (原 start 逻辑)
   *   - 渲染场景
   *   - 显示"点我开始"遮罩
   *   - 遮罩上的点击会触发 audio.unlockOnGesture() 并开始游戏
   */
  _startLevel1() {
    this._showLevel2HUD(false);
    this.say('点屏幕开始呀～');

    // 1) 渲染场景(不依赖音频,先让用户看到东西)
    this.bg = new Background(this.stage);
    this.staff = new Staff(this.stage, NOTES);
    this.kb = new PianoKeyboard(this.stage, NOTES);
    this.fishPool = new FishPool(this.stage, NOTES);
    this.pip = new Pip(this.stage);
    this.fishPool.setDragEnabled(true);   // 第一关允许拖动

    // 2) 鱼 → 五线谱 落点回调
    this.fishPool.onDrop = (fish, slotEl, accepted) => this.onFishDrop(fish, slotEl, accepted);
    this.fishPool.onDragStart = (fish) => {
      this._markActivity();
      if (!this.hasStartedDrag) this.hasStartedDrag = true;
      this.audio.hover(fish.dataset.id);
    };
    this.fishPool.onDragMove = (_fish, slotEl) => {
      this._markActivity();
      if (slotEl && this.staff) this.staff.showHint(slotEl.dataset.id);
      else if (this.staff) this.staff.clearHint();
    };
    this.fishPool.onTap = (fish) => {
      this._markActivity();
      if (!this.hasTappedFish) {
        this.hasTappedFish = true;
        this._advanceHint('first_tap');
      }
      // 单击 = 听这条鱼的音
      try { this.audio.playNote(fish.dataset.pitch); } catch (_) {}
      try { this.audio.hover(fish.dataset.id); } catch (_) {}
      // 鱼弹一下作反馈
      gsap.fromTo(fish, { scale: 1 }, { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
    };

    // 3) 钢琴键直接弹奏(辅助听声)
    this.kb.onPress = (keyEl) => {
      this._markActivity();
      this.audio.playNote(keyEl.dataset.pitch);
      this.kb.glowKey(keyEl);
    };

    // 4) 展示开始遮罩(用户点击是唯一的 iOS 解锁入口)
    this._showStartOverlay();
  }

  /**
   * 第二关: 听音找鱼 (教学模式, 无拖拽)
   *   系统播一个音, 孩子点对应的小鱼; 答错不扣星只重播提示.
   */
  _startLevel2() {
    this._showLevel2HUD(true);
    this.say('第二关, 听音找鱼! 系统会播一个音, 找对的小鱼~');

    // 简化场景: 只要键盘 + 鱼池 (不要 Staff / Pip)
    this.bg = new Background(this.stage);
    this.kb = new PianoKeyboard(this.stage, NOTES);   // 让孩子按琴键自己试音
    this.fishPool = new FishPool(this.stage, NOTES);
    this.fishPool.setDragEnabled(false);              // 关键: 不允许拖, 只能点

    // 题目状态
    this._level2Total = 5;
    this._level2Current = 0;
    this._level2AnswerNote = null;
    this._level2Done = new Set();
    this.gate = true;

    // 鱼点选 handler
    this.fishPool.onTap = (fish) => {
      this._markActivity();
      if (!fish) return;
      const id = fish.dataset.id;
      if (!this._level2AnswerNote) return;   // 题还没出
      this._handleLevel2Answer(id, fish);
    };
    this.fishPool.onDragStart = null;
    this.fishPool.onDragMove = null;
    this.fishPool.onDrop = null;

    // 琴键按了 = 让孩子试音
    this.kb.onPress = (keyEl) => {
      this._markActivity();
      this.audio.playNote(keyEl.dataset.pitch);
      this.kb.glowKey(keyEl);
    };

    // 重听按钮
    const replayBtn = document.getElementById('btn-replay-q');
    if (replayBtn) replayBtn.onclick = () => this._replayQuestion();

    // 重新触发布局 (新建的 DOM 需要 main.js 的 applyPhoneLayout/applyTabletLayout 接管)
    setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

    this._updateHudProgress();

    // 第一题
    setTimeout(() => this._level2NextQuestion(), 800);
  }

  // ============================================================
  // 第二关: 听音找鱼 逻辑
  // ============================================================

  _handleLevel2Answer(id, fish) {
    if (id === this._level2AnswerNote) {
      // 答对
      try { this.audio.correct(); } catch (_) {}
      this._markLevel2FishCorrect(fish);
      const note = NOTES.find((n) => n.id === id);
      this._floatScore(window.innerWidth / 2, window.innerHeight / 2, (note ? note.solfege : '') + ' ✓');
      this.say(`对啦! 这就是 ${note ? note.solfege : ''} 🎉`);
      this._level2AnswerNote = null;  // 锁住本题, 防止连点
      setTimeout(() => this._level2NextQuestion(), 1600);
    } else {
      // 答错 — 教学关不强制, 重播让再试
      this.wrongCount++;
      try { this.audio.wrong(); } catch (_) {}
      fish.classList.add('shake');
      setTimeout(() => fish.classList.remove('shake'), 400);
      this.say(`刚才听到的是 ${this._lastPlayedSolfege}, 再找找看? 🎵`);
      this._replayQuestion();
    }
  }

  _level2NextQuestion() {
    this._level2Current++;
    if (this._level2Current > this._level2Total) {
      return this._handleLevel2Win();
    }

    // 从"还没答对过"的音里随机挑 (7 音 >= 5 题, 保证不会挑到已锁定的鱼)
    const done = this._level2Done || new Set();
    const available = NOTES.filter((n) => !done.has(n.id));
    const pool = available.length ? available : NOTES;
    const note = pool[Math.floor(Math.random() * pool.length)];

    this._level2AnswerNote = note.id;
    this._lastPlayedSolfege = note.solfege;

    this._updateLevel2HUD();
    this.say('听一听, 哪条小鱼是这个音? 🎵');

    // 播音
    try { this.audio.playNote(note.pitch); } catch (_) {}
  }

  _replayQuestion() {
    if (!this._level2AnswerNote) return;
    const note = NOTES.find((n) => n.id === this._level2AnswerNote);
    if (note) {
      try { this.audio.playNote(note.pitch); } catch (_) {}
    }
  }

  _markLevel2FishCorrect(fish) {
    if (!this._level2Done) this._level2Done = new Set();
    this._level2Done.add(fish.dataset.id);
    fish.classList.add('fish--correct');
    fish.style.pointerEvents = 'none';   // 答对的鱼禁止再点
    this._updateHudProgress();
  }

  _updateLevel2HUD() {
    this._updateHudProgress();
  }

  _updateHudProgress() {
    const done = this._level2Done ? this._level2Done.size : 0;
    const total = this._level2Total || 5;
    const badge = document.getElementById('level2-badge');
    if (badge) badge.textContent = `第 ${done} / ${total} 题`;
    const replayBtn = document.getElementById('btn-replay-q');
    if (replayBtn) replayBtn.style.display = (this._level2Current <= total) ? '' : 'none';
  }

  _handleLevel2Win() {
    this.gate = false;
    this._clearHintTimer();
    const stars = this._calcStars();
    try { this.progress.markLevelComplete(2, stars); } catch (_) {}
    try { this.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']); } catch (_) {}
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#e63946', '#f4a261', '#ffc971', '#b5c99a', '#457b9d', '#9b5de5'],
      });
    } catch (_) {}
    setTimeout(() => this.showWinOverlay(stars, 2), 1200);
  }

  /** 切换第二关 HUD 徽章 (隐藏进度点与普通重玩按钮) */
  _showLevel2HUD(show) {
    const el = document.getElementById('hud-level2');
    if (el) el.style.display = show ? '' : 'none';
    const dots = document.querySelector('.hud__dots');
    if (dots) dots.style.display = show ? 'none' : '';
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) btnReplay.style.display = show ? 'none' : '';
  }

  /** 通关后的开始遮罩 */
  _showStartOverlay() {
    // 如果之前有过 win overlay, 先清掉 (重玩时调)
    document.querySelectorAll('.overlay').forEach((el) => el.remove());

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
    this._markActivity();
    this.say('欢迎来到森林!🐤 点点小鱼, 听听它们的声音~');
    this.fishPool.intro();
    this._pulseStaff();
    this._enterHint('intro');
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
  // v16: 引导气泡状态机
  // ============================================================

  _markActivity() {
    this._lastActivityAt = Date.now();
  }

  _clearHintTimer() {
    if (this._hintTimer) {
      clearTimeout(this._hintTimer);
      this._hintTimer = null;
    }
  }

  /** 进入某个状态 (设置 bubble text + 类名 + pulse) */
  _enterHint(state) {
    if (!this.bubble) return;
    this._clearHintTimer();
    let text = '';
    switch (state) {
      case 'intro':
        text = '先把手指放在小鱼上, 听听它唱的啥 🎵';
        this._scheduleIdleNudge(12000, 'idle_1');
        break;
      case 'hint_listen':
        text = '先随便摸一条鱼听听它的声音吧~ 🐟';
        this._scheduleIdleNudge(14000, 'idle_1');
        break;
      case 'first_tap':
        text = '听到了吗? 这种声音在钢琴上也有哦! 🎹';
        this._scheduleIdleNudge(10000, 'idle_drag');
        break;
      case 'hint_drag':
        text = '试试长按这条鱼, 拖到上面五线谱 Do 的位置~';
        this._scheduleIdleNudge(10000, 'idle_drag');
        break;
      case 'first_correct':
        text = this._placedOnText(this.firstCorrectNote) + ' 找到了家! 还有 ' + (NOTES.length - 1) + ' 条要帮~';
        this._scheduleIdleNudge(12000, 'idle_keep_going');
        break;
      case 'correct_subsequent': {
        const note = this._lastCorrectNote;
        text = `${note} 归位啦! ${ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]}`;
        this._scheduleIdleNudge(14000, 'idle_keep_going');
        break;
      }
      case 'wrong_drop_near':
        text = this._lastWrongHint || '呀, 试试上面那个颜色一样的位置!';
        this._scheduleIdleNudge(8000, 'idle_keep_going');
        break;
      case 'wrong_drop_far':
        text = '不对哟~ 拖到上面那条五线谱的家 ✨';
        this._scheduleIdleNudge(8000, 'idle_keep_going');
        break;
      case 'idle_keep_going':
        text = '没关系! 试试别的鱼, 一条一条来~';
        this._scheduleIdleNudge(12000, 'idle_hard');
        break;
      case 'idle_hard':
        text = '先听一首钢琴曲怎么样? 试试底下的钢琴键吧! 🎹';
        this._scheduleIdleNudge(20000, 'idle_give_up');
        break;
      case 'win':
        // 单独的 win 遮罩接管, 不动 bubble
        return;
      default:
        text = state;
    }
    this.say(text);
    this.bubble.classList.remove('bubble--pulse');
    void this.bubble.offsetWidth; // restart animation
    this.bubble.classList.add('bubble--pulse');
  }

  _advanceHint(event) {
    // 事件驱动的状态推进
    switch (event) {
      case 'first_tap':
        // 先听完再引导拖动
        this._hintTimer = setTimeout(() => this._enterHint('hint_drag'), 4500);
        break;
      case 'first_correct':
        this._enterHint('first_correct');
        break;
      case 'subsequent_correct':
        this._enterHint('correct_subsequent');
        break;
      default:
        break;
    }
  }

  _scheduleIdleNudge(afterMs, target) {
    if (this._idleNudgeScheduled) return;
    this._clearHintTimer();
    this._hintTimer = setTimeout(() => {
      // 仍没活动才会再推; 检查 placed 数对比即可 (避免重复)
      const stillStuck = (
        (target === 'idle_1' && !this.hasTappedFish) ||
        (target === 'idle_drag' && !this.hasStartedDrag) ||
        (target === 'idle_keep_going' && this.placed.size < NOTES.length) ||
        (target === 'idle_hard')
      );
      if (stillStuck) {
        this._idleNudgeScheduled = false;
        this._enterHint(target);
        return;
      }
      // 已推进, 不再 nudge
    }, afterMs);
    this._idleNudgeScheduled = true;
  }

  _placedOnText(noteId) {
    const n = NOTES.find((x) => x.id === noteId);
    return n ? n.solfege : '小鱼';
  }

  _lastWrongHint = '';
  _lastCorrectNote = '';
  _firstCorrectNote = null;

  // ============================================================
  // 拖拽回调
  // ============================================================

  onFishDrop(fish, slotEl, accepted) {
    if (!this.gate) return;
    this._markActivity();
    if (accepted && slotEl) {
      this.handleCorrect(fish, slotEl);
    } else {
      this.handleWrong(fish, slotEl);
    }
  }

  handleCorrect(fish, slotEl) {
    const id = fish.dataset.id;
    if (this.placed.has(id)) return;
    this.placed.add(id);
    // v17: 正确放置后锁定这条鱼 — 不能再拖, 也不能再点
    try { this.fishPool.lockFish(id); } catch (_) {}
    this._lastCorrectNote = this._placedOnText(id);
    const isFirst = this.firstCorrectNote === null || this.firstCorrectNote === undefined;
    if (isFirst) this.firstCorrectNote = id;

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

        // 标记对应琴键 (永久)
        try { this.kb.markPlaced(id, colorHex); } catch (_) {}

        // 夸张反馈: 全屏白闪 + 飘字 +1 + 鱼摇摆庆祝
        this._flashScreen();
        const noteObj = NOTES.find((n) => n.id === id);
        if (noteObj) {
          this._floatScore(rect.left + rect.width / 2, rect.top, `${noteObj.solfege} +1`);
          try { this.audio.playNote(noteObj.pitch); } catch (_) {} // 再弹一次该音
        }

        // 鱼摇摆庆祝 0.6s
        gsap.to(fish, {
          rotation: '+=8',
          transformOrigin: '50% 50%',
          duration: 0.12,
          yoyo: true,
          repeat: 5,
          ease: 'sine.inOut',
          onComplete: () => gsap.to(fish, { rotation: 0, duration: 0.2, ease: 'power2.out' })
        });

        // 6) 鱼原地弹一下
        gsap.fromTo(fish, { scale: 0.85 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });

        // 7) 加星 (即时给 1 颗, 通关时再按 wrongCount 校正)
        this.addStar();

        // 8) 推进引导气泡
        if (isFirst) this._advanceHint('first_correct');
        else this._advanceHint('subsequent_correct');

        // 9) 检查通关
        if (this.placed.size === NOTES.length) {
          setTimeout(() => this.handleWin(), 600);
        }
      },
    });
  }

  handleWrong(fish, slotEl) {
    this.wrongCount++;
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

    // 给针对性提示: 鱼的名字 + 它应该去的方向
    const fishId = fish.dataset.id;
    const fishNote = NOTES.find((n) => n.id === fishId);
    if (slotEl) {
      // 拖到错误 slot (但还是有点近) — 提示鱼名 + 哪个 slot 是它的家
      this._lastWrongHint = `${fishNote ? fishNote.solfege : '这条鱼'} 的家在上面, 看看五线谱上的唱名哦~`;
      this._enterHint('wrong_drop_near');
    } else {
      // 拖到空白区
      this._lastWrongHint = '把鱼拖到上面五线谱的圆圈里~';
      this._enterHint('wrong_drop_far');
    }
  }

  // ============================================================
  // v16: 星级计算
  // ============================================================

  _calcStars() {
    if (this.wrongCount <= 0) return 3;
    if (this.wrongCount <= 2) return 2;
    if (this.wrongCount <= 5) return 1;
    return 0;
  }

  /** 显式按星数覆盖 HUD 星 (通关瞬间调用) */
  applyFinalStars() {
    return this._calcStars();
  }

  handleWin() {
    this.gate = false;
    this._clearHintTimer();

    const earned = this.applyFinalStars();
    try { this.progress.markLevelComplete(1, earned); } catch (_) {}
    try { this.kb.glowAll(); } catch (_) {}
    try { this.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']); } catch (_) {}
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#e63946', '#f4a261', '#ffc971', '#b5c99a', '#457b9d', '#9b5de5'],
    });

    setTimeout(() => this.showWinOverlay(earned, 1), 1800);
  }

  // ============================================================
  // UI helpers
  // ============================================================

  addStar() {
    const dots = document.querySelectorAll('#hud-dots .dot');
    const idx = this.placed.size - 1;
    if (idx >= 0 && idx < dots.length) {
      dots[idx].classList.remove('on');
      void dots[idx].offsetWidth; // restart animation
      dots[idx].classList.add('on');
    }
  }

  showWinOverlay(stars, wonLevel = 1) {
    // 关掉已有 overlay
    document.querySelectorAll('.overlay').forEach((el) => el.remove());

    const starIcons = [0, 1, 2].map((i) =>
      `<span class="win-star ${i < stars ? 'on' : ''}">${i < stars ? '⭐' : '☆'}</span>`
    ).join('');

    const mistakes = this.wrongCount;
    const isL2 = wonLevel === 2;
    const title = isL2 ? '🎉 第二关完成!' : '🎉 第一关完成!';
    const subText = isL2 ? '你的耳朵越来越灵啦! 听音找鱼全对~' : '你已经认识了 Do Re Mi Fa Sol La Si';
    const doneCount = isL2 ? (this._level2Total || 5) : NOTES.length;
    const doneLabel = isL2 ? '答对题数' : '正确放置';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__card">
        <div class="overlay__title">${title}</div>
        <div class="win-stars">${starIcons}</div>
        <p class="overlay__text">${subText}</p>

        <div class="win-stats">
          <div class="win-stat ${mistakes === 0 ? 'good' : mistakes <= 2 ? 'ok' : mistakes <= 5 ? 'meh' : 'bad'}">
            <span class="win-stat__icon">${mistakes === 0 ? '✨' : '✋'}</span>
            <span class="win-stat__label">${mistakes === 0 ? '零错误' : '错误尝试'}</span>
            <span class="win-stat__value">${mistakes === 0 ? '0 次' : mistakes + ' 次'}</span>
          </div>
          <div class="win-stat">
            <span class="win-stat__icon">🎵</span>
            <span class="win-stat__label">${doneLabel}</span>
            <span class="win-stat__value">${doneCount} / ${doneCount}</span>
          </div>
        </div>

        <div class="win-criteria">
          ${stars === 3 ? '<span class="on">⭐⭐⭐</span> 0 错 = 完美' :
            stars === 2 ? '<span class="on">⭐⭐</span><span class="off">⭐</span> 1-2 错 = 优秀' :
            stars === 1 ? '<span class="on">⭐</span><span class="off">⭐⭐</span> 3-5 错 = 良好' :
            '<span class="off">⭐⭐⭐</span> 6+ 错 = 再练'}
        </div>

        <div class="overlay__btns">
          <button class="btn-secondary" id="replay-btn">↻ 再玩一次</button>
          <button class="btn-primary" id="next-btn">下一关 ›</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const nextBtn = overlay.querySelector('#next-btn');
    if (wonLevel === 1) {
      nextBtn.textContent = '第 2 关 ›';
      nextBtn.onclick = () => {
        overlay.remove();
        this.say('第二关马上来...');
        this.start({ levelId: 2 });
      };
    } else {
      nextBtn.textContent = '🎉 全部完成';
      nextBtn.onclick = () => {
        overlay.remove();
        this._showAllDoneOverlay();
      };
    }

    overlay.querySelector('#replay-btn').onclick = () => {
      overlay.remove();
      this.start({ levelId: wonLevel });
    };
  }

  /** 全部关卡完成: 庆祝 + 预告更多关卡 */
  _showAllDoneOverlay() {
    document.querySelectorAll('.overlay').forEach((el) => el.remove());
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__card">
        <div class="overlay__title">🌟 全部完成!</div>
        <div class="overlay__text">已经认识了 7 个音符 + 听音找鱼<br>更多关卡以后解锁~</div>
        <div class="overlay__btns">
          <button class="btn-secondary" id="replay-btn">↻ 再玩一次 (第 1 关)</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#replay-btn').onclick = () => {
      overlay.remove();
      this.start({ levelId: 1 });
    };
  }

  _correctnessComment(stars) {
    if (stars === 3) return '全对! 你真是个钢琴小天才 ⭐';
    if (stars === 2) return '不错! 错一点点, 离完美不远了~';
    if (stars === 1) return '完成了! 多练几次就能满分啦~';
    return '没关系, 再来一次一定行!';
  }

  /**
   * 重玩 (v16 新增)
   *  - 重置 staff + fish + bubbles + 星星
   *  - 关闭任何 overlay
   *  - 重新开始关卡逻辑 (不开开始遮罩, 让玩家立即进入)
   */
  restartLevel() {
    // 清遮罩
    document.querySelectorAll('.overlay').forEach((el) => el.remove());
    this._showLevel2HUD(false);

    // 状态重置
    this.placed.clear();
    this.wrongCount = 0;
    this.hasTappedFish = false;
    this.hasStartedDrag = false;
    this._firstCorrectNote = null;
    this._lastCorrectNote = '';
    this._lastWrongHint = '';
    this._clearHintTimer();
    this._idleNudgeScheduled = false;

    // 视觉重置
    if (this.kb) this.kb.resetMarks();
    if (this.staff) this.staff.reset();
    if (this.fishPool) this.fishPool.reset();

    // HUD 进度点先重置
    document.querySelectorAll('#hud-dots .dot').forEach((el) => {
      el.classList.remove('on');
    });

    // 重新进入引导
    this._beginLevel();
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

  _flashScreen() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 300);
    }, 50);
  }

  _floatScore(x, y, text) {
    const el = document.createElement('div');
    el.className = 'score-float';
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }

  say(text) {
    if (this.bubble) this.bubble.textContent = text;
  }
}
