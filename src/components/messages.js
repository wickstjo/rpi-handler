import React from 'react';
import { Box, Color } from 'ink';

function Messages({ data }) {
   switch(data.length) {
      
      // NO MESSAGES
      case 0: {
         return null;
      }

      // RENDER MESSAGES
      default: { return (
         <Box flexDirection="column" paddingLeft={ 2 } paddingBottom={ 1 }>
            { data.map((item, index) =>
               <Box flexGrow={ 1 } key={ index }>
                  <Color hex={ item.color }>
                     { item.text }
                  </Color>
               </Box>
            )}
         </Box>
      )}
   }
}

export default Messages;