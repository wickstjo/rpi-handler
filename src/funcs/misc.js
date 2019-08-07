// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

function query({ name, func }, dispatch) {

   // START TASK
   dispatch({
      type: 'add',
      payload: {
         message: name,
         status: 'running'
      }
   })

   // EXECUTE FUNC
   func().then(result => {
      switch (result.success) {

         // ON SUCCESS
         case true:
            dispatch({
               type: 'add',
               payload: {
                  message: name,
                  status: 'completed',
                  data: result.data
               }
            })
         break;

         // SOMETHING WENT WRONG
         default: {
            dispatch({
               type: 'add',
               payload: {
                  message: name,
                  status: 'aborted',
                  reason: result.reason
               }
            })
         }
      }
   })
}

// GENERATE A TASK QUERY
function query_old({ start, success, error, func }, messages, dispatch) {

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