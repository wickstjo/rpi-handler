import WEB3 from 'web3';
import IPFS from 'ipfs-http-client';
import references from '../resources/latest.json';
import { gateways } from '../resources/settings.json';

// INITIALIZE SC & WEB3
function init() {

    // ESTABLISH WEB3 CONNECTION
    let web3 = new WEB3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port);

    // RETURN REFERENCES
    return {
        web3: web3,
        contracts: contracts([
            'devices',
            'token',
            'tasks',
            'users'
        ], web3),
        interfaces: interfaces([
            'device',
            'task'
        ]),
        ipfs: IPFS({
            host: gateways.ipfs.host,
            port: gateways.ipfs.port,
        })
    }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function contracts(names, web3) {
    
    // RESPONSE PLACEHOLDER
    const response = {}

    // LOOP THROUGH & COMBINE EACH ABI & ADDRESS
    names.forEach(name => {
        response[name] = new web3.eth.Contract(
            references[name].abi,
            references[name].address
        )
    })

    return response;
}

// FETCH SINGLE CONTRACT INTERFACE
function interfaces(names) {

    // RESPONSE PLACEHOLDER
    const response = {}

    // LOOP THROUGH & ATTACH ABI
    names.forEach(name => {
        response[name] = references[name].abi
    })

    return response;
}

module.exports = {
    init
}