/**
 * Entity-specific store API with validation and sanitization
 */

import { store } from './store';
import type { TimerState, WindowRect } from './schema';
import {
  DEFAULT_TIMER_STATE,
  DEFAULT_WINDOW_RECT,
  DEFAULT_MINI_WINDOW_RECT,
  isTimerState,
  isWindowRect,
  SCHEMA_VERSION,
} from './schema';

// Timer API
export async function getTimer(): Promise<TimerState> {
  const timer = await store.get('timer', DEFAULT_TIMER_STATE);
  return isTimerState(timer) ? timer : DEFAULT_TIMER_STATE;
}

export async function setTimer(patch: Partial<TimerState>): Promise<void> {
  const current = await getTimer();
  const updated = { ...current, ...patch };

  // Sanitize values
  if (updated.startTs !== null) {
    updated.startTs = Math.round(updated.startTs);
  }
  if (updated.durationSec !== null) {
    updated.durationSec = Math.max(0, Math.round(updated.durationSec));
  }
  if (updated.pausedAt !== null) {
    updated.pausedAt = Math.round(updated.pausedAt);
  }

  await store.set('timer', updated);
}

// Main window position API
export async function getMainWindowPos(): Promise<WindowRect> {
  const rect = await store.get('window.main', DEFAULT_WINDOW_RECT);
  return isWindowRect(rect) ? sanitizeWindowRect(rect) : DEFAULT_WINDOW_RECT;
}

export async function setMainWindowPos(rect: WindowRect): Promise<void> {
  const sanitized = sanitizeWindowRect(rect);
  await store.set('window.main', sanitized);
}

// Mini window position API
export async function getMiniWindowPos(): Promise<WindowRect> {
  const rect = await store.get('window.mini', DEFAULT_MINI_WINDOW_RECT);
  return isWindowRect(rect)
    ? sanitizeWindowRect(rect)
    : DEFAULT_MINI_WINDOW_RECT;
}

export async function setMiniWindowPos(rect: WindowRect): Promise<void> {
  const sanitized = sanitizeWindowRect(rect);
  await store.set('window.mini', sanitized);
}

// Schema version management
export async function getSchemaVersion(): Promise<number> {
  return await store.get('__schemaVersion', 0);
}

export async function setSchemaVersion(version: number): Promise<void> {
  await store.set('__schemaVersion', version);
}

export async function ensureSchemaVersion(): Promise<void> {
  const currentVersion = await getSchemaVersion();
  if (currentVersion < SCHEMA_VERSION) {
    await setSchemaVersion(SCHEMA_VERSION);
  }
}

// Utility functions
function sanitizeWindowRect(rect: WindowRect): WindowRect {
  return {
    x: Math.round(Math.max(-1000, Math.min(10000, rect.x))),
    y: Math.round(Math.max(-1000, Math.min(10000, rect.y))),
    w: Math.round(Math.max(200, Math.min(4000, rect.w))),
    h: Math.round(Math.max(150, Math.min(3000, rect.h))),
  };
}

// Convenience functions for common operations
export async function resetTimer(): Promise<void> {
  await setTimer(DEFAULT_TIMER_STATE);
}

export async function startTimer(durationSec: number): Promise<void> {
  await setTimer({
    startTs: Date.now(),
    durationSec,
    pausedAt: null,
  });
}

export async function pauseTimer(): Promise<void> {
  await setTimer({
    pausedAt: Date.now(),
  });
}

export async function resumeTimer(): Promise<void> {
  const current = await getTimer();
  if (current.pausedAt && current.startTs) {
    const pauseDuration = Date.now() - current.pausedAt;
    await setTimer({
      startTs: current.startTs + pauseDuration,
      pausedAt: null,
    });
  }
}
