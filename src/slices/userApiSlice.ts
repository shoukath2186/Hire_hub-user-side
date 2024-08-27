import { apiSlice } from './apiSlices';
import { ResponseType } from '../datatypes.ts/userRes';
import { RequestDataType } from '../datatypes.ts/userReq';
import { ErrorResponse } from '../datatypes.ts/userRes';
import { User } from '../datatypes.ts/IUserData';
// import { useGoogleLogin } from '@react-oauth/google';


interface RequestOtpDataType{
  otp:string,
  email:string
}
interface RequestResendOtpType{
  email:string
}

interface RequestLoginType{
  email:string,
  password:string
}

interface RequestResetType{
  password:string,
  userId:string
}
interface RequestLogoutType{
  userId:string
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
    resendOtp: builder.mutation<ErrorResponse | User , RequestResendOtpType>({
      query: (data) => ({
        url: '/user/resendOtp',
        method: 'post',
        body: data,
      }),
    }),
    loginReq: builder.mutation<ErrorResponse |  ResponseType  , RequestLoginType >({
      query: (data) => ({
        url: '/user/login',
        method: 'post',
        body: data,
        credentials: 'include',
      }),
    }),
    forgotPassword: builder.mutation<ErrorResponse  , RequestResendOtpType >({
      query: (data) => ({
        url: '/user/forgotPassword',
        method: 'post',
        body: data,
      }),
    }),
    ResetPassword: builder.mutation<ErrorResponse  , RequestResetType >({
      query: (data) => ({
        url: '/user/reset-password',
        method: 'post',
        body: data,
      }),
    }),
    logout: builder.mutation<ErrorResponse  , RequestLogoutType >({
      query: (data) => ({
        url: '/user/logout',
        method: 'post',
        body: data,
      }),
    }),
    googlelogin: builder.mutation<ErrorResponse  , RequestLogoutType >({
      query: (data) => ({
        url: '/user/loginGoogle',
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
  useLoginReqMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGoogleloginMutation
} = userApiSlice;

// Add this type declaration
//export type UseRegisterMutationType = typeof useRegisterMutation;