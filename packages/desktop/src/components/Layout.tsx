import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex height="100vh" direction="row" overflow={'hidden'}>
      <Sidebar />
      <Flex direction="column" flex="1">
        <TopBar />
        <Box flex="1" overflow="hidden" p={4}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
