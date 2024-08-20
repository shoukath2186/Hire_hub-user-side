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

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  profilePicture: string;
  bio: string;
  location: string;
  website: string;
  skills: string[];
  socialLinks: SocialLinks;
  experience: Experience[];
  education: Education[];
  hobbies: string[];
}

