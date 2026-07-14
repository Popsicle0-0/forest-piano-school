/**
 * Level 5: 视奏小星星 (Twinkle Twinkle)
 *
 * 简化旋律: [C C G G A A G  F F E E D D C] = 14 音 = 14 颗音符泡泡从五线谱掉到琴键.
 * 音符泡泡从五线谱位置缓慢下落, 孩子在泡泡到琴键时按对应白键.
 *   正确 = 泡泡放大消失 + 下一个音
 *   错音 = 泡泡变红闪烁 + 回放正确音 + 计数错
 *   漏敲 (泡泡掉完) = 计数错 + 换下个音
 *
 * v18.1 polish:
 *   - 顶部节拍器 (♩=80 BPM, 后续音符可调)
 *   - 进度推进时泡泡下落速度递减 (起步 4s → 末段 5.5s, 越打越宽)
 *   - 连续 3 错 → 进入 easy mode: 节拍变慢 (60 BPM), hold 时长延长 0.4s
 */
import { Level5Scene } from '../components/Level5Scene.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';
import { gsap } from 'gsap';

const MELODY = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'];
const NOTE_INFO = {
  'C4': { id: 'do', solfege: 'Do' },
  'D4': { id: 're', solfege: 'Re' },
  'E4': { id: 'mi', solfege: 'Mi' },
  'F4': { id: 'fa', solfege: 'Fa' },
  'G4': { id: 'sol', solfege: 'Sol' },
  'A4': { id: 'la', solfege: 'La' },
  'B4': { id: 'si', solfege: 'Si' },
};

const STAFF_TOP = 80;

// 基础节拍 (BPM, ♩=) — normal / easy mode 两档
const TEMPO_NORMAL = 80;
const TEMPO_EASY = 60;

export default function startLevel5(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 5;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';

  game.scene = new Level5Scene(game.stage);
  game.say('森林乐团要奏小星星! 看音符掉到哪个键, 就按哪个~');

  // 显示简化五线谱 (SVG) 含当前待敲音符泡泡
  game.stage.insertAdjacentHTML('beforeend', `<div class="level5-staff-area"></div>`);
  const staffArea = game.stage.querySelector('.level5-staff-area');
  staffArea.innerHTML = `
    <svg class="level5-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
      <line class="level5-staff-line" x1="40" y1="${STAFF_TOP + 40}" x2="760" y2="${STAFF_TOP + 40}" />
      <line class="level5-staff-line" x1="40" y1="${STAFF_TOP + 60}" x2="760" y2="${STAFF_TOP + 60}" />
      <line class="level5-staff-line" x1="40" y1="${STAFF_TOP + 80}" x2="760" y2="${STAFF_TOP + 80}" />
      <line class="level5-staff-line" x1="40" y1="${STAFF_TOP + 100}" x2="760" y2="${STAFF_TOP + 100}" />
      <line class="level5-staff-line" x1="40" y1="${STAFF_TOP + 120}" x2="760" y2="${STAFF_TOP + 120}" />
      <!-- 当前音符位置 -->
      <circle class="level5-current-note" cx="400" cy="0" r="14" fill="#ffd166" />
    </svg>
  `;

  // v18.1: 节拍器 + 模式指示 (top-right, 浮在 staff 上方)
  game.stage.insertAdjacentHTML('beforeend', `
    <div class="level5-metronome" id="level5-metronome">
      <span class="level5-metronome-note">♩=</span>
      <span class="level5-metronome-bpm" id="level5-bpm">${TEMPO_NORMAL}</span>
      <span class="level5-metronome-mode" id="level5-mode"></span>
    </div>
  `);

  // 钢琴键盘放在底部
  game.kb = new PianoKeyboard(game.stage, [
    { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
    { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
    { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
    { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
    { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
    { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
    { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
  ]);

  game._level5Seq = [...MELODY];
  game._level5Total = game._level5Seq.length;
  game._level5Correct = 0;
  game._level5Idx = 0;
  game._level5Accepting = true;
  game._level5Done = false;
  game._level5EasyMode = false;       // v18.1: easy mode flag
  game._level5ConsecWrong = 0;        // v18.1: 连续错数, 达 3 进 easy mode

  // 音符在五线谱上的垂直位置 (cy, viewBox 坐标)
  const NOTE_Y = {
    'do': 180,  // 下加一线
    're': 165,
    'mi': 120,
    'fa': 110,
    'sol': 100,
    'la': 80,
    'si': 70,
  };

  function getNoteEl() {
    return staffArea.querySelector('.level5-current-note');
  }

  function setTempo(bpm, modeLabel) {
    const bpmEl = document.getElementById('level5-bpm');
    const modeEl = document.getElementById('level5-mode');
    if (bpmEl) bpmEl.textContent = String(bpm);
    if (modeEl) modeEl.textContent = modeLabel || '';
    const metronome = document.getElementById('level5-metronome');
    if (metronome) {
      metronome.classList.toggle('level5-metronome--easy', !!modeLabel);
    }
  }

  // v18.1: 计算当前音符的下落时长 (越往后越慢, easy mode 再 +1.5s)
  function computeFallDuration() {
    const idx = game._level5Idx || 0;
    const total = game._level5Total || 14;
    const progress = Math.min(1, idx / Math.max(1, total - 1)); // 0..1
    // 起步 4.0s, 末段 5.5s
    const base = 4.0 + progress * 1.5;
    // easy mode: 额外 +1.5s
    return game._level5EasyMode ? base + 1.5 : base;
  }

  // v18.1: 检查是否进入 easy mode
  function maybeEnterEasyMode() {
    if (game._level5EasyMode) return;
    if (game._level5ConsecWrong >= 3) {
      game._level5EasyMode = true;
      setTempo(TEMPO_EASY, '轻松模式');
      try { game.say('进入轻松模式~ 慢慢来不着急!'); } catch (_) {}
    }
  }

  function spawnNextNote() {
    if (game._level5Done || game._level5Idx >= game._level5Seq.length) return;
    const pitch = game._level5Seq[game._level5Idx];
    const info = NOTE_INFO[pitch];
    const staffY = NOTE_Y[info.id];

    const noteEl = getNoteEl();
    if (!noteEl) return;

    gsap.killTweensOf(noteEl);
    gsap.set(noteEl, { scale: 1 });
    noteEl.setAttribute('cy', staffY);
    noteEl.dataset.pitch = pitch;
    noteEl.classList.remove('dropping', 'incorrect');

    // 提示文字
    game.say(`下一个: ${info.solfege} (${pitch})`);

    game._level5Accepting = true;

    const duration = computeFallDuration();
    // gsap 动画 — 缓慢下落
    gsap.fromTo(noteEl,
      { attr: { cy: staffY }, opacity: 1 },
      { attr: { cy: staffY + 100 }, opacity: 0.9, duration, ease: 'none',
        onComplete: () => {
          // 漏敲 (泡泡掉完)
          if (!game._level5Done && game._level5Accepting) {
            game._level5Accepting = false;
            game.wrongCount++;
            game._level5ConsecWrong++;
            maybeEnterEasyMode();
            try { game.audio.wrong(); } catch (_) {}
            game.say('漏拍啦! 看下一个音符~');
            noteEl.classList.add('incorrect');
            setTimeout(() => {
              noteEl.classList.remove('incorrect');
              game._level5Idx++;
              spawnNextNote();
            }, 600);
          }
        }
      }
    );
  }

  // 接收键盘敲击
  game.kb.onPress = (keyEl) => {
    if (!game._level5Accepting || game._level5Done) return;
    const expectedPitch = game._level5Seq[game._level5Idx];
    const actualPitch = keyEl.dataset.pitch;

    if (actualPitch === expectedPitch) {
      // 正确
      game._level5Correct++;
      game._level5Accepting = false;
      game._level5ConsecWrong = 0;  // 重置连续错
      try { game.audio.correct(); } catch (_) {}
      try { game.audio.playNote(actualPitch); } catch (_) {}

      const noteEl = getNoteEl();
      if (noteEl) {
        gsap.killTweensOf(noteEl);
        gsap.to(noteEl, { opacity: 0, scale: 2, duration: 0.4, ease: 'back.out(2)' });
      }

      game.say(['完美!', '星星在向你眨眼!', '小星星~'][Math.min(game._level5Correct - 1, 2)]);

      game._level5Idx++;
      if (game._level5Idx >= game._level5Seq.length) {
        game._level5Done = true;
        setTimeout(() => {
          const stars = game._calcStars();
          try { game.progress.markLevelComplete(5, stars); } catch (_) {}
          try { game.audio.playScale(['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4']); } catch (_) {}
          game.say('✨ 完美的《小星星》!');
          game.showWinOverlay(stars, 5);
        }, 800);
      } else {
        setTimeout(spawnNextNote, 500);
      }
    } else {
      // 错音
      game.wrongCount++;
      game._level5ConsecWrong++;
      maybeEnterEasyMode();
      try { game.audio.wrong(); } catch (_) {}
      const actualInfo = NOTE_INFO[actualPitch];
      game.say(`这是 ${actualInfo ? actualInfo.solfege : '?'}, 不是 ${NOTE_INFO[expectedPitch].solfege}. 再听一下!`);

      // 红的泡泡闪烁
      const noteEl = getNoteEl();
      if (noteEl) noteEl.classList.add('incorrect');
      setTimeout(() => { if (noteEl) noteEl.classList.remove('incorrect'); }, 300);

      // 回放正确音, 让孩子听清目标
      try { game.audio.playNote(expectedPitch); } catch (_) {}
    }
  };

  // 启动第一音
  setTimeout(spawnNextNote, 1000);

  return () => {
    if (game.scene && typeof game.scene.teardown === 'function') game.scene.teardown();
    const noteEl = staffArea && staffArea.querySelector('.level5-current-note');
    if (noteEl) gsap.killTweensOf(noteEl);
    game.stage.querySelectorAll('.level5-staff-area').forEach((s) => s.remove());
    const metronome = document.getElementById('level5-metronome');
    if (metronome) metronome.remove();
    const hud2 = document.getElementById('hud-level2');
    if (hud2) hud2.style.display = '';
    const dots = document.querySelector('.hud__dots');
    if (dots) dots.style.display = 'none';
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}
