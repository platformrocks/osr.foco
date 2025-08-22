interface TimerState {
  seconds: number;
  isRunning: boolean;
  initialSeconds: number;
  startTime?: number;
}

const TIMER_STORAGE_KEY = 'foco-timer-state';

export class TimerSync {
  private static instance: TimerSync;
  private listeners: ((state: TimerState | null) => void)[] = [];
  private pollInterval?: NodeJS.Timeout;

  private constructor() {
    // Poll for changes every 100ms
    this.pollInterval = setInterval(() => {
      this.notifyListeners();
    }, 100);
  }

  static getInstance(): TimerSync {
    if (!TimerSync.instance) {
      TimerSync.instance = new TimerSync();
    }
    return TimerSync.instance;
  }

  getState(): TimerState | null {
    try {
      const stored = localStorage.getItem(TIMER_STORAGE_KEY);
      if (!stored) return null;

      const state: TimerState = JSON.parse(stored);

      // If timer is running, calculate current seconds based on elapsed time
      if (state.isRunning && state.startTime) {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const currentSeconds = Math.max(0, state.seconds - elapsed);

        return {
          ...state,
          seconds: currentSeconds,
        };
      }

      return state;
    } catch {
      return null;
    }
  }

  setState(state: TimerState): void {
    try {
      const stateToSave = {
        ...state,
        startTime: state.isRunning
          ? Date.now() - (state.initialSeconds - state.seconds) * 1000
          : undefined,
      };
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stateToSave));
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to save timer state:', error);
    }
  }

  subscribe(callback: (state: TimerState | null) => void): () => void {
    this.listeners.push(callback);

    // Immediately call with current state
    callback(this.getState());

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  clear(): void {
    localStorage.removeItem(TIMER_STORAGE_KEY);
    this.notifyListeners();
  }

  destroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    this.listeners = [];
  }
}
