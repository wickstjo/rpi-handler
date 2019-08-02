import { keys } from '../resources/keys.json';

// LISTEN TO CONTRACT EVENTS
function listen(query) {
   return query.on('data', event => {
      return {
         success: true,
         data: 'now listening ...'
      }
   }).on('error', event => {
      return {
         success: false,
         reason: event.toString()
      }
   })
}

// SIGN SC TRANSACTION
function transaction({ query, contract, payable }, state) {

   // ESTIMATE GAS PRICE
   return query.estimateGas({}).then(price => {

      // TRANSACTION OUTLINE
      const tx = {
         from: keys.public,
         to: contract,
         gas: price,
         data: query.encodeABI()
      }

      // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION
      if (payable !== undefined) {
         tx.value = payable;
      }

      // SIGN IT & EXECUTE
      return state.web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
         return state.web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return true;

         // IF THE TRANSACTION FAILS
         }).catch(error => {
            return {
               success: false,
               reason: error.toString()
            }
         })
      })

   // IF THE GAS ESTIMATION FAILS
   }).catch(error => {
      return {
         success: false,
         reason: error.toString()
      }
   })
}

// CALL SC METHOD
function call({ query, callback }) {
   return query.call().then(response => {
      return {
         success: true,
         data: callback(response)
      }
   }).catch(error => {
      return {
         success: false,
         reason: error.toString()
      }
   })
}

export {
   listen,
   transaction,
   call
}