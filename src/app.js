import React, { Fragment, useReducer } from 'react';
import { reducer, values } from './states/message';

import { ping } from './funcs/misc';
import { passport, picture, video } from './funcs/terminal';
import { register } from './contracts/devices';

import Messages from './components/messages';
import Options from './components/options';

function App({ state }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, values)

   // SUBSCRIBE TO SMART CONTRACT EVENTS
   function Gateways() {
      dispatch({
         type: 'add',
         payload: {
            message: 'testing',
            status: 'running',
            extra: 'foobar'
         }
      })
   }

   // REGISTER DEVICE ON BLOCKCHAIN
   function Register() {
      return passport().then(result => {
         if (result.success) {
            console.log('win')
         }
      })
   }

   // SUBSCRIBE TO SMART CONTRACT EVENTS
   function Listen() {
      console.log('listen')
   }

   // CHECK DEVICE ID
   function Passport() {
   }

   // TAKE & TRANSFER PICTURE
   function Picture() {
   }

   // RECORD & TRANSFER VIDEO
   function Video() {
   }

   return (
      <Fragment>
         <Messages data={ messages } />
         <Options
            data={[
               {
                  label: 'Check Gateways',
                  value: Gateways
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
                  label: 'Check Device ID',
                  value: Passport
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