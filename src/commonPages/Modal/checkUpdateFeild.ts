import { Job } from "../../datatypes.ts/IJob";
function CheckUpdat(
    companyName: string,
    contact: string,
    location: string,
    salary: string,
    title: string,
    type: string,
    description: string,
    category: string,
    skill: string[],
    education:string,
    job: Job
) {
    const updatedFields:any = {};

    if (job.name !== companyName) {
        updatedFields.name = companyName;
    }

    if (job.contact !== contact) {
        updatedFields.contact = contact;
    }

    if (job.location !== location) {
        updatedFields.location = location;
    }
    if (job.education !== education) {
        updatedFields.education = education;
    }
    

    if (job.salary !== salary) {
        updatedFields.salary = salary;
    }

    if (job.job_type !== type) {
        updatedFields.job_type = type;
    }

    if (job.title !== title) {
        updatedFields.title = title;
    }

    if (job.description !== description) {
        updatedFields.description = description;
    }

    if (job.category !== category) {
        updatedFields.category = category;
    }

    
    if (JSON.stringify(job.skill) !== JSON.stringify(skill)) {
        updatedFields.skill = skill;
    }

    
    
    return updatedFields;
}

export default CheckUpdat;
