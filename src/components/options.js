import React, { Fragment } from 'react';
import { Box } from 'ink';

import Header from './header';
import SelectInput from 'ink-select-input';

function Options({ data }) { return (
   <Fragment>
      <Header text={ 'Actions' } />
      <Box paddingLeft={ 2 } paddingTop={ 1 }>
         <SelectInput
            items={ data }
            onSelect={ item => { item.value() }}
         />
      </Box>
   </Fragment>
)}

export default Options;