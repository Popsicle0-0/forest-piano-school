/**
 * 森林钢琴学校 - 入口
 * 把所有子系统串起来:Game 控制器 + 场景渲染 + 交互 + 音频
 */
import { Game } from './systems/Game.js';
import { Audio } from './systems/Audio.js';
import { BGM } from './systems/BGM.js';
import { Progress } from './systems/Progress.js';
import { SettingsPanel } from './components/SettingsPanel.js';
import { Tutorial } from './components/Tutorial.js';
import { ThemeSwitcher, THEME_ICONS } from './components/ThemeSwitcher.js';
import { KeyboardShortcuts } from './components/Keyboard.js';
import { Streak } from './systems/Streak.js';

// 主题切换器 (v18): 尽早实例化, 在首屏前应用已保存主题
const theme = new ThemeSwitcher();

const TUTORIAL_FLAG = 'forest-piano-tutorial-shown';

// 当前版本号 - 部署时手动更新
const APP_VERSION = 'v18.7';

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

  // ====== v18.3: 每日登录 Streak ======
  const streak = new Streak();
  const checkInResult = streak.checkIn();

  if (checkInResult.isNew && checkInResult.streak >= 3) {
    // Show streak toast
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = 'streak-toast';
      toast.innerHTML = `
        <div class="streak-toast__icon">🔥</div>
        <div class="streak-toast__body">
          <div class="streak-toast__title">连续 ${checkInResult.streak} 天!</div>
          <div class="streak-toast__hint">坚持就是胜利</div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 50);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
      }, 5500);
    }, 3000);
  }

  // Add 🔥 streak badge to HUD (top)
  const streakBadge = document.createElement('div');
  streakBadge.className = 'streak-badge';
  streakBadge.textContent = `🔥 ${checkInResult.streak}`;
  streakBadge.title = `连续 ${checkInResult.streak} 天, 最长 ${streak.get().longest}`;
  document.querySelector('.hud__left')?.appendChild(streakBadge);

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

  // ====== v18.5: 📊 排行榜 / 成就总览按钮 (HUD 右上角, 动态插入) ======
  if (hudRight && !document.getElementById('btn-leaderboard')) {
    const btnLeaderboard = document.createElement('button');
    btnLeaderboard.className = 'hud__btn';
    btnLeaderboard.id = 'btn-leaderboard';
    btnLeaderboard.setAttribute('aria-label', '排行榜');
    btnLeaderboard.setAttribute('title', '我的成就');
    btnLeaderboard.textContent = '📊';
    hudRight.appendChild(btnLeaderboard);
    btnLeaderboard.addEventListener('click', () => {
      import('./components/Leaderboard.js').then(({ Leaderboard }) => {
        const lb = new Leaderboard(document.body, game.progress, game.achievements);
        lb.show();
      }).catch((err) => console.warn('[leaderboard] 加载失败:', err));
    });
  }

  // ====== v18.6: 🎹 自由演奏按钮 (HUD 右上角, 沙盒模式, 无评分) ======
  if (hudRight && !document.getElementById('btn-practice')) {
    const btnPractice = document.createElement('button');
    btnPractice.className = 'hud__btn';
    btnPractice.id = 'btn-practice';
    btnPractice.setAttribute('aria-label', '自由演奏');
    btnPractice.title = '自由演奏';
    btnPractice.textContent = '🎹';
    hudRight.appendChild(btnPractice);

    btnPractice.addEventListener('click', () => {
      import('./components/PracticeRoom.js').then(({ PracticeRoom }) => {
        const room = new PracticeRoom(document.body, game);
        room.show();
      }).catch((err) => console.warn('[practice] 加载失败:', err));
    });
  }

  // ====== 🎵 歌曲库按钮 (HUD 右上角, 动态插入) ======
  if (hudRight && !document.getElementById('btn-songs')) {
    const btnSongs = document.createElement('button');
    btnSongs.className = 'hud__btn';
    btnSongs.id = 'btn-songs';
    btnSongs.setAttribute('aria-label', '歌曲库');
    btnSongs.title = '歌曲库';
    btnSongs.textContent = '🎵';
    hudRight.appendChild(btnSongs);

    btnSongs.addEventListener('click', () => {
      import('./components/SongLibrary.js').then(({ SongLibrary }) => {
        const lib = new SongLibrary(document.body, game);
        lib.show();
      }).catch((err) => console.warn('[songs] 加载失败:', err));
    });
  }

  // ====== v18: 教程 — 📖 帮助按钮 + 首次自动弹出 ======
  // HUD 按钮: 让玩家可以随时回顾玩法
  if (!document.getElementById('btn-help')) {
    const btnHelp = document.createElement('button');
    btnHelp.className = 'hud__btn';
    btnHelp.id = 'btn-help';
    btnHelp.setAttribute('aria-label', '帮助');
    btnHelp.setAttribute('title', '教程');
    btnHelp.textContent = '📖';
    document.querySelector('.hud__right')?.appendChild(btnHelp);
    btnHelp.addEventListener('click', () => {
      const tut = new Tutorial(document.body, { onDone: () => {} });
      tut.show();
    });
  }

  // ====== v18: 🎨 主题切换按钮 (HUD 右上角, 动态插入) ======
  if (!document.getElementById('btn-theme')) {
    const btnTheme = document.createElement('button');
    btnTheme.className = 'hud__btn';
    btnTheme.id = 'btn-theme';
    btnTheme.setAttribute('aria-label', '主题');
    btnTheme.title = '主题';
    btnTheme.textContent = THEME_ICONS[theme.current] || '🎨';
    document.querySelector('.hud__right')?.appendChild(btnTheme);
    btnTheme.addEventListener('click', () => {
      const next = theme.cycle();
      btnTheme.textContent = next.icon;
      // 短暂提示当前主题
      const flash = document.createElement('div');
      flash.className = 'theme-flash';
      flash.textContent = `${next.icon} ${next.name}`;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 2000);
    });
  }

  // 首次玩家: 启动后 1200ms 自动弹出教程
  if (!localStorage.getItem(TUTORIAL_FLAG)) {
    setTimeout(() => {
      const tut = new Tutorial(document.body, {
        isFirstTime: true,
        onDone: () => localStorage.setItem(TUTORIAL_FLAG, '1'),
      });
      tut.show();
    }, 1200);
  }

  // 全局错误兜底
  window.addEventListener('error', (e) => {
    console.error('[forest-piano] error:', e.error);
  });

  // Remove splash after a short delay
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
  }, 2200);

  // ====== v18.4: 键盘快捷键 + 帮助提示 (无障碍 + 高级玩家) ======
  const keyboard = new KeyboardShortcuts(game);
  keyboard.enable();

  // 显示快捷键提示 (一次性, 当用户首次按 ? 键时)
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      const overlay = document.createElement('div');
      overlay.className = 'keyboard-help';
      overlay.innerHTML = `
      <div class="keyboard-help__card">
        <h2>🎹 键盘快捷键</h2>
        <ul>
          <li><kbd>1-9</kbd> 启动对应关卡</li>
          <li><kbd>Space</kbd> 鼓/切按钮 (L4/L12)</li>
          <li><kbd>M</kbd> 静音切换</li>
          <li><kbd>Enter</kbd> 开始游戏</li>
          <li><kbd>Esc</kbd> 关闭弹窗</li>
          <li><kbd>?</kbd> 显示此帮助</li>
        </ul>
        <button class="btn-primary" id="kb-help-close">关闭 (任意键)</button>
      </div>
    `;
      document.body.appendChild(overlay);
      const close = () => overlay.remove();
      overlay.querySelector('#kb-help-close').addEventListener('click', close);
      setTimeout(() => {
        const handler = () => {
          close();
          document.removeEventListener('keydown', handler);
        };
        document.addEventListener('keydown', handler);
      }, 100);
    }
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
