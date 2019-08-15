import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/basic';

import { gateways } from './resources/settings.json';
import { assess } from './funcs/blockchain';
import { ping } from './funcs/terminal';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Messages from './components/messages';

function Gateways() {

   // LOCAL STATE
   const [state, dispatch] = useReducer(reducer, values);

   // PING THE GATEWAYS
   useEffect(() => {

      // PING THE BLOCKCHAIN GATEWAY
      ping(gateways.blockchain).then(result => {
         assess({
            msg: 'The Blockchain gateway Online',
            error: 'The Blockchain gateway Offline',
            next: () => {
               
               // PING THE IPFS GATEWAY
               ping(gateways.ipfs).then(result => {
                  assess({
                     msg: 'The IPFS gateway Online',
                     error: 'The IPFS gateway Offline'
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      })
   }, [])

   return (
      <Main>
         <Header text={ 'Ping Gateways' } />
         <Messages data={ state.messages } />
         <Footer show={ state.footer } />
      </Main>
   )
}

render(<Gateways />)