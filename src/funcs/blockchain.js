import { keys } from '../resources/settings.json';
import { terminate } from '../funcs/misc';

// SIGN SMART CONTRACT TRANSACTION
function transaction({ query, contract, payable }, web3) {

   // TRANSACTION OUTLINE
   const tx = {
      from: keys.public,
      to: contract,
      data: query.encodeABI()
   }

   // IF PAYABLE WAS DEFINED, ADD VALUE PROP TO TRANSACTION
   if (payable !== undefined) {
      tx.value = payable;
   }

   // ESTIMATE GAS PRICE
   return query.estimateGas(tx).then(price => {

      // ADD GAS PROPERTY TO TRANSACTION
      tx.gas = price;

      // SIGN IT & EXECUTE
      return web3.eth.accounts.signTransaction(tx, keys.private).then(signed => {
         return web3.eth.sendSignedTransaction(signed.rawTransaction).then(() => {
            return {
               success: true
            }

         // IF THE TRANSACTION FAILS
         }).catch(error => {
            return {
               reason: prune(error)
            }
         })
      })

   // IF THE GAS ESTIMATION FAILS
   }).catch(error => {
      return {
         reason: prune(error)
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
         reason: prune(error)
      }
   })
}

// CALL VARIABLE DIRECTLY
function variable(query, callback) {
   return query().then(response => {
      return {
         success: true,
         data: callback(response)
      }
   }).catch(error => {
      return {
         reason: prune(error)
      }
   })
}

// ASSEMBLE SINGLE CONTRACT REFERENCE
function assemble({ address, contract }, web3, interfaces) {
   return new web3.eth.Contract(
      interfaces[contract],
      address
   )
}

// ASSESS METHOD RESPONSE
function assess({ msg, error, crash, next }, result, dispatch) {
   switch(result.success) {

      // ON SUCCESS
      case true:

         // IF PROVIDED, SEND MESSAGE
         if (msg !== undefined) {
            dispatch({
               type: 'good msg',
               payload: msg
            })
         }

         // IF PROVIDED, EXECUTE FOLLOW-UP FUNCTION
         if (next !== undefined) {
            next(result.data)

         // OTHERWISE, SHOW FOOTER & TERMINATE
         } else {
            dispatch({ type: 'footer' })
            terminate();
         }
      break;

      // ON ERROR
      default: {
         dispatch({
            type: 'bad msg',
            payload: (error === undefined) ? 'Error: ' + result.reason : error
         })

         // SHOW FOOTER
         dispatch({ type: 'footer' })
         
         // CRASH IF NECESSARY
         if (crash !== false) {
            terminate();
         }
      }
   }
}

// PRUNE ERROR MESSAGE
function prune(error) {

   // CONVERT TO STRING & NUKE GARBAGE
   error = error.toString();
   error = error.replace('Error: Returned error: VM Exception while processing transaction: revert ', '');

   return error;
}

export {
   transaction,
   call,
   variable,
   assemble,
   assess
}