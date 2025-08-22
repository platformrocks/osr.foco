import React from 'react';
import { VStack, IconButton, Spacer } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdLightMode, MdDarkMode, MdList, MdTimer } from 'react-icons/md';
import { useTheme } from 'next-themes';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <VStack
      width="60px"
      bg="gray.100"
      _dark={{
        bg: 'blackAlpha.50',
        borderRightColor: 'gray.900',
      }}
      borderRightWidth={1}
      p={2}
      gap={2}
      height="100vh"
    >
      <IconButton
        aria-label="Mission"
        size="md"
        variant={location.pathname === '/' ? 'solid' : 'ghost'}
        onClick={() => navigate('/')}
      >
        <MdTimer />
      </IconButton>

      <IconButton
        aria-label="Log"
        size="md"
        variant={location.pathname === '/log' ? 'solid' : 'ghost'}
        onClick={() => navigate('/log')}
      >
        <MdList />
      </IconButton>

      <Spacer />

      <IconButton
        aria-label="Toggle color mode"
        size="md"
        variant="ghost"
        onClick={toggleColorMode}
      >
        {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
      </IconButton>
    </VStack>
  );
};

export default Sidebar;
