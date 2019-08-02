import React, { Fragment, useReducer } from 'react';
import { query } from './funcs/misc';
import { task as reducer } from './funcs/reducers';
import { passport } from './funcs/terminal';

import Container from './components/container';
import Options from './components/options';

function App({ web3, contracts, ipfs }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, [])

   // GENERATE DEVICE PASSPORT
   function Passport() {
      query({
         start: 'GENERATING DEVICE PASSPORT',
         success: 'PASSPORT GENERATION SUCCESSFUL',
         error: 'SOMETHING WENT WRONG',
         func: passport()
      }, messages, dispatch)
   }

   return (
      <Fragment>
         <Container data={ messages } />
         <Options
            data={[
               {
                  label: 'Generate Hashed ID',
                  value: Passport
               }
            ]}
         />
      </Fragment>
   )
}

export default App;