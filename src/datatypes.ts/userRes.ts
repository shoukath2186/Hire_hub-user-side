export interface ResponseType {
    id?: number;
    userName: string;
    lastName: string;
    email: string;
    phone: number;
    userRole: string;
    otp_verify:boolean
  }
  
 export  interface ErrorResponse {
    status: number;
    message?: string;
    data?:boolean;
    response?:{
        message:string
        data:string
    }
  }

  export interface ErrorResponseDisplay {
    status: number;
    data: string;
  }