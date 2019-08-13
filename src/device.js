import React, { useReducer } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/device';

import { register } from './contracts/devices';
import { passport } from './funcs/terminal';
import { terminate } from './funcs/misc';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';
import Input from './components/input';
import Messages from './components/messages';

function Device() {

   // LOCAL STATE
   const [state, dispatch] = useReducer(reducer, values);

   // UPDATE INPUT
   function update(value) {
      if(!state.locked) {
         dispatch({
            type: 'input',
            payload: value
         })
      }
   }

   // VALIDATE INPUT
   function validate(input) {
      if (input.length >= 3 && input.length <= 15) {
         return {
            success: true
         }
      } else {
         return {
            success: false,
            reason: 'Bad name length, 3-15 characters!'
         }
      }
   }

   // EXECUTE QUERY
   function execute() {
      if(!state.locked) {

         // VALIDATE INPUT
         let result = validate(state.input);

         // ON SUCCESS
         if (result.success) {

            // LOCK FURTHER SUBMISSIONS
            dispatch({ type: 'lock' })

            // SEND MSG
            dispatch({
               type: 'good msg',
               payload: 'Name passed validation!'
            })

            // GENERATE DEVICE PASSPORT
            passport().then(result => {

               // ON SUCCESS
               if (result.success) {

                  // DEVICE PASSPORT
                  const pass = result.data;

                  // SEND MSG
                  dispatch({
                     type: 'good msg',
                     payload: 'Passport generated: ' + pass
                  })

                  // ATTEMPT TO REGISTER
                  register(pass).then(result => {
                     
                     // ON SUCCESS
                     if (result.success) {

                        // SEND MSG
                        dispatch({
                           type: 'good msg',
                           payload: 'Device registered successfully!'
                        })

                        // KILL THE APP
                        terminate();

                     // ON ERROR
                     } else {
                        dispatch({
                           type: 'terminate',
                           payload: 'Could not register: ' + result.reason
                        })
                        
                        // KILL THE APP
                        terminate();
                     }
                  })

               // ON ERROR
               } else {
                  dispatch({
                     type: 'terminate',
                     payload: 'Could not generate passport: ' + result.reason
                  })

                  // KILL THE APP
                  terminate();
               }
            })
         
         // ON ERROR
         } else {
            dispatch({
               type: 'bad msg',
               payload: result.reason
            })
         }
      }
   }

   return (
      <Main>
         <Header text={ 'Register Device' } />
         <Content>
            <Input
               header={ 'Give the device a nickname:' }
               value={ state.input }
               placeholder={ '"leet rpi"' }
               update={ update }
               submit={ execute }
            />
         </Content>
         <Messages data={ state.messages } />
         <Footer show={ state.footer } />
      </Main>
   )
}

render(<Device />)