import * as actionTypes from "../actions/actionTypes";


const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
        console.log(action?.data);
      localStorage.setItem('profile', JSON.stringify(action?.data ));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionTypes.LOGOUT:

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};



export default authReducer;