/**
 * Level 12: 番茄节奏 (Tempo Challenge)
 *
 * 故事: 节拍器左右摆动, 在摆杆摆到中间 (竖直) 那一刻"切"一刀!
 *        切得准 = 命中, 切不准 = 漏拍或抢拍.
 *
 * 玩法:
 *  - GSAP 驱动摆杆动画 (在 ±35° 之间左右摆动, 周期 BPM 控制)
 *  - 用户点击大"切菜板"按钮 — 摆杆位置计算精度 (0~1)
 *  - 每次成功切 → +1 进度, 速度变快
 *  - 共 12 次切中 → 通关
 *
 * 星数: 命中率 (hit / totalCuts) 决定.
 *  - ≥ 0.85 → 3⭐
 *  - ≥ 0.65 → 2⭐
 *  - ≥ 0.40 → 1⭐
 *  - 否则   → 0⭐
 */
import { Level12Scene } from '../components/Level12Scene.js';
import { gsap } from 'gsap';

const TARGET_HITS = 12;     // 通关所需命中数
const ANGLE_AMP = 35;       // 摆杆最大角度 (±度)
const PERFECT_WIN = 0.15;   // 摆杆在中线 ±15% 内算"完美"
const GOOD_WIN   = 0.30;    // ±30% 算"良好"

export default function startLevel12(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 12;
  }

  // HUD
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level12Scene(game.stage);

  // 2) 主容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level12-stage"></div>');
  const root = game.stage.querySelector('.level12-stage');

  // 3) HUD
  const hud = document.createElement('div');
  hud.className = 'level12-hud';
  hud.innerHTML = `
    <div class="level12-stats">
      <div class="level12-stat">
        <span class="level12-stat__icon">🥁</span>
        <span class="level12-hits">0</span> / ${TARGET_HITS}
      </div>
      <div class="level12-stat">
        <span class="level12-stat__icon">⏱</span>
        BPM <span class="level12-bpm">60</span>
      </div>
      <div class="level12-stat">
        <span class="level12-stat__icon">✅</span>
        命中 <span class="level12-acc">—</span>
      </div>
    </div>
  `;
  root.appendChild(hud);

  // 4) 节拍器 SVG
  const metroWrap = document.createElement('div');
  metroWrap.className = 'level12-metronome';
  metroWrap.innerHTML = `
    <svg viewBox="0 0 300 380" class="level12-metronome-svg">
      <!-- 主体 -->
      <path d="M100,40 L200,40 L210,330 L90,330 Z" fill="#5d3a1a" stroke="#3d2410" stroke-width="3" />
      <path d="M100,40 L200,40 L208,80 L92,80 Z" fill="#8b5a2b" />
      <!-- 摆杆 pivot (顶部的铰链) -->
      <circle cx="150" cy="50" r="6" fill="#3d2410" />
      <!-- 摆杆 (g 用来旋转) -->
      <g class="level12-pendulum">
        <line x1="150" y1="50" x2="150" y2="280" stroke="#fff8dc" stroke-width="6" stroke-linecap="round" />
        <circle cx="150" cy="280" r="14" fill="#e63946" stroke="#3d2410" stroke-width="2" />
        <circle cx="150" cy="100" r="9" fill="#ffc971" stroke="#3d2410" stroke-width="1.5" />
      </g>
      <!-- 摆杆底座 (小三角) -->
      <path d="M140,330 L160,330 L150,350 Z" fill="#3d2410" />
      <!-- 计时刻度 (装饰) -->
      <text x="60" y="200" class="level12-scale">Lento</text>
      <text x="240" y="200" class="level12-scale" text-anchor="end">Allegro</text>
    </svg>
    <!-- 中线指示 (竖直) -->
    <div class="level12-centerline"></div>
    <!-- 命中光环 -->
    <div class="level12-hit-ring" id="level12-hit-ring"></div>
  `;
  root.appendChild(metroWrap);

  // 5) 切菜板按钮
  const cut = document.createElement('button');
  cut.className = 'level12-cut';
  cut.innerHTML = `
    <span class="level12-cut__knife">🔪</span>
    <span class="level12-cut__label">切!</span>
  `;
  root.appendChild(cut);

  // 6) 鼓励语
  const msg = document.createElement('div');
  msg.className = 'level12-message';
  msg.textContent = '🔪 摆杆到中间时点切!';
  root.appendChild(msg);

  // 7) 游戏状态
  game._level12Hits = 0;
  game._level12TotalCuts = 0;
  game._level12BPM = 60;            // 当前 BPM
  game._level12Phase = 0;           // 0..1, 摆杆位置 (0=左极, 0.5=中, 1=右极)
  game._level12Dir = 1;             // +1 往右, -1 往左
  game._level12Running = false;
  game._level12Tween = null;
  game._level12Done = false;

  const hitsEl  = hud.querySelector('.level12-hits');
  const bpmEl   = hud.querySelector('.level12-bpm');
  const accEl   = hud.querySelector('.level12-acc');

  // 8) 摆杆动画
  // 用 GSAP 让 pendulum 的 rotation 在 -ANGLE_AMP ↔ +ANGLE_AMP 反复 (yoyo)
  function startPendulum(bpm) {
    if (game._level12Tween) {
      gsap.killTweensOf(game._level12Tween);
      game._level12Tween = null;
    }
    const dur = 60 / bpm;  // 单摆半周期 = 60/BPM 秒 (一次完整左右 = 2*dur)
    const tween = gsap.to({}, {
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        // GSAP 的 progress 0~1 (yoyo 时 0→1, 然后 1→0)
        const p = tween.progress();
        const rot = -ANGLE_AMP + p * 2 * ANGLE_AMP;
        const el = metroWrap.querySelector('.level12-pendulum');
        if (el) el.style.transform = `rotate(${rot}deg)`;
        // 更新 phase: 0=左, 0.5=中, 1=右 (映射角度)
        game._level12Phase = (rot + ANGLE_AMP) / (2 * ANGLE_AMP);  // 0..1
        game._level12Dir = (rot > 0) ? 1 : -1;
      },
      onRepeat: () => {
        // 摆杆到达极位时让节拍器"咔哒"一声 (高频轻音)
        try {
          const ctx = game.audio._webAudio;
          if (ctx && game.audio.unlocked) {
            const t = ctx.currentTime;
            const osc = ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(2400, t);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.06, t + 0.005);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
            osc.connect(g).connect(game.audio._masterGain);
            osc.start(t); osc.stop(t + 0.05);
          }
        } catch (_) {}
      },
    });
    game._level12Tween = tween;
  }

  // 9) 命中判定
  function judge() {
    // phase: 0.5 = 完美中线, 偏离越多越差
    const deviation = Math.abs(game._level12Phase - 0.5);
    let result;
    if (deviation <= PERFECT_WIN) result = 'perfect';
    else if (deviation <= GOOD_WIN) result = 'good';
    else result = 'miss';

    game._level12TotalCuts++;

    const ring = root.querySelector('#level12-hit-ring');
    if (ring) {
      ring.classList.remove('hit-perfect', 'hit-good', 'hit-miss');
      void ring.offsetWidth;
      ring.classList.add(`hit-${result}`);
      setTimeout(() => ring.classList.remove(`hit-${result}`), 600);
    }

    if (result === 'miss') {
      game.wrongCount++;
      try { game.audio.wrong(); } catch (_) {}
      msg.textContent = ['差一点!', '再稳点~', '跟住摆杆!'][Math.floor(Math.random() * 3)];
      gsap.fromTo(cut, { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 5 });
    } else {
      game._level12Hits++;
      try { game.audio.correct(); } catch (_) {}
      try {
        // 加速度: 每命中 2 次 BPM +8, 上限 140
        if (game._level12Hits % 2 === 0) {
          game._level12BPM = Math.min(140, game._level12BPM + 8);
          bpmEl.textContent = String(game._level12BPM);
          startPendulum(game._level12BPM);
        }
      } catch (_) {}
      msg.textContent = result === 'perfect' ? '完美! 🎯' : '不错! ✨';
      gsap.fromTo(cut, { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' });
    }

    hitsEl.textContent = String(game._level12Hits);
    const acc = game._level12TotalCuts > 0
      ? Math.round((game._level12Hits / game._level12TotalCuts) * 100) + '%'
      : '—';
    accEl.textContent = acc;

    // 通关?
    if (game._level12Hits >= TARGET_HITS && !game._level12Done) {
      game._level12Done = true;
      setTimeout(() => level12Win(), 500);
    }
  }

  // 10) 切按钮
  cut.addEventListener('click', () => {
    if (game._level12Done) return;
    judge();
  });
  // 键盘空格也能切
  const onKey = (e) => {
    if (game._level12Done) return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      judge();
    }
  };
  window.addEventListener('keydown', onKey);

  // 11) 开始摆杆
  startPendulum(game._level12BPM);
  game._level12Running = true;

  // 12) 触发布局
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  game.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');

  function level12Win() {
    if (game._level12Tween) { gsap.killTweensOf(game._level12Tween); game._level12Tween = null; }
    const acc = game._level12TotalCuts > 0
      ? game._level12Hits / game._level12TotalCuts
      : 0;
    let stars;
    if (acc >= 0.85) stars = 3;
    else if (acc >= 0.65) stars = 2;
    else if (acc >= 0.40) stars = 1;
    else stars = 0;
    try { game.progress.markLevelComplete(12, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45,
        `🎵 命中 ${Math.round(acc * 100)}%!`);
    } catch (_) {}
    game.say(`完美收尾! 命中 ${Math.round(acc * 100)}% — 你有节奏感! 🎵`);
    setTimeout(() => { try { game.showWinOverlay(stars, 12); } catch (_) {} }, 1300);
  }

  return () => {
    if (game._level12Tween) {
      try { gsap.killTweensOf(game._level12Tween); } catch (_) {}
      game._level12Tween = null;
    }
    window.removeEventListener('keydown', onKey);
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level12-stage').forEach((el) => el.remove());
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