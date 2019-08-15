import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/basic';

import { passport } from './funcs/terminal';
import { fetch, listen } from './contracts/devices';
import { assess } from './funcs/blockchain';

import Main from './components/main';
import Header from './components/header';
import Messages from './components/messages';
import Footer from './components/footer';

function Listen() {

   // LOCAL STATE
   const [state, dispatch] = useReducer(reducer, values);

   // PING THE GATEWAYS
   useEffect(() => {

      // GENERATE PASSPORT
      passport().then(result => {
         assess({
            msg: 'Passport generated: ' + result.data,
            next: (data) => {

               // FETCH ADDRESS
               fetch(data).then(result => {
                  assess({
                     msg: 'Address fetched: ' + result.data + '\n\nNow listening...\n',
                     next: (data) => {

                        // START LISTENING
                        listen(data).on('data', event => {
                           dispatch({
                              type: 'good msg',
                              payload: 'Task assigned: ' + event.returnValues.task
                           })
                        })
                     }
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      })
   }, [])

   return (
      <Main>
         <Header text={ 'Listening for Tasks' } />
         <Messages data={ state.messages } />
         <Footer show={ state.footer } />
      </Main>
   )
}

render(<Listen />)