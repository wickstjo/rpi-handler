import React, { Fragment, useState, useReducer } from 'react';
import { reducer, values } from './states/message';
import { gateways } from './resources/settings.json';

import { ping, passport, picture, video } from './funcs/terminal';
import { register } from './contracts/devices';
import TextInput from 'ink-text-input';

import Header from './components/header';
import Messages from './components/messages';
import Options from './components/options';

function App({ state }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, values)

   const [local, set_local] = useState('');

   function update(value) {
      set_local(value)
   }

   function win() {
      console.log('good')
   }

   // SUBSCRIBE TO SMART CONTRACT EVENTS
   function Gateways() {

      // PING THE BLOCKCHAIN GATEWAY
      ping(gateways.blockchain).then(result => {
         if(result.success) {

            // PING THE IPFS GATEWAY
            ping(gateways.ipfs).then(result => {
               if(result.success) {

                  // EVERYTHING WENT OK
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Gateway Status',
                        status: 'Online'
                     }
                  })
               
               // IPFS GATEWAY IS DOWN
               } else {
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Gateway Status',
                        status: 'Offline'
                     }
                  })
               }
            })
         
         // BLOCKCHAIN GATEWAY IS DOWN
         } else {
            dispatch({
               type: 'add',
               payload: {
                  message: 'Gateway Status',
                  status: 'Offline'
               }
            })
         }
      })
   }

   // REGISTER ACCOUNT
   function Account() {
   }

   // REGISTER DEVICE
   function Device() {
      return passport().then(result => {
         if (result.success) {

            // REGISTER THE DEVICE
            register(result.data, state).then(result => {
               if (result.success) {

                  // ON SUCCESS
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Device Registration',
                        status: 'Succeeded'
                     }
                  })
                  
               // ON ERROR
               } else {
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Device Registration',
                        status: 'Failed'
                     }
                  })
               }
            })
            
         // ON ERROR
         } else {
            dispatch({
               type: 'add',
               payload: {
                  message: 'Device Registration',
                  status: 'Failed'
               }
            })
         }
      })
   }

   // TAKE & TRANSFER PICTURE
   function Picture() {
      picture('img').then(result => {
         if (result.success) {

            // ON SUCCESS
            dispatch({
               type: 'add',
               payload: {
                  message: 'Taking Picture',
                  status: 'Succeeded'
               }
            })

         // ON ERROR
         } else {
            dispatch({
               type: 'add',
               payload: {
                  message: 'Taking Picture',
                  status: 'Failed'
               }
            })
         }
      })
   }

   // RECORD & TRANSFER VIDEO
   function Video() {
      video('vid', 5).then(result => {
         if (result.success) {

            // ON SUCCESS
            dispatch({
               type: 'add',
               payload: {
                  message: 'Recording Video',
                  status: 'Succeeded'
               }
            })

         // ON ERROR
         } else {
            dispatch({
               type: 'add',
               payload: {
                  message: 'Recording Video',
                  status: 'Failed'
               }
            })
         }
      })
   }

   // TRANSFER FILES
   function Transfer() {
   }

   return (
      <Fragment>
         <Header text={ 'Results' } />
         <Messages data={ messages } />
         <Options data={[
            {
               label: 'Check Gateway Status',
               value: Gateways
            },
            {
               label: 'Register Account',
               value: Account
            },
            {
               label: 'Register Device',
               value: Device
            },
            {
               label: 'Take Picture',
               value: Picture
            },
            {
               label: 'Record Video',
               value: Video
            },
            {
               label: 'Transfer Files',
               value: Transfer
            }
         ]} />
      </Fragment>
   )
}

export default App;