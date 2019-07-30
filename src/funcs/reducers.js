// TASK REDUCER
function task(local, action) {
   switch (action.type) {

      // START TASK
      case 'start': {
         return [
            ...local, {
               value: action.payload,
               color: '#E3E677'
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
            color: '#62C465'
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
            color: '#E5666A'
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