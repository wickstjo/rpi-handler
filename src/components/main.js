import React from 'react';
import { Box } from 'ink';

function Main({ children }) { return (
   <Box flexDirection="column">
      { children }
   </Box>
)}

export default Main;