import React, { Fragment, useReducer } from 'react';
import { sleep } from './funcs/temp';
import { task as reducer } from './funcs/reducers';

import Container from './components/container';
import Options from './components/options';

function App({ state }) {

   // LOCAL STATE
   const [messages, dispatch] = useReducer(reducer, [])

   function first() {

      // START TASK
      dispatch({
         type: 'start',
         payload: 'INITIATED FIRST'
      })

      // SAVE INDEX
      const length = messages.length;

      // WAIT 2 SECONDS
      sleep(2000).then(() => {

         // FINISH TASK
         dispatch({
            type: 'finish',
            payload: {
               value: 'FINISHED FIRST',
               index: length
            }
         })
      })
   }

   function second() {
   }

   function third() {
   }

   return (
      <Fragment>
         <Container data={ messages } />
         <Options
            data={[
               {
                  label: 'First',
                  value: first
               },
               {
                  label: 'Second',
                  value: second
               },
               {
                  label: 'Third',
                  value: third
               }
            ]}
         />
      </Fragment>
   )
}

export default App;