/**
 * Level 6 scene: 钢琴教室 (双八度钢琴 + 女钢琴老师 + 暖色墙)
 *
 * 元素:
 *  - 暖色教室墙渐变背景 (米黄 → 淡橙 → 浅咖)
 *  - 装饰圆点 (墙画感)
 *  - 远景装饰小音符
 *  - 中右: 女钢琴老师 SVG (脸/头发/紫色连衣裙/举起的手 + 节拍器)
 *  - 中下: 老师指示箭头 (指向键盘, 闪烁)
 *  - 中央钢琴外壳 (深棕木框 + 白键台)
 *
 * 真正的 24 键键盘 (.keyboard-area) 由 Level6.js 调用 PianoKeyboard 创建, 不在 Scene 中.
 *
 * 增强 (polish):
 *  - 老师两只手明显更大、更生动, "双手"抬起状态: 左手抬 + 右手抬交替 (alternating play)
 *  - 老师手旁边放一个 .level6-metronome (左右摇晃的钟摆)
 *  - 老师脚下加 .level6-chord-indicator (DOM 文本, 由 JS 写入当前题)
 */
import { SVG_NS } from '../utils/svg.js';

export class Level6Scene {
  constructor(stage) {
    this.stage = stage;
    this.background = null;
    this.render();
  }

  render() {
    const bg = document.createElement('div');
    bg.className = 'level6-background';
    bg.innerHTML = `
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${SVG_NS}">
        <!-- 装饰墙画 (圆点) -->
        <circle class="level6-deco" cx="120" cy="100" r="40" fill="#f4a261" opacity="0.55" />
        <circle class="level6-deco" cx="680" cy="120" r="50" fill="#e76f51" opacity="0.5" />
        <circle class="level6-deco" cx="60" cy="350" r="32" fill="#ffd166" opacity="0.5" />
        <circle class="level6-deco" cx="740" cy="380" r="38" fill="#f4a261" opacity="0.4" />

        <!-- 装饰小音符 (墙上) -->
        <g class="level6-notes-deco" fill="#3d405b" opacity="0.35" font-family="serif" font-size="40" font-weight="700">
          <text x="220" y="80">&#9835;</text>
          <text x="350" y="120">&#9833;</text>
          <text x="500" y="70">&#9836;</text>
        </g>

        <!-- 钢琴外壳 (深棕框 + 白键台) -->
        <g class="level6-piano-shape" transform="translate(400, 360)">
          <!-- 影子 -->
          <ellipse cx="0" cy="80" rx="320" ry="14" fill="rgba(0, 0, 0, 0.28)" />
          <!-- 琴顶深棕边框 -->
          <rect x="-300" y="-30" width="600" height="22" rx="6" fill="#3d2b1a" />
          <!-- 白键台背景 -->
          <rect x="-290" y="-12" width="580" height="92" rx="4" fill="#fdfbf5" />
          <!-- 木框边 -->
          <rect x="-300" y="-30" width="600" height="110" rx="8" fill="none" stroke="#3d2b1a" stroke-width="2" />
        </g>

        <!-- 老师 (右上角) — 双手更大更明显 -->
        <g class="level6-teacher" transform="translate(620, 100)">
          <!-- 头发 (后) -->
          <ellipse cx="0" cy="0" rx="26" ry="22" fill="#5d3a1a" />
          <!-- 脸 -->
          <circle cx="0" cy="2" r="22" fill="#deb887" />
          <!-- 头发 (前刘海) -->
          <path d="M-22,-5 Q-15,-25 0,-25 Q15,-25 22,-5 L18,-3 Q15,-20 0,-22 Q-15,-20 -18,-3 Z" fill="#5d3a1a" />
          <!-- 眼睛 -->
          <circle cx="-8" cy="-2" r="2.2" fill="#3d405b" />
          <circle cx="8" cy="-2" r="2.2" fill="#3d405b" />
          <!-- 腮红 -->
          <circle cx="-12" cy="6" r="3" fill="#e76f51" opacity="0.55" />
          <circle cx="12" cy="6" r="3" fill="#e76f51" opacity="0.55" />
          <!-- 嘴 (微笑) -->
          <path d="M-6,10 Q0,14 6,10" stroke="#3d405b" stroke-width="2" fill="none" stroke-linecap="round" />
          <!-- 脖子 -->
          <rect x="-5" y="20" width="10" height="6" fill="#deb887" />
          <!-- 服装 (紫色连衣裙上身) -->
          <path d="M-24,26 Q-28,32 -24,40 L-30,70 L30,70 L24,40 Q28,32 24,26 L12,28 Q8,30 0,30 Q-8,30 -12,28 Z" fill="#6a4c93" />
          <!-- 衣领白点 -->
          <circle cx="0" cy="36" r="2.5" fill="#fdfbf5" />

          <!-- 左手 (抬起 + 播放示意) -->
          <g class="level6-hand level6-hand--l">
            <!-- 上臂 -->
            <rect x="-3" y="0" width="6" height="22" fill="#deb887" />
            <!-- 手掌 -->
            <circle cx="0" cy="0" r="10" fill="#deb887" stroke="#a08060" stroke-width="1.2" />
            <!-- 大拇指 -->
            <ellipse cx="-7" cy="2" rx="2.5" ry="4" fill="#deb887" stroke="#a08060" stroke-width="1" transform="rotate(-30 -7 2)" />
            <!-- 食指/中指/无名指/小指 -->
            <rect x="-5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="-1.8" y="-13" width="2.6" height="10" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="1.5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="4.5" y="-10" width="2.4" height="7" rx="1.2" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <!-- 绿环 (左手标记) -->
            <circle cx="0" cy="0" r="12" fill="none" stroke="#4caf50" stroke-width="2" opacity="0.7" />
          </g>

          <!-- 右手 (抬起 + 播放示意) -->
          <g class="level6-hand level6-hand--r">
            <rect x="-3" y="0" width="6" height="22" fill="#deb887" />
            <circle cx="0" cy="0" r="10" fill="#deb887" stroke="#a08060" stroke-width="1.2" />
            <ellipse cx="7" cy="2" rx="2.5" ry="4" fill="#deb887" stroke="#a08060" stroke-width="1" transform="rotate(30 7 2)" />
            <rect x="-5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="-1.8" y="-13" width="2.6" height="10" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="1.5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="4.5" y="-10" width="2.4" height="7" rx="1.2" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <!-- 黄环 (右手标记) -->
            <circle cx="0" cy="0" r="12" fill="none" stroke="#ffc107" stroke-width="2" opacity="0.7" />
          </g>

          <!-- 老师标签 -->
          <text x="0" y="56" text-anchor="middle" font-family="'ZCOOL KuaiLe', sans-serif"
                font-size="14" font-weight="900" fill="#fdfbf5"
                style="paint-order: stroke; stroke: #3d2b1a; stroke-width: 2;">老师</text>
        </g>

        <!-- 节拍器 — 老师左下方的小钟摆, 持续摇晃 -->
        <g class="level6-metronome" transform="translate(540, 200)">
          <!-- 主体梯形 -->
          <path d="M-16,30 L-22,46 L22,46 L16,30 Z" fill="#3d2b1a" stroke="#1a0f08" stroke-width="1.5" />
          <!-- 顶部 -->
          <rect x="-4" y="22" width="8" height="10" fill="#3d2b1a" />
          <!-- 摆杆 -->
          <g class="level6-metronome-arm">
            <line x1="0" y1="20" x2="0" y2="-30" stroke="#deb887" stroke-width="3" stroke-linecap="round" />
            <!-- 摆锤 -->
            <rect x="-4" y="-12" width="8" height="14" rx="2" fill="#ffc107" stroke="#a06800" stroke-width="1" />
            <!-- 顶端固定点 -->
            <circle cx="0" cy="20" r="3" fill="#ffc107" stroke="#a06800" stroke-width="1" />
          </g>
          <!-- BPM 标签 -->
          <text x="0" y="58" text-anchor="middle" font-family="'ZCOOL KuaiLe', sans-serif"
                font-size="9" font-weight="700" fill="#fdfbf5"
                style="paint-order: stroke; stroke: #3d2b1a; stroke-width: 1.2;">节拍</text>
        </g>

        <!-- 老师指示箭头 (从老师手 → 键盘) -->
        <path class="level6-arrow" d="M620,200 Q540,220 460,250" stroke="#3d405b"
              stroke-width="3" fill="none" marker-end="url(#level6-arrowhead)" stroke-linecap="round" />
        <defs>
          <marker id="level6-arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3d405b" />
          </marker>
        </defs>

        <!-- 装饰小音符 (左下漂浮) -->
        <g class="level6-notes-float" fill="#6a4c93" opacity="0.7" font-family="serif" font-size="28" font-weight="700">
          <text x="80" y="280" class="level6-note-float">&#9833;</text>
          <text x="60" y="180" class="level6-note-float">&#9835;</text>
          <text x="100" y="220" class="level6-note-float">&#9836;</text>
        </g>
      </svg>

      <!-- 当前和弦指示 (DOM 文本 — 由 Level6.js 写入内容) -->
      <div class="level6-chord-indicator">
        <span class="level6-chord-indicator__label">当前题目</span>
        <span class="level6-chord-indicator__chord">—</span>
      </div>
    `;
    this.stage.appendChild(bg);
    this.background = bg;
  }

  /** 更新当前和弦指示文字 (DOM 文本) */
  setChordLabel(text) {
    if (!this.background) return;
    const el = this.background.querySelector('.level6-chord-indicator__chord');
    if (el) el.textContent = text;
  }

  /** 触发老师拍手 / 双臂上举庆祝动画 (答对时调用) */
  celebrateClap() {
    if (!this.background) return;
    const teacher = this.background.querySelector('.level6-teacher');
    if (!teacher) return;
    teacher.classList.remove('level6-clap');
    void teacher.offsetWidth;
    teacher.classList.add('level6-clap');
    setTimeout(() => teacher.classList.remove('level6-clap'), 1200);
  }

  teardown() {
    if (this.background && this.background.parentNode) {
      this.background.parentNode.removeChild(this.background);
    }
    this.background = null;
  }
}

export default Level6Scene;