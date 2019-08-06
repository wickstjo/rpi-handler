// DEFAULT VALUES
const values = [];

// STATE REDUCER
function reducer(state, action) {
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

export {
   values,
   reducer
}