/**
 * Level 6: 双手协调 + 钢琴教室
 *
 * 故事: 女钢琴老师教孩子双手协调 — 左低右高同时按.
 *
 * 简化实现: 沿用 Level 1 的 7 键键盘 (Do-Re-Mi-Fa-Sol-La-Si, 1 个八度).
 *   - 视觉上把左侧 3 键涂淡绿 = 左手低音区 (Do Re Mi)
 *   - 视觉上把右侧 4 键涂淡黄 = 右手高音区 (Fa Sol La Si)
 *   - 实际两区都是真实琴键, 都发声 (PianoKeyboard API)
 *
 * 5 道双音题, 每道题 = 1 个左手区键 + 1 个右手区键, 孩子两手同时按.
 *   - 按下第一个键: 记录 id + 开始计时
 *   - 按下第二个键 (在 2 秒内): 完成本道, 双音播音 + 反馈
 *   - 在 2 秒内按了不在该题里的键: 错, 提示正确组合
 *   - 第一个键超过 2 秒没配对: 重置 (不能只按一个)
 *
 * 通关条件: 完成 5 题.
 */
import { Level6Scene } from '../components/Level6Scene.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';

// 7 个白键元数据 (跟 Game.js NOTES 完全一致 — 颜色与音名)
const NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

// LH 区: do(0), re(1), mi(2) — 左 3 个白键
// RH 区: fa(3), sol(4), la(5), si(6) — 右 4 个白键
const LH_IDS = new Set(['do', 're', 'mi']);
const RH_IDS = new Set(['fa', 'sol', 'la', 'si']);

// 5 道双音题 — 每题都是 1 LH + 1 RH, 颜色对比让分区一目了然
const CHORDS = [
  { high: 'fa',  low: 'do',  label: 'Fa 上 + Do 下' },   // 4 度 (Fa 上, Do 下)
  { high: 'sol', low: 're',  label: 'Sol 上 + Re 下' },   // 5 度
  { high: 'la',  low: 'mi',  label: 'La 上 + Mi 下' },    // 6 度
  { high: 'si',  low: 'do',  label: 'Si 上 + Do 下' },    // 7 度
  { high: 'sol', low: 'mi',  label: 'Sol 上 + Mi 下' },   // 3 度
];

// 双击时间窗 (ms): 第一个键后多久内必须按第二个, 否则重置
const PAIR_WINDOW_MS = 2000;

// 关卡完成时的上行音阶 (C4-B4, Audio.js _playNoteWebAudio 仅支持 C4-B4)
const SCALE = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];

const ENCOURAGE = ['完美!', '双手协作!', '和谐!', '真厉害!', '双手小钢琴家!'];

export default function startLevel6(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 6;
  }

  // HUD: 显示普通进度点, 隐藏 Level 2 进度徽章
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';
  // Level 6 用前 5 个进度点做状态
  const hudDotEls = document.querySelectorAll('#hud-dots .dot');
  hudDotEls.forEach((el) => el.classList.remove('on'));
  hudDotEls.forEach((el, i) => { if (i >= 5) el.style.display = 'none'; else el.style.display = ''; });

  // 1) 渲染教室场景
  game.scene = new Level6Scene(game.stage);

  // 2) 渲染键盘
  game.kb = new PianoKeyboard(game.stage, NOTES);

  // 3) 给键盘按区上色 (LH = 绿, RH = 黄)
  setTimeout(() => {
    if (!game.kb || !game.kb.svg) return;
    NOTES.forEach((n) => {
      const key = game.kb.svg.querySelector(`.key--white[data-id="${n.id}"]`);
      if (!key) return;
      if (LH_IDS.has(n.id)) key.classList.add('level6-lh');
      else if (RH_IDS.has(n.id)) key.classList.add('level6-rh');
      // 加小标签 "左"/"右" 让孩子读懂
      const label = key.querySelector('.key__label');
      if (label) {
        const tag = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const cx = label.getAttribute('x') || '40';
        tag.setAttribute('x', cx);
        tag.setAttribute('y', '150');
        tag.setAttribute('text-anchor', 'middle');
        tag.setAttribute('font-family', "'ZCOOL KuaiLe', sans-serif");
        tag.setAttribute('font-size', '12');
        tag.setAttribute('font-weight', '900');
        tag.setAttribute('fill', LH_IDS.has(n.id) ? '#2d6e3e' : '#a06800');
        tag.setAttribute('class', 'level6-hand-tag');
        tag.setAttribute('style', 'pointer-events: none; paint-order: stroke; stroke: white; stroke-width: 2;');
        tag.textContent = LH_IDS.has(n.id) ? '左手' : '右手';
        key.appendChild(tag);
      }
    });
  }, 50);

  // 开场白
  game.say('钢琴老师教双手协调! 左低右高, 同时按下两个键~ 🎹');

  // 4) 关卡状态
  game._level6Idx = 0;          // 当前题号
  game._level6Total = CHORDS.length;
  game._level6Correct = 0;       // 已答对题数
  game._level6Done = false;
  game._level6Current = null;    // 当前题 { high, low, label }
  game._level6PressFirst = null; // 第一个键 { id, at } 或 null
  game._level6PairTimer = null;  // pair 超时 setTimeout
  game._level6Locked = false;    // 答对间隔内锁住

  // 5) 高亮当前题
  function hintChord(chord) {
    if (!game.kb || !game.kb.svg) return;
    // 两个键加点色脉冲
    [chord.high, chord.low].forEach((id) => {
      const key = game.kb.svg.querySelector(`.key--white[data-id="${id}"]`);
      if (!key) return;
      game.kb.glowKey(key);
    });
  }

  function presentChord(idx) {
    if (idx >= CHORDS.length) {
      return level6Win();
    }
    const chord = CHORDS[idx];
    game._level6Current = chord;
    game._level6PressFirst = null;
    game._level6Locked = false;

    const highNote = NOTES.find((n) => n.id === chord.high);
    const lowNote = NOTES.find((n) => n.id === chord.low);
    game.say(`第 ${idx + 1} / ${CHORDS.length} 题: 请同时按 ${highNote.solfege} (右手) + ${lowNote.solfege} (左手) ✨`);

    // 视觉高亮 + 试奏一下
    setTimeout(() => hintChord(chord), 300);
    setTimeout(() => {
      try {
        game.audio.playNote(highNote.pitch);
        game.audio.playNote(lowNote.pitch);
      } catch (_) {}
    }, 600);
  }

  function level6Win() {
    game._level6Done = true;
    const stars = game._calcStars();
    try { game.progress.markLevelComplete(6, stars); } catch (_) {}
    try { game.audio.playScale(SCALE); } catch (_) {}
    game.say('双手小钢琴家毕业! 🎓🎹');
    setTimeout(() => {
      try { game.showWinOverlay(stars, 6); } catch (_) {}
    }, 1200);
  }

  // 6) 键盘回调 — 双音判定核心
  game.kb.onPress = (keyEl) => {
    if (game._level6Done || game._level6Locked) return;
    if (!game._level6Current || !keyEl || !keyEl.classList.contains('key--white')) return;

    const id = keyEl.dataset.id;
    const chord = game._level6Current;
    const expected = new Set([chord.high, chord.low]);
    const cur = game._level6PressFirst;

    // 情况 A: 已经按了第一个键, 现在按第二个
    if (cur && cur.id !== id) {
      // 第二个是不是当前题里期待的那个?
      if (expected.has(id) && expected.has(cur.id) && cur.id !== id) {
        // 配对成功 — 双键都按过了
        completeChord(keyEl);
        return;
      }
      // 按了不在题里 / 按了重复的键
      wrongChord(keyEl, id);
      return;
    }

    // 情况 B: 还没按第一个键
    if (!cur) {
      if (!expected.has(id)) {
        // 按了不在题里的键
        wrongChord(keyEl, id);
        return;
      }
      // 记下第一个键 + 启超时
      game._level6PressFirst = { id, at: Date.now() };
      // 单键发声
      try { game.audio.playNote(keyEl.dataset.pitch); } catch (_) {}
      try { game.kb.glowKey(keyEl); } catch (_) {}
      keyEl.classList.add('level6-pressed');
      setTimeout(() => keyEl.classList.remove('level6-pressed'), 500);

      // pair 超时
      if (game._level6PairTimer) clearTimeout(game._level6PairTimer);
      game._level6PairTimer = setTimeout(() => {
        // 时间到, 还没配对 — 提示再试
        const cur2 = game._level6PressFirst;
        if (cur2) {
          const noteObj = NOTES.find((n) => n.id === cur2.id);
          const highNote = NOTES.find((n) => n.id === chord.high);
          const lowNote = NOTES.find((n) => n.id === chord.low);
          game.say(`光按了 ${noteObj ? noteObj.solfege : '?'} 还不够哦, 再按 ${highNote.solfege} (右手) 或 ${lowNote.solfege} (左手)~`);
          game.wrongCount++;
        }
        game._level6PressFirst = null;
      }, PAIR_WINDOW_MS);
      return;
    }

    // 情况 C: 重复按同一个键 (忽略, 闪一下)
    try { game.kb.glowKey(keyEl); } catch (_) {}
    try { game.audio.playNote(keyEl.dataset.pitch); } catch (_) {}
  };

  function completeChord(secondKeyEl) {
    const cur = game._level6PressFirst;
    if (!cur || !game._level6Current) return;

    const id1 = cur.id;
    const id2 = secondKeyEl.dataset.id;
    // 双键播音 (几乎同时)
    try {
      const n1 = NOTES.find((n) => n.id === id1);
      const n2 = NOTES.find((n) => n.id === id2);
      if (n1) game.audio.playNote(n1.pitch);
      if (n2) game.audio.playNote(n2.pitch);
    } catch (_) {}

    // 视觉: 两个键都亮
    [id1, id2].forEach((id) => {
      const k = game.kb.svg.querySelector(`.key--white[data-id="${id}"]`);
      if (k) {
        k.classList.add('level6-pressed');
        try { game.kb.glowKey(k); } catch (_) {}
        setTimeout(() => k.classList.remove('level6-pressed'), 500);
      }
    });

    // 反馈
    game._level6Correct++;
    game._level6Locked = true;
    if (game._level6PairTimer) {
      clearTimeout(game._level6PairTimer);
      game._level6PairTimer = null;
    }
    game._level6PressFirst = null;

    const msg = ENCOURAGE[Math.min(game._level6Correct - 1, ENCOURAGE.length - 1)];
    game.say(`${msg} 双音 ${game._level6Correct} / ${CHORDS.length}`);

    // HUD 第 N 个点亮
    if (hudDotEls[game._level6Correct - 1]) {
      hudDotEls[game._level6Correct - 1].classList.add('on');
    }

    // 飘字
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45, '🎵 双音!');
    } catch (_) {}

    // 屏幕闪光
    try {
      const flash = document.createElement('div');
      flash.className = 'level6-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 600);
    } catch (_) {}

    // 庆祝粒子 (用 Game.burst — Game.js 已经 import canvas-confetti)
    try {
      const rect = secondKeyEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const color = (NOTES.find((n) => n.id === game._level6Current.high) || {}).color || '#ffd166';
      game.burst(cx, cy, color);
    } catch (_) {}

    // 答对音
    try { game.audio.correct(); } catch (_) {}

    // 下一题
    game._level6Idx++;
    setTimeout(() => presentChord(game._level6Idx), 1400);
  }

  function wrongChord(keyEl, wrongId) {
    game.wrongCount++;
    try { game.audio.wrong(); } catch (_) {}
    keyEl.classList.add('shake');
    setTimeout(() => keyEl.classList.remove('shake'), 400);

    // 重置 first-press
    if (game._level6PairTimer) {
      clearTimeout(game._level6PairTimer);
      game._level6PairTimer = null;
    }
    game._level6PressFirst = null;

    if (!game._level6Current) return;
    const highNote = NOTES.find((n) => n.id === game._level6Current.high);
    const lowNote = NOTES.find((n) => n.id === game._level6Current.low);
    const wrongNote = NOTES.find((n) => n.id === wrongId);
    if (wrongNote) {
      game.say(`${wrongNote.solfege} 不在本道题里, 要按 ${highNote.solfege} (右手) + ${lowNote.solfege} (左手) 同时哦~`);
    } else {
      game.say(`要同时按 ${highNote.solfege} (右手) + ${lowNote.solfege} (左手) 哦~`);
    }

    // 重新高亮提示
    setTimeout(() => hintChord(game._level6Current), 800);
  }

  // 7) 启动第一题
  setTimeout(() => presentChord(0), 1200);

  // 返回 teardown (Game.start 切关时调用)
  return () => {
    if (game._level6PairTimer) {
      clearTimeout(game._level6PairTimer);
      game._level6PairTimer = null;
    }
    // 拆场景
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    // HUD 复位
    if (hudLevel2) hudLevel2.style.display = '';
    if (hudDots) hudDots.style.display = '';
    if (btnReplay) btnReplay.style.display = '';
    hudDotEls.forEach((el) => { el.classList.remove('on'); el.style.display = ''; });

    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}
