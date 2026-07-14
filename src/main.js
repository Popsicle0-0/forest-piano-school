/**
 * 森林钢琴学校 - 入口
 * 把所有子系统串起来:Game 控制器 + 场景渲染 + 交互 + 音频
 */
import { Game } from './systems/Game.js';
import { Audio } from './systems/Audio.js';
import { Progress } from './systems/Progress.js';

// 当前版本号 - 部署时手动更新
const APP_VERSION = 'v12';

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
    // iOS Safari 旋转后延迟再算
    setTimeout(applyPhoneLayout, 100);
    setTimeout(applyPhoneLayout, 400);
  });
  // 兜底: 启动后 500ms 再算一次, 因为 Game 是异步 mount
  setTimeout(applyPhoneLayout, 500);
  setTimeout(applyPhoneLayout, 1500);

  // 全局错误兜底(避免页面卡死)
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
  const isPhone = w <= 920;
  if (!isPhone) return;  // 桌面/iPad 走 CSS grid

  const isLandscape = w > h;
  // 横屏: hud 32px, bubble 44px, 键盘强制 100px
  // 竖屏: 不应该进入游戏, rotate-hint 处理
  if (!isLandscape) return;

  const hudH = 32;
  const bubbleH = 44;
  const stageTop = hudH;
  const stageBottom = bubbleH;
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
    stage.style.top = stageTop + 'px';
    stage.style.bottom = stageBottom + 'px';
    stage.style.left = '0';
    stage.style.right = '0';
    stage.style.height = 'auto';
    stage.style.display = 'block';
    stage.style.overflow = 'hidden';
  }

  // 键盘: 强制 100px 高度, 强制底部, 加亮黄色调试底
  const kb = document.querySelector('.keyboard-area');
  if (kb) {
    const kbH = Math.max(100, Math.floor(stageH * 0.32));
    kb.style.position = 'absolute';
    kb.style.bottom = '0';
    kb.style.left = '0';
    kb.style.right = '0';
    kb.style.height = kbH + 'px';
    kb.style.minHeight = '100px';
    kb.style.width = '100%';
    kb.style.background = 'rgba(255, 209, 102, 0.2)';  // 调试用: 黄色半透明
    kb.style.zIndex = '5';
    kb.style.display = 'flex';
    kb.style.alignItems = 'flex-end';
    kb.style.justifyContent = 'center';
    // 强制 SVG 尺寸
    const svg = kb.querySelector('svg.keyboard');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.display = 'block';
    }
  }

  // 五线谱: 在键盘上方
  const staff = document.querySelector('.staff-wrap');
  if (staff) {
    const staffH = Math.floor((stageH - 100) * 0.55);
    staff.style.position = 'absolute';
    staff.style.top = '0';
    staff.style.left = '0';
    staff.style.right = '0';
    staff.style.height = staffH + 'px';
    staff.style.minHeight = '60px';
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

  // 鱼池: 在五线谱和键盘之间
  const fishPool = document.querySelector('.fish-pool');
  if (fishPool) {
    const kbH = Math.max(100, Math.floor(stageH * 0.32));
    const staffH = Math.floor((stageH - 100) * 0.55);
    const fishH = Math.max(50, stageH - kbH - staffH);
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
