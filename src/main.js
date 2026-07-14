/**
 * 森林钢琴学校 - 入口
 * 把所有子系统串起来:Game 控制器 + 场景渲染 + 交互 + 音频
 */
import { Game } from './systems/Game.js';
import { Audio } from './systems/Audio.js';
import { Progress } from './systems/Progress.js';

// 当前版本号 - 部署时手动更新
const APP_VERSION = 'v13';

// 全局单例(便于控制台调试)
window.__forestPiano = { Game, Audio, Progress, version: APP_VERSION };

// 等 DOM 完整后启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function boot() {
  const stage = document.getElementById('stage');
  const bubbleText = document.getElementById('bubble-text');

  // 写入版本号
  const versionTag = document.getElementById('version-tag');
  if (versionTag) versionTag.textContent = APP_VERSION;

  const game = new Game({
    stageEl: stage,
    bubbleEl: bubbleText,
    progress: new Progress(),
    audio: new Audio(),
  });

  // 启动关卡 1
  game.start({ levelId: 1 });

  // ====== 关键: 移动端 JS 强制布局 ======
  // iOS PWA 上 CSS vh/percent 不可靠, 用 JS 直接给元素设 inline style
  applyPhoneLayout();
  window.addEventListener('resize', applyPhoneLayout);
  window.addEventListener('orientationchange', () => {
    setTimeout(applyPhoneLayout, 100);
    setTimeout(applyPhoneLayout, 400);
  });
  setTimeout(applyPhoneLayout, 500);
  setTimeout(applyPhoneLayout, 1500);

  // ====== 右上角按钮: 声音 / 主页 ======
  const btnSound = document.getElementById('btn-sound');
  const btnHome = document.getElementById('btn-home');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const muted = game.audio.toggleMute();
      btnSound.textContent = muted ? '🔇' : '🔊';
    });
  }
  if (btnHome) {
    btnHome.addEventListener('click', () => {
      // 重新开始 (回到开始遮罩)
      if (confirm('确定要重新开始吗?')) {
        location.reload();
      }
    });
  }

  // 全局错误兜底
  window.addEventListener('error', (e) => {
    console.error('[forest-piano] error:', e.error);
  });
}

/**
 * 移动端强制布局: 直接给元素设 inline style
 * 基于 window.innerHeight 算出像素值, 绕开 iOS PWA 的 CSS 计算 bug
 */
function applyPhoneLayout() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // 只在手机上用 JS 强制布局; iPad (≥700) 用默认 CSS grid
  const isPhone = w <= 700;
  if (!isPhone) return;  // 桌面/iPad 走 CSS grid

  const isLandscape = w > h;
  if (!isLandscape) return;

  const hudH = 32;
  const bubbleH = 44;
  const stageH = h - hudH - bubbleH;

  // HUD
  const hud = document.querySelector('.hud');
  if (hud) {
    hud.style.height = hudH + 'px';
    hud.style.minHeight = hudH + 'px';
    hud.style.position = 'absolute';
    hud.style.top = '0';
    hud.style.left = '0';
    hud.style.right = '0';
    hud.style.zIndex = '20';
  }

  // 舞台
  if (stage) {
    stage.style.position = 'absolute';
    stage.style.top = hudH + 'px';
    stage.style.bottom = bubbleH + 'px';
    stage.style.left = '0';
    stage.style.right = '0';
    stage.style.height = 'auto';
    stage.style.display = 'block';
    stage.style.overflow = 'hidden';
  }

  // 键盘: 38% 高度 (比之前 32% 大), 强制 min 110px
  const kb = document.querySelector('.keyboard-area');
  if (kb) {
    const kbH = Math.max(110, Math.floor(stageH * 0.38));
    kb.style.position = 'absolute';
    kb.style.bottom = '0';
    kb.style.left = '0';
    kb.style.right = '0';
    kb.style.height = kbH + 'px';
    kb.style.minHeight = '110px';
    kb.style.width = '100%';
    kb.style.background = 'rgba(255, 209, 102, 0.2)';
    kb.style.zIndex = '5';
    kb.style.display = 'flex';
    kb.style.alignItems = 'flex-end';
    kb.style.justifyContent = 'center';
    const svg = kb.querySelector('svg.keyboard');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.display = 'block';
    }
  }

  // 五线谱: 50% of (stage - keyboard), 强制 min 80px
  const staff = document.querySelector('.staff-wrap');
  if (staff) {
    const kbH = Math.max(110, Math.floor(stageH * 0.38));
    const remaining = stageH - kbH;
    const staffH = Math.max(80, Math.floor(remaining * 0.55));
    staff.style.position = 'absolute';
    staff.style.top = '0';
    staff.style.left = '0';
    staff.style.right = '0';
    staff.style.height = staffH + 'px';
    staff.style.minHeight = '80px';
    staff.style.display = 'flex';
    staff.style.alignItems = 'center';
    staff.style.justifyContent = 'center';
    const svg = staff.querySelector('svg.staff');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.display = 'block';
    }
  }

  // 鱼池: 中间
  const fishPool = document.querySelector('.fish-pool');
  if (fishPool) {
    const kbH = Math.max(110, Math.floor(stageH * 0.38));
    const staffH = Math.max(80, Math.floor((stageH - kbH) * 0.55));
    const fishH = Math.max(60, stageH - kbH - staffH);
    fishPool.style.position = 'absolute';
    fishPool.style.bottom = kbH + 'px';
    fishPool.style.left = '0';
    fishPool.style.right = '0';
    fishPool.style.height = fishH + 'px';
    fishPool.style.top = 'auto';
    fishPool.style.pointerEvents = 'none';
  }

  // 底部气泡
  const bubble = document.querySelector('.bubble');
  if (bubble) {
    bubble.style.position = 'absolute';
    bubble.style.bottom = '0';
    bubble.style.left = '0';
    bubble.style.right = '0';
    bubble.style.height = bubbleH + 'px';
    bubble.style.minHeight = bubbleH + 'px';
    bubble.style.padding = '4px 12px';
    bubble.style.margin = '0';
  }
}
