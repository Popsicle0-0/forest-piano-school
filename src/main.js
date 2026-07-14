/**
 * 森林钢琴学校 - 入口
 * 把所有子系统串起来:Game 控制器 + 场景渲染 + 交互 + 音频
 */
import { Game } from './systems/Game.js';
import { Audio } from './systems/Audio.js';
import { BGM } from './systems/BGM.js';
import { Progress } from './systems/Progress.js';
import { SettingsPanel } from './components/SettingsPanel.js';

// 当前版本号 - 部署时手动更新
const APP_VERSION = 'v18.1';

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

  // 禁用 iOS Safari 缩放/双击
  disableZoom();

  const game = new Game({
    stageEl: stage,
    bubbleEl: bubbleText,
    progress: new Progress(),
    audio: new Audio(),
  });

  // BGM (默认关闭)
  const bgm = new BGM(game.audio);

  // 启动关卡 1
  game.start({ levelId: 1 });

  // ====== 关键: 移动端 JS 强制布局 ======
  // iOS PWA 上 CSS vh/percent 不可靠, 用 JS 直接给元素设 inline style
  applyPhoneLayout();
  applyTabletLayout();
  window.addEventListener('resize', () => {
    applyPhoneLayout();
    applyTabletLayout();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(applyPhoneLayout, 100);
    setTimeout(applyTabletLayout, 100);
    setTimeout(applyPhoneLayout, 400);
    setTimeout(applyTabletLayout, 400);
  });
  setTimeout(applyPhoneLayout, 500);
  setTimeout(applyTabletLayout, 500);
  setTimeout(applyPhoneLayout, 1500);
  setTimeout(applyTabletLayout, 1500);

  // ====== 右上角按钮: 声音 / 重玩 / BGM / 主页 ======
  const btnSound = document.getElementById('btn-sound');
  const btnReplay = document.getElementById('btn-replay');
  const btnBGM = document.getElementById('btn-bgm');
  const btnHome = document.getElementById('btn-home');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const muted = game.audio.toggleMute();
      btnSound.textContent = muted ? '🔇' : '🔊';
    });
  }
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      // 直接重玩, 无遮罩, 无 reload
      try { game.restartLevel(); } catch (err) { console.warn('restart 失败:', err); }
    });
  }
  if (btnBGM) {
    btnBGM.addEventListener('click', () => {
      const on = bgm.toggle();
      btnBGM.textContent = on ? '🎶' : '🔇';
      btnBGM.style.background = on ? 'rgba(255, 235, 168, 0.4)' : '';
    });
  }
  if (btnHome) {
    btnHome.addEventListener('click', () => {
      // 回到开始遮罩
      if (confirm('回到开始画面?')) {
        location.reload();
      }
    });
  }

  // settings button
  const btnSettings = document.createElement('button');
  btnSettings.className = 'hud__btn';
  btnSettings.id = 'btn-settings';
  btnSettings.setAttribute('aria-label', '设置');
  btnSettings.setAttribute('title', '设置');
  btnSettings.textContent = '⚙';
  document.querySelector('.hud__right')?.appendChild(btnSettings);

  btnSettings.addEventListener('click', () => {
    const panel = new SettingsPanel(document.body, {
      version: APP_VERSION,
      onReset: () => location.reload(),
      onClose: () => {},
    });
    panel.show();
  });

  // ====== v18: 成就墙按钮 (HUD 右上角, 动态插入, 不动 index.html) ======
  const hudRight = document.querySelector('.hud__right');
  if (hudRight && !document.getElementById('btn-achievements')) {
    const btnAch = document.createElement('button');
    btnAch.className = 'hud__btn';
    btnAch.id = 'btn-achievements';
    btnAch.setAttribute('aria-label', '成就墙');
    btnAch.title = '成就墙';
    btnAch.textContent = '🏆';
    // 插在首位, 让玩家最容易点到 (在 🔊 ↻ ⌂ 之前)
    hudRight.insertBefore(btnAch, hudRight.firstChild);

    btnAch.addEventListener('click', () => {
      // 动态 import, 避免循环依赖 + 减小首屏体积
      import('./components/AchievementsWall.js').then(({ AchievementsWall }) => {
        const wall = new AchievementsWall(document.body, {
          achievementSystem: game.achievements,
          onClose: () => {},
        });
        wall.show();
      }).catch((err) => console.warn('[achievements] 加载失败:', err));
    });
  }

  // 全局错误兜底
  window.addEventListener('error', (e) => {
    console.error('[forest-piano] error:', e.error);
  });
}

/**
 * 禁用 iOS Safari 的双击缩放/双指捏合/手势缩放
 * 关键: 在用户首次触摸前/中绑定, 全部 passive: false
 */
function disableZoom() {
  // 阻止双指捏合
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });
  // 阻止双击放大
  let lastTouch = 0;
  document.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (now - lastTouch < 300) e.preventDefault();
    lastTouch = now;
  }, { passive: false });
  document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
  // 阻止多点触发的缩放
  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) e.preventDefault();
  }, { passive: false });
}

/**
 * 移动端强制布局: 直接给元素设 inline style
 * 基于 window.innerHeight 算出像素值, 绕开 iOS PWA 的 CSS 计算 bug
 */
function applyPhoneLayout() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // phone = 较小边 ≤ 500 (iPhone 16 Pro landscape 高 402, iPad mini 高 768)
  const isPhone = Math.min(w, h) <= 500;
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

  // 键盘: 30% (was 38%), 强制 min 95px
  const kb = document.querySelector('.keyboard-area');
  if (kb) {
    const kbH = Math.max(95, Math.floor(stageH * 0.30));
    kb.style.position = 'absolute';
    kb.style.bottom = '0';
    kb.style.left = '0';
    kb.style.right = '0';
    kb.style.height = kbH + 'px';
    kb.style.minHeight = '95px';
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

  // 五线谱: 顺序分配, 给鱼留至少 110px (保证鱼有足够垂直散开空间)
  const staff = document.querySelector('.staff-wrap');
  if (staff) {
    const kbH = Math.max(95, Math.floor(stageH * 0.30));
    const staffH = Math.max(110, stageH - kbH - 110); // 给鱼留 110
    staff.style.position = 'absolute';
    staff.style.top = '0';
    staff.style.left = '0';
    staff.style.right = '0';
    staff.style.height = staffH + 'px';
    staff.style.minHeight = staffH + 'px';
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

  // 鱼池: 剩下的, 至少 110 (保证 7 条鱼能分散开 + FISH_SLOT_H=64 能完整容纳)
  const fishPool = document.querySelector('.fish-pool');
  if (fishPool) {
    const kbH = Math.max(95, Math.floor(stageH * 0.30));
    const staffH = Math.max(110, stageH - kbH - 110); // 给鱼留 110
    const fishH = stageH - kbH - staffH;             // 一定是 ≥ 110
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

/**
 * iPad 强制布局 (v17+): 直接给元素设 inline pixel style
 * 覆盖 iPad mini 7.9" (1024×768) 到 iPad Pro 13" (1366×1024), 横竖屏
 * 检测: min(w,h) >= 700 && min(w,h) < 1400 && max(w,h) <= 1400
 * 比例 (v17.3 调整):
 *   - 横屏: keyboard 30vh / staff 50vh / fish 11vh / hud 5vh / bubble 4vh
 *   - 竖屏: keyboard 32vh / staff 45vh / fish 11vh / hud 6vh / bubble 6vh
 * iOS PWA 的 vh 在 iPad 上偶尔算错, 用 innerHeight 换算成 px 更稳
 */
function applyTabletLayout() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const minSide = Math.min(w, h);
  const maxSide = Math.max(w, h);
  // iPad 检测: 700 <= minSide < 1400 && maxSide <= 1400
  // iPhone 16 Pro landscape: 874×402 — minSide 402 < 700 → 不是 iPad
  // iPad mini: 1024×768 — minSide 768 ≥ 700 ✓
  // iPad Pro 13": 1366×1024 — minSide 1024 ≥ 700 ✓
  // iPad Pro 11": 1194×834 — minSide 834 ≥ 700 ✓
  const isTablet = minSide >= 700 && minSide < 1400 && maxSide <= 1400;
  if (!isTablet) return;

  const isLandscape = w > h;

  // 比例 (vh 百分比, 总和 = 100)
  // 横屏: keyboard 30vh / staff 50vh / fish 剩余 (kb 小, staff 大, 解决"键盘太大五线谱太小")
  // 竖屏: keyboard 32vh / staff 45vh / fish 剩余
  let hudPct, bubblePct, kbPct, staffPct, fishPct;
  if (isLandscape) {
    hudPct = 0.05; bubblePct = 0.04; kbPct = 0.30; staffPct = 0.50; fishPct = 0.11;
  } else {
    hudPct = 0.06; bubblePct = 0.06; kbPct = 0.32; staffPct = 0.45; fishPct = 0.11;
  }

  const hudH = Math.max(40, Math.floor(h * hudPct));
  const bubbleH = Math.max(40, Math.floor(h * bubblePct));
  const kbH = Math.max(140, Math.floor(h * kbPct));
  const stageH = h - hudH - bubbleH;
  // staff + fish 共分 (stage - keyboard) 上方, staff 大头
  const staffH = Math.max(120, Math.floor((stageH - kbH) * (staffPct / (staffPct + fishPct))));
  const fishH = Math.max(60, stageH - kbH - staffH);

  // HUD
  const hud = document.querySelector('.hud');
  if (hud) {
    hud.style.position = 'absolute';
    hud.style.top = '0';
    hud.style.left = '0';
    hud.style.right = '0';
    hud.style.height = hudH + 'px';
    hud.style.minHeight = hudH + 'px';
    hud.style.zIndex = '20';
  }

  // 舞台
  const stage = document.getElementById('stage');
  if (stage) {
    stage.style.position = 'absolute';
    stage.style.top = hudH + 'px';
    stage.style.bottom = bubbleH + 'px';
    stage.style.left = '0';
    stage.style.right = '0';
    stage.style.height = 'auto';
    stage.style.display = 'flex';
    stage.style.flexDirection = 'column';
    stage.style.overflow = 'hidden';
  }

  // 钢琴键盘 (iPad: kb 由 38vh 改为 30vh, 给 staff 腾空间)
  const kb = document.querySelector('.keyboard-area');
  if (kb) {
    kb.style.position = 'absolute';
    kb.style.bottom = '0';
    kb.style.left = '0';
    kb.style.right = '0';
    kb.style.height = kbH + 'px';
    kb.style.minHeight = '140px';
    kb.style.width = '100%';
    kb.style.background = 'rgba(255, 209, 102, 0.2)';
    kb.style.zIndex = '5';
    kb.style.display = 'flex';
    kb.style.alignItems = 'flex-end';
    kb.style.justifyContent = 'center';
    kb.style.padding = '0';
    kb.style.margin = '0';
    const svg = kb.querySelector('svg.keyboard');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.display = 'block';
    }
  }

  // 五线谱 (键盘上方)
  const staff = document.querySelector('.staff-wrap');
  if (staff) {
    staff.style.position = 'absolute';
    staff.style.top = '0';
    staff.style.left = '0';
    staff.style.right = '0';
    staff.style.height = staffH + 'px';
    staff.style.minHeight = '120px';
    staff.style.display = 'flex';
    staff.style.alignItems = 'center';
    staff.style.justifyContent = 'center';
    staff.style.padding = '0 12px';
    const svg = staff.querySelector('svg.staff');
    if (svg) {
      svg.style.width = '100%';
      svg.style.height = '100%';
      svg.style.maxWidth = '100%';
      svg.style.maxHeight = '100%';
      svg.style.display = 'block';
    }
  }

  // 鱼池 (staff 和 keyboard 中间)
  const fishPool = document.querySelector('.fish-pool');
  if (fishPool) {
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
    bubble.style.padding = '8px 16px';
    bubble.style.margin = '0';
    const text = bubble.querySelector('.bubble__text');
    if (text) text.style.fontSize = '16px';
    const av = bubble.querySelector('.bubble__avatar');
    if (av) av.style.fontSize = '32px';
  }

  // 隐藏小提示鸟 (iPad 有足够空间, 不需要鸟吉祥物占位)
  const pip = document.querySelector('.pip');
  if (pip) pip.style.display = 'none';
}
