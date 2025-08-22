import React, { useState } from 'react';
import { Flex, Input, IconButton, HStack } from '@chakra-ui/react';
import { MdMinimize, MdClose } from 'react-icons/md';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { invoke } from '@tauri-apps/api/core';

const TopBar: React.FC = () => {
  const [mission, setMission] = useState<string>('');

  const handleMinimize = async (): Promise<void> => {
    try {
      const appWindow = getCurrentWindow();
      if (appWindow) {
        await appWindow.minimize();
      } else {
        console.warn('Window instance not available');
      }
    } catch (error) {
      console.error('Failed to minimize window:', error);
      // Fallback using invoke
      try {
        await invoke('minimize_window');
      } catch (fallbackError) {
        console.error('Fallback minimize also failed:', fallbackError);
      }
    }
  };

  const handleClose = async (): Promise<void> => {
    try {
      const appWindow = getCurrentWindow();
      if (appWindow) {
        await appWindow.close();
      } else {
        console.warn('Window instance not available');
      }
    } catch (error) {
      console.error('Failed to close window:', error);
      // Fallback using invoke
      try {
        await invoke('close_window');
      } catch (fallbackError) {
        console.error('Fallback close also failed:', fallbackError);
      }
    }
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
        bg: 'blackAlpha.100',
        borderColor: 'gray.600',
      }}
    >
      <HStack gap={4} flex="1">
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
