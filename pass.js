const terminal = require('node-cmd');
const sha256 = require('sha256');

terminal.get('sudo lshw', (error, response, standard) => {
   if (error === null) {
      console.log(sha256(response))
   } else {
      console.log(standard)
   }
})