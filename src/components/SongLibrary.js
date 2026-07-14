/**
 * 歌曲库 (Song Library) — 独立模式 (非关卡)
 *
 * 三种玩法:
 *   ▶ 听完整曲 — Web Audio 自动播完整旋律 (演示)
 *   🎹 跟我弹 — 类似 L5 视奏: 音符从上落下, 高亮目标琴键, 点对了才前进
 *   📝 看谱   — 只读五线谱, 音符按音高排布
 *
 * 用法:
 *   const lib = new SongLibrary(document.body, game);
 *   lib.show();
 *
 * 依赖 game.audio.playNote(pitch) (仅支持 C4~B4, C5 静默).
 */
import { PianoKeyboard } from './PianoKeyboard.js';
import { gsap } from 'gsap';

const SONGS = [
  { id: 'twinkle',   name: '小星星',   emoji: '⭐', melody: ['C4','C4','G4','G4','A4','A4','G4','F4','F4','E4','E4','D4','D4','C4'], difficulty: 1 },
  { id: 'birthday',  name: '生日快乐', emoji: '🎂', melody: ['C4','C4','D4','C4','F4','E4','C4','C4','D4','C4','G4','F4'], difficulty: 1 },
  { id: 'london',    name: '伦敦桥',   emoji: '🌉', melody: ['C4','D4','E4','F4','G4','G4','A4','G4','F4','E4','D4','C4'], difficulty: 2 },
  { id: 'joy',       name: '欢乐颂',   emoji: '🎉', melody: ['E4','E4','F4','G4','G4','F4','E4','D4','C4','C4','D4','E4','E4','D4','D4'], difficulty: 2 },
  { id: 'frog',      name: '小青蛙',   emoji: '🐸', melody: ['C4','D4','E4','F4','E4','D4','C4'], difficulty: 1 },
  { id: 'molihua',   name: '茉莉花',   emoji: '🌸', melody: ['C4','E4','G4','A4','G4','E4','C4','D4','E4','F4','E4','D4','C4'], difficulty: 3 },
  { id: 'donkey',    name: '小毛驴',   emoji: '🫏', melody: ['C4','D4','E4','C4','E4','F4','G4','G4'], difficulty: 1 },
  { id: 'tigers',    name: '两只老虎', emoji: '🐯', melody: ['C4','D4','E4','C4','C4','D4','E4','C4','E4','F4','G4','G4'], difficulty: 2 },
  { id: 'abcsong',   name: '字母歌',   emoji: '🔤', melody: ['C4','C4','G4','G4','A4','A4','G4','F4','F4','E4','E4','D4','D4','C4'], difficulty: 1 },
  { id: 'threepigs', name: '三只小猪', emoji: '🐷', melody: ['C4','E4','G4','C4','E4','G4','G4','A4','G4','F4','E4','D4','C4'], difficulty: 2 },
  { id: 'painter',   name: '粉刷匠',   emoji: '🎨', melody: ['G4','G4','A4','G4','C5','B4','A4','G4','E4','G4','A4','B4','C5','B4','A4','G4'], difficulty: 3 },
  { id: 'fishlight', name: '渔光曲',   emoji: '🐟', melody: ['D4','E4','F4','D4','E4','F4','G4','A4','G4','F4','E4','D4'], difficulty: 3 },
];

// 唱名 (给演示 / 落音提示)
const SOLFEGE = { 'C4':'Do', 'D4':'Re', 'E4':'Mi', 'F4':'Fa', 'G4':'Sol', 'A4':'La', 'B4':'Si', 'C5':'Do' };

// pitch -> 白键 id (PianoKeyboard 一个八度 C4-B4). C5 无对应键 -> undefined.
const PITCH_TO_KEY = { 'C4':'do', 'D4':'re', 'E4':'mi', 'F4':'fa', 'G4':'sol', 'A4':'la', 'B4':'si' };

// pitch -> 全音阶序号 (给五线谱排布), C4=0 ... C5=7
const DIATONIC = { 'C4':0, 'D4':1, 'E4':2, 'F4':3, 'G4':4, 'A4':5, 'B4':6, 'C5':7 };

// 跟我弹用的一个八度琴键 (与 PianoKeyboard 约定的字段一致)
const KEYBOARD_NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];
const KEY_INDEX = { do:0, re:1, mi:2, fa:3, sol:4, la:5, si:6 };

export class SongLibrary {
  /**
   * @param {HTMLElement} stage 挂载节点
   * @param {Object} game 需含 game.audio.playNote
   */
  constructor(stage, game) {
    this.stage = stage || document.body;
    this.game = game || null;
    this.element = null;
    this.currentSong = null;
    // 运行态清理句柄
    this._demoTimer = null;
    this._demoOverlay = null;
    this._playOverlay = null;
    this._scoreOverlay = null;
    this._kb = null;
    this._escHandler = null;
  }

  show() {
    document.querySelectorAll('.song-library').forEach((el) => el.remove());

    const wrap = document.createElement('div');
    wrap.className = 'song-library';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', '歌曲库');
    wrap.innerHTML = `
      <div class="song-library__hud">
        <button class="btn-secondary song-library__back" id="song-back">🚪 返回</button>
        <div>
          <div class="song-library__title">🎵 歌曲库</div>
          <div class="song-library__hint">选一首歌: 听 / 跟我弹 / 看谱</div>
        </div>
        <span class="song-library__spacer"></span>
      </div>
      <div class="song-library__grid"></div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    const grid = wrap.querySelector('.song-library__grid');
    SONGS.forEach((song) => {
      const card = document.createElement('div');
      card.className = 'song-library__card';
      card.dataset.id = song.id;
      card.innerHTML = `
        <div class="song-library__card-emoji">${song.emoji}</div>
        <div class="song-library__card-name">${song.name}</div>
        <div class="song-library__card-meta">${song.melody.length} 音 · ${'★'.repeat(song.difficulty)}</div>
        <div class="song-library__card-actions">
          <button class="song-library__btn listen" data-action="listen">▶ 听</button>
          <button class="song-library__btn play" data-action="play">🎹 跟我弹</button>
          <button class="song-library__btn read" data-action="read">📝 看谱</button>
        </div>
      `;
      grid.appendChild(card);

      card.querySelectorAll('.song-library__btn').forEach((b) => {
        b.addEventListener('click', () => this._action(song, b.dataset.action));
      });
    });

    wrap.querySelector('#song-back').addEventListener('click', () => this.hide());
  }

  _action(song, action) {
    this.currentSong = song;
    if (action === 'listen') this._playDemo(song);
    else if (action === 'play') this._playAlong(song);
    else if (action === 'read') this._showScore(song);
  }

  _audioPlay(pitch) {
    try {
      const audio = this.game && this.game.audio;
      if (audio && typeof audio.playNote === 'function') audio.playNote(pitch);
    } catch (err) {
      console.warn('[SongLibrary] 播放失败:', err);
    }
  }

  // ============ ▶ 听完整曲 (演示自动播放) ============
  _playDemo(song) {
    this._closeDemo();

    const overlay = document.createElement('div');
    overlay.className = 'song-demo-overlay';
    overlay.innerHTML = `
      <h2>🎵 ${song.emoji} ${song.name}</h2>
      <div class="demo-current">准备演奏...</div>
      <button class="btn-secondary" id="demo-stop">⏹ 停止</button>
    `;
    document.body.appendChild(overlay);
    this._demoOverlay = overlay;

    let i = 0;
    const playNext = () => {
      if (!this._demoOverlay) return;
      if (i >= song.melody.length) {
        overlay.querySelector('.demo-current').textContent = '🎉 演奏完毕!';
        this._demoTimer = setTimeout(() => this._closeDemo(), 1200);
        return;
      }
      const pitch = song.melody[i];
      this._audioPlay(pitch);
      overlay.querySelector('.demo-current').textContent =
        `第 ${i + 1}/${song.melody.length} 音: ${SOLFEGE[pitch] || pitch} (${pitch})`;
      i++;
      this._demoTimer = setTimeout(playNext, 500);
    };
    playNext();

    overlay.querySelector('#demo-stop').addEventListener('click', () => this._closeDemo());
  }

  _closeDemo() {
    if (this._demoTimer) { clearTimeout(this._demoTimer); this._demoTimer = null; }
    if (this._demoOverlay && this._demoOverlay.parentNode) {
      this._demoOverlay.parentNode.removeChild(this._demoOverlay);
    }
    this._demoOverlay = null;
  }

  // ============ 🎹 跟我弹 (视奏, 自包含) ============
  _playAlong(song) {
    this._closePlayAlong();

    const overlay = document.createElement('div');
    overlay.className = 'song-play-overlay';
    overlay.innerHTML = `
      <div class="song-play__hud">
        <button class="btn-secondary" id="song-play-exit">🚪 退出</button>
        <div class="song-play__title">${song.emoji} ${song.name}</div>
        <div class="song-play__progress" id="song-play-progress">0 / ${song.melody.length}</div>
      </div>
      <div class="song-play__lane" id="song-play-lane">
        <div class="song-play__hitline"></div>
      </div>
      <div class="song-play__kb" id="song-play-kb"></div>
    `;
    document.body.appendChild(overlay);
    this._playOverlay = overlay;

    // 渲染钢琴
    const board = overlay.querySelector('#song-play-kb');
    const kb = new PianoKeyboard(board, KEYBOARD_NOTES);
    this._kb = kb;

    const progressEl = overlay.querySelector('#song-play-progress');
    const lane = overlay.querySelector('#song-play-lane');
    let step = 0;

    const clearTarget = () => {
      if (!kb.svg) return;
      kb.svg.querySelectorAll('.song-target').forEach((el) => el.classList.remove('song-target'));
    };

    const startStep = () => {
      clearTarget();
      lane.querySelectorAll('.song-play__note').forEach((n) => n.remove());

      if (step >= song.melody.length) {
        this._finishPlayAlong(song);
        return;
      }
      progressEl.textContent = `${step} / ${song.melody.length}`;

      const pitch = song.melody[step];
      const keyId = PITCH_TO_KEY[pitch];
      const idx = keyId != null ? KEY_INDEX[keyId] : 3; // C5 等无键音: 居中提示后自动前进

      // 落音提示
      const token = document.createElement('div');
      token.className = 'song-play__note';
      token.style.left = `${((idx + 0.5) / KEYBOARD_NOTES.length) * 100}%`;
      token.textContent = SOLFEGE[pitch] || pitch;
      lane.appendChild(token);
      gsap.fromTo(token, { y: -10, opacity: 0 }, { y: 'calc(100% - 44px)', opacity: 1, duration: 1.1, ease: 'power1.in' });

      // 高亮目标键
      if (keyId != null && kb.svg) {
        const keyEl = kb.svg.querySelector(`.key--white[data-id="${keyId}"]`);
        if (keyEl) keyEl.classList.add('song-target');
      } else {
        // 没有对应键 (C5): 自动演奏并前进
        this._audioPlay(pitch);
        step++;
        setTimeout(startStep, 700);
      }
    };

    kb.onPress = (keyEl) => {
      const id = keyEl.dataset.id;
      const info = KEYBOARD_NOTES.find((n) => n.id === id);
      if (info) this._audioPlay(info.pitch);
      try { kb.glowKey(keyEl); } catch (_) {}

      const expected = PITCH_TO_KEY[song.melody[step]];
      if (id === expected) {
        step++;
        startStep();
      } else {
        keyEl.classList.add('song-wrong');
        setTimeout(() => keyEl.classList.remove('song-wrong'), 300);
      }
    };

    this._escHandler = (e) => { if (e.key === 'Escape') this._closePlayAlong(); };
    document.addEventListener('keydown', this._escHandler);
    overlay.querySelector('#song-play-exit').addEventListener('click', () => this._closePlayAlong());

    startStep();
  }

  _finishPlayAlong(song) {
    if (!this._playOverlay) return;
    const lane = this._playOverlay.querySelector('#song-play-lane');
    if (lane) {
      lane.innerHTML = `
        <div class="song-play__done">
          <div class="song-play__done-emoji">🎉</div>
          <div class="song-play__done-text">${song.emoji} ${song.name} 弹完啦!</div>
          <div class="song-play__done-actions">
            <button class="btn-primary" id="song-play-again">🔁 再弹一次</button>
            <button class="btn-secondary" id="song-play-back">🚪 返回</button>
          </div>
        </div>
      `;
      lane.querySelector('#song-play-again').addEventListener('click', () => this._playAlong(song));
      lane.querySelector('#song-play-back').addEventListener('click', () => this._closePlayAlong());
    }
  }

  _closePlayAlong() {
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
    if (this._playOverlay && this._playOverlay.parentNode) {
      this._playOverlay.parentNode.removeChild(this._playOverlay);
    }
    this._playOverlay = null;
    this._kb = null;
  }

  // ============ 📝 看谱 (只读五线谱) ============
  _showScore(song) {
    this._closeScore();

    const STEP_X = 52;
    const LEFT = 60;
    const width = LEFT + song.melody.length * STEP_X + 40;
    // 五线谱: 5 条线, E4 在最下线附近. baseY 对应 C4 下方.
    const LINE_TOP = 60;
    const LINE_GAP = 18;
    const lines = [0, 1, 2, 3, 4].map((k) =>
      `<line x1="30" y1="${LINE_TOP + k * LINE_GAP}" x2="${width - 20}" y2="${LINE_TOP + k * LINE_GAP}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />`
    ).join('');

    // C4 放在最下线下方一点, 每个全音阶步 = LINE_GAP/2 (线间距的一半)
    const c4Y = LINE_TOP + 4 * LINE_GAP + LINE_GAP; // 最下线之下一个间距
    const noteY = (pitch) => c4Y - (DIATONIC[pitch] ?? 0) * (LINE_GAP / 2);

    const notes = song.melody.map((pitch, i) => {
      const x = LEFT + i * STEP_X;
      const y = noteY(pitch);
      const ledger = (pitch === 'C4' || pitch === 'C5')
        ? `<line x1="${x - 16}" y1="${y}" x2="${x + 16}" y2="${y}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />`
        : '';
      return `${ledger}
        <ellipse cx="${x}" cy="${y}" rx="11" ry="9" fill="#3d405b" transform="rotate(-18 ${x} ${y})" />
        <text x="${x}" y="${c4Y + 34}" text-anchor="middle" font-size="12" fill="#6a4c93" font-weight="700">${SOLFEGE[pitch] || pitch}</text>`;
    }).join('');

    const overlay = document.createElement('div');
    overlay.className = 'song-score-overlay';
    overlay.innerHTML = `
      <div class="song-score-card">
        <h2>📝 ${song.emoji} ${song.name}</h2>
        <div class="song-score-scroll">
          <svg viewBox="0 0 ${width} 200" preserveAspectRatio="xMidYMid meet" class="song-score-svg" style="min-width:${Math.max(width, 320)}px;">
            <text x="20" y="${LINE_TOP + 30}" font-size="42" fill="#3d405b" font-family="serif">𝄞</text>
            ${lines}
            ${notes}
          </svg>
        </div>
        <button class="btn-secondary" id="score-close">关闭</button>
      </div>
    `;
    document.body.appendChild(overlay);
    this._scoreOverlay = overlay;
    overlay.querySelector('#score-close').addEventListener('click', () => this._closeScore());
  }

  _closeScore() {
    if (this._scoreOverlay && this._scoreOverlay.parentNode) {
      this._scoreOverlay.parentNode.removeChild(this._scoreOverlay);
    }
    this._scoreOverlay = null;
  }

  hide() {
    this._closeDemo();
    this._closePlayAlong();
    this._closeScore();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
  }
}

export default SongLibrary;
