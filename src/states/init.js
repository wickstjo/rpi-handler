// DEFAULT VALUES
const values = {
   web3: null,
   contracts: null,
   interfaces: null,
   ipfs: null
}

// STATE REDUCER
function reducer(state, action) {
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

export {
   values,
   reducer
}