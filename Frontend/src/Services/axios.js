// Services/axios.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

let hasShownUnauthorizedToast = false;

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!hasShownUnauthorizedToast) {
        toast.error("Please log in to continue.");
        hasShownUnauthorizedToast = true;
        setTimeout(() => { hasShownUnauthorizedToast = false; }, 5000);
      }
    }
    return Promise.reject(error);
  }
);

export default API;