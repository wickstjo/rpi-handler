// IMPORT WEB3 MODULE
const Web3 = require('web3');

const { connection } = require('../references/settings.json');
const references = require('../references/latest.json');

// INITIALIZE SC & WEB3
function init() {

    // ESTABLISH WEB3 CONNECTION
    let web3 = new Web3(connection.type + '://' + connection.host + ':' + connection.port, null, {});

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

module.exports = {
    init
}