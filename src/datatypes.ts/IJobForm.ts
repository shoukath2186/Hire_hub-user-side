export interface JobFormData {
    company_name: string;
    contact: string;
    location: string;
    salary: number;
    title: string;
    type: string;
    description: string;
    category: string; // Assuming you use the ID as a string
    skill: string[];
    company_logo?: any; // URL as string
  }