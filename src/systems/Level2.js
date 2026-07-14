/**
 * Level 2: 听音找鱼
 *
 * 系统随机播一个音 (Do~Si), 孩子从 7 条鱼里点选对应的那条.
 * 5 题通关, 答错重播不扣星 (教学关).
 */
export default function startLevel2(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 2;
  }

  game._startLevel2();

  return () => {
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
    // 第二关任何延迟 setTimeout 都可以忽略 - 它们 next-tick 才执行
    // Game.start 会在切换前清场, 后续 DOM 元素被一并清掉
    const hudLevel2 = document.getElementById('hud-level2');
    if (hudLevel2) hudLevel2.style.display = '';
    const hudDots = document.querySelector('.hud__dots');
    if (hudDots) hudDots.style.display = 'none';
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) btnReplay.style.display = 'none';
  };
}
