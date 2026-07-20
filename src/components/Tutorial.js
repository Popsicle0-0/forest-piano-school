/**
 * 森林钢琴学校 - 教学引导 (v18)
 * 4 页教程: 欢迎 / 拖拽 / 拿星 / 8 关
 * 首次玩家自动弹出 (1200ms 后), 玩家也可通过 HUD 上的 📖 按钮重新打开。
 */
import { gsap } from 'gsap';

const PAGES = [
  {
    emoji: '🐟🎵',
    title: '欢迎来到森林钢琴学校',
    body: '这里的 7 条小鱼 Do Re Mi Fa Sol La Si 住在钢琴里。你来帮它们找到在五线谱和钢琴上的位置吧!',
    bg: 'linear-gradient(135deg, #5fa8b5, #a8dadc)',
  },
  {
    emoji: '👆',
    title: '手指不离开屏幕',
    body: '按住一条鱼 (不要松开!) 拖到屏幕上方五线谱对应的位置。松手就放下。如果放错会摇头回弹。',
    bg: 'linear-gradient(135deg, #f4a261, #ffc971)',
  },
  {
    emoji: '⭐',
    title: '错误少就拿满星',
    body: '0 错 = 3⭐ / 1-2 错 = 2⭐ / 3-5 错 = 1⭐ / 6+ 错 = 0⭐。每关都能挑战完美!',
    bg: 'linear-gradient(135deg, #ffd166, #f4a261)',
  },
  {
    emoji: '🗺️',
    title: '16 个关卡等你探索',
    body: '通关后看左上角关卡徽章, 点一下就能回到地图选别的关卡. 也可以点 🎹 自由演奏 或 🎵 歌曲库随便弹~ 看看你能集齐多少 🏆 成就!',
    bg: 'linear-gradient(135deg, #9b5de5, #6a4c93)',
  },
];

export class Tutorial {
  constructor(stage, { onDone, isFirstTime = false } = {}) {
    this.stage = stage;
    this.onDone = onDone;
    this.isFirstTime = isFirstTime;
    this.element = null;
    this.currentPage = 0;
  }

  show() {
    this.element = document.createElement('div');
    this.element.className = 'tutorial';
    this._render();
    this.stage.appendChild(this.element);

    if (this.isFirstTime) {
      // 自动播放入场动画
      gsap.fromTo(
        this.element.querySelector('.tutorial__card'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    } else {
      // 手动点击 — 也给个轻动画
      gsap.fromTo(
        this.element.querySelector('.tutorial__card'),
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
    }
  }

  _render() {
    const page = PAGES[this.currentPage];
    const total = PAGES.length;
    const isLast = this.currentPage === total - 1;
    const isFirst = this.currentPage === 0;

    this.element.innerHTML = `
      <div class="tutorial__card" style="background: ${page.bg}">
        <div class="tutorial__emoji">${page.emoji}</div>
        <div class="tutorial__title">${page.title}</div>
        <div class="tutorial__body">${page.body}</div>

        <div class="tutorial__dots">
          ${PAGES.map((_, i) => `
            <span class="tutorial__dot ${i === this.currentPage ? 'on' : ''}"></span>
          `).join('')}
        </div>

        <div class="tutorial__nav">
          ${!isFirst ? '<button class="btn-secondary" id="tut-back">‹ 上一步</button>' : '<div></div>'}
          ${isLast
            ? '<button class="btn-primary" id="tut-done">🎵 开始游戏 ›</button>'
            : '<button class="btn-primary" id="tut-next">下一步 ›</button>'}
        </div>

        ${!this.isFirstTime ? '<button class="tutorial__skip" id="tut-skip">跳过</button>' : ''}
      </div>
    `;

    // 绑定按钮
    const back = this.element.querySelector('#tut-back');
    const next = this.element.querySelector('#tut-next');
    const done = this.element.querySelector('#tut-done');
    const skip = this.element.querySelector('#tut-skip');
    if (back) back.addEventListener('click', () => this._prev());
    if (next) next.addEventListener('click', () => this._next());
    if (done) done.addEventListener('click', () => this._done());
    if (skip) skip.addEventListener('click', () => this._done());
  }

  _prev() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this._render();
    }
  }

  _next() {
    if (this.currentPage < PAGES.length - 1) {
      this.currentPage++;
      this._render();
    }
  }

  _done() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
    if (this.onDone) this.onDone();
  }

  hide() {
    this._done();
  }
}
