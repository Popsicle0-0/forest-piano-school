/**
 * 每日登录 Streak 跟踪
 */

const STORAGE_KEY = 'forest-piano-streak';

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export class Streak {
  constructor() {
    this.state = this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { lastDate: null, streakCount: 0, longestStreak: 0 };
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (_) {}
  }

  /** Check in: returns streak info, possibly updating streak */
  checkIn() {
    const today = todayISO();
    if (this.state.lastDate === today) {
      // Already checked in today
      return { streak: this.state.streakCount, isNew: false };
    }

    const yesterday = (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();

    if (this.state.lastDate === yesterday) {
      // Continued streak
      this.state.streakCount += 1;
    } else if (this.state.lastDate !== null) {
      // Streak broken
      this.state.streakCount = 1;
    } else {
      // First visit
      this.state.streakCount = 1;
    }

    if (this.state.streakCount > this.state.longestStreak) {
      this.state.longestStreak = this.state.streakCount;
    }
    this.state.lastDate = today;
    this._save();

    return { streak: this.state.streakCount, isNew: true };
  }

  get() {
    return { streak: this.state.streakCount, longest: this.state.longestStreak };
  }
}
