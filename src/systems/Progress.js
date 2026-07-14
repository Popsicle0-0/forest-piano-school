/**
 * Progress - 进度存档 (LocalStorage)
 * 负责:
 *   - 初始化/读取 forest-piano-progress
 *   - 标记关卡完成 (stars 取 max)
 *   - 任意 localStorage 读写都用 try/catch (iOS 无痕模式会抛)
 *
 * State shape:
 * {
 *   level: number,            // 当前最新关卡
 *   stars: { [levelId]: number }, // 每关星数 (max 语义,允许后续扩展)
 *   completedLevels: string[],
 *   unlockedNotes: string[],  // 解锁的 note id 列表 (do/re/mi/...)
 *   firstPass: string|null    // 首次通关 ISO 日期 YYYY-MM-DD
 * }
 *
 * 注: 设计稿 v2 里 `stars: 0` 是简写,这里用 map 才能让
 *    `getStars(levelId) -> number` + `stars 取 max` 真正合理。
 */
const STORAGE_KEY = 'forest-piano-progress';

// 第 1 关解锁的全部 note id (MVP: 7 个白键)
const LEVEL1_UNLOCKED = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];

/** 本地 ISO 日期 YYYY-MM-DD */
function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 默认初始 state */
function defaultState() {
  return {
    level: 1,
    stars: {},
    completedLevels: [],
    unlockedNotes: [],
    firstPass: null,
  };
}

/** 把可能脏的存储反序列化结果规整化,坏值兜底 */
function normalize(state) {
  if (!state || typeof state !== 'object') return defaultState();
  return {
    level: Number.isFinite(state.level) ? state.level : 1,
    stars: (state.stars && typeof state.stars === 'object' && !Array.isArray(state.stars))
      ? state.stars
      : {},
    completedLevels: Array.isArray(state.completedLevels)
      ? state.completedLevels.filter((x) => x !== null && x !== undefined)
      : [],
    unlockedNotes: Array.isArray(state.unlockedNotes)
      ? state.unlockedNotes.filter((x) => typeof x === 'string')
      : [],
    firstPass: typeof state.firstPass === 'string' ? state.firstPass : null,
  };
}

export class Progress {
  constructor() {
    this.state = this._load();
  }

  // ============================================================
  // I/O (私有)
  // ============================================================

  /** 从 localStorage 读,失败回默认 */
  _load() {
    try {
      if (typeof localStorage === 'undefined') return defaultState();
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return normalize(parsed);
    } catch (_) {
      // JSON 损坏 / 无痕模式抛错 / 跨域限制 -> 安静回退
      return defaultState();
    }
  }

  /** 写回 localStorage,失败静默 */
  _save() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (_) {
      // QuotaExceededError / Safari 无痕 SecurityError
    }
  }

  // ============================================================
  // Public API
  // ============================================================

  /**
   * 标记某关通过,星数取 max
   * @param {string|number} levelId
   * @param {number} starsEarned 本次获得的星
   */
  markLevelComplete(levelId, starsEarned) {
    const id = String(levelId);
    const earn = Math.max(0, Number(starsEarned) || 0);

    // 1) completedLevels (去重)
    if (!this.state.completedLevels.includes(id)) {
      this.state.completedLevels = [...this.state.completedLevels, id];
    }

    // 2) stars 取 max (per level, 数组/对象都行)
    const cur = Number(this.state.stars[id] || 0);
    if (earn > cur) {
      this.state.stars = { ...this.state.stars, [id]: earn };
    }

    // 3) firstPass: 仅首次设置 (后续完成不覆盖)
    if (!this.state.firstPass) {
      this.state.firstPass = todayIso();
    }

    // 4) 解锁第 1 关的 7 个 note (MVP 解锁策略)
    const set = new Set(this.state.unlockedNotes);
    LEVEL1_UNLOCKED.forEach((n) => set.add(n));
    this.state.unlockedNotes = Array.from(set);

    // 5) 推进当前最新关卡
    const numericId = Number(id);
    if (Number.isFinite(numericId) && numericId >= this.state.level) {
      this.state.level = numericId + 1;
    }

    this._save();
  }

  /** 拿到某关当前的星 (0 = 还没完成) */
  getStars(levelId) {
    const id = String(levelId);
    return Number(this.state.stars[id] || 0);
  }

  /** 所有关卡的星总和 */
  getTotalStars() {
    return Object.values(this.state.stars).reduce(
      (sum, n) => sum + (Number(n) || 0),
      0
    );
  }

  /** 已通关的关卡列表副本 */
  getCompletedLevels() {
    return [...this.state.completedLevels];
  }

  /** MVP: 所有关卡都解锁 */
  isLevelUnlocked(_levelId) {
    return true;
  }

  /** 解锁的 note id 列表副本 */
  getUnlockedNotes() {
    return [...this.state.unlockedNotes];
  }

  /** 用于调试 / 单元测试 */
  getSnapshot() {
    return JSON.parse(JSON.stringify(this.state));
  }
}

export default Progress;
