import { transaction, call } from '../funcs/blockchain';

// CHECK IF DEVICE IS REGISTERED
function check(hash, state) {
   return call({
      query: state.contracts.devices.methods.fetch(hash),
      callback: (response) => {
         return response;
      }
  })
}

// REGISTER DEVICE
function register(hash, state) {
   return transaction({
      query: state.contracts.devices.methods.add(hash),
      contract: state.contracts.devices._address,
  }, state)
}

export {
   check,
   register
}