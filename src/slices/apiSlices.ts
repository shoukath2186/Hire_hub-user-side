import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000'}), // Replace with your actual base URL
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
