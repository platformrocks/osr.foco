/**
 * Store persistence library exports
 */

// Core store functionality
export { store } from './store/store';

// Entity-specific APIs
export {
  getTimer,
  setTimer,
  resetTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  getMainWindowPos,
  setMainWindowPos,
  getMiniWindowPos,
  setMiniWindowPos,
  getSchemaVersion,
  setSchemaVersion,
  ensureSchemaVersion,
} from './store/api';

// Types and schema
export type {
  TimerState,
  WindowRect,
  StoreSchema,
  StoreKey,
} from './store/schema';
export {
  DEFAULT_TIMER_STATE,
  DEFAULT_WINDOW_RECT,
  DEFAULT_MINI_WINDOW_RECT,
  SCHEMA_VERSION,
  isTimerState,
  isWindowRect,
} from './store/schema';

// Migration utilities
export {
  migrateFromLocalStorage,
  initializeStoreWithMigration,
} from './store/migrate';

// React hooks
export { useTimerPersistence } from './hooks/useTimerPersistence';
export { useWindowPosition } from './hooks/useWindowPosition';
