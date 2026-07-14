/**
 * Level 11: 记忆翻牌 (Memory Match)
 *
 * 故事: 翻开两张卡 — 如果音符一样就配对成功!
 *
 * 玩法:
 *  - 4 对 (8 张) 卡片, 牌背是装饰图, 牌面显示 Do/Re/Mi/Fa
 *  - 用户一次翻 2 张, 翻开后播对应音符的音
 *  - 匹配 → 卡片保持翻开 + 闪绿
 *  - 不匹配 → 0.8s 后翻回
 *  - 全部配对完成 → 通关
 *
 * 评分: 用时越短星越多.
 *  - < 15s  → 3⭐
 *  - < 25s  → 2⭐
 *  - < 40s  → 1⭐
 *  - 40s+   → 0⭐
 */
import { Level11Scene } from '../components/Level11Scene.js';
import { gsap } from 'gsap';

const CARD_NOTES = [
  { id: 'do', solfege: 'Do',  pitch: 'C4', color: '#e63946', emoji: '🍎' },
  { id: 're', solfege: 'Re',  pitch: 'D4', color: '#f4a261', emoji: '🍊' },
  { id: 'mi', solfege: 'Mi',  pitch: 'E4', color: '#ffc971', emoji: '🍋' },
  { id: 'fa', solfege: 'Fa',  pitch: 'F4', color: '#b5c99a', emoji: '🥝' },
];

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function startLevel11(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 11;
  }

  // HUD
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 场景
  game.scene = new Level11Scene(game.stage);

  // 2) 主容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level11-stage"></div>');
  const root = game.stage.querySelector('.level11-stage');

  // 3) HUD
  const hud = document.createElement('div');
  hud.className = 'level11-hud';
  hud.innerHTML = `
    <div class="level11-progress">
      <span class="level11-progress-icon">⭐</span>
      <span class="level11-done">0</span> / 4 对
    </div>
    <div class="level11-timer">⏱ <span class="level11-time">0.0</span>s</div>
  `;
  root.appendChild(hud);

  // 4) 卡片网格 (4 列 2 行 = 8 张, 4 对)
  const board = document.createElement('div');
  board.className = 'level11-board';
  root.appendChild(board);

  // 5) 8 张卡片 (4 对, 洗牌)
  const cards = [];
  CARD_NOTES.forEach((note) => {
    cards.push({ ...note, key: note.id + '_a' });
    cards.push({ ...note, key: note.id + '_b' });
  });
  const shuffled = shuffle(cards);

  shuffled.forEach((c) => {
    const card = document.createElement('button');
    card.className = 'level11-card';
    card.dataset.key = c.key;
    card.dataset.id = c.id;
    card.dataset.pitch = c.pitch;
    card.dataset.color = c.color;
    card.innerHTML = `
      <div class="level11-card__inner">
        <div class="level11-card__face level11-card__back">
          <div class="level11-card__back-pattern">🎵</div>
        </div>
        <div class="level11-card__face level11-card__front"
             style="--card-accent: ${c.color}">
          <div class="level11-card__emoji">${c.emoji}</div>
          <div class="level11-card__name">${c.solfege}</div>
        </div>
      </div>
    `;
    board.appendChild(card);
    cards.push({ el: card, ...c });
  });

  // 6) 游戏状态
  game._level11Cards = cards;          // [{el, id, ...}]
  game._level11Flipped = [];           // 最多 2 张
  game._level11Matched = 0;
  game._level11Locked = false;         // 匹配检查中的锁
  game._level11Start = Date.now();
  game._level11Tried = 0;
  game._level11Timer = null;

  // 7) 计时器
  const timeEl = hud.querySelector('.level11-time');
  game._level11Timer = setInterval(() => {
    if (!game._level11Start) return;
    const t = (Date.now() - game._level11Start) / 1000;
    timeEl.textContent = t.toFixed(1);
  }, 100);

  // 8) 翻牌逻辑
  function onCardClick(card) {
    if (game._level11Locked) return;
    if (game._level11Flipped.includes(card)) return;
    if (card.classList.contains('matched')) return;

    // 翻牌 (CSS 3D rotateY)
    card.classList.add('flipped');
    game._level11Flipped.push(card);
    // 弹音
    try { game.audio.playNote(card.dataset.pitch); } catch (_) {}

    if (game._level11Flipped.length === 2) {
      game._level11Tried++;
      game._level11Locked = true;
      const [a, b] = game._level11Flipped;
      if (a.dataset.id === b.dataset.id) {
        // 配对成功
        setTimeout(() => {
          a.classList.add('matched');
          b.classList.add('matched');
          try { game.audio.correct(); } catch (_) {}
          try { game._flashScreen(); } catch (_) {}
          game._level11Matched++;
          hud.querySelector('.level11-done').textContent = String(game._level11Matched);
          game.say(`配对! ${a.dataset.id.toUpperCase()} = ${a.dataset.id.toUpperCase()} 🎉`);
          // 飘字
          try {
            const r = a.getBoundingClientRect();
            game._floatScore(r.left + r.width / 2, r.top, `${a.dataset.id.toUpperCase()} ✓`);
          } catch (_) {}
          // 重置 + 检查通关
          setTimeout(() => {
            game._level11Flipped = [];
            game._level11Locked = false;
            if (game._level11Matched >= 4) level11Win();
          }, 600);
        }, 350);
      } else {
        // 不匹配, 翻回
        setTimeout(() => {
          try { game.audio.wrong(); } catch (_) {}
          a.classList.add('shake');
          b.classList.add('shake');
          setTimeout(() => {
            a.classList.remove('flipped', 'shake');
            b.classList.remove('flipped', 'shake');
            game._level11Flipped = [];
            game._level11Locked = false;
          }, 450);
        }, 750);
      }
    }
  }

  // 9) 卡片事件
  game._level11Cards.forEach((c) => {
    c.el.addEventListener('click', () => onCardClick(c.el));
  });

  // 10) 开场白 + 短预览 (逐张翻面然后翻回)
  game.say('翻开两张牌 — 一样的就配对! 4 对就赢~');
  setTimeout(() => { try { window.dispatchEvent(new Event('resize')); } catch (_) {} }, 60);

  // 视觉: 入场动画
  game._level11Cards.forEach((c, i) => {
    gsap.fromTo(c.el, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.4, delay: i * 0.05, ease: 'back.out(1.7)',
    });
  });

  function level11Win() {
    if (game._level11Timer) { clearInterval(game._level11Timer); game._level11Timer = null; }
    const elapsed = (Date.now() - game._level11Start) / 1000;
    // 用时 + 错次综合算星
    const tried = game._level11Tried;
    // 理论最少 4 次 (每次都对). 错的多, 耗时大概率长
    let stars;
    if (elapsed <= 18 && tried <= 5) stars = 3;
    else if (elapsed <= 30 && tried <= 7) stars = 2;
    else if (elapsed <= 50) stars = 1;
    else stars = 0;

    try { game.progress.markLevelComplete(11, stars); } catch (_) {}
    try { game.audio.playScale(['C4', 'E4', 'G4', 'C5']); } catch (_) {}
    try { game._flashScreen(); } catch (_) {}
    try {
      game._floatScore(window.innerWidth / 2, window.innerHeight * 0.45,
        `🎉 ${elapsed.toFixed(1)}s 完成!`);
    } catch (_) {}
    game.say(`🎉 用时 ${elapsed.toFixed(1)}s, 翻 ${tried} 次, 你真厉害!`);
    setTimeout(() => { try { game.showWinOverlay(stars, 11); } catch (_) {} }, 1300);
  }

  return () => {
    if (game._level11Timer) { clearInterval(game._level11Timer); game._level11Timer = null; }
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.stage) {
      game.stage.querySelectorAll('.level11-stage').forEach((el) => el.remove());
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