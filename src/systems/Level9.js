import { Level9Scene } from '../components/Level9Scene.js';
import { gsap } from 'gsap';

const BLACK_KEYS = [
  { id: 'cs', solfege: 'Do#', pitch: 'C#4' },
  { id: 'ds', solfege: 'Re#', pitch: 'D#4' },
  { id: 'fs', solfege: 'Fa#', pitch: 'F#4' },
  { id: 'gs', solfege: 'Sol#', pitch: 'G#4' },
  { id: 'as', solfege: 'La#', pitch: 'A#4' },
];

// 120 BPM 心跳: 半周期 0.25s
const BEAT_HALF = 60 / 120 / 2;  // 0.25s

// 在指定元素 (容器) 内, 触发生成一圈从触点向外扩散的圆环
function emitTouchRipple(container, x, y, color = 'rgba(155, 93, 229, 0.7)') {
  const r = document.createElement('span');
  r.className = 'level9-touch-ripple';
  r.style.left = `${x}px`;
  r.style.top = `${y}px`;
  r.style.borderColor = color;
  container.appendChild(r);
  // 强制重排后加 .go, 触发过渡
  // eslint-disable-next-line no-unused-expressions
  r.offsetWidth;
  r.classList.add('go');
  setTimeout(() => r.remove(), 750);
}

// 在游戏舞台内显示一个上飘的连击数字 (例如 "x3 🔥")
function spawnComboFloat(stage, text) {
  const el = document.createElement('div');
  el.className = 'level9-combo-float';
  el.textContent = text;
  // 随机水平偏移, 避免堆在一起
  const offset = (Math.random() - 0.5) * 120;
  el.style.left = `calc(50% + ${offset}px)`;
  el.style.top = '38%';
  stage.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

// 5 连击以上: 播一个高亢奖励音
function playComboBonus(audio) {
  try {
    const ctx = audio._webAudio;
    if (!ctx || !audio.unlocked) return;
    const t = ctx.currentTime;
    // 大三和弦上行闪铃 C6 -> E6 -> G6
    const freqs = [1046.5, 1318.51, 1567.98];
    freqs.forEach((f, i) => {
      const t0 = t + i * 0.05;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t0);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.45, t0 + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.25);
      osc.connect(g).connect(audio._masterGain);
      osc.start(t0);
      osc.stop(t0 + 0.3);
    });
  } catch (_) {}
}

export default function startLevel9(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 9;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';

  game.scene = new Level9Scene(game.stage);
  game.say('黑键朋友们也想被听见! 按从左到右的顺序听');

  // 渲染 5 个黑键 (横向)
  game.stage.insertAdjacentHTML('beforeend', `<div class="level9-keys-container"></div>`);
  const container = game.stage.querySelector('.level9-keys-container');

  // 连击显示器 (放在 keys 容器上方)
  const comboEl = document.createElement('div');
  comboEl.className = 'level9-combo-meter';
  comboEl.innerHTML = `<span class="level9-combo-meter__num">0</span><span class="level9-combo-meter__x">x</span><span class="level9-combo-meter__label">连击</span>`;
  comboEl.style.display = 'none';
  container.appendChild(comboEl);
  const comboNumEl = comboEl.querySelector('.level9-combo-meter__num');

  BLACK_KEYS.forEach((k, i) => {
    const keyEl = document.createElement('button');
    keyEl.className = 'level9-key';
    keyEl.dataset.id = k.id;
    keyEl.dataset.pitch = k.pitch;
    keyEl.innerHTML = `
      <div class="level9-key__label">${k.solfege}</div>
      <div class="level9-key__ripple"></div>
    `;
    container.appendChild(keyEl);

    keyEl.addEventListener('pointerdown', (ev) => {
      // 触摸位置 = 在 key 内的相对坐标
      const rect = keyEl.getBoundingClientRect();
      const localX = ev.clientX - rect.left;
      const localY = ev.clientY - rect.top;
      keyEl.classList.add('pressed');
      setTimeout(() => keyEl.classList.remove('pressed'), 300);
      // 播放
      game.audio.playNote(k.pitch);

      // 检查顺序
      if (k.id === BLACK_KEYS[game._level9Idx].id) {
        game._level9Idx++;
        game._level9Correct++;
        // 绿色涟漪 (在 key 内的内建圆)
        gsap.fromTo(keyEl.querySelector('.level9-key__ripple'),
          { scale: 0, opacity: 1 },
          { scale: 3, opacity: 0, duration: 0.6, ease: 'power2.out' }
        );
        // 触摸点扩散圆环 (在 key 内, 显示触觉反馈)
        emitTouchRipple(keyEl, localX, localY, 'rgba(155, 93, 229, 0.85)');

        // 连击: 顺序连续正确累积
        game._level9Combo = (game._level9Combo || 0) + 1;
        if (game._level9Combo >= 2) {
          comboEl.style.display = '';
          comboNumEl.textContent = String(game._level9Combo);
          comboEl.classList.remove('bump');
          // 强制重排后加 bump 触发动画
          // eslint-disable-next-line no-unused-expressions
          void comboEl.offsetWidth;
          comboEl.classList.add('bump');
          // 飘字 "x2" / "x3"...
          spawnComboFloat(game.stage, `x${game._level9Combo}${game._level9Combo >= 5 ? ' 🔥' : ''}`);
          // 5 连击以上奖励音
          if (game._level9Combo >= 5 && game._level9Combo % 5 === 0) {
            playComboBonus(game.audio);
          }
        }

        game.say(['对!', '完美!', '真棒!'][Math.min(game._level9Correct - 1, 2)]);

        if (game._level9Idx >= BLACK_KEYS.length) {
          // 通关
          game._level9Done = true;
          // 通关时把连击器最后闪一下
          if (game._level9Combo >= 2) {
            spawnComboFloat(game.stage, `🎉 x${game._level9Combo} 全连!`);
          }
          setTimeout(() => {
            const stars = Math.max(1, 3 - Math.floor(game.wrongCount / 2));
            try { game.progress.markLevelComplete(9, stars); } catch (_) {}
            game.audio.playScale(['C#4', 'D#4', 'F#4', 'G#4', 'A#4']);
            game.showWinOverlay(stars, 9);
          }, 800);
        }
      } else {
        // 错 — 顺序不对
        game.wrongCount++;
        game.audio.wrong();
        keyEl.classList.add('shake');
        setTimeout(() => keyEl.classList.remove('shake'), 400);
        // 红色涟漪
        gsap.fromTo(keyEl.querySelector('.level9-key__ripple'),
          { scale: 0, opacity: 1, backgroundColor: '#ff5252' },
          { scale: 2.5, opacity: 0, duration: 0.5, ease: 'power2.out' }
        );
        // 触摸点红色扩散环
        emitTouchRipple(keyEl, localX, localY, 'rgba(255, 82, 82, 0.9)');
        // 连击断
        if (game._level9Combo && game._level9Combo >= 2) {
          spawnComboFloat(game.stage, '断啦 💔');
        }
        game._level9Combo = 0;
        comboEl.style.display = 'none';
        comboEl.classList.remove('bump');
        // 重置进度
        game.say('从左到右! 不对, 重来');
        game._level9Idx = 0;
      }
    });
  });

  game._level9Idx = 0;
  game._level9Correct = 0;
  game._level9Done = false;
  game._level9Combo = 0;

  // === 背景心跳脉冲 (120 BPM) ===
  // 不论用户输入, 整个 level 期间背景的紫色光晕都在呼吸
  const bgEl = game.stage.querySelector('.level9-background');
  if (bgEl) {
    bgEl.classList.add('beat-pulse');
  }

  // 清理函数
  const teardown = () => {
    if (bgEl) bgEl.classList.remove('beat-pulse');
    comboEl.classList.remove('bump');
    comboEl.style.display = 'none';
  };

  return () => {
    teardown();
    if (game.scene) game.scene.teardown();
    const containers = game.stage.querySelectorAll('.level9-keys-container');
    containers.forEach(c => c.remove());
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}