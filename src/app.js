import React, { Fragment, useReducer } from 'react';
import { query } from './funcs/misc';
import { task as reducer } from './funcs/reducers';
import { passport, picture, video } from './funcs/terminal';

import Container from './components/container';
import Options from './components/options';

function App({ web3, contracts, interfaces, ipfs }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, [])

   // SET PUBLIC & PRIVATE KEYS
   function Keys() {
      console.log('keys')
   }

   // REGISTER DEVICE ON BLOCKCHAIN
   function Register() {
      console.log('register')
   }

   // SUBSCRIBE TO SMART CONTRACT EVENTS
   function Listen() {
      console.log('listen')
   }

   // CHECK DEVICE ID
   function Passport() {
      query({
         start: 'GENERATING DEVICE ID',
         success: 'THE DEVICE ID IS',
         error: 'PASSPORT GENERATION FAILED',
         func: passport()
      }, messages, dispatch)
   }

   // TAKE & TRANSFER PICTURE
   function Picture() {
      query({
         start: 'TAKING PICTURE',
         success: 'TOOK PICTURE SUCCESSFULLY',
         error: 'TAKING PICTURE FAILED',
         func: picture('img')
      }, messages, dispatch)
   }

   // RECORD & TRANSFER VIDEO
   function Video() {
      query({
         start: 'RECORDING VIDEO',
         success: 'VIDEO RECORDING ENDED SUCCESSFULLY',
         error: 'RECORDING FAILED',
         func: video('vid', 5)
      }, messages, dispatch)
   }

   return (
      <Fragment>
         <Container data={ messages } />
         <Options
            data={[
               {
                  label: 'Set Account Keys',
                  value: Keys
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