/**
 * 森林钢琴学校 - 入口
 * 把所有子系统串起来:Game 控制器 + 场景渲染 + 交互 + 音频
 */
import { Game } from './systems/Game.js';
import { Audio } from './systems/Audio.js';
import { Progress } from './systems/Progress.js';

// 全局单例(便于控制台调试)
window.__forestPiano = { Game, Audio, Progress };

// 等 DOM 完整后启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function boot() {
  const stage = document.getElementById('stage');
  const bubbleText = document.getElementById('bubble-text');

  const game = new Game({
    stageEl: stage,
    bubbleEl: bubbleText,
    progress: new Progress(),
    audio: new Audio(),
  });

  // 启动关卡 1
  game.start({ levelId: 1 });

  // 全局错误兜底(避免页面卡死)
  window.addEventListener('error', (e) => {
    console.error('[forest-piano] error:', e.error);
  });
}
