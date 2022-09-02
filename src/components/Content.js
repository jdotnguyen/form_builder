import React from 'react';
import { Box, Center } from '@chakra-ui/react';

const Content = ({children}) => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      margin="auto"
      marginTop="48px"
      maxWidth="1100px"
      height="100vh"
      textAlign="left"
    >
      {children}
    </Box>
  )
}

export default Content;
