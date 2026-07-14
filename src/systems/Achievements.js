/**
 * 成就系统 - 检测触发 + 通知 + 持久化
 *
 * 设计:
 *  - 定义所有成就, 每个有 id + 名 + emoji + desc + check(state) -> bool
 *  - checkAndUnlock() 对比 progress snapshot, 解锁任何新增的, 保存到 localStorage
 *  - 显示解锁通知 由调用方负责 (解耦)
 *
 * v18 新增 - 成就墙
 */
const STORAGE_KEY = 'forest-piano-achievements';

const ACHIEVEMENT_DEFS = [
  // Tier 1 - 第一步
  {
    id: 'first-graduate',
    name: '🎓 毕业生',
    desc: '完成任意一关',
    emoji: '🎓',
    check: (state) => {
      const list = state.completedLevels || [];
      return list.length >= 1;
    },
  },
  // Tier 2 - 通关所有
  {
    id: 'forest-master',
    name: '🏆 森林大师',
    desc: '完成全部 8 关',
    emoji: '🏆',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return [1, 2, 3, 4, 5, 6, 7, 8].every((id) => list.includes(String(id)));
    },
  },
  // Tier 3 - 单关满分
  {
    id: 'perfect-pitch',
    name: '⭐ 完美演奏',
    desc: '获得任一关 3 颗星',
    emoji: '⭐',
    check: (state) => Object.values(state.stars || {}).some((s) => Number(s) >= 3),
  },
  // Tier 4 - 全关满分
  {
    id: 'diamond-ear',
    name: '💎 钻石之耳',
    desc: '全部 8 关都获得 3 颗星',
    emoji: '💎',
    check: (state) => {
      const stars = state.stars || {};
      return [1, 2, 3, 4, 5, 6, 7, 8].every((id) => Number(stars[id] || 0) >= 3);
    },
  },
  // Tier 5 - 重玩 (level 累计完成次数 ≥ 10)
  {
    id: 'repeat-master',
    name: '🔁 重复高手',
    desc: '累计完成 10 次关卡 (含重玩)',
    emoji: '🔁',
    check: (state) => {
      const total = Number(state.totalCompletions || 0);
      return total >= 10;
    },
  },
  // Tier 6 - 第七关 (树屋)
  {
    id: 'treehouse-climber',
    name: '🌳 树屋登顶',
    desc: '完成第 7 关 (完整 7 音阶)',
    emoji: '🌳',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('7');
    },
  },
  // Tier 7 - 第八关 (音乐会)
  {
    id: 'concert-master',
    name: '🎵 音乐家',
    desc: '完成第 8 关 (音乐会)',
    emoji: '🎵',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('8');
    },
  },
  // 自定义里程碑
  {
    id: 'drumming-kid',
    name: '🥁 小鼓手',
    desc: '完成第 4 关 (节奏)',
    emoji: '🥁',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('4');
    },
  },
  {
    id: 'mountaineer',
    name: '🏔️ 山谷行者',
    desc: '完成第 3 关 (五声音阶)',
    emoji: '🏔️',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('3');
    },
  },
  {
    id: 'two-hands',
    name: '🎹 双手钢琴家',
    desc: '完成第 6 关 (双手协调)',
    emoji: '🎹',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('6');
    },
  },
  {
    id: 'starter',
    name: '🌱 萌芽',
    desc: '完成第 1 关 (入门)',
    emoji: '🌱',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('1');
    },
  },
  {
    id: 'listener',
    name: '👂 敏锐耳朵',
    desc: '完成第 2 关 (听音找鱼)',
    emoji: '👂',
    check: (state) => {
      const list = (state.completedLevels || []).map(String);
      return list.includes('2');
    },
  },
];

class AchievementSystem {
  constructor(progress) {
    this.progress = progress;
    this.state = this._load();
    this.unlocked = new Set(this.state.unlockedIds);

    // 自动补齐: history 上可能有已完成但未登记的旧进度
    // (例如先于本系统上线时完成的关卡)
    this._backfill();
  }

  _load() {
    try {
      if (typeof localStorage === 'undefined') return { unlockedIds: [] };
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.unlockedIds)) {
          return parsed;
        }
      }
    } catch (_) {}
    return { unlockedIds: [] };
  }

  _save() {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ unlockedIds: Array.from(this.unlocked) })
      );
    } catch (_) {}
  }

  /** 启动时自动解锁已完成关卡对应的成就 (用于版本升级) */
  _backfill() {
    if (!this.progress) return;
    let changed = false;
    try {
      const snapshot = this.progress.getSnapshot();
      for (const def of ACHIEVEMENT_DEFS) {
        if (this.unlocked.has(def.id)) continue;
        if (def.check(snapshot)) {
          this.unlocked.add(def.id);
          changed = true;
        }
      }
      if (changed) this._save();
    } catch (_) {}
  }

  /**
   * 检查所有成就, 解锁任何新增的
   * @returns {Array} 新解锁的成就定义列表
   */
  checkAndUnlock() {
    let snapshot;
    try {
      snapshot = this.progress ? this.progress.getSnapshot() : null;
    } catch (_) {
      snapshot = null;
    }
    if (!snapshot) return [];

    const newlyUnlocked = [];

    for (const def of ACHIEVEMENT_DEFS) {
      if (this.unlocked.has(def.id)) continue;
      try {
        if (def.check(snapshot)) {
          this.unlocked.add(def.id);
          newlyUnlocked.push(def);
        }
      } catch (_) {}
    }

    if (newlyUnlocked.length > 0) {
      this._save();
    }

    return newlyUnlocked;
  }

  has(id) {
    return this.unlocked.has(id);
  }

  getAll() {
    return ACHIEVEMENT_DEFS.map((d) => ({
      ...d,
      unlocked: this.unlocked.has(d.id),
    }));
  }

  getProgressPercent() {
    const total = ACHIEVEMENT_DEFS.length;
    return Math.round((this.unlocked.size / total) * 100);
  }

  getUnlockedCount() {
    return this.unlocked.size;
  }

  /** 调试 / 测试: 清空所有解锁记录 */
  reset() {
    this.unlocked = new Set();
    this._save();
  }
}

export { AchievementSystem, ACHIEVEMENT_DEFS };
export default AchievementSystem;
