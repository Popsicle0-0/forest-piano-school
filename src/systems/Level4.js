/**
 * Level 4: 节奏小河 + 鼓
 *
 * 系统预定义一段节奏 (ta + ti-ti 混合), 节奏泡泡从左向右流过屏幕,
 * 孩子跟随节拍在泡泡到达大鼓位置时敲击屏幕中央的大鼓.
 *
 * 通关: 所有拍子处理完 (敲对或漏敲) 后显示星级.
 *
 * 反馈设计 (v15 polish):
 *  - 泡泡到达鼓位: 大型红环脉动 + 鼓面色变金 + 鼓手鼓槌抬起 + 预响 audio.hover()
 *  - 敲对: 鼓剧烈下沉 + 3 道外扩 ripples + 粒子迸溅 + 鼓手上挥 + "+1" 浮动
 *  - 漏敲 / 错敲: 鼓震动 + 红色 "-1" 浮动闪现
 *
 * 音频:
 *  - 预响 (泡泡到鼓位): game.audio.hover() — 轻盈气泡提示
 *  - 敲对: game.audio.playNote('C4') (鼓声)
 *  - 敲错 / 漏拍: game.audio.wrong()
 *
 * 关卡不参与 hud-dots (拖鱼进度点), 隐藏 level2-badges, 只显示通用重玩按钮.
 */
import { Level4Scene } from '../components/Level4Scene.js';

// 节奏模式: 每个子数组是 4-5 拍短语, 用 'T' (ta=1 拍) 和 'tt' (ti-ti=2 拍) 混合.
const RHYTHM_PATTERNS = [
  // 关卡 1: 简单 4 拍
  ['T', 'T', 'tt', 'T'],
  // 关卡 2: 中等 6 拍
  ['tt', 'T', 'T', 'tt', 'T', 'T'],
  // 关卡 3: 复杂 10 拍
  ['T', 'tt', 'T', 'tt', 'tt', 'T', 'T', 'T', 'tt', 'T'],
];

// 每拍时长 (ms): 慢节奏便于孩子跟随
const BEAT_MS = 600;

// 一个泡泡流过屏幕的总时长 (横向动画)
const BUBBLE_FLOW_MS = 3800;

// 泡泡流过的 Y 坐标 (屏幕 30% 高, 在鼓上方)
const BUBBLE_Y_PCT = 0.30;

// 鼓所在 X 百分比 (屏幕中央)
const DRUM_X_PCT = 0.50;

// 敲击时间窗 (ms): 泡泡到达时刻 ±250ms 内敲击算正确
const HIT_WINDOW_MS = 260;

// 大型 cue 脉动持续时间 (ms) — 与敲击时间窗对齐
const CUE_PULSE_MS = 320;

// 通关计算: 错 0/1=3⭐, 2-3=2⭐, 4-5=1⭐, 6+=0⭐
function calcStars(wrongCount, totalBeats) {
  // 漏敲也算错 (handled by 上面 wrongCount +=)
  if (wrongCount <= 1) return 3;
  if (wrongCount <= 3) return 2;
  if (wrongCount <= 5) return 1;
  return 0;
}

export default function startLevel4(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 4;
  }

  // 关卡 4 与关卡 2 类似: 不需要 hud-dots 拖鱼进度, 不需要 level2-badge
  const hudLevel2 = document.getElementById('hud-level2');
  if (hudLevel2) hudLevel2.style.display = 'none';
  const hudDots = document.querySelector('.hud__dots');
  if (hudDots) hudDots.style.display = '';

  // 清空 wrongCount (Game.start 已重置, 但保险起见)
  game.wrongCount = 0;

  // 1) 创建场景
  game.scene = new Level4Scene(game.stage);

  // 2) 开场说明
  game.say('节奏泡泡流过来咯! 跟着节拍敲鼓! 大泡泡 = ta (1 拍), 双连泡泡 = ti-ti (2 拍连敲)');

  // 3) 把所有节奏模式铺平为单拍序列 (T → 1 entry; tt → 2 entries)
  const allBeats = [];
  RHYTHM_PATTERNS.forEach((phrase) => {
    phrase.forEach((p) => {
      if (p === 'tt') {
        allBeats.push({ double: true, isSecond: false });
        allBeats.push({ double: true, isSecond: true });
      } else {  // 'T'
        allBeats.push({ double: false });
      }
    });
  });

  const total = allBeats.length;
  const drumX = window.innerWidth * DRUM_X_PCT;
  const yPos = window.innerHeight * BUBBLE_Y_PCT;
  const startX = -50;
  const endX = window.innerWidth + 100;
  const drumOffset = (drumX - startX) / (endX - startX);

  // 关卡状态
  game._level4Total = total;
  game._level4Processed = 0;
  game._level4Pending = [];
  game._level4Done = false;
  game._level4Correct = 0;
  game._level4Timeouts = [];  // 收集所有 setTimeout 以便 teardown 时清理
  game._level4CueTimers = []; // 收集 cue 脉动 setTimeout 以便 teardown 时清理

  // 4) 泡泡容器
  game.stage.insertAdjacentHTML('beforeend', '<div class="level4-bubbles-container"></div>');
  const bubblesContainer = game.stage.querySelector('.level4-bubbles-container');

  // ============================================================
  // FX 辅助函数 (在 FX 层里 spawn DOM 元素)
  // ============================================================
  const fxLayer = game.scene.getFxLayer();
  const drumAnchor = game.scene.getDrumAnchor();
  const cueLarge = game.scene.getCueLarge();

  // 在 drum 中心 spawn 3 道扩散 ripples
  function spawnRipples() {
    if (!fxLayer) return;
    const c = game.scene.getDrumScreenCenter();
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = 'level4-drum-ripple level4-drum-ripple--' + (i + 1);
      ring.style.left = c.x + 'px';
      ring.style.top = c.y + 'px';
      fxLayer.appendChild(ring);
      setTimeout(() => ring.remove(), 900);
    }
  }

  // 从 drum 中心迸溅彩色粒子 (drops)
  function spawnParticles() {
    if (!fxLayer) return;
    const c = game.scene.getDrumScreenCenter();
    const palette = ['#ffd166', '#ef476f', '#06d6a0', '#118ab2', '#ff9f1c'];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'level4-drum-particle';
      const color = palette[Math.floor(Math.random() * palette.length)];
      p.style.background = color;
      p.style.boxShadow = '0 0 6px ' + color;
      const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const dist = 70 + Math.random() * 50;
      const dx = Math.cos(ang) * dist;
      const dy = Math.sin(ang) * dist - 30; // 略向上偏移 (像鼓敲的反弹)
      p.style.setProperty('--dx', dx.toFixed(1) + 'px');
      p.style.setProperty('--dy', dy.toFixed(1) + 'px');
      p.style.left = c.x + 'px';
      p.style.top = c.y + 'px';
      const size = 6 + Math.random() * 6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      fxLayer.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  // 在 drum 上方 spawn "+1" 浮动分数 (绿色)
  function spawnPlusOne() {
    if (!fxLayer) return;
    const c = game.scene.getDrumScreenCenter();
    const t = document.createElement('div');
    t.className = 'level4-floating-score level4-floating-score--plus';
    t.textContent = '+1';
    t.style.left = c.x + 'px';
    t.style.top = (c.y - 50) + 'px';
    fxLayer.appendChild(t);
    setTimeout(() => t.remove(), 850);
  }

  // 在 drum 上方 spawn "-1" 红色浮动
  function spawnMinusOne() {
    if (!fxLayer) return;
    const c = game.scene.getDrumScreenCenter();
    const t = document.createElement('div');
    t.className = 'level4-floating-score level4-floating-score--minus';
    t.textContent = '-1';
    t.style.left = c.x + 'px';
    t.style.top = (c.y - 50) + 'px';
    fxLayer.appendChild(t);
    setTimeout(() => t.remove(), 850);
  }

  // 触发 "现在该敲了" 大型 cue (大红环 + 鼓面色变金 + 鼓手鼓槌抬起 + 预响)
  function fireCueNow() {
    if (game._level4Done) return;
    // 大型红环 + 目标环 + 鼓面色变金 (by class, auto-removed after pulse)
    if (drumAnchor) drumAnchor.classList.add('level4-cue-now');
    if (cueLarge) cueLarge.classList.add('level4-cue-active');
    // 预响: 轻盈气泡, 提醒孩子准备敲
    try { game.audio.hover(); } catch (_) {}
    // 自动清除
    const id = setTimeout(() => {
      if (drumAnchor) drumAnchor.classList.remove('level4-cue-now');
      if (cueLarge) cueLarge.classList.remove('level4-cue-active');
    }, CUE_PULSE_MS);
    game._level4CueTimers.push(id);
  }

  // 5) 调度 spawn 每个拍子的泡泡
  let t = 0;
  allBeats.forEach((beat, i) => {
    const dur = beat.double ? BEAT_MS / 2 : BEAT_MS;
    // t = 距起始的累计时间 (ms)
    const startDelay = t + 800;  // 800ms 启动缓冲
    game._level4Timeouts.push(setTimeout(() => spawnBubble(beat, i), startDelay));
    t += dur;
  });

  function spawnBubble(beat, absoluteIdx) {
    if (!bubblesContainer || game._level4Done) return;

    const bubble = document.createElement('div');
    bubble.className = 'level4-bubble';
    if (beat.double && beat.isSecond) bubble.classList.add('level4-bubble-half');
    if (beat.double) bubble.classList.add('level4-bubble--double');
    bubble.dataset.idx = String(absoluteIdx);

    // 泡泡内容符号
    if (beat.double) {
      bubble.textContent = beat.isSecond ? '·' : '•';
    } else {
      bubble.textContent = '●';
    }

    bubblesContainer.appendChild(bubble);

    // Web Animation API: 沿水平 x 方向匀速流过
    try {
      const anim = bubble.animate(
        [
          { transform: `translate(${startX}px, ${yPos}px)` },
          { transform: `translate(${drumX}px, ${yPos}px)`, offset: drumOffset },
          { transform: `translate(${endX}px, ${yPos}px)` },
        ],
        { duration: BUBBLE_FLOW_MS, fill: 'forwards', easing: 'linear' }
      );
      // 避免动画结束时移除 (我们手动在 setTimeout 末尾 remove, 便于统计)
      if (anim && typeof anim.cancel === 'function') {
        // 不取消; 让动画跑完
      }
    } catch (e) {
      // fallback: 用 top/left 直接定位
      bubble.style.left = startX + 'px';
      bubble.style.top = yPos + 'px';
    }

    // 节拍到达鼓位置的时刻 — 触发 "现在该敲了" cue
    const arriveMs = BUBBLE_FLOW_MS * drumOffset;
    game._level4Timeouts.push(setTimeout(() => {
      if (game._level4Done) return;
      fireCueNow();
      game._level4Pending.push({ beat, absoluteIdx, when: Date.now() });
    }, arriveMs));

    // 泡泡完全离开后: 检查是否漏敲
    game._level4Timeouts.push(setTimeout(() => {
      if (game._level4Done) return;
      bubble.remove();
      game._level4Processed++;

      const remainingIdx = game._level4Pending.findIndex((p) => p.absoluteIdx === absoluteIdx);
      if (remainingIdx >= 0) {
        // 漏敲: pending 还在 = 没敲
        game._level4Pending.splice(remainingIdx, 1);
        game.wrongCount++;
        game.audio.wrong();
        spawnMinusOne();
        // 漏敲时也清除 cue 状态
        if (drumAnchor) drumAnchor.classList.remove('level4-cue-now');
        if (cueLarge) cueLarge.classList.remove('level4-cue-active');
        game.say('咦, 漏了一拍! 跟着泡泡到鼓位再敲');
      }

      // 通关?
      if (game._level4Processed === total && !game._level4Done) {
        game._level4Done = true;
        game._level4Timeouts.push(setTimeout(() => {
          const stars = calcStars(game.wrongCount, total);
          try { game.progress.markLevelComplete(4, stars); } catch (_) {}
          game.audio.playScale(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']);
          game.showWinOverlay(stars, 4);
        }, 600));
      }
    }, BUBBLE_FLOW_MS));
  }

  // 6) 大鼓点击 = 敲击
  const drum = game.scene.getDrum();
  if (drum) {
    drum.style.cursor = 'pointer';
    const onTap = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (game._level4Done) return;

      // 鼓强烈下沉 + shake (比原来更明显)
      drum.classList.remove('level4-drum-hit');
      void drum.offsetWidth;  // force reflow 重启动画
      drum.classList.add('level4-drum-hit');
      game._level4Timeouts.push(setTimeout(() => {
        drum.classList.remove('level4-drum-hit');
      }, 280));

      // 鼓手鼓槌下挥动画
      if (drumAnchor) {
        drumAnchor.classList.remove('level4-drum-character-hit');
        void drumAnchor.offsetWidth;
        drumAnchor.classList.add('level4-drum-character-hit');
        setTimeout(() => {
          if (drumAnchor) drumAnchor.classList.remove('level4-drum-character-hit');
        }, 280);
      }

      // 检查 pending 节拍
      const now = Date.now();
      const matched = game._level4Pending.filter((p) => Math.abs(now - p.when) < HIT_WINDOW_MS);
      if (matched.length > 0) {
        // 正确
        game._level4Correct++;
        game._level4Pending = game._level4Pending.filter((p) => !matched.includes(p));
        try { game.audio.playNote('C4'); } catch (_) {}
        // 视觉反馈: ripples + 粒子 + +1
        spawnRipples();
        spawnParticles();
        spawnPlusOne();
        // 清除 cue 状态
        if (drumAnchor) drumAnchor.classList.remove('level4-cue-now');
        if (cueLarge) cueLarge.classList.remove('level4-cue-active');
        const praises = ['咚!', '咚!咚!', '完美!', '棒呀!', '节拍对!'];
        game.say(praises[Math.min(game._level4Correct - 1, praises.length - 1)]);
      } else {
        // 错敲: 无 pending 拍子匹配
        game.wrongCount++;
        try { game.audio.wrong(); } catch (_) {}
        // 视觉反馈: 鼓单独震动 + -1 浮动
        drum.classList.add('level4-drum-shake');
        setTimeout(() => drum.classList.remove('level4-drum-shake'), 360);
        spawnMinusOne();
        // 清除 cue 状态 (避免持续变色)
        if (drumAnchor) drumAnchor.classList.remove('level4-cue-now');
        if (cueLarge) cueLarge.classList.remove('level4-cue-active');
        game.say('咦, 现在不是节拍! 看泡泡到鼓位再敲');
      }
    };
    drum.addEventListener('pointerdown', onTap);
    game._level4DrumHandler = onTap;
  }

  // 7) 重置 review 按钮点击: 直接调用 game.restartLevel() (入口在 main.js)
  // Level4 没有 over-complicated HUD, 重玩按钮通用.

  return () => {
    // 清理所有 setTimeout
    if (Array.isArray(game._level4Timeouts)) {
      game._level4Timeouts.forEach((id) => clearTimeout(id));
      game._level4Timeouts = [];
    }
    if (Array.isArray(game._level4CueTimers)) {
      game._level4CueTimers.forEach((id) => clearTimeout(id));
      game._level4CueTimers = [];
    }
    // 清 pending, 防止异步回调 in-flight 引用悬空
    if (Array.isArray(game._level4Pending)) game._level4Pending = [];
    game._level4Done = true;

    // 解绑鼓事件
    if (game._level4DrumHandler && drum) {
      drum.removeEventListener('pointerdown', game._level4DrumHandler);
    }
    game._level4DrumHandler = null;

    // 拆场景
    if (game.scene) {
      try { game.scene.teardown(); } catch (_) {}
      game.scene = null;
    }

    // 拆泡泡容器 (Game.start 的 stage.innerHTML='' 也兜底)
    const containers = game.stage ? game.stage.querySelectorAll('.level4-bubbles-container') : [];
    containers.forEach((c) => c.remove());

    // 恢复 HUD 默认 (level1 样式)
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
