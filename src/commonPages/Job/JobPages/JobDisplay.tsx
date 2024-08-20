import { useEffect, useState } from "react"
import { Job } from "../../../datatypes.ts/IJob";
import { axiosInstance } from "../../Modal/APIforaxios";
import JobCard from "../JobCard";
import SearchBar from "./SearchBar";
function JobPage() {
  
    const [allJob,setAllJob]=useState<Job[]|null>(null)
    const [limit,setLimit]=useState<number>(12)
    const [next,setNext]=useState<boolean>(true);
    const [reset,setReset]=useState<boolean>(false);
    
    useEffect(()=>{
       axiosInstance.get(`/job/getJob?limit=${limit}`).then((res)=>{
           setAllJob(res.data)
           if(res.data.length<limit){
            setNext(false)
           }else{
            setLimit(v=>v+6);
           };
           
           
       }).catch((error)=>{
          console.log(error);
          
       })
    },[reset])

  return (
    <>
    <SearchBar setAllJob={setAllJob} setReset={setReset}  reset={reset}/>
    <div className="w-full bg-blue-50">
    <h1 className="text-center font-medium  text-3xl p-6  text-4-color">Find Your Job</h1>
    <div className="job-listings-container max-w-7xl mx-auto px-4 py-8 bg-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJob ? (allJob.map((item:Job) => (
           <JobCard key={item._id} job={item} />
        ))) : (<div>no jobs</div>)}



      </div>
      <div className='w-full flex justify-center'>
        {next?(
          <button  className="px-6 py-3 mt-6 font-medium text-xl text-white bg-blue-600 rounded-lg shadow-lg hover:bg-4-color-dark transition-colors duration-300 ease-in-out">
          Browse More Jobs
        </button>
        ):(
          <div></div>
        )}
        
      </div>
    </div>

  </div>
  
  </>
  )


}

export default JobPage