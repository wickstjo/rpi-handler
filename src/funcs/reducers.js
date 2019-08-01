// INIT REDUCER
function init(state, action) {
   switch (action.type) {

      // IF EVERYTHING GOES WELL
      case 'success': { return {
         ...state,
         ...action.payload
      }}

      // OTHERWISE
      case 'fail': { return {
         ...state,
         web3: 'fail'
      }}
   }
}

// TASK REDUCER
function task(state, action) {
   switch (action.type) {

      // START TASK
      case 'start': {
         return [
            ...state, {
               value: action.payload,
               type: action.type
            }
         ]
      }

      // FINISH TASK
      case 'finish': {

         // CLONE THE ARRAY
         const temp = [ ...state ];

         // REPLACE THE INDEX VALUE
         temp[action.payload.index] = {
            value: action.payload.value,
            type: action.type
         }

         return temp;
      }

      // ABORT TASK
      case 'abort': {

         // CLONE THE ARRAY
         const temp = [ ...state ];
      
         // REPLACE THE INDEX VALUE
         temp[action.payload.index] = {
            value: action.payload.value,
            type: action.type
         }
      
         return temp;
      }

      // FALLBACK
      default: {
         return state;
      }
   }
}

module.exports = {
   init,
   task
}