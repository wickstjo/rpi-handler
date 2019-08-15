import { transaction, call, assemble } from '../funcs/blockchain';
import { init } from '../funcs/connection';

// CONNECT
const { contracts, web3, interfaces } = init();

// REGISTER DEVICE
function register(hash, name) {
   return transaction({
      query: contracts.devices.methods.add(hash, name),
      contract: contracts.devices._address,
   }, web3)
}

// FETCH DEVICE ADDRESS
function fetch(id) {
   return call({
      query: contracts.devices.methods.fetch(id),
      callback: (response) => {
         return response;
      }
  })
}

// DEVICE ADDED EVENT
function listen(location) {

   // GENERATE REFERENCE
   const contract = assemble({
      address: location,
      contract: 'device'
   }, web3, interfaces);

   return contract.events.Assignment();
}

export {
   register,
   fetch,
   listen
}