import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/basic';

import { passport, picture } from './funcs/terminal';
import { fetch, listen } from './contracts/devices';
import { submit } from './contracts/task';
import { assess } from './funcs/blockchain';
import { add } from './funcs/ipfs';
import { camera } from './resources/settings.json';

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
      passport().then(result => { assess({
         msg: 'Passport generated: ' + result.data,
         next: (data) => {

            // FETCH ADDRESS
            fetch(data).then(result => { assess({
               msg: 'Address fetched: ' + result.data + '\n\nNow listening...',
               next: (data) => {

                  let assignment = listen(data)

                  // START LISTENING
                  assignment.on('data', event => {

                     // TASK CONTRACT
                     const contract = event.returnValues.task;

                     // SEND MSG
                     dispatch({
                        type: 'good msg',
                        payload: '\nTask assigned: ' + contract
                     })

                     // TAKE PICTURE
                     picture(contract).then(result => { assess({
                        msg: 'Took Picture Successfully!',
                        next: () => {

                           // ADD PICTURE TO IPFS
                           add({ type: 'file', payload: camera + contract + '.jpg' }).then(result => { assess({
                              msg: 'IPFS Location: ' + result.data,
                              next: (hash) => {

                                 // SUBMIT RESPONSE
                                 submit(contract, hash).then(result => {
                                    assess({
                                       msg: 'Responded successfully!',
                                       crash: false
                                    }, result, dispatch)
                                 })
                              }
                           }, result, dispatch) })
                        }
                     }, result, dispatch) })
                  })
               }
            }, result, dispatch) })
         }
      }, result, dispatch) })
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