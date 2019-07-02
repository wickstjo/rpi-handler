// IMPORT HELPER MODULES
const terminal = require('node-cmd');
const sha256 = require('sha256');
const binary = require('base64-img');
const { add } = require('./ipfs.js');

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

// CONVERT IMAGE TO BASE64
function convert(file) {
    return new Promise((resolve, reject) => {
        binary.base64(file, (err, data) => {
            resolve(data);
        })
    })
}

// TAKE PICTURE & PUSH IT TO IPFS
function picture() {
    return terminal.get('/home/wickstjo/scripts/img.sh').then((err, data, stderr) => {
        add({ type: 'file', payload: '/home/wickstjo/camera/img.jpg' }).then(hash => {
            return hash;
        })
    });
}

module.exports = {
    ping,
    passport,
    task,
    convert,
    picture
}