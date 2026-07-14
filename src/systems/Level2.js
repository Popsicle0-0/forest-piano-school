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

  // ============================================================
  // 3.5) "跟读"模式 — 答对后: 大字唱名淡入 + Web Audio 合成的"唱名提示音"
  //   用纯 Web Audio 合成一个简单的"sol-la-mi" 三音, 让人工智能"念"出唱名,
  //   类似 TTS, 但不依赖任何外部资源. 配合大字 + 1s 后淡出, 强化记忆.
  // ============================================================
  function showBigSolfege(solfege, color) {
    const big = document.createElement('div');
    big.className = 'level2-big-solfege';
    // 用 CSS 默认 warm-cta; 允许通过自定义变量覆盖 (兼容旧逻辑)
    if (color) big.style.setProperty('--big-solfege-color', color);
    big.textContent = solfege;
    stage.appendChild(big);
    // 后台脉冲 — 给整个 stage 一点暖色脉冲, 强化
    stage.classList.add('level2-bg-pulse');
    // v18.5: CSS 动画 1.4s 内完成 pop + fade, 1.5s 后移除 DOM
    setTimeout(() => {
      stage.classList.remove('level2-bg-pulse');
      try { big.remove(); } catch (_) {}
    }, 1500);
  }

  /**
   * 合成"唱名提示音" — 每个唱名对应一个独特的三音旋律:
   *   低八度根音 — 根音 — 纯五度 (类似 TTS 但纯合成, 避开 iOS SpeechSynthesis 不可用)
   * 例如 Do → C3 - C4 - G4. 让孩子"听到"唱名的音调轮廓.
   */
  const SOLFEGE_MELODIES = {
    'Do':  [130.81, 261.63, 392.00],                    // C3 - C4 - G4
    'Re':  [146.83, 293.66, 440.00],                    // D3 - D4 - A4
    'Mi':  [164.81, 329.63, 493.88],                    // E3 - E4 - B4
    'Fa':  [174.61, 349.23, 523.25],                    // F3 - F4 - C5
    'Sol': [196.00, 392.00, 587.33],                    // G3 - G4 - D5
    'La':  [220.00, 440.00, 659.25],                    // A3 - A4 - E5
    'Si':  [246.94, 493.88, 739.99],                    // B3 - B4 - F#5
  };

  function playSolfegeMelody(solfege) {
    const audio = game.audio;
    if (!audio || !audio._webAudio || audio.muted) return;
    const ctx = audio._webAudio;
    try { audio._resumeWebAudio && audio._resumeWebAudio(); } catch (_) {}
    const freqs = SOLFEGE_MELODIES[solfege] || SOLFEGE_MELODIES['Do'];
    const start = ctx.currentTime + 0.05;
    freqs.forEach((f, i) => {
      const t0 = start + i * 0.13;  // 每个音 130ms 间隔
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t0);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      osc.connect(g).connect(audio._masterGain);
      osc.start(t0);
      osc.stop(t0 + 0.22);
      if (typeof audio._trackOsc === 'function') audio._trackOsc(osc, t0 + 0.22);
    });
  }

  // 拦截原 _markLevel2FishCorrect — 原有逻辑 + 我们的视觉反馈 + idle hint 重置 + 大字跟读
  const origMarkCorrect = game._markLevel2FishCorrect.bind(game);
  game._markLevel2FishCorrect = (fish) => {
    origMarkCorrect(fish);
    updateProgressDots();
    showCorrectFeedback(fish);
    // v18: 跟读模式 — 大字唱名 + 旋律短句
    const id = fish && fish.dataset ? fish.dataset.id : null;
    if (id) {
      const note = NOTES.find((n) => n.id === id);
      if (note) {
        showBigSolfege(note.solfege, note.color);
        try { playSolfegeMelody(note.solfege); } catch (_) {}
      }
    }
    if (typeof resetIdleHint === 'function') resetIdleHint();
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
    // v18.2: 重听时 envelope 峰值 1.0 (普通播放 ~0.5-0.7), 让重听明显更响
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(1.0, t + 0.015);
    env.gain.exponentialRampToValueAtTime(0.7, t + 0.35);
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
    // v18.2: masterGain "ramp UP → play → ramp DOWN" 序列
    //  - 60ms 从当前值线性升到 peakGain (1.0), 干净不爆音
    //  - 2.5s 内线性回到 baseGain (0.75), 让 BGM 慢慢压回
    //  配合 envelope 峰值 1.0 → 重听比正常播放 ~1.5x 响, 在 BGM 中也能听清
    const ctx = audio._webAudio;
    const gainNode = audio._masterGain;
    const now = ctx.currentTime;
    const baseGain = audio.muted ? 0 : 0.75;
    const peakGain = audio.muted ? 0 : 1.0;
    try {
      const cur = (typeof gainNode.gain.value === 'number') ? gainNode.gain.value : baseGain;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(cur, now);
      gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.06);   // ramp UP (60ms)
      gainNode.gain.linearRampToValueAtTime(baseGain, now + 2.5);    // ramp DOWN (2.5s)
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

  // ============================================================
  // 5) 视觉倒计时 3-2-1 — 新题目开始时, 金圈 + 数字 弹出 + 淡出
  // ============================================================
  function showCountdown() {
    // 不在用户重听时弹倒计时 (只在题目切换时)
    const seq = [3, 2, 1];
    seq.forEach((num, i) => {
      setTimeout(() => {
        const dot = document.createElement('div');
        dot.className = 'level2-countdown';
        dot.textContent = String(num);
        stage.appendChild(dot);
        // 动画 700ms 后自动清理
        setTimeout(() => { try { dot.remove(); } catch (_) {} }, 720);
      }, i * 650);
    });
  }

  // 拦截原 _level2NextQuestion, 在新题目开始时弹倒计时 (只在第一题后弹)
  const origNextQuestion = game._level2NextQuestion.bind(game);
  game._level2NextQuestion = () => {
    const isFirst = !game._level2AnswerNote;
    origNextQuestion();
    // 第一题不弹倒计时 (题刚出, 立刻弹反而不友好), 第二题起每次都弹
    if (!isFirst && game._level2AnswerNote) {
      showCountdown();
    }
  };

  // ============================================================
  // 6) 10 秒不动 → 提示 "Select the fish that sang..."
  // ============================================================
  let idleHintTimer = null;
  function scheduleIdleHint() {
    if (idleHintTimer) clearTimeout(idleHintTimer);
    idleHintTimer = setTimeout(() => {
      // 仅在题目仍生效且还没答对时提示
      if (game._level2AnswerNote && (game._level2Done || new Set()).size < (game._level2Total || 5)) {
        try {
          game.say('哪条小鱼刚才唱歌了? 点点它 🎵');
        } catch (_) {}
      }
    }, 10000);
  }
  // 任何活动都重置: 重听 / 答错 / 答对 / 按键 → 重新计时
  function resetIdleHint() { scheduleIdleHint(); }
  const origReplayForIdle = game._replayQuestion;
  game._replayQuestion = () => { try { origReplayForIdle(); } catch (_) {} resetIdleHint(); };

  // 在标记答错时也重置 (原 _handleLevel2Answer 已重播, 我们只管计时)
  // 由于不能改 Game.js, 我们 hook _handleLevel2Answer 让其重置 idle
  if (typeof game._handleLevel2Answer === 'function') {
    const origHandle = game._handleLevel2Answer.bind(game);
    game._handleLevel2Answer = (id, fish) => {
      try { origHandle(id, fish); } catch (_) {}
      resetIdleHint();
    };
  }

  // 启动首次计时 (下一题之后)
  setTimeout(resetIdleHint, 1200);

  // 初始化进度点
  updateProgressDots();

  return () => {
    if (idleHintTimer) { clearTimeout(idleHintTimer); idleHintTimer = null; }
    // 清掉我们的 DOM
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
    stage.querySelectorAll('.level2-correct-bubble, .level2-sparkle, .level2-countdown').forEach((el) => el.remove());
  };
}
