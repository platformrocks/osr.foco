import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { IoExpand } from 'react-icons/io5';
import { restoreFromMini } from '@/features/mini/restoreFromMini';
import { useTimerPersistence } from '@/lib/hooks/useTimerPersistence';
import { useWindowPositionTracker } from '@/features/mini/useWindowPositionTracker';

const Mini: React.FC = () => {
  // Track window position changes
  useWindowPositionTracker();

  // Use the new timer persistence system
  const { timer } = useTimerPersistence();
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  // Calculate current seconds from timer state
  const updateCurrentSeconds = useCallback(() => {
    if (!timer.startTs || !timer.durationSec) {
      setCurrentSeconds(0);
      return;
    }

    const now = Date.now();
    const startTime = timer.startTs;
    const pausedAt = timer.pausedAt;

    if (pausedAt) {
      // Timer is paused
      const elapsedBeforePause = pausedAt - startTime;
      const remainingSeconds = Math.max(
        0,
        timer.durationSec - Math.floor(elapsedBeforePause / 1000)
      );
      setCurrentSeconds(remainingSeconds);
    } else {
      // Timer is running
      const elapsed = now - startTime;
      const remainingSeconds = Math.max(
        0,
        timer.durationSec - Math.floor(elapsed / 1000)
      );
      setCurrentSeconds(remainingSeconds);
    }
  }, [timer]);

  // Update timer state when timer changes
  useEffect(() => {
    updateCurrentSeconds();
  }, [updateCurrentSeconds]);

  // Update every second when running
  useEffect(() => {
    const isRunning = timer.startTs && !timer.pausedAt;

    if (isRunning) {
      const interval = setInterval(updateCurrentSeconds, 1000);
      return () => clearInterval(interval);
    }
  }, [timer.startTs, timer.pausedAt, updateCurrentSeconds]);

  const handleExitMini = async (): Promise<void> => {
    try {
      await restoreFromMini();
    } catch (error) {
      console.error('Failed to exit mini mode:', error);
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      bg="blackAlpha.100"
      color="white"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
      {/* Draggable Area - covers most of the window */}
      <Box
        data-tauri-drag-region="true"
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
        cursor="move"
        _hover={{
          bg: 'gray.800',
        }}
        transition="background-color 0.2s"
        userSelect="none"
        style={
          {
            WebkitAppRegion: 'drag',
          } as React.CSSProperties
        }
      >
        {/* Timer Display */}
        <Text
          fontSize="4xl"
          fontWeight="bold"
          fontFamily="mono"
          letterSpacing="wider"
          mb={2}
          pointerEvents="none"
          style={
            {
              WebkitAppRegion: 'drag',
            } as React.CSSProperties
          }
        >
          {formatTime(currentSeconds)}
        </Text>

        {/* Status */}
        <Text
          fontSize="xs"
          opacity={0.7}
          pointerEvents="none"
          style={
            {
              WebkitAppRegion: 'drag',
            } as React.CSSProperties
          }
        >
          Focus Session
        </Text>
      </Box>

      {/* Exit Button - positioned in top-right corner */}
      <Box
        position="absolute"
        top={2}
        right={2}
        zIndex={10}
        style={
          {
            WebkitAppRegion: 'no-drag',
          } as React.CSSProperties
        }
      >
        <IconButton
          aria-label="Expand to main window"
          size="xs"
          variant="ghost"
          onClick={() => void handleExitMini()}
          color="white"
          _hover={{
            bg: 'gray.700',
            color: 'gray.300',
          }}
          style={
            {
              WebkitAppRegion: 'no-drag',
            } as React.CSSProperties
          }
        >
          <IoExpand />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Mini;
