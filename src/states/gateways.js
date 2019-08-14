// DEFAULT VALUES
const values = {
   messages: [],
   footer: false
}

// STATE REDUCER
function reducer(state, action) {
   switch (action.type) {

      // SHOW FOOTER
      case 'footer': { return {
         ...state,
         footer: true
      }}

      // ADD GOOD MESSAGE
      case 'good msg': { return {
         ...state,
         messages: [
            ...state.messages, {
               text: action.payload,
               color: '#32CD32'
            }
         ]
      }}

      // ADD GOOD MESSAGE
      case 'bad msg': { return {
         ...state,
         messages: [
            ...state.messages, {
               text: action.payload,
               color: '#F24F4F'
            }
         ]
      }}

      // TERMINATE APP
      case 'terminate': { return {
         ...state,
         footer: true,
         messages: [
            ...state.messages, {
               text: action.payload,
               color: '#F24F4F'
            }
         ]
      }}

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