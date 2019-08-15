import React, { useReducer } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/register';

import { register } from './contracts/devices';
import { passport } from './funcs/terminal';
import { assess } from './funcs/blockchain';

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
      if (!state.locked) {

         // VALIDATE INPUT
         let result = validate(state.input);

         assess({
            msg: 'Name passed validation!',
            crash: false,
            next: () => {

               // LOCK FURTHER SUBMISSIONS
               dispatch({ type: 'lock' })

               // GENERATE PASSPORT
               passport().then(result => {
                  assess({
                     msg: 'Passport generated: ' + result.data,
                     next: (pass) => {

                        // ATTEMPT TO REGISTER
                        register(pass, state.input).then(result => {
                           assess({
                              msg: 'Device registered successfully!'
                           }, result, dispatch)
                        })
                     }
                  }, result, dispatch)
               })
            }
         }, result, dispatch)
      }
   }

   return (
      <Main>
         <Header text={ 'Register Device' } />
         <Content>
            <Input
               header={ 'Give the device a nickname:' }
               value={ state.input }
               placeholder={ 'Cool Device' }
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