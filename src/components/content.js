import React from 'react';
import { Box } from 'ink';

function Content({ children }) { return (
   <Box flexDirection="column" paddingLeft={ 2 } paddingTop={ 1 }>
      { children }
   </Box>
)}

export default Content;