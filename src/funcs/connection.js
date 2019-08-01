import WEB3 from 'web3';
import IPFS from 'ipfs-http-client';
import references from '../resources/latest.json';

// INITIALIZE SC & WEB3
function init(gateways) {

    // ESTABLISH WEB3 CONNECTION
    let web3 = new WEB3('ws://' + gateways.blockchain.host + ':' + gateways.blockchain.port);

    // RETURN REFERENCES
    return {
        web3: web3,
        contracts: contracts(web3),
        ipfs: IPFS({
            host: gateways.ipfs.host,
            port: gateways.ipfs.port,
        })
    }
}

// CONSTRUCT SMART CONTRACT REFERENCE
function contracts(web3) {
    
    // RELEVANT SMART CONTRACT NAMES & RESPONSE PLACEHOLDER
    const contracts = ['devices', 'licences', 'tasks', 'users']
    const response = {};

    // LOOP THROUGH & COMBINE EACH ABI & ADDRESS
    contracts.forEach(name => {
        response[name] = new web3.eth.Contract(
            references[name].abi,
            references[name].address
        )
    })

    return response;
}

module.exports = {
    init
}