# Persistence Architecture

This document describes the persistence layer implementation using `@tauri-apps/plugin-store` for the Foco application.

## Overview

The persistence layer is designed to provide efficient, type-safe, and performant storage for application state. It replaces the previous ad-hoc localStorage approach with a unified store system.

## Architecture

### Core Components

1. **Store Wrapper** (`src/lib/store/store.ts`)
   - Singleton wrapper around Tauri's plugin-store
   - In-memory caching for fast reads
   - Debounced writes to minimize disk I/O
   - Automatic flush on critical events

2. **Entity APIs** (`src/lib/store/api.ts`)
   - High-level, type-safe APIs for specific entities
   - Input validation and sanitization
   - Semantic operations (start/pause/resume timer)

3. **React Hooks** (`src/lib/hooks/`)
   - `useTimerPersistence` - Timer state management
   - `useWindowPosition` - Window position tracking
   - Automatic initialization and error handling

4. **Migration System** (`src/lib/store/migrate.ts`)
   - One-time migration from localStorage
   - Backward compatibility
   - Schema versioning

## Schema

The store uses a flat key structure stored in `foco.store.json`:

```json
{
  "timer": {
    "startTs": 1640995200000,
    "durationSec": 1500,
    "pausedAt": null
  },
  "window.main": {
    "x": 100,
    "y": 100,
    "w": 800,
    "h": 600
  },
  "window.mini": {
    "x": 200,
    "y": 200,
    "w": 300,
    "h": 200
  },
  "__schemaVersion": 1
}
```

### Timer State

The timer persists only essential state to enable recovery across app restarts:

- `startTs`: When the timer was started (timestamp)
- `durationSec`: Total timer duration in seconds
- `pausedAt`: When the timer was paused (timestamp), null if running

**Key Design Decision**: We do NOT persist current countdown values or tick updates. Instead, the UI calculates the current time remaining based on the persistent state. This dramatically reduces write frequency and improves performance.

### Window Positions

Window positions are stored as simple rectangles:

- `x`, `y`: Window position coordinates
- `w`, `h`: Window dimensions

## Performance Optimizations

### Debounced Persistence

- **Timer**: Only persists on state transitions (start/pause/resume/reset), not on every tick
- **Window positions**: Debounced with 300ms delay during drag/resize operations
- **Batching**: Multiple changes are batched into single disk writes

### Flush Triggers

The store automatically flushes pending changes on:

- `visibilitychange` event (when page becomes hidden)
- `beforeunload` event (before page unloads)
- `blur` event (when window loses focus)

### Caching Strategy

- All reads first check in-memory cache
- Cache is updated immediately on writes for UI responsiveness
- Cache invalidation is not needed due to single-app usage

## Usage Examples

### Timer Persistence

```typescript
import { useTimerPersistence } from '@/lib';

function TimerComponent() {
  const { timer, startTimer, pauseTimer, resumeTimer, resetTimer, isLoading } = useTimerPersistence();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>Time remaining: {calculateTimeRemaining(timer)}</div>
      <button onClick={() => startTimer(1500)}>Start 25min</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resumeTimer}>Resume</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

### Window Position Tracking

```typescript
import { useWindowPosition } from '@/lib';

function WindowComponent() {
  const { rect, saveRect } = useWindowPosition('main');

  useEffect(() => {
    // Listen to window move/resize events
    const handleResize = () => {
      const newRect = {
        x: window.screenX,
        y: window.screenY,
        w: window.innerWidth,
        h: window.innerHeight,
      };
      saveRect(newRect); // Automatically debounced
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [saveRect]);

  return <div>Window at {rect.x}, {rect.y}</div>;
}
```

### Direct Store Access (Advanced)

```typescript
import { getTimer, setTimer, store } from '@/lib';

// Initialize store manually if not using hooks
await store.init();

// Get timer state
const timer = await getTimer();

// Update timer with validation
await setTimer({ durationSec: 1800 }); // 30 minutes

// Force immediate persistence
await store.persistNow();
```

## Migration

The system automatically migrates from localStorage on first run:

1. Checks current schema version
2. If version < 1, searches for legacy localStorage keys
3. Migrates found data to new store format
4. Sets schema version to 1
5. Cleans up old localStorage entries

Supported legacy keys:

- Timer: `foco_timer_state`, `timer_start_time`, `timer_duration`, etc.
- Windows: `foco_window_position`, `main_window_position`, etc.

## Error Handling

- All store operations include try/catch blocks
- Errors are logged to console with context
- Hooks expose error state for UI handling
- Graceful fallbacks to default values on read failures
- Failed writes are retried on next flush

## Testing Considerations

- Store can be initialized with custom filename for testing
- In-memory mode available for unit tests
- Mock implementation can replace store singleton
- Migration can be tested with pre-populated localStorage

## Future Enhancements

- Compression for large state objects
- Automatic backup/restore functionality
- Store encryption for sensitive data
- Cross-window state synchronization
- Store analytics and performance monitoring
