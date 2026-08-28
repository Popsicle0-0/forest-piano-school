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
const APP_VERSION = 'v19.4';

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

  // ====== v18.8: 关卡徽章 (动态插入 .hud__left 第一位, 点击回 LevelMap) ======
  const levelBadge = document.createElement('span');
  levelBadge.className = 'level-badge';
  levelBadge.id = 'level-badge';
  levelBadge.title = '点击返回关卡地图';
  levelBadge.setAttribute('role', 'button');
  levelBadge.setAttribute('aria-label', '当前关卡 - 点击返回地图');
  levelBadge.textContent = '🐟 第 1 关 · 小鱼跳进五线谱';
  const hudLeftForBadge = document.querySelector('.hud__left');
  if (hudLeftForBadge) hudLeftForBadge.insertBefore(levelBadge, hudLeftForBadge.firstChild);
  // 点击徽章 → 回关卡地图 (解决"不知道怎么玩别的关卡")
  // v19: 与 ⌂ 按钮统一走 game.goHome() — 完整清场(teardown/计时器/FishPool
  // 监听)后再回地图。旧内联清单两处重复且漏掉关卡清理(见 FIXLOG Major-1)。
  levelBadge.addEventListener('click', () => {
    game.goHome();
  });

  // Add 🔥 streak badge to HUD (top)
  const streakBadge = document.createElement('div');
  streakBadge.className = 'streak-badge';
  streakBadge.textContent = `🔥 ${checkInResult.streak}`;
  streakBadge.title = `连续 ${checkInResult.streak} 天, 最长 ${streak.get().longest}`;
  document.querySelector('.hud__left')?.appendChild(streakBadge);

  // ============================================================
  // v19 布局说明: 旧 applyPhoneLayout / applyTabletLayout 及其
  // resize/orientationchange/定时器重试体系已整体删除。
  // 布局现在 100% 由 CSS 完成 (#app flex column + .stage--stack 三段栈),
  // 组件对视口变化的响应由各自的既有机制处理:
  //   FishPool  → 自带 resize/orientationchange 监听 (重新散布/夹紧)
  //   SVG 场景  → CSS 弹性尺寸自动缩放
  // 不再存在"选关后新 DOM 没人管"的时序黑洞 — 这正是 v18 系
  // "第一关在手机上不可玩"的首要根因。
  // ============================================================

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
      // v19: 不再 confirm + location.reload()。
      // reload 在 iOS PWA 上有顽固缓存(可能回不到新版), 而且 confirm
      // 弹窗对儿童是纯摩擦。goHome() 会完整清场后一步直达关卡地图,
      // 且不会像 reload 那样把运行中的关卡定时器直接甩给页面销毁 ——
      // 是先杀干净再走 (审查 Major-1: 否则 L12 节拍器会穿地图继续响)。
      game.goHome();
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
  // v19 拦截策略(终版): 只有"300ms 内连续两次触碰同一个交互元素"才按
  // 双击拦截。用归一化目标元素做判定, 不再看坐标距离 —— 坐标方案里
  // 相邻两个 HUD 按钮、两条相邻的鱼中心距可能小于 30px, 依旧会误伤;
  // 元素身份才是"双击"的本意。归一化把 SVG 内部结构(path/text/g)
  // 归并到同一个交互单元, 避免 SVG 目标抖动绕过判断。
  let lastNormTarget = null;
  let lastTouchTime = 0;
  const normTarget = (t) => {
    try {
      if (!t || !t.closest) return t;
      return t.closest('button, a, .fish, .key, .level-map-tile, [role="button"]') || t;
    } catch (_) { return t; }
  };
  document.addEventListener('touchstart', (e) => {
    const now = Date.now();
    const n = normTarget(e.target);
    if (now - lastTouchTime < 300 && n && n === lastNormTarget) {
      e.preventDefault();
    }
    lastNormTarget = n;
    lastTouchTime = now;
  }, { passive: false });
  document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
  // 阻止多点触发的缩放
  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) e.preventDefault();
  }, { passive: false });
}
