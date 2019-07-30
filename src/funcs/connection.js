const Web3 = require('web3');
var ipfsClient = require('ipfs-http-client');
const { ping } = require('./misc.js');

const { connection } = require('../resources/settings.json');
const references = require('../resources/latest.json');

// INITIALIZE SC & WEB3
function init() {

    // ESTABLISH WEB3 CONNECTION
    let web3 = new Web3('ws://' + connection.host + ':' + connection.port.blockchain);

    // RETURN REFERENCES
    return {
        web3: web3,
        contracts: {
            devices: contract(web3, 'devices'),
            licences: contract(web3, 'licences'),
            tasks: contract(web3, 'tasks'),
            users: contract(web3, 'users')
        },
        ipfs: ipfsClient({
            host: connection.host,
            port: connection.port.ipfs,
            protocol: 'http'
        })
    }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function contract(web3, type) {
    return new web3.eth.Contract(
        references[type].abi,
        references[type].address
    );
}

// CHECK IPFS GATEWAY
function check_ipfs() {
    return ping(connection.host, connection.port.ipfs);
}

// CHECK BLOCKCHAIN GATEWAY
function check_blockchain() {
    return ping(connection.host, connection.port.blockchain);
}

module.exports = {
    init,
    check_ipfs,
    check_blockchain
}