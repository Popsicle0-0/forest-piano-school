/**
 * Level 2: 听音找鱼
 *
 * 系统随机播一个音 (Do~Si), 孩子从 7 条鱼里点选对应的那条.
 * 5 题通关, 答错重播不扣星 (教学关).
 *
 * v18.1 polish: 加听声音提示 (声波动画) + 5 格倒计时进度 + 答对反馈 (泡泡+火花).
 *                重听时 masterGain 临时拉满 + 长 envelope, 让孩子听清目标音.
 */
export default function startLevel2(game) {
  if (typeof window !== 'undefined') {
    window.__forestPiano = window.__forestPiano || {};
    window.__forestPiano.currentLevelId = 2;
  }

  game._startLevel2();

  const stage = game.stage;

  // ============================================================
  // 1) "🎵 听声音" 提示 — 中央偏上, 声波动画
  // ============================================================
  stage.insertAdjacentHTML('beforeend', `
    <div class="level2-listen-prompt" id="level2-listen-prompt">
      <div class="level2-speaker">
        <span class="level2-speaker-emoji">🔊</span>
        <span class="level2-wave level2-wave-1"></span>
        <span class="level2-wave level2-wave-2"></span>
        <span class="level2-wave level2-wave-3"></span>
      </div>
      <div class="level2-listen-text">🎵 听声音</div>
    </div>
  `);

  // ============================================================
  // 2) 进度点 — 5 格, 已答对的高亮
  // ============================================================
  stage.insertAdjacentHTML('beforeend', `
    <div class="level2-progress-dots" id="level2-progress-dots">
      ${[1, 2, 3, 4, 5].map((i) => `<span class="level2-prog-dot" data-i="${i}"></span>`).join('')}
    </div>
  `);

  function updateProgressDots() {
    const dots = stage.querySelectorAll('.level2-prog-dot');
    const done = game._level2Done ? game._level2Done.size : 0;
    dots.forEach((d, i) => {
      if (i < done) d.classList.add('filled');
      else d.classList.remove('filled');
    });
  }

  // ============================================================
  // 3) 答对视觉反馈 (泡泡 + 火花)
  // ============================================================
  function showCorrectFeedback(fish) {
    if (!fish) return;
    const rect = fish.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const x = rect.left - stageRect.left + rect.width / 2;
    const y = rect.top - stageRect.top;
    // 文字泡泡
    const bubble = document.createElement('div');
    bubble.className = 'level2-correct-bubble';
    bubble.textContent = '✨ 答对啦! ✨';
    bubble.style.left = x + 'px';
    bubble.style.top = (y - 36) + 'px';
    stage.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1400);
    // 6 颗火花 (CSS keyframe 跑完就移除)
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'level2-sparkle';
      sparkle.style.left = (x + (Math.random() - 0.5) * 70) + 'px';
      sparkle.style.top = (y + (Math.random() - 0.5) * 70) + 'px';
      sparkle.style.animationDelay = (i * 0.06) + 's';
      stage.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1100);
    }
  }

  // 拦截原 _markLevel2FishCorrect — 原有逻辑 + 我们的视觉反馈
  const origMarkCorrect = game._markLevel2FishCorrect.bind(game);
  game._markLevel2FishCorrect = (fish) => {
    origMarkCorrect(fish);
    updateProgressDots();
    showCorrectFeedback(fish);
  };

  // ============================================================
  // 4) 强化重听: masterGain 临时拉满 + 长 envelope
  // ============================================================
  const NOTES = [
    { id: 'do', pitch: 'C4' }, { id: 're', pitch: 'D4' }, { id: 'mi', pitch: 'E4' },
    { id: 'fa', pitch: 'F4' }, { id: 'sol', pitch: 'G4' }, { id: 'la', pitch: 'A4' },
    { id: 'si', pitch: 'B4' },
  ];
  const FREQ_MAP = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  };

  function playLoudNote(pitch) {
    const audio = game.audio;
    if (!audio || !audio._webAudio || !audio._masterGain || audio.muted) return false;
    const ctx = audio._webAudio;
    try { audio._resumeWebAudio && audio._resumeWebAudio(); } catch (_) {}
    const t = ctx.currentTime;
    const freq = FREQ_MAP[pitch];
    if (!freq) return false;

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, t);
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t);
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, t);

    // ADSR — attack 15ms, sustain 320ms, 长 release 2.2s, 让孩子听清
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(0.95, t + 0.015);
    env.gain.exponentialRampToValueAtTime(0.65, t + 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);

    const g2 = ctx.createGain();
    g2.gain.value = 0.18;
    const g3 = ctx.createGain();
    g3.gain.value = 0.06;

    osc1.connect(env).connect(audio._masterGain);
    osc2.connect(g2).connect(env);
    osc3.connect(g3).connect(env);

    const stopT = t + 2.3;
    osc1.start(t); osc1.stop(stopT);
    osc2.start(t); osc2.stop(stopT);
    osc3.start(t); osc3.stop(stopT);
    return true;
  }

  // 拦截原 _replayQuestion — 触发更响、更长的版本
  const origReplay = game._replayQuestion.bind(game);
  game._replayQuestion = () => {
    const audio = game.audio;
    const answerId = game._level2AnswerNote;
    if (!answerId) return;
    const note = NOTES.find((n) => n.id === answerId);
    if (!note) { origReplay(); return; }

    if (!audio || !audio._webAudio || !audio._masterGain) {
      origReplay();
      return;
    }
    // masterGain 临时拉满 (1.0), 2.4s 后线性回到原值
    const ctx = audio._webAudio;
    const gainNode = audio._masterGain;
    const now = ctx.currentTime;
    const baseGain = audio.muted ? 0 : 0.75;
    try {
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(audio.muted ? 0 : 1.0, now);
      gainNode.gain.linearRampToValueAtTime(baseGain, now + 2.4);
    } catch (_) {}
    playLoudNote(note.pitch);

    // 显示听声音提示 (声波动画)
    const prompt = document.getElementById('level2-listen-prompt');
    if (prompt) {
      prompt.classList.add('active');
      clearTimeout(prompt._hideTimer);
      prompt._hideTimer = setTimeout(() => prompt.classList.remove('active'), 2500);
    }
  };

  // 初始化进度点
  updateProgressDots();

  return () => {
    if (typeof window !== 'undefined') {
      window.__forestPiano = window.__forestPiano || {};
      window.__forestPiano.currentLevelId = null;
    }
    const hudLevel2 = document.getElementById('hud-level2');
    if (hudLevel2) hudLevel2.style.display = '';
    const hudDots = document.querySelector('.hud__dots');
    if (hudDots) hudDots.style.display = 'none';
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) btnReplay.style.display = 'none';

    // 清掉我们的 DOM
    const prompt = document.getElementById('level2-listen-prompt');
    if (prompt) prompt.remove();
    const prog = document.getElementById('level2-progress-dots');
    if (prog) prog.remove();
    stage.querySelectorAll('.level2-correct-bubble, .level2-sparkle').forEach((el) => el.remove());
  };
}
