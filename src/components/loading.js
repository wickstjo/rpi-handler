import React from 'react';
import { Color, Box } from 'ink';
import Spinner from 'ink-spinner';

// https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json

function Loading({ text, color }) { return (
   <Box>
      <Color hex={ '#FF00FF' }>
         <Spinner type={ 'bouncingBar' } />
      </Color>
      <Color hex={ color }>
         { ' ' + text + ' ...' }
      </Color>
   </Box>
)}

export default Loading;