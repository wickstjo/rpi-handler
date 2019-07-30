import React from 'react';
import { Box } from 'ink';
import Message from './message';

function Container({ data }) { return (
   <Box flexDirection="column" padding={ 1 } paddingLeft={ 2 }>
      { data.map((message, index) =>
         <Message
            text={ message }
            key={ index }
         />
      )}
   </Box>
)}

export default Container;