// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// GENERATE A TASK QUERY
function query({ start, success, error, func }, messages, dispatch) {

   // START TASK
   dispatch({
      type: 'start',
      payload: start
   })

   // SAVE INDEX
   const length = messages.length;

   // EXECUTE THE FUNCTION
   func.then(result => {
      
      // FINISH TASK
      dispatch({
         type: 'finish',
         payload: {
            value: success + ':\n' + result,
            index: length
         }
      })

   // IF AN ERROR IS CAUGHT
   }).catch(err => {

      // ABORT
      dispatch({
         type: 'abort',
         payload: {
            value: error + ':\n' + err,
            index: length
         }
      })
   })
}

module.exports = {
   sleep,
   query
}