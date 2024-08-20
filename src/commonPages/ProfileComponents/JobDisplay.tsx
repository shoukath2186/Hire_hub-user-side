import { useState } from 'react'
import CustomModal from "../Modal/LogoutModal";
import { CiLocationOn } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { axiosInstance } from '../Modal/APIforaxios';
import EditJob from '../Modal/editJobModal';

import { Job } from "../../datatypes.ts/IJob";

interface JobDisplayProps {
    allJob: Job[];
    setAllJob:Job[] | any
}



const JobDisplay: React.FC<JobDisplayProps> = ({ allJob,setAllJob }) => {

    const [open, setOpen] = useState<boolean>(false);
    const [modalHeading, setModalHeading] = useState<string>("");
    const [modalMessage, setModalMessage] = useState<string>("");
    const [deletid, setDeleteid] = useState<string>('')
    const [editData,setEditData]=useState<Job|null>(null)

    const [jobOpen, setJobOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModal = async () => {
        console.log(deletid);
        axiosInstance.put('/job/deleteJob',{Id:deletid}).
        then((res)=>{
           setAllJob(res.data)
        }).catch((error)=>{
            console.log(error.message);  
        })
         setOpen(false);
    };

    const deletJob = (id: string) => {
        setDeleteid(id)
        setModalHeading('Confirm Job Deletion');
        setModalMessage('Are you sure you want to delete this job? This action cannot be undone.');
        handleOpen();
    }

    function handleJobClose(){
        setJobOpen(false)
    }
    function EditData(data:Job){
        setEditData(data)
        setJobOpen(true)
    }
    
    return (
        <>
            <CustomModal open={open} handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />
            {editData?(<EditJob open={jobOpen} onClose={handleJobClose} job={editData} setAllJob={setAllJob}/>):(
                <></>
            )}
            

            {allJob.map((item: Job) => (
                
                <div key={item._id} className="item-item mt-5 p-4 mb-4 bg-white shadow rounded-lg">
                    
                     
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <img className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 border rounded" src={item.logo} alt="" />
                            <div className="text-start ml-4">
                                <h5 className="mb-2 text-lg font-semibold">{item.name}</h5>
                                <div className="text-sm text-gray-600 flex flex-wrap">

                                    <span className="inline-flex items-center mr-3 mb-1"><CiLocationOn className="text-lg mr-1" />{item.location}</span>
                                    <span className="inline-flex items-center mr-3 mb-1"><CiClock1 className="text-lg mr-1" />{item.job_type}</span>
                                    <span className="inline-flex items-center mr-3 mb-1"><FaRegMoneyBillAlt className="text-lg mr-1" />₹ {item.salary}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start md:items-end space-y-2">
                            <div className="flex items-center space-x-2 w-full md:w-auto">
                                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition" onClick={() => deletJob(item._id)}>
                                    Delete
                                </button>
                                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition" onClick={()=>EditData(item)}>
                                    Edit
                                </button>
                            </div>
                            <small className="inline-flex items-center text-gray-600 text-xs">
                                <IoCalendarNumberSharp className="text-sm mr-1" />
                                Deadline: {new Date(item.createdAt).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric',})}
                            </small>
                        </div>
                    </div>
                </div>

            ))}
        </>
    )
}
export default JobDisplay