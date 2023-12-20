import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },

  
});

// api.interceptors.request.use((req) => {
//   const profile = JSON.parse(localStorage.getItem('profile'));

//   if (profile?.token) {
//     req.headers.Authorization = `Bearer ${profile.token}`;
//   }

//   return req;
// });


const ApiService = {
  createApartment: async (apartment) => {
    try {
      const res = await api.post('/apartment', apartment);
      return res.data;
    } catch (error) {
      console.error('Error creating apartments:', error);
      throw error;
    }
  },

  getApartments: async (year, month, id) => {
    try {
      const res = await api.get(`/apartment/${year ? `?year=${year}` : ''}${month ? `&month=${month}` : ''}&owner=${id} `);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error('Error getting apartments:', error);
      throw error;
    }
  },

  updateApartment: async (id, data) => {
    try {
      const res = await api.put(`/apartment/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(`Error updating apartment with id ${id}:`, error);
      throw error;
    }
  },

  deleteApartment: async (id) => {
    try {
      const res = await api.delete(`/apartment/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting apartment with id ${id}:`, error);
      throw error;
    }
  },

  createPayment: async (payment) => {
    try {
      const res = await api.post('/payment', payment);
      return res.data;
    } catch (error) {
      console.error('Error creating payments:', error);
      throw error;
    }
  },

  getPayments: async () => {
    try {
      const res = await api.get('/payment');
      return res.data;
    } catch (error) {
      console.error('Error getting payments:', error);
      throw error;
    }
  },

  deletePayment: async (id) => {
    try {
      const res = await api.delete(`/payment/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting payment with id ${id}:`, error);
      throw error;
    }
  },

  signIn: async (user) => {
    try {
      const res = await api.post('/user/signin', user);
      return res.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },




  updateApartment: async (id, data) => {
    try {
      const res = await api.put(`/apartment/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(`Error updating apartment with id ${id}:`, error);
      throw error;
    }
  },

  deleteApartment: async (id) => {
    try {
      const res = await api.delete(`/apartment/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting apartment with id ${id}:`, error);
      throw error;
    }
  },


  createPayment: async (payment) => {
    console.log(payment);
    try {
      const res = await api.post('/payment', payment);
      return res.data;
    } catch (error) {
      console.error('Error creating payments:', error); 
      throw error;
    }
  },
   
  getPayments: async () => {
    try {
      const res = await api.get('/payment');
      return res.data;
    } catch (error) {
      console.error('Error getting payments:', error);
      throw error;
    }
  },

  deletePayment: async (id) => {
    try {
      const res = await api.delete(`/payment/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error deleting payment with id ${id}:`, error);
      throw error;
    }
  },
 
  

  
  signIn: async (user) => {
    try {
      const res = await api.post('/user/signin', user);
      return res.data;
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  },

  signUp: async (user) => {
    try {
      const res = await api.post('/user/signup', user);
      return res.data;
    } catch (error) {
      console.error('Error Register user :', error);
      throw error;
    }
  },


};



export default ApiService;
