/**
 * Pip 小鸟 - 角落吉祥物
 * 简笔 SVG,会做待机呼吸
 */
export class Pip {
  constructor(root) {
    this.root = root;
    this.render();
  }

  render() {
    const el = document.createElement('div');
    el.className = 'pip';
    el.innerHTML = `
      <svg viewBox="0 0 100 100">
        <!-- 身体 -->
        <ellipse cx="50" cy="58" rx="34" ry="32" fill="#ffd166" />
        <ellipse cx="50" cy="64" rx="26" ry="22" fill="#fff3b0" />
        <!-- 翅膀 -->
        <ellipse cx="30" cy="58" rx="10" ry="16" fill="#f4a261" transform="rotate(-15 30 58)"/>
        <!-- 眼睛 -->
        <circle cx="42" cy="48" r="6" fill="white"/>
        <circle cx="42" cy="48" r="3" fill="#1a1a1a">
          <animate attributeName="cx" values="42;45;42" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="62" cy="48" r="6" fill="white"/>
        <circle cx="62" cy="48" r="3" fill="#1a1a1a">
          <animate attributeName="cx" values="62;65;62" dur="4s" repeatCount="indefinite"/>
        </circle>
        <!-- 嘴 -->
        <path d="M40 60 L50 70 L60 60 Z" fill="#e76f51"/>
        <!-- 腮红 -->
        <circle cx="30" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
        <circle cx="70" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
        <!-- 头羽 -->
        <path d="M50 18 Q 45 8 50 12 Q 55 8 50 18" fill="#f4a261"/>
        <!-- 腿 -->
        <line x1="44" y1="86" x2="44" y2="94" stroke="#5a3a2a" stroke-width="2"/>
        <line x1="56" y1="86" x2="56" y2="94" stroke="#5a3a2a" stroke-width="2"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
      </svg>
    `;
    this.root.appendChild(el);
  }
}
