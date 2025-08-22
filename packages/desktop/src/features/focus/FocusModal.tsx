import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, VStack, Text, IconButton } from '@chakra-ui/react';
import { IoContract } from 'react-icons/io5';
import { useTimerPersistence } from '@/lib/hooks/useTimerPersistence';
import TimerDisplay from './TimerDisplay';

interface FocusModalProps {
  isOpen: boolean;
  mission?: string;
  initialSeconds?: number;
  autoStart?: boolean;
  onClose: () => void;
  onRequestMini?: () => void;
  onComplete?: () => void;
}

const FocusModal: React.FC<FocusModalProps> = ({
  isOpen,
  mission = 'Mission',
  initialSeconds = 1500,
  autoStart = false,
  onClose,
  onRequestMini,
  onComplete,
}) => {
  const { timer, startTimer, pauseTimer, resumeTimer, resetTimer } =
    useTimerPersistence();

  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate current seconds from timer state
  const updateCurrentSeconds = useCallback(() => {
    if (!timer.startTs || !timer.durationSec) {
      setCurrentSeconds(0);
      setIsRunning(false);
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
      setIsRunning(false);
    } else {
      // Timer is running
      const elapsed = now - startTime;
      const remainingSeconds = Math.max(
        0,
        timer.durationSec - Math.floor(elapsed / 1000)
      );
      setCurrentSeconds(remainingSeconds);
      setIsRunning(true);

      // Check if timer completed
      if (remainingSeconds === 0) {
        onComplete?.();
        handleReset();
      }
    }
  }, [timer, onComplete]);

  // Update timer state when timer changes
  useEffect(() => {
    updateCurrentSeconds();
  }, [updateCurrentSeconds]);

  // Update every second when running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(updateCurrentSeconds, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, updateCurrentSeconds]);

  // Control functions
  const handleStart = useCallback(async () => {
    try {
      await startTimer(initialSeconds);
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  }, [startTimer, initialSeconds]);

  const handlePause = useCallback(async () => {
    try {
      await pauseTimer();
    } catch (error) {
      console.error('Failed to pause timer:', error);
    }
  }, [pauseTimer]);

  const handleResume = useCallback(async () => {
    try {
      await resumeTimer();
    } catch (error) {
      console.error('Failed to resume timer:', error);
    }
  }, [resumeTimer]);

  const handleReset = useCallback(async () => {
    try {
      await resetTimer();
    } catch (error) {
      console.error('Failed to reset timer:', error);
    }
  }, [resetTimer]);

  // Calculate progress percentage
  const percent = timer.durationSec
    ? Math.max(
        0,
        Math.min(
          100,
          ((timer.durationSec - currentSeconds) / timer.durationSec) * 100
        )
      )
    : 0;

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          event.preventDefault();
          if (isRunning) {
            handlePause();
          } else if (timer.pausedAt) {
            handleResume();
          } else {
            handleStart();
          }
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          handleReset();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    isRunning,
    timer.pausedAt,
    onClose,
    handlePause,
    handleResume,
    handleStart,
    handleReset,
  ]);

  // Auto-start logic when modal opens
  useEffect(() => {
    if (isOpen && autoStart && !isRunning && currentSeconds === 0) {
      handleStart();
    }
  }, [isOpen, autoStart, isRunning, currentSeconds, handleStart]);

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.800"
          _dark={{ bg: 'blackAlpha.900' }}
          backdropFilter="blur(4px)"
          zIndex={1000}
          role="dialog"
          aria-modal="true"
          aria-labelledby="focus-modal-title"
          ref={modalRef}
        >
          {/* Mini Mode Button - Bottom Right */}
          {onRequestMini && (
            <IconButton
              aria-label="Enter mini mode"
              position="absolute"
              bottom={6}
              right={6}
              size="lg"
              variant="ghost"
              color={'white'}
              onClick={onRequestMini}
              zIndex={10}
              _hover={{
                bg: 'gray.500',
                color: 'gray.800',
                _dark: { bg: 'gray.800' },
              }}
            >
              <IoContract />
            </IconButton>
          )}

          {/* Main Content */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            p={8}
          >
            <VStack gap={8} textAlign="center" maxW="600px">
              {/* Mission Title */}
              <Text
                id="focus-modal-title"
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                fontWeight="semibold"
                color="white"
                _dark={{ color: 'white' }}
                mb={4}
              >
                {mission}
              </Text>

              {/* Timer Display */}
              <TimerDisplay seconds={currentSeconds} />

              {/* Progress Bar */}
              <Box
                w="100%"
                mt={6}
                bg="gray.200"
                _dark={{ bg: 'gray.700' }}
                borderRadius="full"
                h={3}
              >
                <Box
                  h="100%"
                  bg="blue.500"
                  borderRadius="full"
                  width={`${percent}%`}
                  transition="width 0.3s ease"
                />
              </Box>

              {/* Timer Controls Info */}
              <VStack gap={2} mt={8} opacity={0.7}>
                <Text fontSize="sm" color="white" _dark={{ color: 'white' }}>
                  Press Space to {isRunning ? 'pause' : 'start'} • Press R to
                  reset
                </Text>
                <Text fontSize="sm" color="white" _dark={{ color: 'white' }}>
                  Press Esc to close session
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FocusModal;
