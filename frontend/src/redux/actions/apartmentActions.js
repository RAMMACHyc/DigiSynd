
import * as actionTypes from './actionTypes';
import ApiService from '../Api/api';

const userString = localStorage.getItem('profile');
const userObject = JSON.parse(userString);
const id=userObject?._id;
console.log("aaaaa",id)

export const getApartments = (year, month) => async (dispatch) => {
  try {
    if (!id) {
      console.error('User not logged in');
      return;
    }

    const response = await ApiService.getApartments(year, month, id);
    dispatch({ type: actionTypes.GET_APARTMENTS, payload: response.Apartments });
  } catch (error) {
    console.error('Error getting apartments:', error);
  }
};


  export const createApartment = (apartment) => async (dispatch) => {
   
    const app = {
      number: apartment.number,
      etage: apartment.etage,
      resident: apartment.resident,
      tel: apartment.tel,
      owner: id
    };
    try {
      const response = await ApiService.createApartment(app); 
      dispatch({ type: actionTypes.ADD_APARTMENT, payload: response.Apartment });
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  export const updateApartment = ({_id:id , ...apartment}) => async (dispatch) => {
    try {
      const updatedApartment = await ApiService.updateApartment(id, apartment);
      console.log(updatedApartment);
      dispatch({ type: actionTypes.UPDATE_APARTMENT, payload: updatedApartment });
    } catch (error) {
      console.error('Error updating apartment:', error);
    }
  };

  export const selectApartment =  (apartment) => {
    return {
      type: actionTypes.SELECT_APARTMENT,
      payload: apartment
    }
  };

  export const deleteApartment = (id) => async (dispatch) => {
    try {
      await ApiService.deleteApartment(id);
      dispatch({ type: actionTypes.DELETE_APARTMENT, payload: id });
    } catch (error) {
      console.error('Error deleting apartment:', error);
    }
  };
  





