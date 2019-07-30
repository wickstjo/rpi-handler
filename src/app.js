import React, { Fragment, useState } from 'react';
import { render } from 'ink';

import Container from './components/container';
import Options from './components/options';

function App() {

   // LOCAL STATE
   const [messages, add] = useState([])

   function first() {
      add([
         ...messages,
         'first'
      ])
   }

   function second() {
      add([
         ...messages,
         'second'
      ])
   }

   function third() {
      add([
         ...messages,
         'third'
      ])
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

render(<App />)