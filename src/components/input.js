import React from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';

function Input({ header, value, placeholder, update, submit }) { return (
   <Box>
      <Box>{ header } </Box>
      <Color hex={ '#FFD700' }>
         <TextInput
            value={ value }
            onChange={ input => { update(input) }}
            onSubmit={ submit }
            placeholder={ '"' + placeholder + '"' }
         />
      </Color>
   </Box>
)}

export default Input;