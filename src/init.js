import React, { useReducer, useEffect } from 'react';
import { init } from './funcs/connection.js';
import { sleep } from './funcs/misc';
import { ping } from './funcs/terminal';
import { values, reducer } from './states/init';
import { gateways } from './resources/settings.json';

import { render, Box } from 'ink';
import Loading from './components/loading';
import Message from './components/message';
import App from './app';

function Init() {

   // REFERENCE STATE
   const [state, dispatch] = useReducer(reducer, values)

   // ON INITIAL LOAD...
   useEffect(() => {
      
      // PING THE BLOCKCHAIN & IPFS GATEWAY
      ping(gateways.blockchain.host, gateways.blockchain.port).then(blockchain => {
         ping(gateways.ipfs.host, gateways.ipfs.port).then(ipfs => {

            // SLEEP FOR AN EXTRA SECOND
            sleep(1000).then(() => {

               // IF BOTH OF THEM RESPOND NORMALLY
               if (blockchain && ipfs) {

                  // PUSH REFENRECES
                  dispatch({
                     type: 'success',
                     payload: init(gateways)
                  })

               // OTHERWISE, PROMPT ERROR
               } else { dispatch({ type: 'fail' }) }
            })
         })
      })
   }, [])
   
   // DETERMINE RELEVANT CONTENT
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

      // CONNECTION FAILS
      case 'fail': { return (
         <Box paddingBottom={ 1 } paddingLeft={ 2 }>
            <Message
               text={ 'COULD NOT CONNECT, TRY AGAIN' }
               color={ '#FF0000' }
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