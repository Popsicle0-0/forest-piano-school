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

const STYLE_ID = 'level12-v19-style';

/**
 * v19 适配: 本关局部布局修正 (只注入自己的 <style>, 不改 style.css, 规范§3):
 *  1) [hidden] 失效 —— 浏览器 UA 样式 `[hidden]{display:none}` 会被作者样式中
 *     同特异性的 `.level12-combo { display:flex }` 盖掉 (author origin 恒胜
 *     UA origin), 导致连击胶囊一进关就常驻显示"0 x combo"。加更高特异性的
 *     [hidden] 规则恢复代码本意 (combo≥2 才出现), 纯显示层修正。
 *  2) 矮视口压缩 —— 节拍器 svg 宽高比 300:380, .level12-metronome 固定
 *     min(280px,60vw) 在 iPhone 横屏 (~402px 高) 光自身就 ~354px 高, 整列
 *     (HUD+摆锤+切按钮+提示) 远超屏高被裁。在 @media (max-height:480px) 里按
 *     vh 反推宽度上限并整体压缩行距与字号; 摆杆判定只依赖 phase 角度,
 *     与像素尺寸无关 → 玩法不变。切按钮压缩后仍 54px 高 (≥44px 热区)。
 *     桌面 / iPad (高 >480px) 不命中媒体查询, 与 v18 像素一致;
 *     padding-top:100px 按规范 E 条原样保留。
 */
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    .level12-combo[hidden] { display: none; }
    @media (max-height: 480px) {
      .level12-stage { padding: 8px 12px 10px; gap: 5px; }
      /* 宽高比 300:380 → 高≈宽*1.27; 用 vh 给宽设上限, 保证整列放得下 */
      .level12-metronome { width: min(200px, 52vw, 27vh); margin-top: 0; }
      .level12-centerline { top: 6px; bottom: 6px; }
      .level12-cut {
        height: 54px;
        width: min(180px, 56vw);
        font-size: 17px;
        border-radius: 14px;
        border-width: 3px;
      }
      .level12-cut__knife { font-size: 20px; }
      .level12-cut__label { letter-spacing: 2px; }
      .level12-message { font-size: 12px; padding: 3px 10px; margin-top: 0; }
      .level12-hud { font-size: 13px; padding: 5px 10px; gap: 8px; }
      .level12-stat__icon { font-size: 14px; }
      .level12-stat .level12-hits,
      .level12-stat .level12-bpm { font-size: 15px; }
      .level12-stat .level12-acc { font-size: 15px; }
      .level12-combo { padding: 3px 12px; margin-bottom: 2px; }
      .level12-combo__num { font-size: 17px; }
      .level12-combo__x { font-size: 11px; }
    }
  `;
  document.head.appendChild(s);
}

const TARGET_HITS = 12;     // 通关所需命中数
const ANGLE_AMP = 35;       // 摆杆最大角度 (±度)
const PERFECT_WIN = 0.15;   // 摆杆在中线 ±15% 内算"完美"
const GOOD_WIN   = 0.30;    // ±30% 算"良好"

export default function startLevel12(game) {
  injectStyles();  // v19: 先落局部样式, 再渲染场景 (幂等, 由 STYLE_ID 防重)
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
      <!-- v18.6 polish: perfect zone — 中线附近的窄带 (绿色高亮表示 PERFECT 容忍) -->
      <rect x="142" y="78" width="16" height="240" rx="4"
            fill="rgba(6, 214, 160, 0.18)"
            stroke="rgba(6, 214, 160, 0.55)"
            stroke-width="1.5"
            stroke-dasharray="4 3"
            class="level12-perfect-zone" />
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

  // 5.5) v18.6 polish: combo 显示 — 嵌在 cut 按钮上方, combo ≥ 2 才出现
  const comboEl = document.createElement('div');
  comboEl.className = 'level12-combo';
  comboEl.id = 'level12-combo';
  comboEl.hidden = true;
  comboEl.innerHTML = `<span class="level12-combo__num">0</span><span class="level12-combo__x">x combo</span>`;
  root.appendChild(comboEl);
  const comboNumEl = comboEl.querySelector('.level12-combo__num');

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
  game._level12Combo = 0;           // v18.6: 连击数
  game._level12BestCombo = 0;
  game._level12Score = 0;           // v18.6: 带乘子的总分
  // v18.6: BPM -> 命中得分乘子 (60→1.0, 140→2.0)
  function tempoMultiplier(bpm) {
    const base = 60, max = 140, peak = 2.0;
    if (bpm <= base) return 1.0;
    if (bpm >= max) return peak;
    return 1.0 + ((bpm - base) / (max - base)) * (peak - 1.0);
  }

  const hitsEl  = hud.querySelector('.level12-hits');
  const bpmEl   = hud.querySelector('.level12-bpm');
  const accEl   = hud.querySelector('.level12-acc');

  // 8) 摆杆动画
  // 用 GSAP 让 pendulum 的 rotation 在 -ANGLE_AMP ↔ +ANGLE_AMP 反复 (yoyo)
  function startPendulum(bpm) {
    if (game._level12Tween) {
      game._level12Tween.kill();
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
      // v18.6: combo 断
      if (game._level12Combo >= 2) {
        try {
          game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45,
            `断啦 💔 (最佳 x${game._level12BestCombo})`);
        } catch (_) {}
      }
      game._level12Combo = 0;
      comboEl.hidden = true;
      comboEl.classList.remove('combo-flash');
      cut.classList.remove('combo-glow');
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
      // v18.6: 加分 = 基础分 (perfect=10, good=5) × tempo 乘子 × combo 乘子
      const baseScore = result === 'perfect' ? 10 : 5;
      game._level12Combo++;
      if (game._level12Combo > game._level12BestCombo) {
        game._level12BestCombo = game._level12Combo;
      }
      const comboMult = 1 + Math.min(game._level12Combo - 1, 9) * 0.1;  // 1.0, 1.1, ... 1.9
      const tempoMult = tempoMultiplier(game._level12BPM);
      const earned = Math.round(baseScore * tempoMult * comboMult);
      game._level12Score += earned;
      // 飘字显示本次得分 (含乘子)
      try {
        const txt = comboMult > 1.0 || tempoMult > 1.05
          ? `+${earned}  (x${tempoMult.toFixed(1)}×x${comboMult.toFixed(1)})`
          : `+${earned}`;
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.36, txt);
      } catch (_) {}
      // combo ≥ 2 显示连击器 + 让 cut 按钮发光
      if (game._level12Combo >= 2) {
        comboNumEl.textContent = String(game._level12Combo);
        comboEl.hidden = false;
        comboEl.classList.remove('combo-flash');
        // eslint-disable-next-line no-unused-expressions
        void comboEl.offsetWidth;
        comboEl.classList.add('combo-flash');
        cut.classList.add('combo-glow');
      }
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

  game.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');

  function level12Win() {
    if (game._level12Tween) { game._level12Tween.kill(); game._level12Tween = null; }
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
      const comboTxt = game._level12BestCombo >= 2
        ? ` 连击 x${game._level12BestCombo}`
        : '';
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45,
        `🎵 ${game._level12Score} 分 (命中 ${Math.round(acc * 100)}%)${comboTxt}`);
    } catch (_) {}
    game.say(`完美收尾! 命中 ${Math.round(acc * 100)}% — 你有节奏感! 🎵`);
    setTimeout(() => { try { game.showWinOverlay(stars, 12); } catch (_) {} }, 1300);
  }

  return () => {
    if (game._level12Tween) {
      try { game._level12Tween.kill(); } catch (_) {}
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