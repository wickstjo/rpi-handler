const Web3 = require('web3');
const { ping, task } = require('./misc.js');
const { connection } = require('../resources/settings.json');

// REFS
const references = require('../resources/latest.json');
const keys = require('../resources/keys.json');

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
    return new web3.eth.Contract(
        references[type].abi,
        references[type].address
    );
}

// CHECK IF THE GATEWAY IS ONLINE
function status() {
    return ping(connection.host, connection.port.blockchain);
}

// LISTEN TO CONTRACT EVENTS
function listen(contracts) {
    return contracts.users.events.Action().on('data', event => {
        task(event);

    }).on('error', event => {
        console.log('ERROR: ' + event);
    });
}

// READ USER DATA
function read(contracts, web3) {
    return contracts.users.methods.fetch(keys.public).call().then(response => {
        return {
            name: response.name,
            reputation: web3.utils.hexToNumber(response.reputation),
            joined: web3.utils.hexToNumber(response.joined),
            isset: response.isset
        }
    })
}
 
// WRITE USER DATA
// https://stackoverflow.com/questions/46611117/how-to-authenticate-and-send-contract-method-using-web3-js-1-0s
function write(contracts, web3, name) {

    // SMART CONTRACT METHOD
    const query = contracts.users.methods.add(name);

    // TRANSACTION OUTLINE
    const tx = {
        from: keys.public,
        to: contracts.users._address,
        gas: 500000,
        data: query.encodeABI()
    }

    // SIGN IT & EXECUTE
    return web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
        return web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return 'user added successfully';
        }).catch(error => {
            return error.toString();
        });
    });
}

module.exports = {
    init,
    status,
    listen,
    read,
    write
}