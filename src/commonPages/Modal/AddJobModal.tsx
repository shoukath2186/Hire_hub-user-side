import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Typography } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { validation } from './newJobValidation';
import { skills } from '../../entities/data';
import { Jobtype } from '../../entities/data'; 

import ComanyName from './JobFormAssets/ComanyName';
import Contact from './JobFormAssets/Contact';
import JobTitle from './JobFormAssets/JobTitle';
import Description from './JobFormAssets/Description';
import Salary from './JobFormAssets/Salary';
import Location from './JobFormAssets/Location';
import Category from './JobFormAssets/Category';
import Education from './JobFormAssets/Education';
import { axiosInstance } from './APIforaxios';

const AddJobModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [companyName, setCompanyName] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [salary, setSalary] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [skill, setSkill] = useState<string[]>([]);
    const [education, setEducation] = useState<string>('');
   

    const [allType] = useState<string[]>(Jobtype);
    const [allSkill] = useState<string[]>(skills);



    const [errorData, setErrorData] = useState({
        companyName: '', contact: '', location: '', salary: '', title: '',
        type: '', description: '', category: '', skill: '',education:'', 
    });
    //======================================================================================
    const handleSubmit = () => {
        const valid = validation({
            companyName, contact, location, salary, title, type, description, category, skill,education, 
            setErrorData, setCompanyName, setContact, setLocation, setSalary, setTitle
        });
        if (valid) {

            console.log('success.');

          
            let   formData = {
                    companyName, contact, location, salary, title, type, description,
                    category, skill: skill,education
                }
            
          
            
            axiosInstance.post('/job/addNewJob', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    if (response.data == 'New job creation successful') {
                        setCompanyName('');setContact(''),setLocation(''),setSalary(''),setTitle(''),setType(''),setDescription(''),setCategory('')
                        setSkill([]),setEducation('')

                        onClose();

                    }

                })
                .catch((error) => {
                    console.log(error);

                });

        }
    };

    const handleSkillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value !== '' && !skill.includes(value)) {
            setSkill(v => [...v, value]);
        }
    };

    const removeSkill = (value: string) => {
        setSkill(v => v.filter(item => item !== value));
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle
                sx={{ backgroundColor: '#3f51b5', color: '#fff', padding: '16px', display: 'flex', justifyContent: 'center' }}
            >
                <Typography sx={{ color: 'white', fontSize: '1.5rem' }} >
                    Create New Job
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ padding: '16px' }}>
                <Grid container spacing={3}>

                    <ComanyName companyName={companyName} setCompanyName={setCompanyName} error={errorData.companyName} />

                    <Contact contact={contact} setContact={setContact} error={errorData.contact} />

                    <Location location={location} setLocation={setLocation} error={errorData.location} />

                    <Salary salary={salary} setSalary={setSalary} error={errorData.salary} />

                    <JobTitle title={title} setTitle={setTitle} error={errorData.title} />

                    <Grid item xs={12} sm={6}>
                        <select
                            value={type}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
                            style={{ width: '100%', padding: '8px', height: '57px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">Select Job Type</option>
                            {allType.map((t, index) => (
                                <option key={index} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        <p style={{ color: 'red' }}>{errorData.type}</p>
                    </Grid>

                    <Description description={description} setDescription={setDescription} error={errorData.description} />

                    <Category category={category} setCategory={setCategory} error={errorData.category} />


                    <Grid item xs={12} sm={6}>
                        <select
                            value={'Select Skills'}
                            onChange={handleSkillChange}
                            style={{ width: '100%', padding: '8px', height: '57px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">Select Skills</option>
                            {allSkill.map((t, index) => (
                                <option key={index} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        <p style={{ color: 'red' }}>{errorData.skill}</p>
                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                            {skill.map((item) => (
                                <button
                                    style={{
                                        marginLeft: '8px', marginBottom: '8px', padding: '8px 16px', backgroundColor: '#3f51b5', color: 'white',
                                        borderRadius: '9999px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transition: 'background-color 0.2s ease'
                                    }}
                                    key={item}
                                >
                                    <span>{item}</span>
                                    <IoMdClose onClick={() => removeSkill(item)} style={{ marginLeft: '8px', cursor: 'pointer', color: 'white' }} />
                                </button>
                            ))}
                        </div>
                    </Grid>
                    <Education education={education} setEducation={setEducation} error={errorData.education} />
                     
                   

                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => onClose()}
                    className="bg-red-600 text-white mx-2 p-2.5"
                >
                    Close
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white mx-2 p-2.5"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddJobModal;
