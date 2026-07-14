/**
 * Level 1: 小鱼跳进五线谱
 *
 * 学生把 7 条鱼 Do Re Mi Fa Sol La Si 拖到五线谱上对应的五线位置.
 * 引导气泡 + 重玩 + 准确度评级.
 *
 * 这是 v15-v17.7 累积下来的关卡 (现在解耦为可被 Game.start({levelId:1}) 通过
 * import.meta.glob 自动加载的模块).
 */
export default function startLevel1(game) {
  // 关卡身份 (给 LevelMap / Progress 显示用)
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 1;
  }

  // 委托给 Game 的内置 _startLevel1 (历史逻辑, 100+ 行)
  game._startLevel1();

  // 返回 teardown 函数 - Game.start 时调用以清理
  return () => {
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
    // Game 内置的 disposed 状态由下一次 start() 的清场保证
    // 这里只做 Level 1 特殊清理 (如有)
    const hudLevel2 = document.getElementById('hud-level2');
    if (hudLevel2) hudLevel2.style.display = 'none';
    const hudDots = document.querySelector('.hud__dots');
    if (hudDots) hudDots.style.display = '';
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) btnReplay.style.display = '';
    // 清掉残留的 .targeting / .filling 高亮(防止跨关卡状态泄漏)
    document.querySelectorAll('.staff-slot.targeting, .staff-slot.filling').forEach((el) => {
      el.classList.remove('targeting', 'filling');
    });
  };
}
