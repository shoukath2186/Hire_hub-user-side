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

  interface UserType {
    _id: string ;
    user_name: string;
    last_name: string;
    phone: number;
    email: string;
    user_role: 'seeker' | 'employer';
    profilePicture: string;
  }

  export interface User {
    User: UserType;
    accessToken: string;
  }

  export interface AuthState {
    userInfo: UserType | null;
  }

