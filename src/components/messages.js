import React from 'react';
import { Box } from 'ink';
import Message from './message';

function Container({ data }) { return (
   <Box flexDirection="column" padding={ 1 } paddingLeft={ 2 }>
      <Content data={ data } />
   </Box>
)}

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
               text={ item.message + '\t\t\t' + item.status }
               extra={ item.extra }
               color={ '#FFA500' }
               key={ index }
            />
         )
      )}
   }
}

export default Container;