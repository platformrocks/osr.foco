import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Switch } from '@/components/ui/switch';

const FooterBar: React.FC = () => {
  const [blockBrainrot, setBlockBrainrot] = useState<boolean>(false);

  return (
    <Box
      borderTop="1px"
      borderColor="gray.200"
      p={4}
      _dark={{
        borderTopColor: 'gray.200',
      }}
    >
      <Flex align="center" justify="space-between">
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
          Block Brainrot
        </Text>
        <Switch
          checked={blockBrainrot}
          onCheckedChange={(details) => setBlockBrainrot(details.checked)}
          colorPalette="blue"
        />
      </Flex>
    </Box>
  );
};

export default FooterBar;
