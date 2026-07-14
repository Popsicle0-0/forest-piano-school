/**
 * Level 7: 完整 7 音阶 + 树屋
 *
 * 故事: 爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友.
 *
 * 玩法:
 *  - 7 条鱼 (Do Re Mi Fa Sol La Si) 散布在场景下半
 *  - 树屋周围有 7 级台阶 (Do 最低 → Si 最高, 螺旋上升)
 *  - 拖鱼到对应台阶上 (接近判定, 容差 30px)
 *  - 全部 7 条放对后: 通关, 弹奏 Do→Si 上行 + 通关庆祝 + 树屋点亮
 *
 * Fa 和 Si 是五声音阶之外的"新朋友", 让孩子接触完整七声音阶.
 *
 * 增强 (polish):
 *  - 鱼飞向台阶时, Scene 画一条彩色飘带 (drawRibbon)
 *  - Si (最高一级) 答对时, 鱼额外做一次 lift-up 倾斜动画 (向上游)
 *  - 7/7 通关: Scene.lightTreehouse() 把整个树屋点亮 (圆窗发光 + 树冠变金)
 *  - 高音 (Si/La/Sol) 台阶答对时, 给台阶一个"高飞" 的发光环
 */
import { Level7Scene } from '../components/Level7Scene.js';
import { FishPool } from '../components/FishPool.js';
import { gsap } from 'gsap';

// 7 音元数据 (跟 Game.js / Level3.js 完全一致)
const NOTES_7 = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

// 拖拽容差半径 (px) — 7 级台阶紧凑环绕树身, 30 已够
const STEP_CIRCLE_R = 36;

// 通关用的 7 音上下行
const SCALE_UP   = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
const SCALE_DOWN = ['B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];

// 高音台阶 — 答对时加 lift-up / 发光环
const HIGH_STEPS = new Set(['sol', 'la', 'si']);

const ENCOURAGE = ['完美!', '真棒!', '不错哟!', '完整 7 音在聚集!'];

export default function startLevel7(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 7;
  }

  // HUD: 显示普通进度点, 隐藏 Level 2 进度徽章
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 1) 渲染树屋场景
  game.scene = new Level7Scene(game.stage);

  // 2) 开场白
  game.say('爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友~ 拖鱼到对应台阶 (Do 最低 → Si 最高)');

  // 3) 渲染鱼池 (全部 7 条)
  game.fishPool = new FishPool(game.stage, NOTES_7);
  game.fishPool.setDragEnabled(true);
  game.fishPool.intro();

  // 4) 状态
  const STEPS = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
  game._level7Placed = new Set();
  game._level7Count = 0;

  // 5) 鱼点选 (听音)
  game.fishPool.onTap = (fish) => {
    if (!fish) return;
    try { game.audio.playNote(fish.dataset.pitch); } catch (_) {}
    try { game.audio.hover(fish.dataset.id); } catch (_) {}
    gsap.fromTo(fish, { scale: 1 }, { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
  };

  game.fishPool.onDragStart = (fish) => {
    try { game.audio.hover(fish.dataset.id); } catch (_) {}
  };

  game.fishPool.onDragMove = () => {};

  // 6) 拖拽释放 — 接近判定
  game.fishPool.onDrop = (fish, _slotEl, _accepted) => {
    const id = fish.dataset.id;
    if (game._level7Placed.has(id)) return;     // 已放对, 不再触发

    // 鱼中心点
    const fr = fish.getBoundingClientRect();
    const fx = fr.left + fr.width / 2;
    const fy = fr.top + fr.height / 2;

    // 找最近的台阶
    let best = null, bestDist = Infinity;
    if (game.scene && game.scene.background) {
      for (const stepNote of STEPS) {
        const stepEl = game.scene.background.querySelector(`.level7-step[data-note="${stepNote}"]`);
        if (!stepEl) continue;
        const r = stepEl.getBoundingClientRect();
        const sx = r.left + r.width / 2;
        const sy = r.top + r.height / 2;
        const d = Math.hypot(sx - fx, sy - fy);
        if (d < bestDist) { bestDist = d; best = stepNote; }
      }
    }

    const inRange = best && bestDist < STEP_CIRCLE_R;
    const fishNote = NOTES_7.find((n) => n.id === id);

    if (inRange && id === best) {
      // 答对 — 鱼飞向台阶
      game._level7Placed.add(id);
      game._level7Count = game._level7Placed.size;
      try { game.audio.correct(); } catch (_) {}

      const targetEl = game.scene.background.querySelector(`.level7-step[data-note="${best}"]`);
      const tr = targetEl.getBoundingClientRect();
      const tx = tr.left + tr.width / 2;
      const ty = tr.top + tr.height / 2;

      // 鱼飞过去 (相对位置)
      const curLeft = parseFloat(fish.style.left) || 0;
      const curTop = parseFloat(fish.style.top) || 0;
      const dx = tx - fr.left - curLeft;
      const dy = ty - fr.top - curTop;

      // 飘带颜色 — 鱼的颜色
      const ribbonColor = (fishNote && fishNote.color) || '#ffd166';

      // 画飘带 (鱼当前位置 → 台阶)
      try {
        game.scene.drawRibbon(best, { x: fx, y: fy }, { x: tx, y: ty }, ribbonColor);
      } catch (_) {}

      gsap.to(fish, {
        x: dx,
        y: dy,
        scale: 0.85,
        duration: 0.55,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // 锁定这条鱼
          try { game.fishPool.lockFish(id); } catch (_) {}
          // 节点变绿闪烁
          try {
            gsap.fromTo(
              targetEl,
              { scale: 1 },
              { scale: 1.25, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }
            );
          } catch (_) {}
          // 弹一次该音
          if (fishNote) {
            try { game.audio.playNote(fishNote.pitch); } catch (_) {}
            try { game._floatScore(fx, fy, `${fishNote.solfege} ✓`); } catch (_) {}
          }
          // 鱼摇摆庆祝
          gsap.to(fish, {
            rotation: '+=8',
            transformOrigin: '50% 50%',
            duration: 0.12,
            yoyo: true,
            repeat: 5,
            ease: 'sine.inOut',
            onComplete: () => gsap.to(fish, { rotation: 0, duration: 0.2, ease: 'power2.out' })
          });
          // 鱼原地弹一下
          gsap.fromTo(fish, { scale: 0.85 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });

          // 高音台阶 (Sol/La/Si) — 额外做一次 lift-up 倾斜动画 (向上游)
          if (HIGH_STEPS.has(best)) {
            try {
              const fishEl = fish;
              fishEl.classList.add('level7-fish-lift');
              // 0.8s 后自动去掉 class (动画结束)
              setTimeout(() => {
                try { fishEl.classList.remove('level7-fish-lift'); } catch (_) {}
              }, 900);
            } catch (_) {}
            // 台阶加发光环 class
            try { targetEl.classList.add('level7-step-glow'); } catch (_) {}
          }

          // 推进引导
          const msg = (ENCOURAGE[Math.min(game._level7Count - 1, ENCOURAGE.length - 1)]
                       + ' ' + game._level7Count + ' / 7');
          game.say(msg);

          // 通关判定
          if (game._level7Count === 7) {
            setTimeout(() => level7Win(), 800);
          }
        },
      });
    } else {
      // 错 — 鱼摇头 + 弹性回弹
      game.wrongCount++;
      try { game.audio.wrong(); } catch (_) {}
      fish.classList.add('shake');
      setTimeout(() => fish.classList.remove('shake'), 400);

      if (inRange && best && id !== best) {
        // 拖到了台阶但鱼不对
        const correct = NOTES_7.find((n) => n.id === best);
        const notePos = (best === 'fa')
          ? 'Fa 在 Mi 和 Sol 之间 (第 4 级台阶)'
          : (best === 'si')
            ? 'Si 在 La 之上, 最高一级台阶 (最接近树屋)'
            : `${correct ? correct.solfege : '这个台阶'}`;
        game.say(`${fishNote ? fishNote.solfege : '这条鱼'} 不是 ${notePos} 的鱼哦~`);
      } else {
        // 拖到空白
        if (id === 'fa') {
          game.say('Fa 是新朋友! 它在 Mi 和 Sol 之间的台阶~');
        } else if (id === 'si') {
          game.say('Si 是新朋友! 它在 La 之上, 最高的台阶, 最接近树屋~');
        } else {
          game.say(`${fishNote ? fishNote.solfege : '这条鱼'} 的家在树上, 找最近的圆圈~`);
        }
      }

      gsap.to(fish, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
    }
  };

  // 7) 通关: 弹奏 7 音上下行 + 树屋点亮
  function level7Win() {
    const stars = game._calcStars();
    try { game.progress.markLevelComplete(7, stars); } catch (_) {}
    // 树屋点亮 (圆窗 + 树冠金光 + 7 级台阶全部发光)
    try { game.scene.lightTreehouse(); } catch (_) {}
    // 上行
    try { game.audio.playScale(SCALE_UP); } catch (_) {}
    game.say('完整的 Do Re Mi Fa Sol La Si 上行! 太棒了~');
    // 下行 (延迟 7 * 220 = 1540ms 后)
    setTimeout(() => {
      try { game.audio.playScale(SCALE_DOWN); } catch (_) {}
      game.say('再来下行: Si La Sol Fa Mi Re Do');
    }, SCALE_UP.length * 220 + 300);
    setTimeout(() => {
      try { game.showWinOverlay(stars, 7); } catch (_) {}
    }, SCALE_UP.length * 220 * 2 + 1200);
  }

  // 返回 teardown
  return () => {
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    if (game.fishPool) {
      try { game.fishPool.pool.innerHTML = ''; } catch (_) {}
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