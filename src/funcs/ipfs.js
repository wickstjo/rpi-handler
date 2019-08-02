import { Buffer } from 'buffer/';

// FETCH HASH CONTENT
function fetch(hash) {
   return ipfs.get(hash).then(response => {
      return response[0].content.toString('utf8');
   })
}

// ADD FILE/STRING
function add({ type, payload }) {
   switch(type) {

      // ADD STRING
      case 'string': {
         return ipfs.add(Buffer.from(payload)).then(response => {
            return response[0].hash;
         })
      }

      // ADD FILE
      case 'file': {
         return ipfs.addFromFs(payload).then(response => {
            return response[0].hash;
         })
      }
   }
}

module.exports = {
   fetch,
   add
}