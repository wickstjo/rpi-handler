import { transaction } from '../funcs/blockchain';
import { init } from '../funcs/connection';

// CONNECT
const { contracts, web3 } = init();

// REGISTER DEVICE
function register(hash) {
   return transaction({
      query: contracts.devices.methods.add(hash),
      contract: contracts.devices._address,
  }, web3)
}

export {
   register
}