export interface Job {
    _id: string;
    name: string;
    title: string;
    location: string;
    contact: string;
    salary: string;
    description:string;
    job_type: string;
    logo?: string;
    education:string;
    applications:string[];
    skill: string[];
    category: string;
    createdAt: string;
    updatedAt: string;
    employerDetails:any;
    __v: number;
  }
  