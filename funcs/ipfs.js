const { ping } = require('./misc.js');
const { connection } = require('../references/settings.json');

var ipfsClient = require('ipfs-http-client');
var ipfs = ipfsClient({ host: connection.host, port: connection.port.ipfs, protocol: 'http' });
const Buffer = require('buffer/').Buffer;

// CHECK IF THE GATEWAY IS ONLINE
function gateway() {
    return ping(connection.host, connection.port.ipfs);
}

// FETCH FILE CONTENT
function fetch(hash) {
    return ipfs.get(hash).then(response => {
        return response[0].content.toString('utf8');
    });
}

// ADD FILE
function add(string) {
    //return ipfs.add(Buffer.from(string));
    return ipfs.add('./misc.js');
}

module.exports = {
    gateway,
    fetch,
    add
}