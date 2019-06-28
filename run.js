const { init } = require('./funcs/blockchain.js');
const { gateway, fetch, add } = require('./funcs/ipfs.js');
const { web3, contracts } = init();

// contracts.users.events.Action().on('data', event => {
//     console.log('event triggered');
// }).on('error', event => {
//     console.log('error');
// });

// process.exit();

add({ type: 'string', payload: 'foobar' }).then(hash => {
    console.log('content was added')

    fetch(hash).then(content => {
        console.log('content was read\n')

        console.log(content);
        process.exit();
    });
});