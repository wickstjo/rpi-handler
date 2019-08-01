import React from 'react';
import { Box } from 'ink';

import Message from './message';
import Loading from './loading';

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
            <Row
               item={ item }
               key={ index }
            />
         )
      )}
   }
}

function Row({ item }) {
   switch(item.type) {

      // STARTED TASK
      case 'start': { return (
         <Loading
            text={ item.value }
            color={ '#FFD700' }
         />
      )}

      // FINISHED TASK
      case 'finish': { return (
         <Box paddingBottom={ 1 }>
            <Message
               text={ item.value }
               color={ '#00FF00' }
            />
         </Box>
      )}

      // ABORTED TASK
      case 'abort': { return (
         <Message
            text={ item.value }
            color={ '#FF0000' }
         />
      )}
   }
}

export default Container;