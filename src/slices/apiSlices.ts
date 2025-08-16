import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hire-hub-server-brown.vercel.app/',credentials: 'include'}),  // Replace with your actual base URL
  tagTypes: ['User'],
  endpoints: () => ({}),  
});
