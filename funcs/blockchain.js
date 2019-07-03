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

function read(contracts, web3, user) {
    return contracts.users.methods.fetch(user).call().then(response => {
        return {
            name: response.name,
            reputation: web3.utils.hexToNumber(response.reputation),
            joined: web3.utils.hexToNumber(response.joined),
            isset: response.isset
        }
    })
}
 
// ADD USER
function write(contracts, user, name) {
    return contracts.users.methods.add(name).send({
        from: user,
        gas: 500000
    }).then(() => {
        return 'user added successfully';
    }).catch(error => {
        return error.toString();
    });
}

module.exports = {
    init,
    status,
    listen,
    read,
    write
}