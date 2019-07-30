import React from 'react';
import { Color, Box } from 'ink';

function Message({ text, color, bg }) { return (
   <Box>
      <Color hex={ color } bgHex={ bg }>
         { text }
      </Color>
   </Box>
)}

export default Message;