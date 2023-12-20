
import * as actionTypes from './actionTypes';
import ApiService from '../Api/api';


export const getPayments = () => async (dispatch) => {
    try {
      const payments = await ApiService.getPayments();
      dispatch({ type: actionTypes.GET_PAYMENTS, payload: payments });
    } catch (error) {
      console.error('Error getting payments:', error);
    }
  }

  export const createPayment = (payment) => async (dispatch) => {
    
    
    try {
      const responce = await ApiService.createPayment(payment);
      dispatch({ type: actionTypes.ADD_PAYMENT, payload: responce.Payment });
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  }

  export const deletePayment = (id) => async (dispatch) => {
    try {
      await ApiService.deletePayment(id);
      dispatch({ type: actionTypes.DELETE_PAYMENT, payload: id });
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  }



  





