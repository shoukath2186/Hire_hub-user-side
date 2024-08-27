export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}
export interface UserData{
  
  user_name: string;
  last_name: string;
  email: string;
  profilePicture: string;

}

export interface UserProfile {
  _id?: string;
  userId: string;
  userData?:UserData[];
  bio: string;
  location: string;
  website: string;
  skills: string[];
  socialLinks: SocialLinks;
  experience: Experience[];
  education: Education[];
  hobbies: string[];
  resume:string|File;
  _v?:number;
  createdAt?:string;
  updatedAt?:string;

}

