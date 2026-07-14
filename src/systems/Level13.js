/**
 * Level 13: 节奏大师 (Tempo Master)
 *
 * 故事: 节拍器摆杆左右摆动, 速度从 80 BPM 逐渐升到 180 BPM.
 *       孩子看着摆杆, 在每次"中线时刻"点击下方鼓.
 *       完美点击 +1, 偏离过大算漏拍 -1.
 *
 * 星数:
 *  - ≥ 30 完美 = 3⭐
 *  - ≥ 24     = 2⭐
 *  - ≥ 18     = 1⭐
 *  - < 18     = 0⭐
 */
import { Level13Scene } from '../components/Level13Scene.js';
import { gsap } from 'gsap';

export default function startLevel13(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 13;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level13Scene(game.stage);

  // 2) 主容器 (HUD 在内)
  game.stage.insertAdjacentHTML('beforeend', '<div class="level13-stage"></div>');
  const root = game.stage.querySelector('.level13-stage');

  // 3) HUD
  const hud = document.createElement('div');
  hud.className = 'level13-hud';
  hud.innerHTML = `
    <div class="level13-stat">
      <span class="level13-stat__icon">✅</span>
      <span class="level13-hits">0</span> 完美
    </div>
    <div class="level13-stat">
      <span class="level13-stat__icon">❌</span>
      <span class="level13-misses">0</span> 漏拍
    </div>
    <div class="level13-stat">
      <span class="level13-stat__icon">⏱</span>
      <span class="level13-bpm">80</span> BPM
    </div>
  `;
  root.appendChild(hud);

  const hitsEl = hud.querySelector('.level13-hits');
  const missesEl = hud.querySelector('.level13-misses');
  const bpmEl = hud.querySelector('.level13-bpm');

  // 4) 节拍器摆杆引用
  const metronomeEl = game.stage.querySelector('.level13-metronome');

  // 5) 鼓元素引用 (点击/动画目标)
  const drum = game.stage.querySelector('ellipse[cx="400"][cy="380"]');

  // 6) 游戏状态
  let bpm = 80;
  let hits = 0;
  let misses = 0;
  let perfectOnly = 0;   // 完美计数 (完美才算星)
  let done = false;
  const startMs = Date.now();
  let nextTickAt = Date.now() + 1000;  // 第一次 tick 在 1s 后

  // 7) BPM 渐快: 0-8s 升到 100, 8-15s 升到 130, 15s+ 升到 180
  function currentBpm() {
    const elapsed = Date.now() - startMs;
    if (elapsed > 15000) {
      // 15s 之后, 在 10s 内 130→180
      const t = Math.min((elapsed - 15000) / 10000, 1);
      return Math.round(130 + t * 50);
    }
    if (elapsed > 8000) {
      const t = Math.min((elapsed - 8000) / 7000, 1);
      return Math.round(100 + t * 30);
    }
    // 0~8s: 80→100
    const t = Math.min(elapsed / 8000, 1);
    return Math.round(80 + t * 20);
  }

  // 8) 摆杆摆动 + tick 推进
  function tick() {
    if (done) return;
    // 更新 bpm (随时取当前时刻的值)
    bpm = currentBpm();
    bpmEl.textContent = String(bpm);
    const bpmCountEl = game.stage.querySelector('#bpm-count');
    if (bpmCountEl) bpmCountEl.textContent = String(bpm);

    // 摆钟摆动 (CSS)
    if (metronomeEl) {
      metronomeEl.style.transition = 'transform 0.08s linear';
      metronomeEl.style.transform = 'rotate(-25deg)';
      setTimeout(() => {
        if (metronomeEl) metronomeEl.style.transform = 'rotate(25deg)';
      }, 100);
      setTimeout(() => {
        if (metronomeEl) metronomeEl.style.transform = 'rotate(0)';
      }, 200);
    }

    // 安排下一个 tick
    const intervalMs = 60000 / bpm;
    nextTickAt = Date.now() + intervalMs;
    setTimeout(tick, intervalMs);
  }
  setTimeout(tick, 1000);

  // 9) 鼓点击判定
  function judge() {
    if (done) return;
    const now = Date.now();
    const diff = Math.abs(now - nextTickAt);
    const tolerance = 60000 / bpm / 3;          // 1/3 间隔 = 完美
    const tolerance2 = tolerance * 2;           // 2/3 间隔 = 不错

    if (diff < tolerance) {
      // 完美
      hits++;
      perfectOnly++;
      try { game.audio.playNote('C4'); } catch (_) {}
      try { game.audio.correct(); } catch (_) {}
      if (drum && drum.parentNode) {
        gsap.fromTo(drum, { scale: 1 }, {
          scale: 0.95, duration: 0.05, yoyo: true, repeat: 1,
          transformOrigin: '400px 380px',
        });
      }
      // 飘字反馈
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '+1 完美 ⭐');
      } catch (_) {}
    } else if (diff < tolerance2) {
      // 不错 — 给一半 (这里不计入完美)
      hits++;
      try { game.audio.playNote('G4'); } catch (_) {}
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '+1 ✨');
      } catch (_) {}
    } else {
      // 漏拍
      misses++;
      try { game.audio.wrong(); } catch (_) {}
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '漏拍 ✗');
      } catch (_) {}
    }

    hitsEl.textContent = String(hits);
    missesEl.textContent = String(misses);

    // 通关? (总共尝试满 30 次即结束 — 包括完美/不错/漏拍)
    if (hits + misses >= 30) {
      done = true;
      setTimeout(() => level13Win(), 600);
    }
  }

  // 10) 点击鼓触发判定 (SVG ellipse)
  if (drum && drum.parentNode) {
    drum.style.cursor = 'pointer';
    drum.style.pointerEvents = 'all';
    drum.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      judge();
    });
  }

  // 11) 底部 1/3 点击区 (覆盖底部, 方便手机点击)
  const tap = document.createElement('div');
  tap.className = 'level13-tap-zone';
  tap.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    judge();
  });
  game.stage.appendChild(tap);

  // 12) 键盘空格也能敲鼓
  const onKey = (e) => {
    if (done) return;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      judge();
    }
  };
  window.addEventListener('keydown', onKey);

  // 13) 引导
  game.say('跟着拍子敲鼓! 速度会逐渐变快 — 完美一击拿星 ⭐');

  // 14) 触发布局
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  function level13Win() {
    done = true;
    let stars;
    if (perfectOnly >= 30) stars = 3;
    else if (perfectOnly >= 24) stars = 2;
    else if (perfectOnly >= 18) stars = 1;
    else stars = 0;

    try { game.progress.markLevelComplete(13, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}

    const total = hits + misses;
    const acc = total > 0 ? Math.round((hits / total) * 100) : 0;
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.4,
        `🎵 完美 ${perfectOnly} 次 (命中 ${acc}%)`);
    } catch (_) {}

    game.say(`完美 ${perfectOnly} 次 — 你是节奏大师! 🎵`);
    setTimeout(() => { try { game.showWinOverlay(stars, 13); } catch (_) {} }, 1300);
  }

  return () => {
    done = true;
    window.removeEventListener('keydown', onKey);
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level13-stage').forEach((el) => el.remove());
      game.stage.querySelectorAll('.level13-tap-zone').forEach((el) => el.remove());
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
