import React, { useEffect, useRef } from 'react';
import { Box, VStack, Text, IconButton } from '@chakra-ui/react';
import { IoContract } from 'react-icons/io5';
import { useCountdown } from './useCountdown';
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
  const { seconds, isRunning, percent, start, pause, reset } = useCountdown({
    initialSeconds,
    autoStart: autoStart && isOpen,
    onComplete,
  });

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
            pause();
          } else {
            start();
          }
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          reset();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isRunning, onClose, pause, start, reset]);

  // Auto-start logic when modal opens
  useEffect(() => {
    if (isOpen && autoStart && !isRunning && seconds === initialSeconds) {
      start();
    }
  }, [isOpen, autoStart, isRunning, seconds, initialSeconds, start]);

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
              onClick={onRequestMini}
              zIndex={10}
              _hover={{
                bg: 'gray.100',
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
              <TimerDisplay seconds={seconds} />

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
