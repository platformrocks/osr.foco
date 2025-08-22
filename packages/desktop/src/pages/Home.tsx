import React, { useState } from 'react';
import { Box, VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import FooterBar from '@/components/FooterBar';
import FocusModal from '@/features/focus/FocusModal';

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
  const [isFocusOpen, setIsFocusOpen] = useState<boolean>(false);
  const [missionTitle, setMissionTitle] = useState<string>('Focus Session');

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
    // Get the first non-empty objective as mission title, or use default
    const activeObjective = objectives.find((obj) => obj.text.trim() !== '');
    if (activeObjective) {
      setMissionTitle(activeObjective.text);
    }
    setIsFocusOpen(true);
  };

  const handleFocusClose = (): void => {
    setIsFocusOpen(false);
  };

  const handleFocusComplete = (): void => {
    console.log('Focus session completed!');
    setIsFocusOpen(false);
  };

  const handleRequestMini = (): void => {
    console.info('mini mode requested - placeholder for future IPC');
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <VStack gap={6} flex="1" align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="left" ml={4}>
          Daily Objectives
        </Text>

        <Box
          p={6}
          bg="gray.50"
          borderRadius="lg"
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
                <Input
                  placeholder={`Objective ${objective.id}`}
                  value={objective.text}
                  borderBottomColor={'gray.300'}
                  _dark={{
                    borderBottomColor: 'gray.600',
                  }}
                  onChange={(e) =>
                    updateObjective(objective.id, e.target.value)
                  }
                  variant="subtle"
                  size="md"
                />
                <Checkbox
                  checked={objective.completed}
                  onCheckedChange={() => toggleObjective(objective.id)}
                  size={'lg'}
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box textAlign="center">
          <Button
            size="lg"
            onClick={startFocus}
            px={8}
            py={6}
            fontSize="lg"
            borderRadius={'2xl'}
          >
            Start Focus
          </Button>
        </Box>
      </VStack>

      <FooterBar />

      {/* Focus Modal */}
      <FocusModal
        isOpen={isFocusOpen}
        mission={missionTitle}
        initialSeconds={1500}
        autoStart={false}
        onClose={handleFocusClose}
        onRequestMini={handleRequestMini}
        onComplete={handleFocusComplete}
      />
    </Box>
  );
};

export default Home;
