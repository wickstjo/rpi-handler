import React from 'react';
import { Box } from 'ink';
import Message from './message';

function Container({ data }) { return (
      <Box flexDirection="column" padding={ 1 } paddingLeft={ 2 }>
         { data.map((item, index) =>
            <Message
               text={ item.value }
               color={ item.color }
               key={ index }
            />
         )}
      </Box>
   )
}

export default Container;