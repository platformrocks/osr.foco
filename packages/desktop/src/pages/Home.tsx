import React, { useState } from 'react';
import { Box, VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import FooterBar from '@/components/FooterBar';

interface Objective {
  id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: 1, text: '', completed: false },
    { id: 2, text: '', completed: false },
    { id: 3, text: '', completed: false },
  ]);

  const updateObjective = (id: number, text: string): void => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, text } : obj))
    );
  };

  const toggleObjective = (id: number): void => {
    setObjectives((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, completed: !obj.completed } : obj
      )
    );
  };

  const startFocus = (): void => {
    // Focus functionality will be implemented later
    console.log('Start Focus clicked');
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <VStack gap={6} flex="1" align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Daily Objectives
        </Text>

        <Box
          p={6}
          bg="white"
          borderRadius="lg"
          shadow="sm"
          border="1px"
          borderColor="gray.200"
          _dark={{
            bg: 'gray.800',
            borderColor: 'gray.600',
          }}
        >
          <VStack gap={4}>
            {objectives.map((objective) => (
              <HStack key={objective.id} width="100%">
                <Checkbox
                  checked={objective.completed}
                  onCheckedChange={() => toggleObjective(objective.id)}
                />
                <Input
                  placeholder={`Objective ${objective.id}`}
                  value={objective.text}
                  onChange={(e) =>
                    updateObjective(objective.id, e.target.value)
                  }
                  variant="subtle"
                  size="md"
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box textAlign="center">
          <Button size="lg" onClick={startFocus} px={8} py={6} fontSize="lg">
            Start Focus
          </Button>
        </Box>
      </VStack>

      <FooterBar />
    </Box>
  );
};

export default Home;
