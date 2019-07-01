const { init, listen } = require('./blockchain.js');
const { status, fetch, add } = require('./ipfs.js');
const { web3, contracts } = init();

listen(contracts);

// // ADD CONTENT
// add({ type: 'string', payload: 'foobar' }).then(hash => {
//     console.log('content was added')

//     // FETCH IT
//     fetch(hash).then(content => {
//         console.log('content was read\n')

//         // LOG IT & EXIT
//         console.log(content);
//         process.exit();
//     });
// });