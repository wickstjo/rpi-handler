import React, { useReducer } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/register';

import { register } from './contracts/users';
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
      if (input.length >= 3 && input.length <= 30) {
         return {
            success: true
         }
      } else {
         return {
            success: false,
            reason: 'Bad name length, 3-30 characters!'
         }
      }
   }

   // EXECUTE QUERY
   function execute() {
      if (!state.locked) {

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

            // ATTEMPT TO REGISTER USER
            register(state.input).then(result => {
               if (result.success) {

                  // ON SUCCESS
                  dispatch({
                     type: 'good msg',
                     payload: 'User registered successfully!'
                  })

               } else {

                  // ON ERROR
                  dispatch({
                     type: 'bad msg',
                     payload: 'Could not register user: ' + result.reason
                  })
               }

               // REGARDLESS, SHOW FOOTER & TERMINATE THE APP
               dispatch({ type: 'footer' })
               terminate();
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
         <Header text={ 'Register User' } />
         <Content>
            <Input
               header={ 'Enter your name:' }
               value={ state.input }
               placeholder={ '"John Wick"' }
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