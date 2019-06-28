// IMPORT HELPER MODULES
const terminal = require('node-cmd');
const sha256 = require('sha256');

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

module.exports = {
    ping,
    passport
}