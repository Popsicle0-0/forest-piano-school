/**
 * Level 15: 视奏大师 (Sight Reading Pro)
 *
 * 故事: 5 线谱 + 高音谱号 + 中央一颗随机音符下落, 玩家按对应琴键.
 *       连续对 3 次 → 节拍提速 50% (即下落动画时长 ÷ 1.5);
 *       连续错 3 次 → 进入 easy mode (节拍变慢, 节拍恢复速度初始化).
 *
 * 玩法:
 *  - 共 6 个随机音符 (来自 C4-B4 白键)
 *  - 起始: 5 线谱上显示, 一颗音符缓慢下落 → 钢琴键
 *  - 按时正确 — 该音符消失, 下一颗音符
 *  - 错音或漏拍 — 该音符变红, 然后进下一颗
 *
 * 星数:
 *  - ≥ 5 perfect = 3⭐ (连对 3 个以上)
 *  - ≥ 4       = 2⭐
 *  - ≥ 3       = 1⭐
 *  - < 3       = 0⭐
 */
import { Level15Scene } from '../components/Level15Scene.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';

const NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

const TOTAL_NOTES = 6;
const BASE_FALL_MS = 3500;     // 起步下落时长
const MIN_FALL_MS = 1500;      // 提速下限 (1.5x 速)

// 5 线谱上 cy (viewBox 坐标, 50~220 区间). 用 staff 高 240 + line 间距 24
const NOTE_Y = {
  do:  175,
  re:  150,
  mi:  120,
  fa:  105,
  sol: 90,
  la:  65,
  si:  45,
};

const STAFF_TOP = 30;

export default function startLevel15(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 15;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level15Scene(game.stage);

  // 2) 五线谱 (SVG, 中央)
  game.stage.insertAdjacentHTML('beforeend', `<div class="level15-staff-area"></div>`);
  const staffArea = game.stage.querySelector('.level15-staff-area');
  staffArea.innerHTML = `
    <svg class="level15-staff" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
      <!-- 5 lines -->
      <line class="level15-staff-line" x1="40" y1="${STAFF_TOP + 40}"  x2="760" y2="${STAFF_TOP + 40}" />
      <line class="level15-staff-line" x1="40" y1="${STAFF_TOP + 60}"  x2="760" y2="${STAFF_TOP + 60}" />
      <line class="level15-staff-line" x1="40" y1="${STAFF_TOP + 80}"  x2="760" y2="${STAFF_TOP + 80}" />
      <line class="level15-staff-line" x1="40" y1="${STAFF_TOP + 100}" x2="760" y2="${STAFF_TOP + 100}" />
      <line class="level15-staff-line" x1="40" y1="${STAFF_TOP + 120}" x2="760" y2="${STAFF_TOP + 120}" />
      <!-- treble clef (简化, 用 tspan '𝄞' 或 G 字母) -->
      <text x="50" y="${STAFF_TOP + 95}" class="level15-clef" font-family="serif" font-size="100" fill="#fff8dc">𝄞</text>
      <!-- 当前音符 -->
      <g class="level15-note-grp" transform="translate(400, 0)">
        <ellipse class="level15-current-note" cx="0" cy="0" rx="12" ry="9" fill="#ffd166"
                 stroke="#3d405b" stroke-width="2" />
        <line class="level15-stem" x1="12" y1="0" x2="12" y2="-32"
              stroke="#3d405b" stroke-width="2" />
      </g>
    </svg>
  `;
  const noteEl = staffArea.querySelector('.level15-current-note');
  const stemEl = staffArea.querySelector('.level15-stem');

  // 3) 节拍器 HUD
  game.stage.insertAdjacentHTML('beforeend', `
    <div class="level15-metronome">
      <span class="level15-metronome-label">速度</span>
      <span class="level15-metronome-bpm" id="level15-bpm">1.0x</span>
      <span class="level15-metronome-combo" id="level15-combo"></span>
    </div>
  `);

  // 4) 钢琴键盘
  game.kb = new PianoKeyboard(game.stage, NOTES);

  // 5) 游戏状态
  const speedMult = { value: 1.0 };   // 1.0 → 1.5 (越对越快)
  game._level15Idx = 0;
  game._level15Correct = 0;
  game._level15Accepting = true;
  game._level15Done = false;
  game._level15ConsecRight = 0;
  game._level15ConsecWrong = 0;
  game._level15Easy = false;

  // 6) 推 Note (随机 7 个白键之一)
  function pickRandomNote() {
    return NOTES[Math.floor(Math.random() * NOTES.length)];
  }

  function setSpeed(mult, label) {
    speedMult.value = mult;
    const bpmEl = document.getElementById('level15-bpm');
    if (bpmEl) bpmEl.textContent = label || `${mult.toFixed(1)}x`;
  }

  function currentFallMs() {
    // 1.0x 起步, 每提速一档速度 ÷ mult (但有下限)
    return Math.max(MIN_FALL_MS, Math.round(BASE_FALL_MS / speedMult.value));
  }

  function spawnNext() {
    if (game._level15Done || game._level15Idx >= TOTAL_NOTES) return;
    const note = pickRandomNote();
    const staffY = NOTE_Y[note.id];

    if (!noteEl || !stemEl) return;
    // 用 group transform 控制 note Y 位置
    const grp = staffArea.querySelector('.level15-note-grp');
    if (!grp) return;
    grp.setAttribute('transform', `translate(400, ${staffY})`);
    noteEl.dataset.pitch = note.pitch;
    noteEl.dataset.id = note.id;
    noteEl.classList.remove('incorrect');
    noteEl.style.opacity = '1';
    noteEl.setAttribute('fill', '#ffd166');

    game.say(`下一个: ${note.solfege}`);
    game._level15Accepting = true;

    const fallMs = currentFallMs();
    const start = Date.now();
    const fallTimer = setTimeout(() => {
      if (!game._level15Done && game._level15Accepting) {
        // 漏拍
        onMiss();
      }
    }, fallMs);
    game._level15FallTimer = fallTimer;

    // animation record (no gsap here)
    game._level15FallStart = start;
    game._level15FallDur = fallMs;
  }

  function onMiss() {
    game._level15Accepting = false;
    game.wrongCount++;
    game._level15ConsecWrong++;
    game._level15ConsecRight = 0;
    maybeEnterEasy();
    try { game.audio.wrong(); } catch (_) {}
    game.say('漏拍啦 — 看下一个音符~');
    if (noteEl) noteEl.classList.add('incorrect');
    if (game._level15FallTimer) clearTimeout(game._level15FallTimer);
    setTimeout(() => {
      if (noteEl) noteEl.classList.remove('incorrect');
      game._level15Idx++;
      if (game._level15Idx >= TOTAL_NOTES) {
        finish();
      } else {
        spawnNext();
      }
    }, 500);
  }

  function maybeEnterEasy() {
    if (game._level15Easy) return;
    if (game._level15ConsecWrong >= 3) {
      game._level15Easy = true;
      // 重置速度到 1.0x, 等下一轮连对再提速
      setSpeed(1.0, '1.0x 轻松');
      try { game.say('进入轻松模式 — 慢慢来!'); } catch (_) {}
    }
  }

  function bumpSpeed() {
    // 已到上限就不再变
    if (speedMult.value >= 1.5) return;
    const next = Math.min(1.5, +(speedMult.value + 0.1).toFixed(1));
    setSpeed(next);
    const comboEl = document.getElementById('level15-combo');
    if (comboEl) comboEl.textContent = `连对 ${game._level15ConsecRight} → 加速!`;
  }

  // 7) 接键
  game.kb.onPress = (keyEl) => {
    if (!game._level15Accepting || game._level15Done) return;
    const actualPitch = keyEl.dataset.pitch;
    const actualId = keyEl.dataset.id;
    const expectedPitch = noteEl ? noteEl.dataset.pitch : null;
    const expectedId = noteEl ? noteEl.dataset.id : null;

    try { game.kb.glowKey(keyEl); } catch (_) {}

    if (actualPitch === expectedPitch) {
      // 正确
      game._level15Accepting = false;
      game._level15Correct++;
      game._level15ConsecRight++;
      game._level15ConsecWrong = 0;
      if (game._level15FallTimer) clearTimeout(game._level15FallTimer);
      try { game.audio.correct(); } catch (_) {}
      try { game.audio.playNote(actualPitch); } catch (_) {}

      if (noteEl) {
        noteEl.style.opacity = '0';
      }

      const praises = ['完美!', '棒!', '眼睛真快!', '看谱高手!'];
      game.say(praises[Math.min(game._level15Correct - 1, praises.length - 1)]);

      // 3 连对 → 加速
      if (game._level15ConsecRight >= 3 && !game._level15Easy) {
        bumpSpeed();
      }

      game._level15Idx++;
      setTimeout(() => {
        if (game._level15Idx >= TOTAL_NOTES) {
          finish();
        } else {
          spawnNext();
        }
      }, 350);
    } else {
      // 错音
      game.wrongCount++;
      game._level15ConsecWrong++;
      game._level15ConsecRight = 0;
      maybeEnterEasy();
      try { game.audio.wrong(); } catch (_) {}
      try { game.audio.playNote(actualPitch); } catch (_) {}

      const actualSolfege = NOTES.find((n) => n.id === actualId);
      game.say(`这是 ${actualSolfege ? actualSolfege.solfege : '?'}, 不是 ${NOTES.find((n) => n.id === expectedId).solfege}. 再看谱!`);

      if (noteEl) noteEl.classList.add('incorrect');
      const wrongEl = noteEl;
      setTimeout(() => { if (wrongEl) wrongEl.classList.remove('incorrect'); }, 350);
    }
  };

  function finish() {
    if (game._level15Done) return;
    game._level15Done = true;
    setTimeout(() => level15Win(), 600);
  }

  // 8) 启动第一个音
  setSpeed(1.0, '1.0x');
  setTimeout(spawnNext, 800);

  game.say('看 5 线谱上的音符 — 按对应的钢琴键, 越对越快!');

  function level15Win() {
    const correct = game._level15Correct;
    let stars;
    if (correct >= 5) stars = 3;
    else if (correct >= 4) stars = 2;
    else if (correct >= 3) stars = 1;
    else stars = 0;

    try { game.progress.markLevelComplete(15, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.42,
        `🎵 看谱对了 ${correct} / ${TOTAL_NOTES}`);
    } catch (_) {}
    game.say(`视奏大师! 6 音对了 ${correct} 个 🎼`);
    setTimeout(() => { try { game.showWinOverlay(stars, 15); } catch (_) {} }, 1300);
  }

  // 9) 触发布局
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  return () => {
    if (game._level15FallTimer) {
      clearTimeout(game._level15FallTimer);
      game._level15FallTimer = null;
    }
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level15-staff-area').forEach((el) => el.remove());
      game.stage.querySelectorAll('.level15-metronome').forEach((el) => el.remove());
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
