const { init } = require('./connection.js');
const { listen, read, write } = require('./blockchain.js');
const { fetch, add } = require('./ipfs.js');
const { encrypt, decrypt } = require('./pgp.js');
const { convert, picture } = require('./misc.js');

// CONNECT TO BLOCKCHAIN & IPFS GATEWAYS
const { web3, contracts, ipfs } = init();

read(contracts, web3).then(response => {
    console.log(response)
    
    write(contracts, web3, 'foobar').then(response => {
        console.log(response);
        
        read(contracts, web3).then(response => {
            console.log(response)
            process.exit();
        })
    })
})

// write(contracts, '0x4bf6b10f822b465a65da10bbedf4322fc2e4bf6f', 'foobar').then(response => {
//     console.log(response);
//     process.exit();
// })

// picture().then(hash => {
//     console.log(hash);
// })

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