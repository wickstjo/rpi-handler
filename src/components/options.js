import React from 'react';
import { Box } from 'ink';
import SelectInput from 'ink-select-input';

function Options({ data }) { return (
   <Box paddingLeft={ 2 }>
      <SelectInput
         items={ data }
         onSelect={ item => { item.value() }}
      />
   </Box>
)}

export default Options;