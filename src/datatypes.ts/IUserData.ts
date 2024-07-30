export interface FormData {
    firstName: string;
    lastName: string;
    phone:string,
    email: string;
    password: string;
    confirmPassword: string;
  }

  export interface FormErrors {
    firstName?: string;
    lastName?: string;
    phone?:string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

