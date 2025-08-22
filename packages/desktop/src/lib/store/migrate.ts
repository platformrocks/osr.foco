/**
 * Migration utilities for moving from localStorage to plugin-store
 */

import { store } from './store';
import { getSchemaVersion, setSchemaVersion, ensureSchemaVersion } from './api';
import type { TimerState, WindowRect } from './schema';
import { SCHEMA_VERSION } from './schema';

interface LegacyTimerState {
  startTime?: number;
  duration?: number;
  pausedAt?: number;
  isRunning?: boolean;
  isPaused?: boolean;
}

export async function migrateFromLocalStorage(): Promise<void> {
  const currentVersion = await getSchemaVersion();

  // Skip if already migrated
  if (currentVersion >= SCHEMA_VERSION) {
    return;
  }

  console.info('Starting migration from localStorage...');

  try {
    // Migrate timer state
    await migrateTimerState();

    // Migrate window positions
    await migrateWindowPositions();

    // Mark migration as complete
    await setSchemaVersion(SCHEMA_VERSION);

    // Clean up old localStorage entries
    cleanupLocalStorage();

    console.info('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

async function migrateTimerState(): Promise<void> {
  const legacyKeys = [
    'foco_timer_state',
    'foco_timer_start',
    'foco_timer_duration',
    'foco_timer_paused',
    'timer_state',
    'timer_start_time',
    'timer_duration',
    'timer_paused_at',
  ];

  let migratedTimer: Partial<TimerState> = {};

  // Try to find and migrate timer data from various possible keys
  for (const key of legacyKeys) {
    const value = localStorage.getItem(key);
    if (!value) continue;

    try {
      if (key.includes('state')) {
        // Try to parse complete state object
        const parsed = JSON.parse(value) as LegacyTimerState;
        migratedTimer = {
          startTs: parsed.startTime || parsed.startTime || null,
          durationSec: parsed.duration
            ? Math.floor(parsed.duration / 1000)
            : null,
          pausedAt: parsed.pausedAt || null,
        };
      } else if (key.includes('start')) {
        migratedTimer.startTs = parseInt(value, 10) || null;
      } else if (key.includes('duration')) {
        const duration = parseInt(value, 10);
        migratedTimer.durationSec = duration
          ? Math.floor(duration / 1000)
          : null;
      } else if (key.includes('paused')) {
        migratedTimer.pausedAt = parseInt(value, 10) || null;
      }
    } catch (error) {
      console.warn(`Failed to parse legacy timer key ${key}:`, error);
    }
  }

  // Save migrated timer state if we found any data
  if (Object.keys(migratedTimer).length > 0) {
    const completeTimer: TimerState = {
      startTs: migratedTimer.startTs ?? null,
      durationSec: migratedTimer.durationSec ?? null,
      pausedAt: migratedTimer.pausedAt ?? null,
    };

    await store.set('timer', completeTimer);
    console.info('Migrated timer state:', completeTimer);
  }
}

async function migrateWindowPositions(): Promise<void> {
  const windowKeys = [
    { legacy: 'foco_window_position', storeKey: 'window.main' as const },
    { legacy: 'foco_main_window_rect', storeKey: 'window.main' as const },
    { legacy: 'main_window_position', storeKey: 'window.main' as const },
    { legacy: 'foco_mini_window_position', storeKey: 'window.mini' as const },
    { legacy: 'foco_mini_window_rect', storeKey: 'window.mini' as const },
    { legacy: 'mini_window_position', storeKey: 'window.mini' as const },
  ];

  for (const { legacy, storeKey } of windowKeys) {
    const value = localStorage.getItem(legacy);
    if (!value) continue;

    try {
      const parsed = JSON.parse(value);

      // Try different possible formats
      let rect: WindowRect | null = null;

      if (parsed.x !== undefined && parsed.y !== undefined) {
        rect = {
          x: parsed.x || 0,
          y: parsed.y || 0,
          w: parsed.w || parsed.width || 800,
          h: parsed.h || parsed.height || 600,
        };
      } else if (parsed.position && parsed.size) {
        rect = {
          x: parsed.position.x || 0,
          y: parsed.position.y || 0,
          w: parsed.size.width || 800,
          h: parsed.size.height || 600,
        };
      }

      if (rect) {
        await store.set(storeKey, rect);
        console.info(`Migrated ${storeKey} position:`, rect);
      }
    } catch (error) {
      console.warn(`Failed to parse legacy window key ${legacy}:`, error);
    }
  }
}

function cleanupLocalStorage(): void {
  const keysToRemove = [
    // Timer keys
    'foco_timer_state',
    'foco_timer_start',
    'foco_timer_duration',
    'foco_timer_paused',
    'timer_state',
    'timer_start_time',
    'timer_duration',
    'timer_paused_at',
    // Window position keys
    'foco_window_position',
    'foco_main_window_rect',
    'main_window_position',
    'foco_mini_window_position',
    'foco_mini_window_rect',
    'mini_window_position',
    // Other potential legacy keys
    'foco_settings',
    'foco_config',
  ];

  let removedCount = 0;
  for (const key of keysToRemove) {
    if (localStorage.getItem(key) !== null) {
      localStorage.removeItem(key);
      removedCount++;
    }
  }

  if (removedCount > 0) {
    console.info(`Cleaned up ${removedCount} legacy localStorage entries`);
  }
}

// Initialize migration on first store access
export async function initializeStoreWithMigration(): Promise<void> {
  // Initialize store first
  await store.init();

  // Run migration if needed
  await migrateFromLocalStorage();

  // Ensure schema version is up to date
  await ensureSchemaVersion();
}
