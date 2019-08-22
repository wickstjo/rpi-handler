import { init } from '../funcs/connection';
import { Buffer } from 'buffer/';

// FETCH REFERENCE
const { ipfs } = init();

// FETCH HASH CONTENT
function fetch(hash) {
   return ipfs.get(hash).then(response => {
      return {
         success: true,
         data: response[0].content.toString('utf8')
      }
   }).catch(error => {
      return {
         reason: error
      }
   })
}

// ADD FILE/STRING
function add({ type, payload }) {
   
   // PLACEHOLDER
   let query;

   // SELECT QUERY
   switch(type) {

      // ADD STRING
      case 'string': {
         query = ipfs.add(Buffer.from(payload));
      }

      // ADD FILE
      case 'file': {
         query = ipfs.addFromFs(payload);
      }
   }

   // ATTACH ERROR HANDLER
   return query.then(response => {
      return {
         success: true,
         data: response[0].hash
      }
   }).catch(error => {
      return {
         reason: error
      }
   })
}

module.exports = {
   fetch,
   add
}