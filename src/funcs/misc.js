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
      switch (result.success) {

         // EVERYTHING WENT OK
         case true:
            dispatch({
               type: 'finish',
               payload: {
                  value: success + result.data,
                  index: length
               }
            })
         break;

         // SOMETHING WENT WRONG
         default: {
            dispatch({
               type: 'abort',
               payload: {
                  value: error,
                  index: length
               }
            })
         }
      }

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