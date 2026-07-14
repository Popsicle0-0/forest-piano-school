/**
 * Level 8: 森林音乐会 + 舞台
 *
 * 选曲 → 视奏完整旋律 (类似 Level 5 但可选 6 首曲目, 分 3 档难度)
 *   - ★ 入门 (diff 1): 小星星 (14) / 生日快乐 (12)
 *   - ★★ 中等 (diff 2): 伦敦桥 (12) / 欢乐颂 (15) / 小青蛙 (7)
 *   - ★★★ 进阶 (diff 3): 茉莉花 (13)
 *
 * 音符泡泡从五线谱位置缓慢下落, 孩子在泡泡到琴键时按对应白键.
 *   正确 = 泡泡放大消失 + 下一个音
 *   错音 = 泡泡变红闪烁 + 回放正确音 + 计数错
 *   漏敲 (泡泡掉完) = 计数错 + 换下个音
 *
 * 通关星数随难度放宽 (diff 2 容许更多错, diff 3 容许最多 10 错仍 1⭐).
 * 集齐 6 首演奏过 → 选曲界面右上角显示"全部演奏!"徽章 (localStorage).
 */
import { Level8Scene } from '../components/Level8Scene.js';
import { PianoKeyboard } from '../components/PianoKeyboard.js';
import { gsap } from 'gsap';

const NOTE_INFO = {
  'C4': { id: 'do',  solfege: 'Do'  },
  'D4': { id: 're',  solfege: 'Re'  },
  'E4': { id: 'mi',  solfege: 'Mi'  },
  'F4': { id: 'fa',  solfege: 'Fa'  },
  'G4': { id: 'sol', solfege: 'Sol' },
  'A4': { id: 'la',  solfege: 'La'  },
  'B4': { id: 'si',  solfege: 'Si'  },
};

const STAFF_TOP = 80;

// 音符在五线谱上的垂直位置 (cy, viewBox 坐标)
// 与 Level5 保持一致, 这样视觉一致
const NOTE_Y = {
  'do':  180,
  're':  165,
  'mi':  120,
  'fa':  110,
  'sol': 100,
  'la':  80,
  'si':  70,
};

export default function startLevel8(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 8;
  }

  // HUD: 关卡 8 不需要 hud-dots (拖鱼进度点), 隐藏 level2-badges
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 渲染场景
  game.scene = new Level8Scene(game.stage);
  game.say('森林音乐会开始! 选一首曲子~');

  // 2) 选曲 UI 容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level8-song-stage"></div>');
  const songStage = game.stage.querySelector('.level8-song-stage');

  // localStorage: 跟踪用户已演奏过的曲目 (用于"全部演奏!"徽章)
  const PLAYED_KEY = 'fps_level8_played_v1';
  function getPlayedSet() {
    try {
      const raw = localStorage.getItem(PLAYED_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) { return new Set(); }
  }
  function markSongPlayed(id) {
    const set = getPlayedSet();
    set.add(id);
    try { localStorage.setItem(PLAYED_KEY, JSON.stringify(Array.from(set))); } catch (_) {}
  }

  // 渲染 selector 时检查是否 6 首全打过 → 显示"全部演奏!"徽章
  const playedSet = getPlayedSet();
  if (playedSet.size >= 6) {
    songStage.insertAdjacentHTML('beforeend',
      '<div class="level8-all-played-badge">🎖 全部演奏!</div>');
  }

  game.scene.showSongSelector(songStage, (song) => startSong(song));

  // 3) 钢琴键盘 (整个关卡期间常驻)
  game.kb = new PianoKeyboard(game.stage, [
    { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
    { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
    { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
    { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
    { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
    { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
    { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
  ]);

  // 关卡状态 (歌曲开始时填充)
  game._level8Seq = null;
  game._level8Idx = 0;
  game._level8Total = 0;
  game._level8Correct = 0;
  game._level8Accepting = false;
  game._level8Done = false;
  game._level8Timeouts = [];

  let staffArea = null;

  function buildStaffArea() {
    game.stage.insertAdjacentHTML('beforeend', '<div class="level8-staff-area"></div>');
    staffArea = game.stage.querySelector('.level8-staff-area');
    staffArea.innerHTML = `
      <svg class="level8-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
        <line class="level8-staff-line" x1="40" y1="${STAFF_TOP + 40}" x2="760" y2="${STAFF_TOP + 40}" />
        <line class="level8-staff-line" x1="40" y1="${STAFF_TOP + 60}" x2="760" y2="${STAFF_TOP + 60}" />
        <line class="level8-staff-line" x1="40" y1="${STAFF_TOP + 80}" x2="760" y2="${STAFF_TOP + 80}" />
        <line class="level8-staff-line" x1="40" y1="${STAFF_TOP + 100}" x2="760" y2="${STAFF_TOP + 100}" />
        <line class="level8-staff-line" x1="40" y1="${STAFF_TOP + 120}" x2="760" y2="${STAFF_TOP + 120}" />
        <circle class="level8-current-note" cx="400" cy="0" r="16" fill="#ffd166" />
      </svg>
    `;
  }

  function getNoteEl() {
    return staffArea ? staffArea.querySelector('.level8-current-note') : null;
  }

  function startSong(song) {
    // 选完曲后: 收起歌曲卡片, 显示现在播什么 + 难度 + 进度
    if (songStage) {
      songStage.innerHTML = `
        <div class="level8-now-playing">
          <div class="level8-now-emoji">${song.emoji}</div>
          <div class="level8-now-text">演奏: <strong>${song.name}</strong></div>
          <div class="level8-difficulty-badge level8-diff-${song.difficulty}">难度 ${song.diff}</div>
          <div class="level8-progress">1 / ${song.melody.length}</div>
        </div>
      `;
    }

    if (!staffArea) buildStaffArea();

    game.say(`演奏《${song.name}》! 跟着音符按琴键~`);
    // 标记该曲已被演奏过 (用于"全部演奏!"徽章)
    markSongPlayed(song.id);
    game._level8Song = song;
    game._level8Seq = [...song.melody];
    game._level8Total = game._level8Seq.length;
    game._level8Correct = 0;
    game._level8Idx = 0;
    game._level8Accepting = false;
    game._level8Done = false;

    // 启动第一音
    setTimeout(spawnNextNote, 800);
  }

  function spawnNextNote() {
    if (game._level8Done || game._level8Idx >= game._level8Seq.length) return;
    const pitch = game._level8Seq[game._level8Idx];
    const info = NOTE_INFO[pitch];
    const staffY = NOTE_Y[info.id];

    const noteEl = getNoteEl();
    if (!noteEl) return;

    gsap.killTweensOf(noteEl);
    gsap.set(noteEl, { scale: 1, opacity: 1 });
    noteEl.setAttribute('cy', staffY);
    noteEl.dataset.pitch = pitch;
    noteEl.classList.remove('incorrect');

    game.say(`下一个: ${info.solfege} (${pitch})`);
    game._level8Accepting = true;

    // 缓慢下落 (4.5 秒, 孩子有时间按键)
    gsap.fromTo(noteEl,
      { attr: { cy: staffY } },
      {
        attr: { cy: staffY + 100 },
        duration: 4.5,
        ease: 'none',
        onComplete: () => {
          // 漏敲 (泡泡掉完)
          if (!game._level8Done && game._level8Accepting) {
            game._level8Accepting = false;
            game.wrongCount++;
            try { game.audio.wrong(); } catch (_) {}
            game.say('漏拍啦! 看下一个音符~');
            noteEl.classList.add('incorrect');
            setTimeout(() => {
              noteEl.classList.remove('incorrect');
              game._level8Idx++;
              spawnNextNote();
            }, 600);
          }
        },
      }
    );
  }

  // 接收键盘敲击
  game.kb.onPress = (keyEl) => {
    if (!game._level8Accepting || game._level8Done) return;
    if (!game._level8Seq || game._level8Idx >= game._level8Seq.length) return;

    const expectedPitch = game._level8Seq[game._level8Idx];
    const actualPitch = keyEl.dataset.pitch;

    if (actualPitch === expectedPitch) {
      // 正确
      game._level8Correct++;
      game._level8Accepting = false;
      try { game.audio.correct(); } catch (_) {}
      try { game.audio.playNote(actualPitch); } catch (_) {}

      const noteEl = getNoteEl();
      if (noteEl) {
        gsap.killTweensOf(noteEl);
        gsap.to(noteEl, { opacity: 0, scale: 2, duration: 0.4, ease: 'back.out(2)' });
      }

      // 进度 +1
      if (songStage) {
        const prog = songStage.querySelector('.level8-progress');
        if (prog) prog.textContent = `${game._level8Idx + 1} / ${game._level8Total}`;
      }

      // 鼓励语 (3 句轮换)
      const praises = ['完美!', '森林在听!', '真棒!'];
      game.say(praises[Math.min(game._level8Correct - 1, praises.length - 1)]);

      game._level8Idx++;
      if (game._level8Idx >= game._level8Seq.length) {
        // 通关
        game._level8Done = true;
        game._level8Timeouts.push(setTimeout(handleWin, 800));
      } else {
        setTimeout(spawnNextNote, 500);
      }
    } else {
      // 错音 — 不漏掉当前音符, 只闪红 + 提示
      game.wrongCount++;
      try { game.audio.wrong(); } catch (_) {}
      const actualInfo = NOTE_INFO[actualPitch];
      game.say(`这是 ${actualInfo ? actualInfo.solfege : '?'}, 不是 ${NOTE_INFO[expectedPitch].solfege}. 再听一下!`);

      const noteEl = getNoteEl();
      if (noteEl) noteEl.classList.add('incorrect');
      setTimeout(() => { if (noteEl) noteEl.classList.remove('incorrect'); }, 300);

      // 回放正确音, 让孩子听清目标
      try { game.audio.playNote(expectedPitch); } catch (_) {}
    }
  };

  function handleWin() {
    // 当前曲的难度 (从 game._level8Song 拿), 用于星数公式
    const currentSong = game._level8Song;
    const diff = (currentSong && currentSong.difficulty) || 1;
    const wc = game.wrongCount || 0;

    // 难度感知星数公式
    let stars;
    if (diff <= 1) {
      // diff 1: 与 Game._calcStars 一致 (0=3⭐, 1-2=2⭐, 3-5=1⭐, 6+=0⭐)
      stars = (game._calcStars && game._calcStars()) ||
        (wc <= 0 ? 3 : wc <= 2 ? 2 : wc <= 5 ? 1 : 0);
    } else if (diff === 2) {
      // diff 2: 0=3⭐, 1-3=2⭐, 4-7=1⭐, 8+=0⭐
      stars = (wc <= 0) ? 3 : (wc <= 3) ? 2 : (wc <= 7) ? 1 : 0;
    } else {
      // diff 3: 0-1=3⭐, 2-4=2⭐, 5-9=1⭐, 10+=0⭐
      stars = (wc <= 1) ? 3 : (wc <= 4) ? 2 : (wc <= 9) ? 1 : 0;
    }

    try { game.progress.markLevelComplete(8, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']); } catch (_) {}

    // 庆祝: 白闪 + 飘字 (game._flashScreen 在 v17 已加入)
    if (typeof game._flashScreen === 'function') {
      try { game._flashScreen(); } catch (_) {}
    }
    if (typeof game._floatScore === 'function') {
      try {
        game._floatScore(window.innerWidth / 2, window.innerHeight * 0.4, '🎉 完美的表演! 🎉');
      } catch (_) {}
    }

    game.say('完美的表演! 森林在为你鼓掌!');
    setTimeout(() => {
      try { game.showWinOverlay(stars, 8); } catch (_) {}
    }, 1200);
  }

  // 5) 触发一次 resize, 让 main.js 的 applyPhoneLayout / applyTabletLayout 接管新 DOM
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  return () => {
    // 清所有 setTimeout
    if (Array.isArray(game._level8Timeouts)) {
      game._level8Timeouts.forEach((id) => clearTimeout(id));
      game._level8Timeouts = [];
    }

    game._level8Song = null;

    // 拆场景
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }

    // 拆 Level 8 DOM 节点 (stage.innerHTML 也会被 Game.start 兜底清空)
    if (game.stage) {
      game.stage.querySelectorAll('.level8-song-stage, .level8-staff-area').forEach((el) => el.remove());
    }

    // 复位 HUD (回到 Level 1 默认)
    const hudLevel2El = document.getElementById('hud-level2');
    if (hudLevel2El) hudLevel2El.style.display = 'none';
    const hudDotsEl = document.querySelector('.hud__dots');
    if (hudDotsEl) hudDotsEl.style.display = '';
    const btnReplayEl = document.getElementById('btn-replay');
    if (btnReplayEl) btnReplayEl.style.display = '';

    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}
