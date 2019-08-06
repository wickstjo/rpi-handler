import terminal from 'node-cmd';
import sha256 from 'sha256';

// CHECK IF A ADDRESS/PORT IS REACHABLE
function ping(host, port) {
   return new Promise((resolve, reject) => {
      terminal.get('nc -vz ' + host + ' ' + port, (err, response, stderr) => {

         // CHECK ONLINE STATUS & RESOLVE
         resolve(stderr.includes('succeeded'));
      })
   })
}

// GENERATE ID BASED ON HARDWARE SNAPSHOT & SERIAL NUMBER
function passport() {
   return new Promise((resolve, reject) => {
      terminal.get('sudo lshw', (err, response, stderr) => {

         // HASH THE RESPONSE & RESOLVE
         resolve({
            success: true,
            data: sha256(response)
         })
      })
   })
}

// TAKE PICTURE & PUSH IT TO IPFS
function picture(name) {
   return run('raspistill -o /home/wickstjo/cam/' + name + '.jpg')
}

// RECORD VIDEO & PUSH IT TO IPFS
function video(name, time) {
   return run('raspivid -o /home/wickstjo/cam/' + name + '.h264 -t ' + (time * 1000))
}

// PROMISIFY TERMINAL COMMAND
function run(command) {
   return new Promise((resolve, reject) => {
      terminal.get(command, (err, response, stderr) => {
         resolve(response);
      })
   })
}

module.exports = {
   ping,
   passport,
   picture,
   video
}