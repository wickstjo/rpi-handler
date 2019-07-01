const Web3 = require('web3');
const { ping, task } = require('./misc.js');
const { connection } = require('../references/settings.json');
const references = require('../references/latest.json');

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
        }
    }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function contract(web3, type) {
    return web3.eth.Contract(
        references[type].abi,
        references[type].address
    );
}

// CHECK IF THE GATEWAY IS ONLINE
function status() {
    return ping(connection.host, connection.port.blockchain);
}

function listen(contracts) {
    return contracts.users.events.Action().on('data', event => {
        
        task(event);

    }).on('error', event => {
        console.log('ERROR: ' + event);
    });
}

module.exports = {
    init,
    status,
    listen
}