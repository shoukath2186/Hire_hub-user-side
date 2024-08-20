type ValidationProps = {
    companyName: string;
    contact: string;
    location: string;
    salary: string;
    title: string;
    type: string;
    description: string;
    category: string;
    skill: string[];
    education:string;
   

    setErrorData: React.Dispatch<React.SetStateAction<ErrorData>>;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
    setContact: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setSalary: React.Dispatch<React.SetStateAction<string>>;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    update?: boolean | null;
};

type ErrorData = {
    companyName: string;
    contact: string;
    location: string;
    salary: string;
    title: string;
    type: string;
    description: string;
    category: string;
    skill: string;
    education:string;
    
};

export function validation({
    companyName,
    contact,
    location,
    salary,
    title,
    type,
    description,
    category,
    skill,
    education,
   
    setErrorData,
    setCompanyName,
    setContact,
    setLocation,
    setSalary,
    setTitle,
    
}: ValidationProps): boolean {

    setErrorData({
        companyName: '',
        contact: '',
        location: '',
        salary: '',
        title: '',
        type: '',
        description: '',
        category: '',
        skill: '',
        education:'',
        
    });

    let valid = true;

    if (!companyName.trim()) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            companyName: 'Please enter the company name'
        }));
        setCompanyName('')
        valid = false;
    } else if (companyName.length < 5 || !/[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(companyName)) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            companyName: 'Please enter a valid company name'
        }));
        valid = false;
    }


    if (!contact.trim()) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            contact: 'Contact number is required'
        }));
        setContact('')
        valid = false;
    } else if (!/^\d{10}$/.test(contact)) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            contact: 'Contact number must be exactly 10 digits'
        }));
        valid = false;
    }

    //----------------------------------------------------------------
    if (!location.trim()) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            location: 'Location is required'
        }));
        setLocation('')
        valid = false;
    }
    //------------------------------------------------------------------

    if (!salary.trim()) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            salary: 'Salary is required'
        }));
        setSalary(''); // Reset the salary input
        valid = false;
    } else if (!/^\d+$/.test(salary) || Number(salary) <= 1000) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            salary: 'Salary must be a number greater than 1000'
        }));
        valid = false;
    }

    if (!title.trim()) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            title: 'Title is required'
        }));
        setTitle(''); // Reset the title input
        valid = false;
    } else if (title.length < 5 || (title.match(/[a-zA-Z]/g) || []).length < 3) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            title: 'Please enter a valid title with at least 5 characters, including at least 3 alphabetic characters'
        }));
        valid = false;
    }


    if (!type) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            type: 'Job Type is required'
        }));
        valid = false;
    }


    if (!description) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            description: 'Job description is required'
        }));
        valid = false;
    }

    if (!category) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            category: 'Job Category is required'
        }));
        valid = false;
    }

    if (skill.length < 1) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            skill: 'At least one job skill is required'
        }));
        valid = false;
    }
    if (!education) {
        setErrorData((prevErrorData) => ({
            ...prevErrorData,
            education: 'Job Type is required'
        }));
        valid = false;
    }
   




    return valid;
}