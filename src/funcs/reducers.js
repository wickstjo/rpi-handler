// TASK REDUCER
function task(local, action) {
   switch (action.type) {

      // START TASK
      case 'start': {
         return [
            ...local, {
               value: action.payload,
               type: action.type
            }
         ]
      }

      // FINISH TASK
      case 'finish': {

         // CLONE THE ARRAY
         const temp = [ ...local ];

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
         const temp = [ ...local ];
      
         // REPLACE THE INDEX VALUE
         temp[action.payload.index] = {
            value: action.payload.value,
            type: action.type
         }
      
         return temp;
      }

      // FALLBACK
      default: {
         return local;
      }
   }
}

module.exports = {
   task
}