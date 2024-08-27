import { Job } from '../../datatypes.ts/IJob';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}


function JobCard({ job }: JobCardProps) {

  const navigate=useNavigate()

  const ApplayJob=(details:Job)=>{
       
     navigate('/jobDetails', { state: { jobDetails: details } });
     console.log(details);
     
  
  }
  
   
  return (
    <div className="job-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="p-6">
        <div className="flex justify-center m-3">
        <img src={job.employerDetails.profilePicture=='hello'?'https://i.pinimg.com/originals/e0/45/31/e04531314590c7149e79853acfd772b0.png':job.employerDetails.profilePicture} alt="Company Logo" className="w-[100px] h-[100px] object-contain rounded-[30%] " />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            {job.skill.slice(0, 2).map((skill) => (
              <span key={skill} className="text-xs font-bold text-green-500 mr-1 bg-green-100 px-3 py-1 rounded-full">{skill}</span>
            ))}
            {job.skill.length>2?(<span> ...</span>):null} 
          </div>
          <span className="text-xs font-bold text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full">{job.job_type}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{job.name}</h3>
        <p className="text-gray-500 mb-4">{job.title}</p>
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {job.location}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Posted: {formatDistanceToNow(new Date(job.createdAt))} ago</span>
          <button onClick={()=>ApplayJob(job)}  className="inline-block px-4 py-2 text-indigo-500 border border-indigo-500 font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300">
            Apply Job
          </button>
        </div>
      </div>
    </div> 
  );  
}

export default JobCard;
