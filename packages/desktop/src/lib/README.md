# Foco Persistence Library

This library provides a robust, type-safe persistence layer for the Foco application using `@tauri-apps/plugin-store`.

## Features

- ✅ **Type-safe APIs** - All operations are fully typed with TypeScript
- ✅ **Performance optimized** - In-memory caching with debounced writes
- ✅ **React integration** - Ready-to-use hooks for React components
- ✅ **Automatic migration** - Seamlessly migrates from localStorage
- ✅ **Error handling** - Graceful fallbacks and comprehensive error handling
- ✅ **Minimal timer state** - Persists only essential data, calculates UI state
- ✅ **Batched writes** - Multiple changes are batched to reduce I/O
- ✅ **Auto-flush** - Automatically saves on critical events

## Quick Start

### Timer Persistence

```tsx
import { useTimerPersistence } from '@/lib';

function TimerComponent() {
  const { timer, startTimer, pauseTimer, resetTimer, isLoading } =
    useTimerPersistence();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => startTimer(1500)}>Start 25min</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

### Window Position Tracking

```tsx
import { useWindowPosition } from '@/lib';

function WindowComponent() {
  const { rect, saveRect } = useWindowPosition('main');

  const handleMove = () => {
    saveRect({
      x: window.screenX,
      y: window.screenY,
      w: window.innerWidth,
      h: window.innerHeight,
    });
  };

  return (
    <div>
      Window at {rect.x}, {rect.y}
    </div>
  );
}
```

## API Reference

### Hooks

#### `useTimerPersistence()`

Returns timer state and control functions:

- `timer: TimerState` - Current timer state
- `startTimer(durationSec: number)` - Start a new timer
- `pauseTimer()` - Pause the running timer
- `resumeTimer()` - Resume a paused timer
- `resetTimer()` - Reset timer to initial state
- `setTimerPatch(patch: Partial<TimerState>)` - Update timer state
- `isLoading: boolean` - Loading state
- `error: string | null` - Error state

#### `useWindowPosition(windowType: 'main' | 'mini')`

Returns window position state and save function:

- `rect: WindowRect` - Current window rectangle
- `saveRect(newRect: WindowRect)` - Save new position (debounced)
- `isLoading: boolean` - Loading state
- `error: string | null` - Error state

### Direct API

For advanced use cases, you can use the direct API:

```tsx
import { getTimer, setTimer, getMainWindowPos, store } from '@/lib';

// Initialize store (only needed if not using hooks)
await store.init();

// Get current timer state
const timer = await getTimer();

// Update timer
await setTimer({ durationSec: 1800 });

// Get window position
const windowPos = await getMainWindowPos();

// Force immediate save (usually not needed)
await store.persistNow();
```

## Architecture

### Schema

The store uses a flat key structure:

```json
{
  "timer": {
    "startTs": 1640995200000,
    "durationSec": 1500,
    "pausedAt": null
  },
  "window.main": { "x": 100, "y": 100, "w": 800, "h": 600 },
  "window.mini": { "x": 200, "y": 200, "w": 300, "h": 200 },
  "__schemaVersion": 1
}
```

### Performance Strategy

1. **Minimal Timer State**: Only persists `startTs`, `durationSec`, and `pausedAt`. Current countdown is calculated in the UI.

2. **Debounced Writes**:
   - Timer: Only on state transitions (start/pause/resume/reset)
   - Window positions: 300ms debounce during drag/resize

3. **Automatic Flush**: Saves on:
   - Page visibility change (hidden)
   - Before page unload
   - Window blur

4. **In-Memory Cache**: Fast reads from memory, immediate UI updates

### Migration

Automatically migrates from localStorage on first run:

- Searches for legacy keys like `foco_timer_state`, `timer_start_time`, etc.
- Migrates found data to new store format
- Sets schema version and cleans up old entries

## File Structure

```
src/lib/
├── index.ts              # Main exports
├── examples.tsx          # Usage examples
├── store/
│   ├── store.ts         # Core store wrapper
│   ├── api.ts           # Entity-specific APIs
│   ├── schema.ts        # Types and validation
│   └── migrate.ts       # Migration utilities
└── hooks/
    ├── useTimerPersistence.ts    # Timer hook
    └── useWindowPosition.ts      # Window position hook
```

## Error Handling

The library includes comprehensive error handling:

- All store operations are wrapped in try/catch
- Errors are logged with context information
- Hooks expose error state for UI handling
- Graceful fallbacks to default values
- Failed writes are retried on next flush opportunity

## Development

### Running Examples

See `src/lib/examples.tsx` for complete usage examples.

### Testing

The store can be initialized with custom filenames for testing:

```tsx
import { store } from '@/lib';

// Use test-specific store
await store.init('test-store.json');
```

### Debugging

Window position debugging is available in development:

```tsx
// Available in dev mode
window.debugWindowPosition?.();
```

## Migration Guide

### From localStorage

The library automatically migrates from localStorage. No manual intervention needed.

### From Old Timer System

Replace direct localStorage usage:

```tsx
// OLD
const timer = JSON.parse(localStorage.getItem('timer') || '{}');
localStorage.setItem('timer', JSON.stringify(newTimer));

// NEW
const { timer, setTimerPatch } = useTimerPersistence();
await setTimerPatch({ durationSec: 1500 });
```

### From Old Window Position System

Replace manual window tracking:

```tsx
// OLD
const savePosition = () => {
  localStorage.setItem(
    'windowPos',
    JSON.stringify({
      x: window.screenX,
      y: window.screenY,
    })
  );
};

// NEW
const { saveRect } = useWindowPosition('main');
saveRect({ x: window.screenX, y: window.screenY, w: 800, h: 600 });
```

## Troubleshooting

### Store not initialized

Make sure to call `store.init()` or use the hooks which initialize automatically.

### Performance issues

- Check if you're calling save functions too frequently
- Use the provided debounced save functions
- Avoid calling `persistNow()` unless absolutely necessary

### Migration issues

- Check browser console for migration logs
- Ensure old localStorage keys are accessible
- Verify write permissions for store file

### Type errors

Make sure to import types from the main index:

```tsx
import type { TimerState, WindowRect } from '@/lib';
```
