import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newyourchoice.shop',credentials: 'include'}), // Replace with your actual base URL
  tagTypes: ['User'],
  endpoints: () => ({}), 
});
