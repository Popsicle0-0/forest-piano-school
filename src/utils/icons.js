/**
 * 森林制琴工坊的结构图标。
 * 只用于导航/控件，不用跨平台 emoji 作为 UI 图标；内容奖励仍可使用 emoji。
 */
const PATHS = {
  map: '<path d="M4 6.5 10 4l6 2.5L22 4v13.5L16 20l-6-2.5L4 20Z"/><path d="M10 4v13.5M16 6.5V20"/>',
  sound: '<path d="M4 10v4h4l5 4V6l-5 4Z"/><path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7.5 7.5 0 0 1 0 10"/>',
  muted: '<path d="M4 10v4h4l5 4V6l-5 4Z"/><path d="m18 10 4 4m0-4-4 4"/>',
  replay: '<path d="M20 11a8 8 0 1 0 1 5"/><path d="M20 5v6h-6"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',
  home: '<path d="m4 11 8-7 8 7v8H4Z"/><path d="M9 19v-5h6v5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  trophy: '<path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3M12 12v5M8 20h8M9 17h6"/>',
  chart: '<path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/>',
  piano: '<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 5v9M12 5v9M16 5v9M6 14h12"/>',
  song: '<path d="M8 18V5l10-2v12"/><circle cx="5" cy="18" r="3"/><circle cx="15" cy="16" r="3"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21Z"/><path d="M4 5.5v15M8 7h8M8 11h8"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15" cy="8" r="1"/><path d="M17 14c-3-1-5 3-2 5"/>',
};

export function icon(name, className = '') {
  const paths = PATHS[name] || PATHS.music;
  return `<svg class="atelier-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
}

export function setIcon(button, name) {
  if (button) button.innerHTML = icon(name);
}
