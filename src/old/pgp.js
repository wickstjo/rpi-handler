const openpgp = require('openpgp');

// CONSTRUCT PGP WORKER
function worker() {
    return openpgp.initWorker({ path:'openpgp.worker.js' });
}

// ENCRYPT TEXT
function encrypt({ type, payload }) {
    return worker().then(() => {

        switch (type) {

            // BINARY CONTENT
            case 'binary': {
                return openpgp.encrypt({
                    message: openpgp.message.fromBinary(new Uint8Array(payload)),
                    passwords: ['password'],
                    armor: false
                }).then(response => { return response.message.packets.write(); });
            }

            // STRING CONTENT
            case 'string': {
                return openpgp.encrypt({
                    message: openpgp.message.fromText(payload),
                    passwords: ['password'],
                }).then(response => { return response.data; });
            }
        }
    })
}

// ENCRYPT TEXT
function decrypt({ type, payload }) {
    return worker().then(async () => {
        switch (type) {

            // BINARY CONTENT
            case 'binary': {
                return openpgp.decrypt({
                    message: await openpgp.message.read(payload),
                    passwords: ['password'],
                }).then(response => { return response.data; });
            }

            // STRING CONTENT
            case 'string': {
                return openpgp.decrypt({
                    message: await openpgp.message.readArmored(payload),
                    passwords: ['password'],
                }).then(response => { return response.data; });
            }
        }
    })
}

module.exports = {
    encrypt,
    decrypt
}