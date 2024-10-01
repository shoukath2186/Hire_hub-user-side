import { useEffect, useState } from 'react'
import axios from 'axios'
import { Job } from '../../../datatypes.ts/IJob'
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function DisplayJob() {

  const [job, setJob] = useState<Job[] | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://newyourchoice.shop/job/homeJob').then((res) => {
      setJob(res.data);

    }).catch((error) => {
      console.log(error);

    })
  }, [])

  return (
    <div className="w-full bg-slate-50">
      <h1 className="text-center font-medium  text-3xl p-7  text-4-color">New Job Opportunity</h1>
      <div className="job-listings-container max-w-7xl mx-auto px-4 py-8 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {job ? (job.map((item) => (
            <div key={item._id} className="job-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <div className="p-6">
                <div className="flex justify-center mb-6"> 
                  <img src={item.employerDetails.profilePicture=='hello'?'https://i.pinimg.com/originals/e0/45/31/e04531314590c7149e79853acfd772b0.png':item.employerDetails.profilePicture} alt="Company Logo" className="w-[100px] h-[100px] object-contain rounded-[30%] " />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {item.skill.slice(0, 2).map((skill) => (
                      <span key={skill} className="text-xs font-bold text-green-500 mr-1 bg-green-100 px-3 py-1 rounded-full">{skill}</span>
                    ))}
                     {item.skill.length>2?(<span> ...</span>):(<span></span>)} 
                  </div>

                  <span className="text-xs font-bold text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full">{item.job_type}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-4">{item.title}</p>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {item.location}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Posted: {formatDistanceToNow(new Date(item.createdAt))} ago</span>
                  <button className="inline-block px-4 py-2 text-indigo-500 border border-indigo-500 font-semibold rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300"
                    onClick={() => navigate('/job?link=job')}>Find Related Jobs</button>
                </div>
              </div>
            </div>
          ))) : (<div>no jobs</div>)}



        </div>
        <div className='w-full flex justify-center'>
          <button onClick={() => navigate('/job?link=job')} className="px-6 py-3 mt-6 font-medium text-xl text-white bg-blue-600 rounded-lg shadow-lg hover:bg-4-color-dark transition-colors duration-300 ease-in-out">
            Browse More Jobs
          </button>
        </div>
      </div>

    </div>



  )
}

export default DisplayJob