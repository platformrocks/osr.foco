import React, { useState } from 'react';
import { Flex, Input, IconButton, Text, HStack } from '@chakra-ui/react';
import { MdMinimize, MdClose } from 'react-icons/md';

const TopBar: React.FC = () => {
  const [mission, setMission] = useState<string>('');

  const handleMinimize = (): void => {
    // Minimize functionality will be implemented later with Tauri
    console.log('Minimize clicked');
  };

  const handleClose = (): void => {
    // Close functionality will be implemented later with Tauri
    console.log('Close clicked');
  };

  return (
    <Flex
      height="50px"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      align="center"
      px={4}
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      _dark={{
        bg: 'gray.700',
        borderColor: 'gray.600',
      }}
    >
      <HStack gap={4} flex="1">
        <Text fontWeight="bold" fontSize="lg" color="brand.600">
          FOCO
        </Text>

        <Input
          placeholder="What are we doing today?"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          variant="subtle"
          size="sm"
          maxWidth="400px"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        />
      </HStack>

      <HStack
        gap={1}
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <IconButton
          aria-label="Minimize"
          size="sm"
          variant="ghost"
          onClick={handleMinimize}
        >
          <MdMinimize />
        </IconButton>
        <IconButton
          aria-label="Close"
          size="sm"
          variant="ghost"
          onClick={handleClose}
        >
          <MdClose />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default TopBar;
