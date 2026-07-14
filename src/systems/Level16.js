/**
 * Level 16: 节奏速度阶梯 (Rhythm Speed Ladder)
 *
 * 故事: 一架火箭鼓, 旁边一架节拍器 (梯子).
 *       摆杆摆动, 摆到中线时点击大鼓. 共 8 轮, BPM 从 60 → 130, 步进 10.
 *
 * 玩法:
 *  - 摆杆摆动: 速度由当前 BPM 控制 (60/BPM 秒 = 一次半周期)
 *  - 点击鼓: 计算当下时间与下次 "中线时刻" 偏差
 *    - ≤ 1/3 间隔 → 完美 (score++, combo++)
 *    - ≤ 2/3 间隔 → 良好 (combo 保留, 不计分)
 *    - > 2/3 间隔 → 漏拍 (combo 断)
 *  - 每轮结束: 全完美 >= 6 次 → 加 8 BPM (下轮 8 BPM 起跳); 否则下轮继续 +10 BPM
 *
 * 8 轮结束计算星:
 *  - 8 轮全完美 = 3⭐
 *  - 7        = 2⭐
 *  - 5        = 1⭐
 *  - < 5      = 0⭐
 */
import { Level16Scene } from '../components/Level16Scene.js';
import { gsap } from 'gsap';

const ROUNDS_TOTAL = 8;
const BPM_START = 60;
const BPM_STEP  = 10;        // 起步步进 +10
const BPM_BONUS = 8;         // 全完美轮后下一轮 +8 (未在本轮用, 用 totalBpm)
const ROUND_TICKS = 6;       // 每轮数 6 次拍; 完美≥3 即算 round-perfect (保留)
const ROUND_PERFECT_THRESHOLD = 3; // 一轮中≥3 次 perfect 算 "perfect round"

export default function startLevel16(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 16;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level16Scene(game.stage);

  // 2) 主容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level16-stage"></div>');
  const root = game.stage.querySelector('.level16-stage');

  // 3) HUD
  const hud = document.createElement('div');
  hud.className = 'level16-hud';
  hud.innerHTML = `
    <div class="level16-stat">
      <span class="level16-stat__icon">🎯</span>
      轮 <span class="level16-round">1</span> / ${ROUNDS_TOTAL}
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⏱</span>
      <span class="level16-bpm">${BPM_START}</span> BPM
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">🔥</span>
      连击 <span class="level16-combo">0</span>
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⭐</span>
      完美轮 <span class="level16-perf-rounds">0</span>
    </div>
  `;
  root.appendChild(hud);

  const roundEl     = hud.querySelector('.level16-round');
  const bpmEl       = hud.querySelector('.level16-bpm');
  const comboEl     = hud.querySelector('.level16-combo');
  const perfRoundsEl = hud.querySelector('.level16-perf-rounds');

  // 4) 火箭鼓 (中央)
  const drumWrap = document.createElement('div');
  drumWrap.className = 'level16-drum-wrap';
  drumWrap.innerHTML = `
    <svg class="level16-drum" viewBox="0 0 200 200">
      <ellipse cx="100" cy="170" rx="80" ry="14" fill="rgba(0,0,0,0.35)" />
      <ellipse cx="100" cy="160" rx="80" ry="22" fill="#5d3a1a" />
      <ellipse cx="100" cy="155" rx="74" ry="18" fill="#8b4513" stroke="#5d3a1a" stroke-width="2" />
      <text class="level16-drum-text" x="100" y="160" text-anchor="middle"
            font-family="ZCOOL KuaiLe" font-size="22" font-weight="900" fill="#fff8dc">🥁 敲!</text>
    </svg>
  `;
  root.appendChild(drumWrap);
  const drumSvg = drumWrap.querySelector('svg');
  const drumBody = drumSvg ? drumSvg.querySelector('ellipse[cx="100"][cy="155"]') : null;
  const drumText = drumSvg ? drumSvg.querySelector('text') : null;

  // 5) 摆杆 (左上, 摆到中央触发 "click now")
  const meterWrap = document.createElement('div');
  meterWrap.className = 'level16-meter';
  meterWrap.innerHTML = `
    <svg viewBox="0 0 120 200" class="level16-meter-svg">
      <path d="M30,20 L90,20 L94,180 L26,180 Z" fill="#5d3a1a" stroke="#3d2410" stroke-width="2" />
      <path d="M30,20 L90,20 L92,40 L28,40 Z" fill="#8b5a2b" />
      <circle cx="60" cy="22" r="4" fill="#3d2410" />
      <g class="level16-pendulum">
        <line x1="60" y1="22" x2="60" y2="155" stroke="#fff8dc" stroke-width="4" stroke-linecap="round" />
        <circle cx="60" cy="155" r="9" fill="#ff8c42" stroke="#3d2410" stroke-width="1.5" />
      </g>
    </svg>
    <div class="level16-centerline"></div>
    <div class="level16-hit-ring" id="level16-hit-ring"></div>
  `;
  root.appendChild(meterWrap);

  // 5.5) 速度阶梯 (右侧, 显示当前轮 / 进度)
  const ladder = document.createElement('div');
  ladder.className = 'level16-ladder';
  let rungsHtml = '';
  for (let i = 0; i < ROUNDS_TOTAL; i++) {
    const bpm = BPM_START + BPM_STEP * i;
    rungsHtml += `
      <div class="level16-rung ${i === 0 ? 'active' : ''}" data-bpm="${bpm}">
        <span class="level16-rung__num">第 ${i + 1} 轮</span>
        <span class="level16-rung__bpm">${bpm} BPM</span>
      </div>
    `;
  }
  ladder.innerHTML = `
    <div class="level16-ladder__title">速度阶梯</div>
    ${rungsHtml}
  `;
  root.appendChild(ladder);
  const rungEls = ladder.querySelectorAll('.level16-rung');

  // 6) 游戏状态
  game._level16Round = 0;
  game._level16Bpm = BPM_START;
  game._level16RoundHits = 0;        // perfect 数 (本轮)
  game._level16RoundTaps = 0;        // 总敲击数 (本轮)
  game._level16Combo = 0;
  game._level16PerfectRounds = 0;
  game._level16Done = false;
  game._level16Phase = 0;
  game._level16Tween = null;
  game._level16PendingTickAt = null;
  game._level16RunningRound = false;
  game._level16Timer = null;
  game._level16RoundStartAt = 0;

  function startPendulum(bpm) {
    if (game._level16Tween) {
      gsap.killTweensOf(game._level16Tween);
      game._level16Tween = null;
    }
    const dur = 60 / bpm;  // 半周期秒
    const ANGLE_AMP = 30;
    const tween = gsap.to({}, {
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        const p = tween.progress();
        const rot = -ANGLE_AMP + p * 2 * ANGLE_AMP;
        const el = meterWrap.querySelector('.level16-pendulum');
        if (el) el.style.transform = `rotate(${rot}deg)`;
        // phase: 0=左, 0.5=中, 1=右
        game._level16Phase = (rot + ANGLE_AMP) / (2 * ANGLE_AMP);
      },
      // 周期末: 安排下一次中线 tick (现刻 + 半周期)
      onRepeat: () => {
        const intervalMs = 60000 / game._level16Bpm;
        game._level16PendingTickAt = Date.now() + intervalMs / 2;
      },
    });
    // 启动后立刻安排第一个 tick
    const intervalMs = 60000 / bpm;
    game._level16PendingTickAt = Date.now() + intervalMs / 2;
    game._level16Tween = tween;
  }

  function scheduleNextTick() {
    const intervalMs = 60000 / game._level16Bpm;
    game._level16PendingTickAt = Date.now() + intervalMs / 2;
  }

  function judge() {
    if (game._level16Done || !game._level16RunningRound) return;
    const now = Date.now();
    const intervalMs = 60000 / game._level16Bpm;

    // 决定评级: 用摆杆 phase (0..1, 0.5 是中心)
    // PERFECT: phase ∈ [0.35, 0.65]    → 距中线 ≤ 15%
    // GOOD:    phase ∈ [0.20, 0.80]    → ≤ 30%
    // MISS:    其余
    const phase = game._level16Phase;        // GSAP tween progress 转 phase
    const dev = Math.abs(phase - 0.5);       // 偏离中线 0..0.5
    let result;
    if (dev <= 0.15) result = 'perfect';
    else if (dev <= 0.30) result = 'good';
    else result = 'miss';

    // 兼容原 PendingTickAt 偏差评分 — 给飘字信息用
    if (!game._level16PendingTickAt) scheduleNextTick();
    const diff = Math.abs(now - game._level16PendingTickAt);
    const tolerance = intervalMs / 3;
    const tolerance2 = (intervalMs / 3) * 2;

    game._level16RoundTaps++;

    const ring = document.getElementById('level16-hit-ring');
    if (ring) {
      ring.classList.remove('hit-perfect', 'hit-good', 'hit-miss');
      void ring.offsetWidth;
      if (result === 'perfect') ring.classList.add('hit-perfect');
      else if (result === 'good') ring.classList.add('hit-good');
      else ring.classList.add('hit-miss');
      setTimeout(() => ring.classList.remove('hit-perfect', 'hit-good', 'hit-miss'), 500);
    }

    if (result === 'perfect') {
      game._level16RoundHits++;
      game._level16Combo++;
      perfRoundsEl.textContent = String(game._level16PerfectRounds);
      comboEl.textContent = String(game._level16Combo);
      try { game.audio.playNote('C4'); } catch (_) {}
      try { game.audio.correct(); } catch (_) {}
      if (drumBody) {
        gsap.fromTo(drumBody, { scale: 1 }, {
          scale: 0.92, duration: 0.05, yoyo: true, repeat: 1,
          transformOrigin: '100px 155px',
        });
      }
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '+1 ⭐');
      } catch (_) {}
    } else if (result === 'good') {
      try { game.audio.playNote('G4'); } catch (_) {}
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '+0 ✨');
      } catch (_) {}
    } else {
      game._level16Combo = 0;
      comboEl.textContent = '0';
      try { game.audio.wrong(); } catch (_) {}
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '漏拍 ✗');
      } catch (_) {}
    }

    scheduleNextTick();

    // 满 ROUND_TICKS = 6 taps 后切下一轮
    if (game._level16RoundTaps >= ROUND_TICKS) {
      endRound();
    }
  }

  function startRound() {
    game._level16RoundHits = 0;
    game._level16RoundTaps = 0;
    game._level16RunningRound = true;
    scheduleNextTick();

    // HUD 更新
    roundEl.textContent = String(game._level16Round + 1);
    bpmEl.textContent = String(game._level16Bpm);

    // 阶梯 UI 高亮当前 rung
    rungEls.forEach((r, i) => r.classList.toggle('active', i === game._level16Round));

    game.say(`第 ${game._level16Round + 1} 轮 — ${game._level16Bpm} BPM!`);
  }

  function endRound() {
    game._level16RunningRound = false;

    // 完美轮?
    if (game._level16RoundHits >= ROUND_PERFECT_THRESHOLD) {
      game._level16PerfectRounds++;
    }
    perfRoundsEl.textContent = String(game._level16PerfectRounds);

    // 鼓动效庆祝 / 失败
    if (drumText) {
      drumText.textContent = game._level16RoundHits >= ROUND_PERFECT_THRESHOLD ? '🎉' : '💪';
      setTimeout(() => {
        if (drumText) drumText.textContent = '🥁 敲!';
      }, 800);
    }

    // 切下一轮
    game._level16Round++;
    if (game._level16Round >= ROUNDS_TOTAL) {
      // 通关
      game._level16Done = true;
      if (game._level16Tween) { gsap.killTweensOf(game._level16Tween); game._level16Tween = null; }
      setTimeout(() => level16Win(), 800);
      return;
    }

    // 下一轮 BPM
    game._level16Bpm = BPM_START + BPM_STEP * game._level16Round;
    bpmEl.textContent = String(game._level16Bpm);
    startPendulum(game._level16Bpm);

    // 短暂间隔 (1.5s) 后开始下轮
    setTimeout(startRound, 1500);
  }

  // 7) 启动 — 第 1 轮
  startPendulum(game._level16Bpm);
  startRound();

  // 8) 鼓点击 / 空格 = 判定
  function onTap() { judge(); }
  if (drumSvg) {
    drumSvg.style.cursor = 'pointer';
    drumSvg.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      judge();
    });
  }
  const onKey = (e) => {
    if (game._level16Done) return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      judge();
    }
  };
  window.addEventListener('keydown', onKey);

  // 9) 引导
  game.say('看摆杆 — 摆到中间时敲鼓! 越爬越快 ⏱');

  // 10) 触发布局
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  function level16Win() {
    let stars;
    const perf = game._level16PerfectRounds;
    if (perf >= 8) stars = 3;
    else if (perf >= 7) stars = 2;
    else if (perf >= 5) stars = 1;
    else stars = 0;

    try { game.progress.markLevelComplete(16, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.4,
        `🎵 ${ROUNDS_TOTAL} 轮, ${perf} 完美轮`);
    } catch (_) {}
    game.say(`爬到顶啦! ${perf} 轮完美 🎵🚀`);
    setTimeout(() => { try { game.showWinOverlay(stars, 16); } catch (_) {} }, 1300);
  }

  return () => {
    if (game._level16Tween) {
      try { gsap.killTweensOf(game._level16Tween); } catch (_) {}
      game._level16Tween = null;
    }
    window.removeEventListener('keydown', onKey);
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level16-stage').forEach((el) => el.remove());
    }
    if (hudLevel2) hudLevel2.style.display = '';
    if (hudDots) hudDots.style.display = '';
    if (btnReplay) btnReplay.style.display = '';
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}
