/**
 * Example usage of the new persistence library
 * This file demonstrates how to replace old localStorage usage with the new store
 */

import { useEffect } from 'react';
import { Box, Button, VStack, Text, HStack } from '@chakra-ui/react';
import { useTimerPersistence, useWindowPosition } from '@/lib';

// Example 1: Timer Integration
export function ExampleTimerComponent() {
  const {
    timer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    isLoading,
    error,
  } = useTimerPersistence();

  if (isLoading) {
    return <Text>Loading timer state...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  const isRunning = timer.startTs && !timer.pausedAt;
  const isPaused = timer.startTs && timer.pausedAt;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentSeconds = () => {
    if (!timer.startTs || !timer.durationSec) return 0;

    const elapsed = timer.pausedAt
      ? timer.pausedAt - timer.startTs
      : Date.now() - timer.startTs;

    const elapsedSeconds = Math.floor(elapsed / 1000);
    return Math.max(0, timer.durationSec - elapsedSeconds);
  };

  return (
    <VStack gap={4} p={4}>
      <Text fontSize="4xl" fontFamily="mono">
        {formatTime(getCurrentSeconds())}
      </Text>

      <HStack gap={2}>
        <Button
          onClick={() => startTimer(1500)} // 25 minutes
          disabled={!!isRunning}
          colorScheme="green"
        >
          Start 25min
        </Button>

        <Button
          onClick={() => startTimer(300)} // 5 minutes
          disabled={!!isRunning}
          colorScheme="blue"
        >
          Start 5min
        </Button>

        {isRunning && (
          <Button onClick={pauseTimer} colorScheme="yellow">
            Pause
          </Button>
        )}

        {isPaused && (
          <Button onClick={resumeTimer} colorScheme="green">
            Resume
          </Button>
        )}

        <Button onClick={resetTimer} colorScheme="red" variant="outline">
          Reset
        </Button>
      </HStack>

      <Box fontSize="sm" color="gray.500">
        <Text>
          Status: {isRunning ? 'Running' : isPaused ? 'Paused' : 'Stopped'}
        </Text>
        {timer.startTs && (
          <Text>Started: {new Date(timer.startTs).toLocaleTimeString()}</Text>
        )}
        {timer.pausedAt && (
          <Text>Paused: {new Date(timer.pausedAt).toLocaleTimeString()}</Text>
        )}
      </Box>
    </VStack>
  );
}

// Example 2: Window Position Integration
export function ExampleWindowPositionComponent() {
  const { rect, saveRect, isLoading, error } = useWindowPosition('main');

  useEffect(() => {
    // Example: Listen to window resize/move events
    const handleResize = () => {
      const newRect = {
        x: window.screenX,
        y: window.screenY,
        w: window.innerWidth,
        h: window.innerHeight,
      };
      saveRect(newRect); // Automatically debounced
    };

    const handleMove = () => {
      const newRect = {
        x: window.screenX,
        y: window.screenY,
        w: rect.w,
        h: rect.h,
      };
      saveRect(newRect);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('beforeunload', handleMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeunload', handleMove);
    };
  }, [saveRect, rect.w, rect.h]);

  if (isLoading) {
    return <Text>Loading window position...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box p={4}>
      <Text fontWeight="bold" mb={2}>
        Window Position
      </Text>
      <VStack align="start" gap={1} fontSize="sm">
        <Text>X: {rect.x}px</Text>
        <Text>Y: {rect.y}px</Text>
        <Text>Width: {rect.w}px</Text>
        <Text>Height: {rect.h}px</Text>
      </VStack>

      <Button
        mt={4}
        size="sm"
        onClick={() =>
          saveRect({
            x: 100,
            y: 100,
            w: 800,
            h: 600,
          })
        }
      >
        Reset to Default Position
      </Button>
    </Box>
  );
}

// Example 3: Manual Store Usage (Advanced)
export function ExampleManualStoreUsage() {
  // This shows how you could extend the store for custom use cases
  // Note: You'd need to add these to the schema and API first

  return (
    <Box p={4}>
      <Text fontWeight="bold" mb={2}>
        Manual Store Usage (Advanced)
      </Text>
      <Text fontSize="sm" color="gray.600" mb={4}>
        This demonstrates how to extend the store for custom data. You would
        need to add custom keys to the schema and API.
      </Text>

      {/* This is just for demonstration - you'd implement actual store methods */}
      <VStack gap={3}>
        <Button
          onClick={() => {
            // Example: store.set('custom.userPreferences', { theme: 'dark' })
            console.log('Would save custom data to store');
          }}
        >
          Save Custom Data
        </Button>

        <Button
          onClick={() => {
            // Example: const data = await store.get('custom.userPreferences', {})
            console.log('Would load custom data from store');
          }}
        >
          Load Custom Data
        </Button>

        <Button
          onClick={async () => {
            // Force immediate persistence (usually not needed)
            const { store } = await import('@/lib');
            await store.persistNow();
            console.log('Forced immediate persistence');
          }}
        >
          Force Save Now
        </Button>
      </VStack>
    </Box>
  );
}
