const { init, listen, read, write } = require('./blockchain.js');
const { status, fetch, add } = require('./ipfs.js');
const { encrypt, decrypt } = require('./pgp.js');
const { convert, picture } = require('./misc.js');
const { web3, contracts } = init();

// write(contracts, '0x292427e705A76C91ac3743E83040B9752dDD128a', 'foobar').then(response => {
//     console.log(response);
//     process.exit();
// })

read(contracts, web3, '0x292427e705A76C91ac3743E83040B9752dDD128a').then(response => {
    console.log(response)
    
    write(contracts, '0x292427e705A76C91ac3743E83040B9752dDD128a', 'foobar').then(response => {
        console.log(response);
        
        read(contracts, web3, '0x292427e705A76C91ac3743E83040B9752dDD128a').then(response => {
            console.log(response)
            process.exit();
        })
    })
})

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