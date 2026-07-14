/**
 * Level 14: 和弦建造者 (Chord Builder)
 *
 * 故事: 屏幕上方显示一个和弦 (如 C 大调: Do-Mi-Sol), 用 3 条小鱼🐟依次显示.
 *       玩家在底部钢琴键上按顺序按下 root → 3rd → 5th.
 *
 * 玩法:
 *  - 5 个和弦, 都在 C 大调的白键范围内 (C-D-E-F-G-A-B)
 *  - 鼓励: 一个和弦 = 3 键; 用户按顺序正确 = perfect
 *  - any 错音 (或顺序错) = 当前和弦重置, 重新开始
 *  - 5 和弦 → 通关
 *
 * 星数:
 *  - 5 and 弦完美 = 3⭐
 *  - 4           = 2⭐
 *  - 3           = 1⭐
 *  - < 3         = 0⭐
 */
import { Level14Scene } from '../components/Level14Scene.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';

// 7 个白键 — 顺序检测按这里的 id 读
const NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

// 5 个三和弦 (都在 1 个八度内, 白键)
// 每条 = { root, third, fifth } id; name 显示在 chord card
const CHORDS = [
  { name: 'C 大三和弦',  solfege: 'Do  -  Mi  -  Sol', ids: ['do', 'mi', 'sol'],  color: '#e63946' },
  { name: 'F 大三和弦',  solfege: 'Fa  -  La  -  Do',  ids: ['fa', 'la', 'do'],   color: '#b5c99a' },
  { name: 'G 大三和弦',  solfege: 'Sol -  Si  -  Re',  ids: ['sol', 'si', 're'],  color: '#457b9d' },
  { name: 'a 小三和弦',  solfege: 'La  -  Do  -  Mi',  ids: ['la', 'do', 'mi'],   color: '#6a4c93' },
  { name: 'F 大三和弦',  solfege: 'Fa  -  La  -  Do',  ids: ['fa', 'la', 'do'],   color: '#ffc971' },
];

export default function startLevel14(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 14;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level14Scene(game.stage);

  // 2) 主容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level14-stage"></div>');
  const root = game.stage.querySelector('.level14-stage');

  // 3) HUD
  const hud = document.createElement('div');
  hud.className = 'level14-hud';
  hud.innerHTML = `
    <div class="level14-stat">
      <span class="level14-stat__icon">🎶</span>
      <span class="level14-done">0</span> / 5 和弦
    </div>
    <div class="level14-stat">
      <span class="level14-stat__icon">⭐</span>
      <span class="level14-stars">0</span> 完美
    </div>
  `;
  root.appendChild(hud);

  const doneEl  = hud.querySelector('.level14-done');
  const starsEl = hud.querySelector('.level14-stars');

  // 4) 和弦卡
  const card = document.createElement('div');
  card.className = 'level14-card';
  card.innerHTML = `
    <div class="level14-card__name">C 大三和弦</div>
    <div class="level14-card__slots">
      <div class="level14-slot" data-idx="0">🐟</div>
      <div class="level14-slot" data-idx="1">🐟</div>
      <div class="level14-slot" data-idx="2">🐟</div>
    </div>
    <div class="level14-card__solfege">Do  -  Mi  -  Sol</div>
  `;
  root.appendChild(card);
  const nameEl = card.querySelector('.level14-card__name');
  const solfegeEl = card.querySelector('.level14-card__solfege');
  const slotEls = card.querySelectorAll('.level14-slot');

  // 5) 钢琴键盘 (放在底部)
  game.kb = new PianoKeyboard(game.stage, NOTES);

  // 6) 游戏状态
  game._level14Idx = 0;            // 当前和弦 index
  game._level14Perfect = 0;        // 完美完成的和弦数
  game._level14Step = 0;           // 当前和弦需要的下一个键 (0..2)
  game._level14Done = false;
  game._level14Failed = false;     // 当次和弦是否失败 (中间错 → false, 满 5 回时按 perfect 算星)

  function loadChord(idx) {
    const chord = CHORDS[idx];
    nameEl.textContent = chord.name;
    nameEl.style.background = `linear-gradient(135deg, ${chord.color}, #fff8dc)`;
    nameEl.style.webkitBackgroundClip = 'text';
    nameEl.style.backgroundClip = 'text';
    nameEl.style.color = 'transparent';
    solfegeEl.textContent = chord.solfege;
    slotEls.forEach((slot, i) => {
      slot.classList.remove('lit', 'placed', 'incorrect');
      slot.textContent = i === 0 ? '🐟' : '❓';
      // 先隐藏 2/3 槽, 第一节正确填了之后才显示下一槽
    });
  }

  function resetChord() {
    game._level14Step = 0;
    game._level14Failed = false;
    slotEls.forEach((slot, i) => {
      slot.classList.remove('lit', 'placed', 'incorrect');
      slot.textContent = i === 0 ? '🐟' : '❓';
    });
  }

  function showChordSlot(i, content, cls) {
    slotEls[i].textContent = content;
    slotEls[i].classList.add(cls);
    setTimeout(() => slotEls[i].classList.remove(cls), 350);
  }

  // 7) 监听按键
  game.kb.onPress = (keyEl) => {
    if (game._level14Done) return;
    const chord = CHORDS[game._level14Idx];
    const expectedId = chord.ids[game._level14Step];
    const actualId = keyEl.dataset.id;
    const actualNote = NOTES.find((n) => n.id === actualId);

    // 高亮当前 key 一次 (用 kb 自带 glow)
    try { game.kb.glowKey(keyEl); } catch (_) {}

    if (actualId === expectedId) {
      // 此步正确
      try { game.audio.correct(); } catch (_) {}
      try { game.audio.playNote(actualNote.pitch); } catch (_) {}

      if (game._level14Step === 0) {
        // 第一步: 把第 1 槽的 🐟 "贴"成该音符 solfege
        showChordSlot(0, actualNote.solfege, 'placed');
        slotEls[0].style.color = chord.color;
      } else {
        showChordSlot(game._level14Step, actualNote.solfege, 'placed');
        slotEls[game._level14Step].style.color = chord.color;
        // 揭开下一个槽 (变成 🐟 待按)
        const next = game._level14Step + 1;
        if (next < slotEls.length) {
          slotEls[next].textContent = '🐟';
        }
      }

      game._level14Step++;

      // 和弦完成
      if (game._level14Step >= 3) {
        if (!game._level14Failed) {
          game._level14Perfect++;
          starsEl.textContent = String(game._level14Perfect);
        }
        game._level14Idx++;
        doneEl.textContent = String(game._level14Idx);

        // 庆祝
        try { game.audio.playScale(chord.ids.map((id) => NOTES.find((n) => n.id === id).pitch)); } catch (_) {}
        try { game._flashScreen(); } catch (_) {}
        try {
          game._floatScore(window.innerWidth / 2, window.innerHeight * 0.36, '+1 ⭐');
        } catch (_) {}

        // 切到下一个和弦 / 通关
        if (game._level14Idx >= CHORDS.length) {
          game._level14Done = true;
          setTimeout(() => level14Win(), 700);
        } else {
          setTimeout(() => {
            loadChord(game._level14Idx);
            resetChord();
          }, 800);
        }
      }
    } else {
      // 错音 / 顺序错 — 整个和弦失败, 回退
      try { game.audio.wrong(); } catch (_) {}
      try { game.audio.playNote(actualNote.pitch); } catch (_) {}

      game._level14Failed = true;
      game.wrongCount++;

      // 闪烁所有 3 槽红
      slotEls.forEach((slot) => {
        slot.classList.add('incorrect');
      });
      game.say(`错啦 — 应该是 ${chord.solfege.split(/-+/).map((s) => s.trim()).filter(Boolean).join(' → ')}, 再来一次~`);

      // 700ms 后重置和弦
      setTimeout(() => {
        resetChord();
        // 重置时不要把 idx++ / perfect++ — 留在当条再试
      }, 700);
    }
  };

  // 8) 启动第一个和弦
  loadChord(0);
  resetChord();

  game.say('看和弦卡 — 三条小鱼的顺序! 按钢琴键组成和弦~');

  function level14Win() {
    const perfect = game._level14Perfect;
    let stars;
    if (perfect >= 5) stars = 3;
    else if (perfect >= 4) stars = 2;
    else if (perfect >= 3) stars = 1;
    else stars = 0;

    try { game.progress.markLevelComplete(14, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.42,
        `🎵 完美 ${perfect} / 5 和弦`);
    } catch (_) {}
    game.say(`和弦大师! ${perfect} 个和弦完美完成 🎵`);
    setTimeout(() => { try { game.showWinOverlay(stars, 14); } catch (_) {} }, 1300);
  }

  // 9) 触发布局
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  return () => {
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level14-stage').forEach((el) => el.remove());
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
