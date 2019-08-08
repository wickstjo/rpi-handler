import React from 'react';
import { Box } from 'ink';
import Message from './message';

function Container({ data }) { return (
   <Box flexDirection="column" paddingLeft={ 2 } paddingRight={ 2 }>
      { data.map((item, index) =>
         <Message
            item={ item }
            color={ '#FFA500' }
            key={ index }
         />
      )}
   </Box>
)}

export default Container;