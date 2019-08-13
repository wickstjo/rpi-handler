import React from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';

function Input({ header, value, placeholder, update, submit }) {

   // ON CHANGE
   function change(value) {
      update(value)
   }

   return (
      <Box>
         <Box>{ header } </Box>
         <Color hex={ '#FFD700' }>
            <TextInput
               value={ value }
               onChange={ change }
               onSubmit={ submit }
               placeholder={ placeholder }
            />
         </Color>
      </Box>
   )
}

export default Input;