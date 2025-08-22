/**
 * React hook for timer persistence
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState } from '../store/schema';
import {
  getTimer,
  setTimer,
  resetTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
} from '../store/api';
import { initializeStoreWithMigration } from '../store/migrate';

interface UseTimerPersistenceReturn {
  timer: TimerState;
  setTimerPatch: (patch: Partial<TimerState>) => Promise<void>;
  resetTimer: () => Promise<void>;
  startTimer: (durationSec: number) => Promise<void>;
  pauseTimer: () => Promise<void>;
  resumeTimer: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useTimerPersistence(): UseTimerPersistenceReturn {
  const [timer, setTimerState] = useState<TimerState>({
    startTs: null,
    durationSec: null,
    pausedAt: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize store and load timer state
  useEffect(() => {
    async function initialize(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        // Ensure store is initialized only once
        if (!initPromiseRef.current) {
          initPromiseRef.current = initializeStoreWithMigration();
        }
        await initPromiseRef.current;

        // Load current timer state
        const currentTimer = await getTimer();
        setTimerState(currentTimer);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to initialize timer persistence';
        setError(errorMessage);
        console.error('Timer persistence initialization failed:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  // Update timer state with patch
  const setTimerPatch = useCallback(
    async (patch: Partial<TimerState>): Promise<void> => {
      try {
        setError(null);
        await setTimer(patch);

        // Update local state immediately for UI responsiveness
        setTimerState((prev) => ({ ...prev, ...patch }));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update timer';
        setError(errorMessage);
        console.error('Failed to update timer:', err);
        throw err;
      }
    },
    []
  );

  // Reset timer
  const handleResetTimer = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await resetTimer();

      const newState = {
        startTs: null,
        durationSec: null,
        pausedAt: null,
      };
      setTimerState(newState);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to reset timer';
      setError(errorMessage);
      console.error('Failed to reset timer:', err);
      throw err;
    }
  }, []);

  // Start timer
  const handleStartTimer = useCallback(
    async (durationSec: number): Promise<void> => {
      try {
        setError(null);
        await startTimer(durationSec);

        const newState = {
          startTs: Date.now(),
          durationSec,
          pausedAt: null,
        };
        setTimerState(newState);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to start timer';
        setError(errorMessage);
        console.error('Failed to start timer:', err);
        throw err;
      }
    },
    []
  );

  // Pause timer
  const handlePauseTimer = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await pauseTimer();

      setTimerState((prev) => ({
        ...prev,
        pausedAt: Date.now(),
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to pause timer';
      setError(errorMessage);
      console.error('Failed to pause timer:', err);
      throw err;
    }
  }, []);

  // Resume timer
  const handleResumeTimer = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const currentTimer = await getTimer();

      if (currentTimer.pausedAt && currentTimer.startTs) {
        const pauseDuration = Date.now() - currentTimer.pausedAt;
        await resumeTimer();

        setTimerState((prev) => ({
          ...prev,
          startTs: prev.startTs ? prev.startTs + pauseDuration : Date.now(),
          pausedAt: null,
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to resume timer';
      setError(errorMessage);
      console.error('Failed to resume timer:', err);
      throw err;
    }
  }, []);

  return {
    timer,
    setTimerPatch,
    resetTimer: handleResetTimer,
    startTimer: handleStartTimer,
    pauseTimer: handlePauseTimer,
    resumeTimer: handleResumeTimer,
    isLoading,
    error,
  };
}
