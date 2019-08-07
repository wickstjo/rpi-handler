// DEFAULT VALUES
const values = [];

// STATE REDUCER
function reducer(state, action) {
   switch (action.type) {

      // ADD MESSAGE
      case 'add': {
         return [
            ...state,
            action.payload
         ]
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