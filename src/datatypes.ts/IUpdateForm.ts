
export interface UserDataUpdate{
    _id?: string ;
    user_name?: string;
    last_name?: string;
    phone?: number;
    email?: string;
    user_role?: 'seeker' | 'employer';
    profilePicture?: string|File;
    old_password?:string;
    new_password?:string;
}