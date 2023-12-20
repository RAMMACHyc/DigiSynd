import * as actionTypes from "../actions/actionTypes";


const initialState = {
  paymentData: null,
    payments: [],
};


const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case actionTypes.GET_PAYMENTS:
        return {
            ...state,
            payments: action.payload.Payments,
        };
    case actionTypes.ADD_PAYMENT:
        return { ...state, payments: [...state.payments, action.payload] };
    case actionTypes.UPDATE_PAYMENT:
        return {
            ...state,
            payments: state.payments.map((payment) =>
                payment._id === action.payload._id
                    ? { ...payment, ...action.payload }
                    : payment
            ),
        };
     

    default:
      return state;
  }
};

export default paymentReducer;
