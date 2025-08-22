/**
 * React hook for window position persistence
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { WindowRect } from '../store/schema';
import {
  getMainWindowPos,
  setMainWindowPos,
  getMiniWindowPos,
  setMiniWindowPos,
} from '../store/api';
import { initializeStoreWithMigration } from '../store/migrate';

type WindowType = 'main' | 'mini';

interface UseWindowPositionReturn {
  rect: WindowRect;
  saveRect: (newRect: WindowRect) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useWindowPosition(
  windowType: WindowType
): UseWindowPositionReturn {
  const [rect, setRect] = useState<WindowRect>({
    x: 100,
    y: 100,
    w: 800,
    h: 600,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);
  const saveTimeoutRef = useRef<number | null>(null);

  // Load window position on mount
  useEffect(() => {
    async function loadPosition(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        // Ensure store is initialized only once
        if (!initPromiseRef.current) {
          initPromiseRef.current = initializeStoreWithMigration();
        }
        await initPromiseRef.current;

        // Load position based on window type
        const position =
          windowType === 'main'
            ? await getMainWindowPos()
            : await getMiniWindowPos();
        setRect(position);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load window position';
        setError(errorMessage);
        console.error('Window position loading failed:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosition();
  }, [windowType]);

  // Debounced save function
  const saveRect = useCallback(
    async (newRect: WindowRect): Promise<void> => {
      try {
        setError(null);

        // Update local state immediately for UI responsiveness
        setRect(newRect);

        // Clear existing timeout
        if (saveTimeoutRef.current !== null) {
          clearTimeout(saveTimeoutRef.current);
        }

        // Debounce save to avoid excessive writes during drag/resize
        saveTimeoutRef.current = window.setTimeout(async () => {
          try {
            if (windowType === 'main') {
              await setMainWindowPos(newRect);
            } else {
              await setMiniWindowPos(newRect);
            }
          } catch (saveError) {
            const errorMessage =
              saveError instanceof Error
                ? saveError.message
                : 'Failed to save window position';
            setError(errorMessage);
            console.error('Failed to save window position:', saveError);
          }
        }, 300); // 300ms debounce
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to update window position';
        setError(errorMessage);
        console.error('Failed to update window position:', err);
        throw err;
      }
    },
    [windowType]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current !== null) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    rect,
    saveRect,
    isLoading,
    error,
  };
}
