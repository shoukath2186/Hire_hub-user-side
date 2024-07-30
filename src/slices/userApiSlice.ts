import { apiSlice } from './apiSlices';
import { ResponseType } from '../datatypes.ts/userRes';
import { RequestDataType } from '../datatypes.ts/userReq';
import { ErrorResponse } from '../datatypes.ts/userRes';


interface RequestOtpDataType{
  otp:string,
  email:string
}
interface RequestResendOtpType{
  email:string
}


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ErrorResponse, RequestDataType>({
      query: (data) => ({
        url: '/user/signup', 
        method: 'post',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<ErrorResponse | ResponseType , RequestOtpDataType>({
      query: (data) => ({
        url: '/user/verify-otp',
        method: 'post',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<ErrorResponse  , RequestResendOtpType>({
      query: (data) => ({
        url: '/user/resendOtp',
        method: 'post',
        body: data,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { 
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = userApiSlice;

// Add this type declaration
//export type UseRegisterMutationType = typeof useRegisterMutation;