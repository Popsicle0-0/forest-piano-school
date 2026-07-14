/**
 * Level 10: 八度 (Octave)
 *
 * 故事: 鱼想跳到钢琴的高八度! 听音后选对的位置放鱼~
 *
 * 玩法:
 *  - 系统随机播一个音 (Do, Re, Mi, Fa, Sol, La, Si 共 7 音)
 *  - 该音来自"低八度"或"高八度"中的一个 (各 50%)
 *  - 用户点击对应区域 (低区或高区), 放上一条小鱼
 *  - 答对 +1, 错 -1 (wrongCount 仍累计, 用于算星)
 *  - 共 8 题, 通关
 *
 * 音高: Audio.js 已支持 C4~B4 (低八度). 高八度 (C5~B5) 由 Level10.js 直接用
 *       game.audio._webAudio + game.audio._masterGain 合成 (不修改 Audio.js).
 */
import { Level10Scene } from '../components/Level10Scene.js';
import { gsap } from 'gsap';

const LOW_OCT  = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
const HIGH_OCT = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

const NOTES_7 = [
  { id: 'do',  solfege: 'Do',  low: 'C4', high: 'C5' },
  { id: 're',  solfege: 'Re',  low: 'D4', high: 'D5' },
  { id: 'mi',  solfege: 'Mi',  low: 'E4', high: 'E5' },
  { id: 'fa',  solfege: 'Fa',  low: 'F4', high: 'F5' },
  { id: 'sol', solfege: 'Sol', low: 'G4', high: 'G5' },
  { id: 'la',  solfege: 'La',  low: 'A4', high: 'A5' },
  { id: 'si',  solfege: 'Si',  low: 'B4', high: 'B5' },
];

// 直接合成高八度音符 (绕开 Audio.js 的 freqMap 限制)
function playHighOctave(game, pitch) {
  const ctx = game.audio._webAudio;
  if (!ctx || !game.audio.unlocked) return;
  const master = game.audio._masterGain;
  if (!master) return;

  const freqMapHigh = {
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
    'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  };
  const freq = freqMapHigh[pitch];
  if (!freq) return;

  const t = ctx.currentTime;
  // 基音 (三角波)
  const osc1 = ctx.createOscillator();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, t);
  // 二次泛音
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, t);
  // 三次泛音
  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * 3, t);

  // 包络
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.55, t + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

  const g2 = ctx.createGain();
  g2.gain.value = 0.15;
  const g3 = ctx.createGain();
  g3.gain.value = 0.05;

  osc1.connect(env).connect(master);
  osc2.connect(g2).connect(env);
  osc3.connect(g3).connect(env);

  const stopT = t + 0.85;
  osc1.start(t); osc1.stop(stopT);
  osc2.start(t); osc2.stop(stopT);
  osc3.start(t); osc3.stop(stopT);
}

// 弹一个低八度 (走 Audio.playNote)
function playLowOctave(game, pitch) {
  try { game.audio.playNote(pitch); } catch (_) {}
}

function playAt(game, pitch, isHigh) {
  if (isHigh) playHighOctave(game, pitch);
  else playLowOctave(game, pitch);
}

// 渲染 7 个白键 + 5 个黑键, 单八度
function renderKeyboard(container, octave, theme) {
  // 白键 7 个, 黑键 5 个 (跨在白键之间)
  // octave = 'C4'|'C5' 表示起始音
  // 返回 { keys: [{type, pitch, x, w, h}], idMap }
  const baseMap = {
    C4: { white: ['C4','D4','E4','F4','G4','A4','B4'],
          black: [['C#4',0],['D#4',1],['F#4',3],['G#4',4],['A#4',5]] },
    C5: { white: ['C5','D5','E5','F5','G5','A5','B5'],
          black: [['C#5',0],['D#5',1],['F#5',3],['G#5',4],['A#5',5]] },
  };
  const cfg = baseMap[octave];
  const WHITE_W = 38;
  const WHITE_H = 130;
  const BLACK_W = 24;
  const BLACK_H = 80;

  // SVG viewBox 宽: 7 * 38 = 266
  const TOTAL_W = cfg.white.length * WHITE_W;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${TOTAL_W} ${WHITE_H + 8}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.classList.add('level10-keys-svg');

  // 白键
  cfg.white.forEach((pitch, i) => {
    const x = i * WHITE_W;
    const r = document.createElementNS(SVG_NS, 'rect');
    r.setAttribute('x', x);
    r.setAttribute('y', 0);
    r.setAttribute('width', WHITE_W - 1);
    r.setAttribute('height', WHITE_H);
    r.setAttribute('rx', 4);
    r.setAttribute('class', 'level10-white-key');
    r.setAttribute('data-pitch', pitch);
    r.setAttribute('fill', '#fffaf0');
    r.setAttribute('stroke', theme);
    r.setAttribute('stroke-width', '1.5');
    svg.appendChild(r);

    // 黑键 (C# 在 C 和 D 之间, 索引 0 之后; 即 x = WHITE_W - BLACK_W/2)
    if (cfg.black.some(([_, bi]) => bi === i)) {
      const bx = x + WHITE_W - BLACK_W / 2;
      const b = document.createElementNS(SVG_NS, 'rect');
      b.setAttribute('x', bx);
      b.setAttribute('y', 0);
      b.setAttribute('width', BLACK_W);
      b.setAttribute('height', BLACK_H);
      b.setAttribute('rx', 3);
      b.setAttribute('class', 'level10-black-key');
      b.setAttribute('fill', '#1a1a2a');
      svg.appendChild(b);
    }
  });

  container.appendChild(svg);
  return svg;
}

export default function startLevel10(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 10;
  }

  // HUD: 显示普通进度点, 隐藏 Level 2 进度徽章
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level10Scene(game.stage);

  // 2) 主容器
  game.stage.insertAdjacentHTML('beforeend',
    '<div class="level10-stage"></div>');
  const stageRoot = game.stage.querySelector('.level10-stage');

  // 3) HUD: 进度 + 当前题目
  const hud = document.createElement('div');
  hud.className = 'level10-hud';
  hud.innerHTML = `
    <div class="level10-progress">第 <span class="level10-done">0</span> / <span class="level10-total">8</span> 题</div>
    <div class="level10-question">🎧 听一听, 是低还是高?</div>
    <button class="level10-replay" id="level10-replay">🔁 重听</button>
  `;
  stageRoot.appendChild(hud);

  // 4) 两块"八度区" (上 = 高, 下 = 低)
  const regions = document.createElement('div');
  regions.className = 'level10-regions';
  regions.innerHTML = `
    <button class="level10-region level10-region--high" data-region="high">
      <div class="level10-region__label">⬆ 高八度 (HIGH)</div>
      <div class="level10-region__hint">听上去更亮更细</div>
    </button>
    <div class="level10-fish-area">
      <div class="level10-fish" id="level10-fish">🐟</div>
    </div>
    <button class="level10-region level10-region--low" data-region="low">
      <div class="level10-region__label">⬇ 低八度 (LOW)</div>
      <div class="level10-region__hint">听上去更厚更暖</div>
    </button>
  `;
  stageRoot.appendChild(regions);

  // 5) 底部"参考键盘" — 两排迷你键 (上面标 HIGH, 下面 LOW)
  const kb = document.createElement('div');
  kb.className = 'level10-keyboard';
  const lowKb = document.createElement('div');
  lowKb.className = 'level10-keyboard__row level10-keyboard__row--low';
  lowKb.innerHTML = '<div class="level10-keyboard__row-label">LOW</div>';
  renderKeyboard(lowKb, 'C4', '#e76f51');
  const highKb = document.createElement('div');
  highKb.className = 'level10-keyboard__row level10-keyboard__row--high';
  highKb.innerHTML = '<div class="level10-keyboard__row-label">HIGH</div>';
  renderKeyboard(highKb, 'C5', '#5fa8b5');
  kb.appendChild(highKb);
  kb.appendChild(lowKb);
  stageRoot.appendChild(kb);

  // 6) 游戏状态
  game._level10Total = 8;
  game._level10Done = 0;
  game._level10Current = null;     // 当前题: {noteId, isHigh, pitch}
  game._level10Answering = false;
  game._level10Wrong = 0;
  game._level10Timestamps = [];

  // 7) 高亮对应区域的"目标琴键"
  function highlightKey(isHigh, pitch) {
    // 清旧高亮
    kb.querySelectorAll('.level10-key-glow').forEach((el) => el.remove());
    const row = isHigh ? highKb : lowKb;
    const rect = row.querySelector(`[data-pitch="${pitch}"]`);
    if (!rect) return;
    const glow = document.createElementNS(SVG_NS, 'rect');
    glow.setAttribute('class', 'level10-key-glow');
    glow.setAttribute('x', rect.getAttribute('x'));
    glow.setAttribute('y', rect.getAttribute('y'));
    glow.setAttribute('width', rect.getAttribute('width'));
    glow.setAttribute('height', rect.getAttribute('height'));
    glow.setAttribute('rx', rect.getAttribute('rx') || 4);
    glow.setAttribute('fill', isHigh ? 'rgba(95,168,181,0.55)' : 'rgba(231,111,81,0.55)');
    row.querySelector('svg').insertBefore(glow, row.querySelector('svg').firstChild);
    setTimeout(() => {
      try { glow.remove(); } catch (_) {}
    }, 1800);
  }

  function nextQuestion() {
    if (game._level10Done >= game._level10Total) return level10Win();
    game._level10Answering = false;

    // 随机挑一个音 + 八度
    const note = NOTES_7[Math.floor(Math.random() * NOTES_7.length)];
    const isHigh = Math.random() < 0.5;
    game._level10Current = {
      noteId: note.id,
      solfege: note.solfege,
      isHigh,
      pitch: isHigh ? note.high : note.low,
    };

    // HUD
    hud.querySelector('.level10-done').textContent = String(game._level10Done);
    hud.querySelector('.level10-question').textContent = `🎧 第 ${game._level10Done + 1} 题 — ${note.solfege} 来自哪里?`;

    // 鱼归位
    const fish = stageRoot.querySelector('#level10-fish');
    gsap.fromTo(fish, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });

    // 播音 (延迟让鱼飞进来先)
    setTimeout(() => {
      playAt(game, game._level10Current.pitch, game._level10Current.isHigh);
      game._level10Answering = true;
    }, 500);
  }

  function handleAnswer(isHighGuess) {
    if (!game._level10Answering) return;
    const cur = game._level10Current;
    if (!cur) return;
    game._level10Answering = false;
    const correct = cur.isHigh === isHighGuess;
    const fish = stageRoot.querySelector('#level10-fish');
    const regionEl = stageRoot.querySelector(
      isHighGuess ? '.level10-region--high' : '.level10-region--low');

    if (correct) {
      game._level10Done++;
      try { game.audio.correct(); } catch (_) {}
      // 鱼飞进选中区
      const fr = fish.getBoundingClientRect();
      const rr = regionEl.getBoundingClientRect();
      const dx = (rr.left + rr.width / 2) - (fr.left + fr.width / 2);
      const dy = (rr.top + rr.height / 2) - (fr.top + fr.height / 2);
      gsap.to(fish, {
        x: dx, y: dy, scale: 0.7,
        duration: 0.5, ease: 'back.out(1.5)',
        onComplete: () => {
          try { game._flashScreen(); } catch (_) {}
          try {
            game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45,
              `${cur.solfege} ${cur.isHigh ? '↑' : '↓'} ✓`);
          } catch (_) {}
          highlightKey(cur.isHigh, cur.pitch);
          game.say(`${cur.solfege} ${cur.isHigh ? '高八度' : '低八度'}, 对啦! 🎉`);
        },
      });

      setTimeout(() => nextQuestion(), 1500);
    } else {
      game.wrongCount++;
      game._level10Wrong++;
      try { game.audio.wrong(); } catch (_) {}
      regionEl.classList.add('shake');
      setTimeout(() => regionEl.classList.remove('shake'), 400);
      gsap.to(fish, { x: 0, y: 0, rotation: '+=12', duration: 0.15, yoyo: true, repeat: 3 });
      gsap.to(fish, { rotation: 0, duration: 0.3 });
      const hint = cur.isHigh ? '高' : '低';
      game.say(`不对哟~ 这是${hint}八度 ${cur.solfege}, 再听一次?`);
      // 重播
      setTimeout(() => {
        playAt(game, cur.pitch, cur.isHigh);
        game._level10Answering = true;
      }, 800);
    }
  }

  // 8) 区域点击
  stageRoot.querySelectorAll('.level10-region').forEach((el) => {
    el.addEventListener('click', () => {
      const region = el.dataset.region;
      handleAnswer(region === 'high');
    });
  });

  // 9) 重听按钮
  const replayBtn = stageRoot.querySelector('#level10-replay');
  replayBtn.addEventListener('click', () => {
    if (!game._level10Current) return;
    playAt(game, game._level10Current.pitch, game._level10Current.isHigh);
    game._level10Answering = true;
  });

  // 10) 钢琴键可直接听音 (辅助)
  [lowKb, highKb].forEach((row) => {
    row.querySelectorAll('[data-pitch]').forEach((k) => {
      k.style.cursor = 'pointer';
      k.addEventListener('click', () => {
        const pitch = k.getAttribute('data-pitch');
        const isHigh = HIGH_OCT.includes(pitch);
        playAt(game, pitch, isHigh);
      });
    });
  });

  // 11) 开场白 + 触发首次布局
  game.say('听一听: Do 来自低八度还是高八度? 选对的地方放鱼~');
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);
  setTimeout(() => nextQuestion(), 700);

  function level10Win() {
    const wc = game.wrongCount || 0;
    const stars = (wc <= 0) ? 3 : (wc <= 2) ? 2 : (wc <= 5) ? 1 : 0;
    try { game.progress.markLevelComplete(10, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.4, '🎵 八度完成! 🎵');
    } catch (_) {}
    game.say('八度都听出来了! 耳朵升级了~');
    setTimeout(() => { try { game.showWinOverlay(stars, 10); } catch (_) {} }, 1200);
  }

  return () => {
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level10-stage').forEach((el) => el.remove());
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