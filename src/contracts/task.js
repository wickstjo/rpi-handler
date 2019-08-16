import { transaction, assemble } from '../funcs/blockchain';
import { init } from '../funcs/connection';

// CONNECT
const { web3, interfaces } = init();

// DEVICE ADDED EVENT
function submit(location, ipfs) {

   // GENERATE REFERENCE
   const contract = assemble({
      address: location,
      contract: 'task'
   }, web3, interfaces);

   return transaction({
      query: contract.methods.submit(ipfs),
      contract: location,
   }, web3)
}

export {
   submit
}