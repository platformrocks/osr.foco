import { createSystem, defaultConfig } from '@chakra-ui/react';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        black: {
          50: { value: '#fafafa' },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'black.50',
      // _dark: {
      //   bg: '#212121',
      // },
    },
  },
});

export default system;
