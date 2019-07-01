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

// EXECUTE IOT TASK
function task(event) {

    // HASH ENTIRE EVENT TO GET UNIQUE DIR NAME
    const dir = sha256(JSON.stringify(event));

    // TASK PARAMS
    const { source, sender } = event.returnValues;

    // CREATE DIRECTORY
    terminal.run('mkdir temp/' + dir);

    // CREATE FILE
    terminal.run('echo "foobar" >> temp/' + dir + '/file.txt');

    console.log('success');
}

module.exports = {
    ping,
    passport,
    task
}