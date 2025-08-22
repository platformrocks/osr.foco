import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownParams {
  initialSeconds?: number;
  autoStart?: boolean;
  onComplete?: () => void;
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
}: UseCountdownParams = {}): UseCountdownReturn {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef<boolean>(false);

  // Calculate progress percentage (0-100)
  const percent = Math.max(
    0,
    Math.min(100, ((initialSeconds - seconds) / initialSeconds) * 100)
  );

  const start = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const pause = useCallback((): void => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((): void => {
    setIsRunning(false);
    setSeconds(initialSeconds);
    hasCompletedRef.current = false;
  }, [initialSeconds]);

  useEffect(() => {
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

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, onComplete]);

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
