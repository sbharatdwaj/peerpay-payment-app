import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => API.post('/auth/signup', data),
  login: (data) => API.post('/auth/login', data),
};

export const paymentAPI = {
  sendPayment: (data) => API.post('/payment/send', data),
  getBalance: () => API.get('/payment/balance'),
  getProfile: () => API.get('/payment/profile'),
};

export default API;