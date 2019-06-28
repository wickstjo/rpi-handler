const { init } = require('./funcs/blockchain.js');
const { gateway, fetch, add } = require('./funcs/ipfs.js');
const { web3, contracts } = init();

// contracts.users.events.Action().on('data', event => {
//     console.log('event triggered');
// }).on('error', event => {
//     console.log('error');
// });

// process.exit();

add('QmZJsQUWUes6vz6DzDT3z6383k1Y4hFYUKun9UkPN1PYSX').then(response => {
    console.log(response);
    process.exit();
});