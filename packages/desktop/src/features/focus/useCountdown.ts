import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerSync } from './timerSync';

interface UseCountdownParams {
  initialSeconds?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  sync?: boolean; // New parameter to enable sync
}

interface UseCountdownReturn {
  seconds: number;
  isRunning: boolean;
  percent: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useCountdown({
  initialSeconds = 1500, // 25 minutes default
  autoStart = false,
  onComplete,
  sync = false,
}: UseCountdownParams = {}): UseCountdownReturn {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef<boolean>(false);
  const timerSync = useRef<TimerSync | null>(null);

  // Initialize timer sync if enabled
  useEffect(() => {
    if (sync) {
      timerSync.current = TimerSync.getInstance();

      // Subscribe to timer state changes
      const unsubscribe = timerSync.current.subscribe((state) => {
        if (state) {
          setSeconds(state.seconds);
          setIsRunning(state.isRunning);

          // Call onComplete if timer finished
          if (state.seconds === 0 && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
          }
        }
      });

      return unsubscribe;
    }
  }, [sync, onComplete]);

  // Calculate progress percentage (0-100)
  const percent = Math.max(
    0,
    Math.min(100, ((initialSeconds - seconds) / initialSeconds) * 100)
  );

  const start = useCallback((): void => {
    if (sync && timerSync.current) {
      const currentState = timerSync.current.getState();
      timerSync.current.setState({
        seconds: currentState?.seconds ?? seconds,
        isRunning: true,
        initialSeconds,
      });
    } else {
      setIsRunning(true);
    }
  }, [sync, seconds, initialSeconds]);

  const pause = useCallback((): void => {
    if (sync && timerSync.current) {
      const currentState = timerSync.current.getState();
      timerSync.current.setState({
        seconds: currentState?.seconds ?? seconds,
        isRunning: false,
        initialSeconds,
      });
    } else {
      setIsRunning(false);
    }
  }, [sync, seconds, initialSeconds]);

  const reset = useCallback((): void => {
    if (sync && timerSync.current) {
      timerSync.current.setState({
        seconds: initialSeconds,
        isRunning: false,
        initialSeconds,
      });
    } else {
      setIsRunning(false);
      setSeconds(initialSeconds);
    }
    hasCompletedRef.current = false;
  }, [sync, initialSeconds]);

  useEffect(() => {
    // Only run local timer if sync is disabled
    if (!sync) {
      if (isRunning && seconds > 0) {
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds - 1;

            // Call onComplete exactly once when reaching 0
            if (newSeconds === 0 && !hasCompletedRef.current) {
              hasCompletedRef.current = true;
              setIsRunning(false);
              onComplete?.();
            }

            return newSeconds;
          });
        }, 1000);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, onComplete, sync]);

  // Reset completion flag when seconds changes (due to reset)
  useEffect(() => {
    if (seconds === initialSeconds) {
      hasCompletedRef.current = false;
    }
  }, [seconds, initialSeconds]);

  return {
    seconds,
    isRunning,
    percent,
    start,
    pause,
    reset,
  };
}
