import { transaction } from '../funcs/blockchain';
import { init } from '../funcs/connection';

// CONNECT
const { contracts, web3 } = init();

// REGISTER DEVICE
function register(name) {
   return transaction({
      query: contracts.users.methods.add(name),
      contract: contracts.users._address,
   }, web3)
}

export {
   register
}