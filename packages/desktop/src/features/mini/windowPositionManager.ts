interface WindowPosition {
  x: number;
  y: number;
}

const MINI_WINDOW_POSITION_KEY = 'foco-mini-window-position';

export class MiniWindowPositionManager {
  private static instance: MiniWindowPositionManager;

  private constructor() {}

  static getInstance(): MiniWindowPositionManager {
    if (!MiniWindowPositionManager.instance) {
      MiniWindowPositionManager.instance = new MiniWindowPositionManager();
    }
    return MiniWindowPositionManager.instance;
  }

  savePosition(x: number, y: number): void {
    try {
      const position: WindowPosition = { x, y };
      localStorage.setItem(MINI_WINDOW_POSITION_KEY, JSON.stringify(position));
    } catch (error) {
      console.error('Failed to save mini window position:', error);
    }
  }

  getSavedPosition(): WindowPosition | null {
    try {
      const saved = localStorage.getItem(MINI_WINDOW_POSITION_KEY);
      if (!saved) return null;

      const position: WindowPosition = JSON.parse(saved);

      // Validate the position data
      if (typeof position.x === 'number' && typeof position.y === 'number') {
        return position;
      }

      return null;
    } catch (error) {
      console.error('Failed to load mini window position:', error);
      return null;
    }
  }

  clearSavedPosition(): void {
    try {
      localStorage.removeItem(MINI_WINDOW_POSITION_KEY);
    } catch (error) {
      console.error('Failed to clear mini window position:', error);
    }
  }
}
