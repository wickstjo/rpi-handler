const openpgp = require('openpgp');

// CONSTRUCT PGP WORKER
function worker() {
    return openpgp.initWorker({ path:'openpgp.worker.js' });
}

// ENCRYPT TEXT
function encrypt(text) {
    return worker().then(() => {

        // OPTIONS
        const options = {
            message: openpgp.message.fromBinary(new Uint8Array([0x01, 0x01, 0x01])),
            passwords: ['password'],
            armor: false
        };
         
        return openpgp.encrypt(options).then(response => {
            return response.message.packets.write();
        });
    })
}

// ENCRYPT TEXT
function decrypt(data) {
    return worker().then(async () => {

        // OPTIONS
        const options = {
            message: await openpgp.message.read(data),
            passwords: ['password'],
        };
        
        return openpgp.decrypt(options).then(response => {
            return response.data;
        });
    })
}

module.exports = {
    encrypt,
    decrypt
}