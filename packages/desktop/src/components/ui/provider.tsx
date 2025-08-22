'use client';

import { ChakraProvider } from '@chakra-ui/react';
import system from '../../theme';
import { ColorModeProvider } from './color-mode';
import type { ThemeProviderProps } from 'next-themes';

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
