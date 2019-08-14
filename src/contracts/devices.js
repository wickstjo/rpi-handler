import { transaction } from '../funcs/blockchain';
import { init } from '../funcs/connection';

// CONNECT
const { contracts, web3 } = init();

// REGISTER DEVICE
function register(hash, name) {
   return transaction({
      query: contracts.devices.methods.add(hash, name),
      contract: contracts.devices._address,
   }, web3)
}

export {
   register
}