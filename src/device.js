import React, { useReducer } from 'react';
import { Box, AppContext, render } from 'ink';
import { reducer, values } from './states/device';

import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';
import Input from './components/input';
import Messages from './components/messages';

function Device({ terminate }) {

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
         const result = validate(state.input);

         // ON SUCCESS
         if (result.success) {

            // LOCK FURTHER SUBMISSIONS
            dispatch({ type: 'lock' })

            // SEND MESSAGE
            dispatch({
               type: 'good msg',
               payload: 'Name passed validation!'
            })

            // SHOW FOOTER & TERMINATE APPLICATION
            dispatch({ type: 'footer' })
            terminate();

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
      <Box flexDirection="column">
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
      </Box>
   )
}

render(
   <AppContext.Consumer>
      {({ exit }) => (
         <Device terminate={ exit }/>
      )}
   </AppContext.Consumer>
)