const { init, listen } = require('./blockchain.js');
const { status, fetch, add } = require('./ipfs.js');
const { encrypt, decrypt } = require('./pgp.js');
const { convert, picture } = require('./misc.js');
const { web3, contracts } = init();

picture().then(hash => {
    console.log(hash);
})

// encrypt({ type: 'string', payload: 'foobar' }).then(result => {
//     console.log(result)
    
//     convert('/home/bdalab/wickstjo/data/img.jpg').then(response => {
//         console.log(response)
//     });
// })

//listen(contracts);

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