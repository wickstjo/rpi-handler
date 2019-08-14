import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/gateways';

import { gateways } from './resources/settings.json';
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
         if(result.success) {

            // ON SUCCESS
            dispatch({
               type: 'good msg',
               payload: 'The Blockchain gateway Online'
            })

         } else {

            // ON ERROR
            dispatch({
               type: 'bad msg',
               payload: 'The Blockchain gateway Offline'
            })
         }

         // PING THE BLOCKCHAIN GATEWAY
         ping(gateways.ipfs).then(result => {
            if(result.success) {

               // ON SUCCESS
               dispatch({
                  type: 'good msg',
                  payload: 'The IPFS gateway is Online'
               })

            } else {

               // ON ERROR
               dispatch({
                  type: 'bad msg',
                  payload: 'The IPFS gateway is Offline'
               })
            }

            // REGARDLESS, SHOW THE FOOTER
            dispatch({ type: 'footer' })
         })
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