import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/basic';

import { passport } from './funcs/terminal';
import { terminate } from './funcs/misc';
import { fetch, listen } from './contracts/devices';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Messages from './components/messages';

function Listen() {

   // LOCAL STATE
   const [state, dispatch] = useReducer(reducer, values);

   // PING THE GATEWAYS
   useEffect(() => {
      passport().then(result => {
         if (result.success) {

            // DEVICE PASSPORT
            const pass = result.data;

            // SEND MSG
            dispatch({
               type: 'good msg',
               payload: 'Passport generated: ' + pass
            })

            // FETCH DEVICE ADDRESS
            fetch(pass).then(result => {
               if (result.success) {

                  // SEND MSG
                  dispatch({
                     type: 'good msg',
                     payload: 'Address fetched: ' + result.data
                  })

                  // SEND MSG
                  dispatch({
                     type: 'good msg',
                     payload: 'Listening now...\n'
                  })

                  // START LISTENING
                  listen(result.data).on('data', event => {
                     dispatch({
                        type: 'good msg',
                        payload: 'Task assigned: ' + event.returnValues.task
                     })
                  })
               } else {

                  // ON ERROR
                  dispatch({
                     type: 'bad msg',
                     payload: 'Could not fetch address: ' + result.reason
                  })

                  // SHOW FOOTER & TERMINATE
                  dispatch({ type: 'footer' })
                  terminate();
               }
            })
         } else {

            // ON ERROR
            dispatch({
               type: 'bad msg',
               payload: 'Could not generate passport: ' + result.reason
            })

            // SHOW FOOTER & TERMINATE
            dispatch({ type: 'footer' })
            terminate();
         }
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