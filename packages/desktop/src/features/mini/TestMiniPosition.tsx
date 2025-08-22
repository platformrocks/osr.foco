/**
 * Test integration of mini window position persistence
 */

import { useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useWindowPosition } from '@/lib/hooks/useWindowPosition';

export function TestMiniWindowPosition() {
  const { rect, saveRect, isLoading, error } = useWindowPosition('mini');

  useEffect(() => {
    console.log('Mini window position loaded:', rect);
  }, [rect]);

  const handleSaveTest = () => {
    saveRect({
      x: 100,
      y: 100,
      w: 320,
      h: 180,
    });
    console.log('Test position saved');
  };

  if (isLoading) {
    return <Text>Loading position...</Text>;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box p={4}>
      <Text fontWeight="bold" mb={2}>
        Mini Window Position Test
      </Text>
      <Text>
        Current position: x={rect.x}, y={rect.y}
      </Text>
      <Text>
        Current size: w={rect.w}, h={rect.h}
      </Text>
      <Button mt={2} onClick={handleSaveTest}>
        Save Test Position (100, 100)
      </Button>
    </Box>
  );
}
