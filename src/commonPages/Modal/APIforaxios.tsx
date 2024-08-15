

import axios from 'axios';


export  const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
 
});




axiosInstance.interceptors.response.use(
    (response) => {
     
      console.log('Response received:', response);
  
      return response;
    },
    (error) => {
     
      if (error.response.status === 401) {
        console.error('Unauthorized - redirecting to login...');
       
      }
  
      return Promise.reject(error);
    }
  );
  