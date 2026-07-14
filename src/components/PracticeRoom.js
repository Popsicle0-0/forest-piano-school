/**
 * 自由演奏 (Practice Room) - 全屏 2 八度钢琴, 无评分
 *
 * 用法:
 *   const room = new PracticeRoom(document.body, game);
 *   room.show();  // 打开
 *   room.hide();  // 退出
 *
 * 设计:
 *   - 2 个八度白键 (C3-B4) + 黑键 (按黑键不会发声,仅装饰)
 *   - 每次按键弹顶部大唱名 (Do3/Re3/... , 彩色字)
 *   - 无评分, 无计时, 无星星 — 纯沙盒
 *   - 如 game.audio 存在则播音 (Audio 暂只支持 C4-B4, C3-B3 默认静默)
 */
import { PianoKeyboard } from './PianoKeyboard.js';

// 2 八度白键定义 (14 个)
const NOTES_2OCT = [
  { id: 'c3', solfege: 'Do3',  pitch: 'C3', note: 'C', color: '#e63946' },
  { id: 'd3', solfege: 'Re3',  pitch: 'D3', note: 'D', color: '#f4a261' },
  { id: 'e3', solfege: 'Mi3',  pitch: 'E3', note: 'E', color: '#ffc971' },
  { id: 'f3', solfege: 'Fa3',  pitch: 'F3', note: 'F', color: '#b5c99a' },
  { id: 'g3', solfege: 'Sol3', pitch: 'G3', note: 'G', color: '#457b9d' },
  { id: 'a3', solfege: 'La3',  pitch: 'A3', note: 'A', color: '#6a4c93' },
  { id: 'b3', solfege: 'Si3',  pitch: 'B3', note: 'B', color: '#9b5de5' },
  { id: 'c4', solfege: 'Do4',  pitch: 'C4', note: 'C', color: '#e63946' },
  { id: 'd4', solfege: 'Re4',  pitch: 'D4', note: 'D', color: '#f4a261' },
  { id: 'e4', solfege: 'Mi4',  pitch: 'E4', note: 'E', color: '#ffc971' },
  { id: 'f4', solfege: 'Fa4',  pitch: 'F4', note: 'F', color: '#b5c99a' },
  { id: 'g4', solfege: 'Sol4', pitch: 'G4', note: 'G', color: '#457b9d' },
  { id: 'a4', solfege: 'La4',  pitch: 'A4', note: 'A', color: '#6a4c93' },
  { id: 'b4', solfege: 'Si4',  pitch: 'B4', note: 'B', color: '#9b5de5' },
];

export class PracticeRoom {
  /**
   * @param {HTMLElement} stage - 挂载节点
   * @param {Object} [game] - 可选, 传入则用 game.audio 播放音符
   */
  constructor(stage, game) {
    this.stage = stage || document.body;
    this.game = game || null;
    this.element = null;
    this.kb = null;
  }

  show() {
    // 关掉其他 overlay (但保留自己)
    document.querySelectorAll('.practice-room').forEach((el) => el.remove());

    const wrap = document.createElement('div');
    wrap.className = 'practice-room';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-label', '自由演奏');
    wrap.innerHTML = `
      <div class="practice-room__hud">
        <div class="practice-room__title">🎹 自由演奏</div>
        <div class="practice-room__hint">点击琴键, 弹奏你想弹的~</div>
        <button class="btn-secondary practice-room__exit" id="practice-exit">🚪 退出</button>
      </div>
      <div class="practice-room__board"></div>
    `;
    this.stage.appendChild(wrap);
    this.element = wrap;

    // 渲染 2 八度钢琴 (14 白键)
    const board = wrap.querySelector('.practice-room__board');
    this.kb = new PianoKeyboard(board, NOTES_2OCT);

    // 按键: 播放 + 大标签
    this.kb.onPress = (keyEl) => {
      const id = keyEl.dataset.id;
      const noteInfo = NOTES_2OCT.find((n) => n.id === id);
      if (!noteInfo) return;

      // 播放音 (仅 C4-B4 在当前 Audio.js freqMap 内, C3-B3 静默)
      try {
        const audio = this.game && this.game.audio;
        if (audio && typeof audio.playNote === 'function') {
          audio.playNote(noteInfo.pitch);
        }
      } catch (err) {
        console.warn('[PracticeRoom] 播放失败:', err);
      }

      // 发光 (用 PianoKeyboard 现有动画)
      try { this.kb.glowKey(keyEl); } catch (_) {}

      // 显示大唱名
      this._showBigLabel(noteInfo);
    };

    // ESC 退出
    this._escHandler = (e) => {
      if (e.key === 'Escape') this.hide();
    };
    document.addEventListener('keydown', this._escHandler);

    // 退出按钮
    const exitBtn = wrap.querySelector('#practice-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => this.hide());
    }

    // 点击空白 (board 之外) 不关闭 — 避免误触; 只在玩家点退出按钮时退出
  }

  _showBigLabel(note) {
    if (!this.element) return;
    // 移除已有的 (只保留最新一个)
    this.element.querySelectorAll('.practice-big-label').forEach((el) => el.remove());

    const label = document.createElement('div');
    label.className = 'practice-big-label';
    label.style.color = note.color;
    label.textContent = note.solfege;
    this.element.appendChild(label);

    // 1.2s 后移除 (CSS 动画也是 1.2s, 留一点余量)
    setTimeout(() => {
      if (label.parentNode) label.parentNode.removeChild(label);
    }, 1200);
  }

  hide() {
    if (this._escHandler) {
      document.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
    this.kb = null;
  }
}

export default PracticeRoom;
