// IMPORT HELPER MODULES
const terminal = require('node-cmd');
const sha256 = require('sha256');
const { add } = require('./ipfs.js');

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
return new Promise((resolve) => setTimeout(resolve, time));
}

// CHECK IF A ADDRESS/PORT IS REACHABLE
function ping(host, port) {
   return new Promise((resolve, reject) => {
      terminal.get('nc -vz ' + host + ' ' + port, (err, response, stderr) => {

         // CHECK ONLINE STATUS & RESOLVE
         resolve(stderr.includes('succeeded'));
      });
   });
}

// GENERATE IDENTIFICATION BASED ON HARDWARE SNAPSHOT & SERIAL NUMBER
function passport() {
   return new Promise((resolve, reject) => {
      terminal.get('sudo lshw', (err, response, stderr) => {

         // HASH THE RESPONSE & RESOLVE
         resolve(sha256(response));
      });
   })
}

// EXECUTE IOT TASK
function task(event) {

   // HASH ENTIRE EVENT TO GET UNIQUE DIR NAME
   const dir = sha256(JSON.stringify(event));

   // TASK PARAMS
   const { source, sender } = event.returnValues;

   console.log('task ran successfully');
}

// TAKE PICTURE & PUSH IT TO IPFS
function picture(name) {
   return run('raspistill -o ' + name + '.jpg').then(() => {
      return add({ type: 'file', payload: name + '.jpg' }).then(hash => {
         return run('rm -rf ' + name + '.jpg').then(() => {
               return hash;
         })
      })
   })
}

// RECORD VIDEO & PUSH IT TO IPFS
function video(name, time) {
   return run('raspivid -o ' + name + '.h264 -t ' + (time * 1000)).then(() => {
      return add({ type: 'file', payload: name + '.h264' }).then(hash => {
         return run('rm -rf ' + name + '.h264').then(() => {
               return hash;
         })
      })
   })
}

// PROMISIFY TERMINAL COMMAND
function run(command) {
   return new Promise((resolve, reject) => {
      terminal.get(command, (err, response, stderr) => {
         resolve(response);
      });
   })
}

module.exports = {
   ping,
   passport,
   task,
   picture,
   video,
   sleep
}