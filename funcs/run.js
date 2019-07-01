const { init, listen } = require('./blockchain.js');
const { status, fetch, add } = require('./ipfs.js');
const { encrypt, decrypt } = require('./pgp.js');
const { web3, contracts } = init();

encrypt('foobar').then(encrypted => {
    console.log('encryption done')

    decrypt(encrypted).then(response => {
        console.log('decryption done\n')

        console.log(response)
        process.exit();
    });
});

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