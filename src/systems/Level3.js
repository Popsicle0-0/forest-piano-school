/**
 * Level 3: 五声音阶山谷
 *
 * 7 条鱼散布在场景下半 (Do, Re, Mi, Fa, Sol, La, Si), 但只有 3 条
 * 是 Do Mi Sol — 玩家找出这 3 条并拖到对应高度的山谷台阶.
 * 通关条件: 3 个山上都放了正确的鱼.
 *
 * 增强 (v17.x polish):
 *  - Distractor (Re/Fa/La/Si) 拖到山 → 3 座山整体抖动 + 鱼被更狠弹回 + 强提示
 *  - 答对时, 在山脚触发金色粒子绽放 (DOM sparkle 圈)
 *  - 进度推进时, 场景切换 .level3-progress-N 触发日落渐变 (亮黄 → 暖橙 → 紫橙 → 星空)
 */
import { Level3Scene } from '../components/Level3Scene.js';
import { FishPool } from '../components/FishPool.js';
import { gsap } from 'gsap';

// 7 条鱼 (Do Re Mi Fa Sol La Si) — 全用真实 C 大调元数据
const NOTES_ALL = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'fa',  solfege: 'Fa',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'si',  solfege: 'Si',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

// 3 座山谷平台对应的音
const TARGET_NOTES = new Set(['do', 'mi', 'sol']);

// 3 座山的 SVG 坐标 (作为 fallback — 实际用 getBoundingClientRect)
const PLATFORM_HINTS = {
  do:  { x: 180, y: 290 },  // 山 1 (低) - Do 位置
  mi:  { x: 400, y: 200 },  // 山 2 (中) - Mi 位置
  sol: { x: 620, y: 100 },  // 山 3 (高) - Sol 位置
};

// 拖拽容差 (px) — 山间距较大, 100 足够
const SNAP_RADIUS = 130;

const ENCOURAGE = ['真棒!', '太厉害了~', '不错哟!'];

export default function startLevel3(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 3;
  }

  // 不显示 Level 2 HUD, 显示普通 HUD 进度点
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  // 渲染山谷场景 (SVG 背景 + 3 座音阶台 + 日落遮罩 + 粒子层)
  game.scene = new Level3Scene(game.stage);
  // Game.js _startLevel1 也设了 game.bg (Background 实例). 避免冲突, Level3 不创建 bg.

  // 鱼池: 全部 7 鱼, 但只有 Do Mi Sol 正确
  game.fishPool = new FishPool(game.stage, NOTES_ALL);
  game.fishPool.setDragEnabled(true);
  game.fishPool.intro();

  // 引导气泡
  game.say('柯尔文爷爷想听 Do Mi Sol 三部合唱! 把红 Do、黄 Mi、蓝 Sol 放到对应的山上~');

  // 进度状态
  const placed = new Set();          // 已放对的音 id
  game._level3Total = 3;
  game._level3Count = 0;

  // 点鱼听声 (单击反馈)
  game.fishPool.onTap = (fish) => {
    try { game.audio.playNote(fish.dataset.pitch); } catch (_) {}
    try { game.audio.hover(fish.dataset.id); } catch (_) {}
    gsap.fromTo(fish, { scale: 1 }, { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
  };

  // 拖拽起点 (锁定已有鱼不动 + 提示音)
  game.fishPool.onDragStart = (fish) => {
    try { game.audio.hover(fish.dataset.id); } catch (_) {}
  };

  // 拖拽中 — 显示最近山的提示
  game.fishPool.onDragMove = (_fish, _slot) => {
    // 暂不实现 hover hint (避免与 Level 1 staff slot 冲突)
  };

  // 拖拽释放 — 判定
  game.fishPool.onDrop = (fish, _slotEl, _accepted) => {
    const id = fish.dataset.id;
    if (placed.has(id)) return;          // 已放对的鱼不应再触发

    // 找最近的 3 座山之一
    let best = null, bestDist = Infinity;
    const fishCenter = fish.getBoundingClientRect();
    const fx = fishCenter.left + fishCenter.width / 2;
    const fy = fishCenter.top + fishCenter.height / 2;

    if (game.scene && game.scene.background) {
      for (const noteId of TARGET_NOTES) {
        const sceneEl = game.scene.background.querySelector(`[data-note="${noteId}"]`);
        if (!sceneEl) continue;
        const r = sceneEl.getBoundingClientRect();
        const px = r.left + r.width / 2;
        const py = r.top + r.height / 2;
        const d = Math.hypot(px - fx, py - fy);
        if (d < bestDist) { bestDist = d; best = noteId; }
      }
    }

    const fishNote = NOTES_ALL.find((n) => n.id === id);
    const inRange = best && bestDist < SNAP_RADIUS;

    if (inRange && id === best) {
      // 答对 — 鱼飞上山
      placed.add(best);
      game._level3Count = placed.size;
      try { game.audio.correct(); } catch (_) {}

      // 推进日落渐变 (progress-0 → progress-N)
      try { game.scene.setProgress(placed.size); } catch (_) {}

      const targetEl = game.scene.background.querySelector(`[data-note="${best}"]`);
      const targetRect = targetEl.getBoundingClientRect();
      const poolRect = game.fishPool.root.getBoundingClientRect();
      const targetX = targetRect.left - poolRect.left + targetRect.width / 2;
      const targetY = targetRect.top - poolRect.top + targetRect.height / 2;

      const curLeft = parseFloat(fish.style.left) || 0;
      const curTop = parseFloat(fish.style.top) || 0;
      const dx = targetX - curLeft - fish.offsetWidth / 2;
      const dy = targetY - curTop - fish.offsetHeight / 2;

      // 粒子绽放颜色 — 用该鱼的色
      const bloomColor = (fishNote && fishNote.color) || '#ffd166';

      gsap.to(fish, {
        x: dx,
        y: dy,
        scale: 0.85,
        duration: 0.55,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // 锁定这条鱼
          try { game.fishPool.lockFish(id); } catch (_) {}
          // 弹一次该音 + 反馈音
          try { game.audio.playNote(fishNote.pitch); } catch (_) {}
          try { game._floatScore(fx, fy, `${fishNote.solfege} ✓`); } catch (_) {}
          // 在山脚触发金色粒子绽放 (DOM sparkle 圈)
          try {
            const tr = targetEl.getBoundingClientRect();
            game.scene.bloomAt(tr.left + tr.width / 2, tr.bottom, bloomColor);
          } catch (_) {}
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

          // 推进引导
          const msg = ENCOURAGE[placed.size - 1] + ' ' + placed.size + ' / 3';
          game.say(msg);

          // 通关判定
          if (placed.size === 3) {
            setTimeout(() => {
              const stars = game._calcStars();
              try { game.progress.markLevelComplete(3, stars); } catch (_) {}
              try { game.audio.playScale(['C4', 'E4', 'G4']); } catch (_) {}
              try { game.showWinOverlay(stars, 3); } catch (_) {}
            }, 700);
          }
        },
      });
    } else {
      // 错 — 鱼摇头 + 弹性回弹
      game.wrongCount++;
      try { game.audio.wrong(); } catch (_) {}
      fish.classList.add('shake');
      setTimeout(() => fish.classList.remove('shake'), 400);

      const isDistractor = !TARGET_NOTES.has(id);
      if (isDistractor) {
        // Re / Fa / La / Si — 不是 Do Mi Sol 之一
        // 强反馈: 3 座山一起抖动 + 把鱼"更狠"弹回去 (用强 elastic)
        try { game.scene.shakePlatforms(); } catch (_) {}
        game.say(`${fishNote.solfege} 不在 Do Mi Sol 里哦! 找红色 Do、黄色 Mi、蓝色 Sol 三座山~`);
        // 加大反向距离: 让鱼弹得更远, 视觉上"被甩回去"
        gsap.to(fish, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'elastic.out(1.2, 0.4)',
        });
        // 同时给鱼一个轻微旋转加重"被甩"感
        gsap.fromTo(fish, { rotation: '+=15' }, { rotation: 0, duration: 0.4, ease: 'power2.out' });
      } else if (inRange) {
        // 正确的鱼, 但拖到了别的山
        const correct = NOTES_ALL.find((n) => n.id === best);
        game.say(`${fishNote.solfege} 应该去另一座山, 不是 ${correct ? correct.solfege : '那座'} 的位置~`);
        gsap.to(fish, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
      } else {
        // 拖到空白
        game.say(`${fishNote.solfege} 应该去山上相应的高度哦~`);
        gsap.to(fish, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
      }
    }
  };

  // 返回 teardown
  return () => {
    // 拆场景
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }
    // 拆鱼池 (清空 DOM 即可 — 下一关 start() 会重建 stage)
    if (game.fishPool) {
      try { game.fishPool.pool.innerHTML = ''; } catch (_) {}
    }
    // 复位 HUD (回到 Level 2 / Level 1 默认)
    const hudLevel2 = document.getElementById('hud-level2');
    if (hudLevel2) hudLevel2.style.display = '';
    const hudDots = document.querySelector('.hud__dots');
    if (hudDots) hudDots.style.display = '';
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) btnReplay.style.display = '';
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
  };
}