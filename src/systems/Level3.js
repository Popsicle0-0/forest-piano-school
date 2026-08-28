/**
 * Level 3: 五声音阶山谷 — 听一听，再放一放
 *
 * 教学顺序（Suzuki + Kodály）：
 *   先点小鱼试听 → 感受高低 → 把已试听的小鱼放到相应高度的山。
 * 鱼与山在匹配前均不显示唱名/音名，也不用颜色泄露答案；答对后才揭晓唱名。
 */
import { Level3Scene } from '../components/Level3Scene.js';
import { FishPool } from '../components/FishPool.js';
import { gsap } from 'gsap';

// 五声音阶：完整、旋律性强，避免把 Fa/Si 的半音倾向过早塞给启蒙关。
const L3_NOTES = [
  { id: 'do',  solfege: 'Do',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 're',  solfege: 'Re',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'mi',  solfege: 'Mi',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'sol', solfege: 'Sol', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'la',  solfege: 'La',  pitch: 'A4', note: 'A', color: '#6a4c93' },
];

const TARGET_IDS = new Set(L3_NOTES.map((note) => note.id));
const TARGET_RADIUS = 125; // 真实 DOM 山热区中心的儿童友好容差

export default function startLevel3(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 3;
  }

  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';
  const btnReplay = document.getElementById('btn-replay');
  if (btnReplay) btnReplay.style.display = '';

  game.scene = new Level3Scene(game.stage);
  // L3 不显示鱼身 Do/C4 标签，答案必须来自点击试听。
  game.fishPool = new FishPool(game.stage, L3_NOTES, { fishDisplay: { showLabel: false } });
  game.fishPool.setDragEnabled(true);
  game.fishPool.intro();

  const state = {
    activeFishId: null,
    auditioned: new Set(),
    placed: new Set(),
    resolving: false,
  };
  game._level3Total = L3_NOTES.length;
  game._level3Count = 0;
  game.say('👂 先点一条小鱼，听听它唱的声音。听完再把它放到高低合适的山上~');

  const noteOf = (id) => L3_NOTES.find((note) => note.id === id);
  const resetToListen = (message) => {
    state.activeFishId = null;
    game.scene.setListening(false);
    game.scene.setHoverTarget(null);
    game.say(message || '再选一条小鱼，先听一听，再帮它找高低合适的山~');
  };

  // 点击是本关必经的第一步：选择并试听。重复点同一条可以重听。
  game.fishPool.onTap = (fish) => {
    const id = fish?.dataset?.id;
    const note = noteOf(id);
    if (!note || state.placed.has(id) || state.resolving) return;
    state.activeFishId = id;
    state.auditioned.add(id);
    game.scene.setListening(true);
    try { game.audio.playNote(note.pitch); } catch (_) {}
    gsap.fromTo(fish, { scale: 1 }, { scale: 1.16, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' });
    game.say('听到了吗？可以再点一次重听。想想它应该住在低一点，还是高一点的山~');
  };

  game.fishPool.onDragStart = (fish) => {
    const id = fish?.dataset?.id;
    if (!id || state.placed.has(id)) return;
    try { game.audio.hover(id); } catch (_) {}
    if (!state.auditioned.has(id)) {
      game.scene.setListening(false);
      game.say('先松开，点这条小鱼听一听，再帮它找山吧~');
      return;
    }
    // 只亮所有山的中性接收态，不显示正确山。
    game.scene.setListening(true);
  };

  // FishPool 传入松手/移动的真实 client 坐标；高亮的是当前靠近的山，不是答案。
  game.fishPool.onDragMove = (fish, _staffSlot, point) => {
    const id = fish?.dataset?.id;
    if (!id || !state.auditioned.has(id) || !point) {
      game.scene.setHoverTarget(null);
      return;
    }
    const closest = game.scene.getClosestTarget(point);
    game.scene.setHoverTarget(closest?.distance < TARGET_RADIUS ? closest.target : null);
  };

  game.fishPool.onDrop = (fish, _staffSlot, _accepted, dropPoint) => {
    const id = fish?.dataset?.id;
    const note = noteOf(id);
    if (!note || state.placed.has(id) || state.resolving) return;
    game.scene.setHoverTarget(null);

    if (!state.auditioned.has(id)) {
      resetToListen('👂 先点这条小鱼听一听，再来找高低合适的山~');
      gsap.to(fish, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.55)' });
      return;
    }

    const closest = game.scene.getClosestTarget(dropPoint);
    const target = closest?.target;
    const targetId = target?.dataset?.note;
    const inRange = Boolean(target && closest.distance < TARGET_RADIUS);

    if (inRange && targetId === id) {
      state.resolving = true;
      state.placed.add(id);
      game._level3Count = state.placed.size;
      game.scene.markPlaced(id);
      game.scene.setProgress(state.placed.size);

      const targetRect = target.getBoundingClientRect();
      const poolRect = game.fishPool.root.getBoundingClientRect();
      const targetX = targetRect.left - poolRect.left + targetRect.width / 2;
      const targetY = targetRect.top - poolRect.top + targetRect.height * 0.58;
      const curLeft = parseFloat(fish.style.left) || 0;
      const curTop = parseFloat(fish.style.top) || 0;
      const dx = targetX - curLeft - fish.offsetWidth / 2;
      const dy = targetY - curTop - fish.offsetHeight / 2;

      try { game.audio.correct(); } catch (_) {}
      gsap.to(fish, {
        x: dx,
        y: dy,
        scale: 0.78,
        duration: 0.52,
        ease: 'back.out(1.7)',
        onComplete: () => {
          try { game.fishPool.lockFish(id); } catch (_) {}
          try { game.audio.playNote(note.pitch); } catch (_) {}
          try { game.scene.bloomAt(targetRect.left + targetRect.width / 2, targetRect.top + targetRect.height / 2, note.color); } catch (_) {}
          try { game._floatScore(targetRect.left + targetRect.width / 2, targetRect.top, `听对啦！${note.solfege}`); } catch (_) {}

          state.resolving = false;
          if (state.placed.size === L3_NOTES.length) {
            game.say('🌟 五个声音都找到山啦！一起唱：Do Re Mi Sol La~');
            setTimeout(() => {
              const stars = game._calcStars();
              try { game.progress.markLevelComplete(3, stars); } catch (_) {}
              try { game.audio.playScale(['C4', 'D4', 'E4', 'G4', 'A4']); } catch (_) {}
              try { game.showWinOverlay(stars, 3); } catch (_) {}
            }, 850);
            return;
          }
          resetToListen(`✅ 听对啦，这是 ${note.solfege}！再选一条小鱼，先听后放~`);
        },
      });
      return;
    }

    game.wrongCount++;
    try { game.audio.wrong(); } catch (_) {}
    fish.classList.add('shake');
    setTimeout(() => fish.classList.remove('shake'), 400);
    // 过程性反馈：重播声音，不说出该去第几座山/什么唱名。
    try { game.audio.playNote(note.pitch); } catch (_) {}
    gsap.to(fish, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
    state.activeFishId = id;
    game.scene.setListening(true);
    game.say('再听一次，慢慢比一比它的高低。它应该住在哪一座山呢？');
  };

  return () => {
    try { game.scene?.teardown(); } catch (_) {}
    game.scene = null;
    const hudLevel2El = document.getElementById('hud-level2');
    if (hudLevel2El) hudLevel2El.style.display = '';
    const dots = document.querySelector('.hud__dots');
    if (dots) dots.style.display = '';
    if (typeof window !== 'undefined') window.__forestPiano.currentLevelId = null;
  };
}
