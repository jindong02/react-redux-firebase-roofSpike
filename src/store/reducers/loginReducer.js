const initialState = {
    isLoggedIn: false
  };
  
  function loginReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_LOGIN':
        return {
          ...state,
          isLoggedIn: action.payload
        };
      default:
        return state;
    }
  }
  
  export default loginReducer;
  