import React from 'react';
import { Color, Box } from 'ink';

function Message({ item, color }) { return (
   <Box width={ 67 }>
      <Box width={ 33 }>
         <Color hex={ color }>
            { item.message }
         </Color>
      </Box>
      <Box width={ 34 } justifyContent={ 'flex-end' }>
         <Box>
            <Color hex={ color }>
               { item.status }
            </Color>
         </Box>
      </Box>
   </Box>
)}

function Secondary({ data }) {
   switch(data) {

      // NO EXTRA PROPERY WAS GIVEN
      case undefined: {
         return null;
      }

      // OTHERWISE, RENDER THE DATA
      default: { return (
         <Box>
            <Color hex={ color }>
               { data }
            </Color>
         </Box>
      )}
   }
}

export default Message;