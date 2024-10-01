import { logout } from '../../slices/authSlice';
import axios, { AxiosError } from 'axios';
import store from '../../store';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
  baseURL: 'https://newyourchoice.shop',
  withCredentials: true,
}); 

function logoutUser() {
  store.dispatch(logout());
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {

    if (error.response?.status === 414) {

      const errorMessage = error.response?.data || 'An error occurred';
      toast.error(errorMessage);
      logoutUser();
    }

    return Promise.reject(error);
  }
);