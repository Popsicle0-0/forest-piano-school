import { Level9Scene } from '../components/Level9Scene.js';
import { gsap } from 'gsap';

const BLACK_KEYS = [
  { id: 'cs', solfege: 'Do#', pitch: 'C#4' },
  { id: 'ds', solfege: 'Re#', pitch: 'D#4' },
  { id: 'fs', solfege: 'Fa#', pitch: 'F#4' },
  { id: 'gs', solfege: 'Sol#', pitch: 'G#4' },
  { id: 'as', solfege: 'La#', pitch: 'A#4' },
];

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

    keyEl.addEventListener('pointerdown', () => {
      keyEl.classList.add('pressed');
      setTimeout(() => keyEl.classList.remove('pressed'), 300);
      // 播放
      game.audio.playNote(k.pitch);

      // 检查顺序
      if (k.id === BLACK_KEYS[game._level9Idx].id) {
        game._level9Idx++;
        game._level9Correct++;
        // 绿色涟漪
        gsap.fromTo(keyEl.querySelector('.level9-key__ripple'),
          { scale: 0, opacity: 1 },
          { scale: 3, opacity: 0, duration: 0.6, ease: 'power2.out' }
        );
        game.say(['对!', '完美!', '真棒!'][Math.min(game._level9Correct - 1, 2)]);

        if (game._level9Idx >= BLACK_KEYS.length) {
          // 通关
          game._level9Done = true;
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
        // 重置进度
        game.say('从左到右! 不对, 重来');
        game._level9Idx = 0;
      }
    });
  });

  game._level9Idx = 0;
  game._level9Correct = 0;
  game._level9Done = false;

  return () => {
    if (game.scene) game.scene.teardown();
    const container = game.stage.querySelectorAll('.level9-keys-container');
    container.forEach(c => c.remove());
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}
