import React, { useReducer, useEffect } from 'react';
import { render } from 'ink';

import { init } from './funcs/connection.js';
import { values, reducer } from './states/init';
import App from './app';

function Init() {

   // REFERENCE STATE
   const [state, dispatch] = useReducer(reducer, values)

   // ON INITIAL LOAD...
   useEffect(() => {

      // PUSH REFENRECES
      dispatch({
         type: 'success',
         payload: init()
      })
   }, [])
   
   // DETERMINE RELEVANT CONTENT
   switch (state.web3) {

      // NO CONNECTION
      case null: {
         return null;
      }

      // CONNECTED
      default: { return (
         <App state={ state } />
      )}
   }
}

render(<Init />)