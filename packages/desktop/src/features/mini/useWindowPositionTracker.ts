import { useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { MiniWindowPositionManager } from './windowPositionManager';

export const useWindowPositionTracker = (): void => {
  useEffect(() => {
    let lastPosition = { x: 0, y: 0 };

    const trackPosition = async () => {
      try {
        const window = getCurrentWindow();
        const position = await window.outerPosition();

        // Check if position has changed
        if (position.x !== lastPosition.x || position.y !== lastPosition.y) {
          const positionManager = MiniWindowPositionManager.getInstance();
          positionManager.savePosition(position.x, position.y);
          lastPosition = { x: position.x, y: position.y };
        }
      } catch (error) {
        console.warn('Failed to track window position:', error);
      }
    };

    // Check position every 500ms when window might be moving
    const intervalId = setInterval(trackPosition, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
