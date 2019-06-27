// IMPORT HELPER MODULES
const terminal = require('node-cmd');
const sha256 = require('sha256');

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
    passport
}