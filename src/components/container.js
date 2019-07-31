import React from 'react';
import { Box } from 'ink';
import Message from './message';

function Container({ data }) { return (
      <Box flexDirection="column" padding={ 1 } paddingLeft={ 2 }>
         <Content data={ data } />
      </Box>
   )
}

function Content({ data }) {
   switch (data.length) {

      // NO MESSAGES
      case 0: { return (
         <Message
            text={ 'What would you like to do?' }
            color={ '#FFA500' }
         />
      )}

      // LOOP MESSAGES
      default: { return (
         data.map((item, index) =>
            <Message
               text={ item.value }
               color={ item.color }
               key={ index }
            />
         )
      )}
   }
}

export default Container;