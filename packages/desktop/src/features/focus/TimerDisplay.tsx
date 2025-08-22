import React from 'react';
import { Text } from '@chakra-ui/react';

interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => {
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Text
      fontSize={{
        base: 'clamp(3rem, 8vw, 6rem)',
        md: 'clamp(4rem, 10vw, 8rem)',
        lg: 'clamp(5rem, 12vw, 10rem)',
      }}
      fontWeight="bold"
      color="white"
      _dark={{ color: 'white' }}
      textAlign="center"
      fontFamily="mono"
      textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
      letterSpacing="0.05em"
    >
      {formatTime(seconds)}
    </Text>
  );
};

export default TimerDisplay;
