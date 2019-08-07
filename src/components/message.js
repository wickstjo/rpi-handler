import React from 'react';
import { Color, Box } from 'ink';

function Message({ text, extra, color }) { return (
   <Box>
      <Color hex={ color }>
         { text }
         { (extra === undefined) ? null : '\n=> ' + extra }
      </Color>
   </Box>
)}

export default Message;