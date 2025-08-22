/**
 * Schema types and runtime guards for persistent store
 */

export interface TimerState {
  startTs: number | null;
  durationSec: number | null;
  pausedAt: number | null;
}

export interface WindowRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface StoreSchema {
  timer: TimerState;
  'window.main': WindowRect;
  'window.mini': WindowRect;
  __schemaVersion: number;
}

export type StoreKey = keyof StoreSchema;

// Runtime type guards
export function isTimerState(value: unknown): value is TimerState {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;

  return (
    (obj.startTs === null || typeof obj.startTs === 'number') &&
    (obj.durationSec === null || typeof obj.durationSec === 'number') &&
    (obj.pausedAt === null || typeof obj.pausedAt === 'number')
  );
}

export function isWindowRect(value: unknown): value is WindowRect {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;

  return (
    typeof obj.x === 'number' &&
    typeof obj.y === 'number' &&
    typeof obj.w === 'number' &&
    typeof obj.h === 'number'
  );
}

// Default values
export const DEFAULT_TIMER_STATE: TimerState = {
  startTs: null,
  durationSec: null,
  pausedAt: null,
};

export const DEFAULT_WINDOW_RECT: WindowRect = {
  x: 100,
  y: 100,
  w: 800,
  h: 600,
};

export const DEFAULT_MINI_WINDOW_RECT: WindowRect = {
  x: 200,
  y: 200,
  w: 300,
  h: 200,
};

export const SCHEMA_VERSION = 1;
