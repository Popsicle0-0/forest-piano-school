import confetti from 'canvas-confetti';

/**
 * 粒子效果 — 复用的彩纸和爆炸
 *
 * 使用方法:
 *   import { particles } from './Particles.js';
 *   particles.burst({ x, y, color: '#ffd166' });      // 小爆炸
 *   particles.celebrate({ count: 100 });             // 全屏庆祝
 *   particles.fountain({ x, y, color: '#e63946' });  // 喷泉
 *   particles.confettiFromSides();                   // 两边喷射
 */
class Particles {
  burst({ x, y, color = '#ffd166', count = 20, spread = 50, startVelocity = 22 }) {
    try {
      confetti({
        particleCount: count,
        spread,
        startVelocity,
        ticks: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight
        },
        colors: [color, '#fff8ec', '#ffc971'],
        shapes: ['circle', 'square'],
        scalar: 0.7,
      });
    } catch (e) { /* ignore */ }
  }

  celebrate({ count = 140, spread = 80 } = {}) {
    try {
      confetti({
        particleCount: count,
        spread,
        origin: { y: 0.55 },
        colors: ['#e63946', '#f4a261', '#ffc971', '#b5c99a', '#457b9d', '#9b5de5'],
      });
    } catch (e) {}
  }

  fountain({ x, y, color = '#ffd166', count = 60 }) {
    try {
      const origin = {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      };
      // 两个方向: 左侧 + 右侧
      confetti({ particleCount: count / 2, angle: 60, spread: 55, origin, colors: [color, '#fff8ec'], startVelocity: 35 });
      confetti({ particleCount: count / 2, angle: 120, spread: 55, origin, colors: [color, '#fff8ec'], startVelocity: 35 });
    } catch (e) {}
  }

  confettiFromSides({ count = 50 } = {}) {
    try {
      confetti({ particleCount: count, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
      confetti({ particleCount: count, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
    } catch (e) {}
  }

  /** 喷泉 (从底部上升) */
  firework({ x, y, color = '#ffd166' } = {}) {
    try {
      const origin = {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      };
      confetti({
        particleCount: 30,
        spread: 360,
        startVelocity: 25,
        origin,
        colors: [color, '#fff8ec', '#ffc971', '#9b5de5'],
        scalar: 0.8,
      });
    } catch (e) {}
  }

  /** 水滴 (小) */
  drop({ x, y, color = '#a8dadc' } = {}) {
    try {
      const origin = {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      };
      confetti({
        particleCount: 12,
        spread: 25,
        startVelocity: 18,
        origin,
        colors: [color, '#fff8ec', '#5fa8b5'],
        scalar: 0.5,
      });
    } catch (e) {}
  }
}

export const particles = new Particles();
export default particles;