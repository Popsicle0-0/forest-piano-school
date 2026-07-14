/**
 * 主题切换器 (v18)
 * 通过设置 :root CSS 变量 + body[data-theme] 覆盖整体视觉风格。
 * 3 套主题: 奶油橙 / 夜色 / 森林绿
 */

export const THEMES = [
  { id: 'cream',  name: '奶油橙', icon: '🍑', bg: 'cream' },
  { id: 'night',  name: '夜色',  icon: '🌙', bg: 'night' },
  { id: 'forest', name: '森林绿', icon: '🌲', bg: 'forest' },
];

export const THEME_ICONS = {
  cream: '🍑',
  night: '🌙',
  forest: '🌲',
};

const STORAGE_KEY = 'forest-piano-theme';

const ROOT_VARS = {
  cream: {
    '--bg-cream': '#fff8ec',
    '--bg-paper': '#faf3e0',
    '--staff-strong': '#3d405b',
    '--warm-cta': '#ffb347',
    '--text-main': '#3d405b',
    '--text-sub': '#6b7280',
  },
  night: {
    '--bg-cream': '#1a1430',
    '--bg-paper': '#251a3f',
    '--staff-strong': '#fdf6e3',
    '--warm-cta': '#ff8fb1',
    '--text-main': '#fdf6e3',
    '--text-sub': '#b8a5d0',
  },
  forest: {
    '--bg-cream': '#1a3a2a',
    '--bg-paper': '#244a3a',
    '--staff-strong': '#fdf6e3',
    '--warm-cta': '#84cc16',
    '--text-main': '#fdf6e3',
    '--text-sub': '#a3c9a8',
  },
};

export class ThemeSwitcher {
  constructor(stage) {
    this.stage = stage;
    this.current = this._load();
    this._apply();
    this.button = null;
  }

  _load() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'cream';
    } catch (_) { return 'cream'; }
  }

  _save(themeId) {
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch (_) {}
  }

  _apply() {
    const vars = ROOT_VARS[this.current] || ROOT_VARS.cream;
    for (const [key, value] of Object.entries(vars)) {
      document.documentElement.style.setProperty(key, value);
    }
    document.body.dataset.theme = this.current;
  }

  cycle() {
    const idx = THEMES.findIndex(t => t.id === this.current);
    const next = THEMES[(idx + 1) % THEMES.length];
    this.current = next.id;
    this._save(this.current);
    this._apply();
    return next;
  }

  set(themeId) {
    if (!ROOT_VARS[themeId]) return;
    this.current = themeId;
    this._save(themeId);
    this._apply();
  }
}
