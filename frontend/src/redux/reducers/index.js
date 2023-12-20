import { combineReducers } from 'redux';
import apartmentReducer from './apartmentReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  apartments: apartmentReducer,
  authReducer
});

export default rootReducer;
