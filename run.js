const { init } = require('./js/blockchain.js');

const { web3, contracts } = init();

contracts.users.events.Action().on('data', event => {
    console.log('event triggered');
}).on('error', event => {
    console.log('error');
});