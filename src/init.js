import React, { useState, useEffect } from 'react';
import { render, Box } from 'ink';
import { sleep } from './funcs/temp';

import Message from './components/Message';
import App from './app';

function Init() {

   // CONNECTION STATE
   const [connection, set] = useState({
      web3: null,
      contracts: null,
      ipfs: null
   })

   // ON INITIAL LOAD...
   useEffect(() => {
      sleep(2000).then(() => {

         // ATTEMPT TO CONNECT
         set({
            ...connection,
            web3: 'something'
         })
      })
   }, [])
   
   switch (connection.web3) {

      // NO CONNECTION
      case null: { return (
         <Box paddingLeft={ 2 } paddingTop={ 1 }>
            <Message
               text={ 'Attempting to Connect...' }
               color={ '#00FF00' }
            />
         </Box>
      )}

      // CONNECTED
      default: { return (
         <App connection={ connection } />
      )}
   }
}

render(<Init />)