import React, { useReducer } from 'react';
import { render } from 'ink';
import { reducer, values } from './states/setup';
import { keys, gateways } from './resources/settings.json';

import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';
import Input from './components/input';
import Messages from './components/messages';

function Setup() {

   // LOCAL STATE
   const [state, dispatch] = useReducer(reducer, values);
   
   // UPDATE INPUT
   function update(field, input) {
      if (field === state.active && !state.locked) {
         dispatch({
            type: 'update',
            payload: {
               id: field,
               value: input
            }
         })
      }
   }

   // SWAP ACTIVE FIELD
   function swap(current) {
      if (!state.locked && current === state.active) {

         // FIELD ORDER
         const order = Object.keys(state.input);
         const position = order.indexOf(current) + 1;

         dispatch({
            type: 'active',
            payload: order[position]
         })
      }
   }

   // CHECK IF EVERYTHING HAS BEEN FILLED IN
   function validate(values) {

      // FETCH KEYS & DEFAULT TO TRUE
      const keys = Object.keys(state.input);
      let response = true;

      // LOOP THROUGH VALUES
      for (let key of keys) {
         if (values[key].length === 0) {

            // IF ITS EMPTY, SWAP TO FALSE
            response = false;
            break;
         }
      }

      return response;
   }

   // PERFORM THE ACTUAL TASK
   function execute() {

      // CHECK IF EVERYTHING IS READY
      const ready = validate(state.input);

      // WHEN READY & THE ACTIONS ARE NOT LOCKED
      if (ready && !state.locked) {

         // LOCK FURTHER ACTIONS
         dispatch({ type: 'lock' })

         dispatch({
            type: 'good msg',
            payload: 'started processing'
         })
      }
   }

   return (
      <Main>
         <Header text={ 'Setup' } />
         <Content>
            <Input
               header={ 'Public Key:' }
               value={ state.input.public }
               placeholder={ keys.public }
               update={ update }
               submit={ swap }
               name={ 'public' }
            />
            <Input
               header={ 'Private Key:' }
               value={ state.input.private }
               placeholder={ keys.private }
               update={ update }
               submit={ swap }
               name={ 'private' }
               space={ true }
            />
            <Input
               header={ 'IPFS Gateway host:' }
               value={ state.input.ipfsHost }
               placeholder={ gateways.ipfs.host }
               update={ update }
               submit={ swap }
               name={ 'ipfsHost' }
            />
            <Input
               header={ 'IPFS Gateway port:' }
               value={ state.input.ipfsPort }
               placeholder={ gateways.ipfs.port }
               update={ update }
               submit={ execute }
               name={ 'ipfsPort' }
            />
         </Content>
         <Messages data={ state.messages } />
         <Footer show={ state.footer } />
      </Main>
   )
}

render(<Setup />)