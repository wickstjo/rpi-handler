import terminal from 'node-cmd';
import sha256 from 'sha256';
import { camera } from '../resources/settings.json';

// CHECK IF A ADDRESS/PORT IS REACHABLE
function ping({ host, port }) {
   return run('nc -vz ' + host + ' ' + port);
}

// HASH HARDWARE & SERIAL NUMBER
function passport() {
   return run('lshw').then(result => {
      switch (result.success) {

         // ON SUCCESS
         case true: { return {
            success: true,
            data: sha256(result.data)
         }}

         // ON ERROR
         default: { return {
            reason: result.reason
         }}
      }
   })
}

// TAKE PICTURE & PUSH IT TO IPFS
function picture(name) {
   return run('raspistill -o ' + camera + name + '.jpg');
}

// RECORD VIDEO & PUSH IT TO IPFS
function video(name, time) {
   return run('raspivid -o ' + camera + name + '.h264 -t ' + (time * 1000));
}

// PROMISIFY TERMINAL COMMAND
function run(command) {
   return new Promise((resolve, reject) => {
      terminal.get(command, (error, response, standard) => {
         switch(error) {

            // IF THERE ARE NO ERRORS
            case null:
               resolve({
                  success: true,
                  data: response
               })
            break;

            // OTHERWISE
            default:
               resolve({
                  reason: standard.replace('\n', '')
               })
            break;
         }
      })
   })
}

module.exports = {
   ping,
   passport,
   picture,
   video
}