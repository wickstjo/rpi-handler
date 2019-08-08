import React, { Fragment, useReducer } from 'react';
import { reducer, values } from './states/message';
import { gateways } from './resources/settings.json';

import { ping, passport, picture, video } from './funcs/terminal';
import { register, check } from './contracts/devices';

import Header from './components/header';
import Messages from './components/messages';
import Options from './components/options';

function App({ state }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, values)

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

   // CHECK IF DEVICE IS REGISTERED
   function Check() {
      return passport().then(result => {
         if (result.success) {

            // REGISTER THE DEVICE
            check(result.data, state).then(result => {
               if (result.success) {

                  // ON SUCCESS
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Registered',
                        status: 'Yes'
                     }
                  })
                  
               // ON ERROR
               } else {
                  dispatch({
                     type: 'add',
                     payload: {
                        message: 'Registered',
                        status: 'No'
                     }
                  })
               }
            })
            
         // ON ERROR
         } else {
            dispatch({
               type: 'add',
               payload: {
                  message: 'Registered',
                  status: 'No'
               }
            })
         }
      })
   }

   // REGISTER DEVICE ON BLOCKCHAIN
   function Register() {
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

   // SUBSCRIBE TO SMART CONTRACT EVENTS
   function Listen() {
      console.log('listen')
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

   return (
      <Fragment>
         <Header text={ 'Results' } />
         <Messages data={ messages } />
         <Options
            data={[
               {
                  label: 'Check Gateways',
                  value: Gateways
               },
               {
                  label: 'Check if Device is Registered',
                  value: Check
               },
               {
                  label: 'Register Device',
                  value: Register
               },
               {
                  label: 'Listen to Contract Events',
                  value: Listen
               },
               {
                  label: 'Take Picture',
                  value: Picture
               },
               {
                  label: 'Record Video',
                  value: Video
               }
            ]}
         />
      </Fragment>
   )
}

export default App;