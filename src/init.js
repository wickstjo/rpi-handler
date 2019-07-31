import React, { useState, useEffect } from 'react';
import { render, Box } from 'ink';
import { sleep } from './funcs/temp';

import Loading from './components/loading';
import App from './app';

function Init() {

   // CONNECTION STATE
   const [state, set_state] = useState({
      web3: null,
      contracts: null,
      ipfs: null
   })

   // ON INITIAL LOAD...
   useEffect(() => {
      sleep(2000).then(() => {

         // ATTEMPT TO CONNECT
         set_state({
            ...state,
            web3: 'something'
         })
      })
   }, [])
   
   switch (state.web3) {

      // NO CONNECTION
      case null: { return (
         <Box paddingLeft={ 2 } paddingTop={ 1 }>
            <Loading
               text={ 'CONNECTING' }
               color={ '#00FF00' }
            />
         </Box>
      )}

      // CONNECTED
      default: { return (
         <App state={ state } />
      )}
   }
}

render(<Init />)