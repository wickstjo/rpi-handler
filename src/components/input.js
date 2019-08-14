import React, { Fragment } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';
import Space from './space';

function Input({ header, value, placeholder, update, submit, name, space }) {
   
   // VALUE CHANGE
   function change(value) {
      switch(name) {

         // SINGLE FIELD
         case undefined:
            update(value)
         break;

         // MULTI FIELD
         default:
            update(name, value)
         break;
      }
   }

   // SUBMIT FUNC
   function execute() {
      switch(name) {

         // NO PARAMS
         case undefined:
            submit()
         break;

         // WITH NAME
         default:
            submit(name)
         break;
      } 
   }

   return (
      <Fragment>
         <Box>
            <Box>{ header } </Box>
            <Color hex={ '#FFD700' }>
               <TextInput
                  value={ value }
                  onChange={ change }
                  onSubmit={ execute }
                  placeholder={ '"' + placeholder + '"' }
               />
            </Color>
         </Box>
         { space ? <Space /> : null }
      </Fragment>
   )
}

export default Input;