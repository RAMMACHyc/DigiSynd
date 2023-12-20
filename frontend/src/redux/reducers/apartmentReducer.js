import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedApartment: null,
  apartments: [],
};

const apartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_APARTMENTS:
      return {
        ...state,
        apartments: action.payload,
      };

      case actionTypes.SELECT_APARTMENT:
        return {
          ...state,
          selectedApartment: action.payload,
        };

    case actionTypes.ADD_APARTMENT:
      return { ...state, apartments: [...state.apartments, action.payload] };

      case actionTypes.UPDATE_APARTMENT:
        return {
          ...state,
          apartments: state.apartments.map((apartment) =>
            apartment._id === action.payload._id
              ? { ...apartment, ...action.payload }
              : apartment
          ),
        };

    

    case actionTypes.DELETE_APARTMENT:
      return {
        ...state,
        apartments: state.apartments.filter((apartment) => apartment._id !== action.payload),
      };


 
    

    default:
      return state;
  }
};

export default apartmentReducer;
