const { ping } = require('./misc.js');
const { connection } = require('../resources/settings.json');

var ipfsClient = require('ipfs-http-client');
var ipfs = ipfsClient({ host: connection.host, port: connection.port.ipfs, protocol: 'http' });
const Buffer = require('buffer/').Buffer;

// CHECK IF THE GATEWAY IS ONLINE
function status() {
    return ping(connection.host, connection.port.ipfs);
}

// ADD FILE/STRING
function add({ type, payload }) {
    switch(type) {

        // ADD STRING
        case 'string': {
            return ipfs.add(Buffer.from(payload)).then(response => {
                return response[0].hash;
            });
        }

        // ADD FILE
        case 'file': {
            return ipfs.addFromFs(payload).then(response => {
                return response[0].hash;
            });
        }
    }
}

// FETCH HASH CONTENT
function fetch(hash) {
    return ipfs.get(hash).then(response => {
        return response[0].content.toString('utf8');
    });
}

module.exports = {
    status,
    fetch,
    add
}