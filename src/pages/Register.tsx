import {useState} from "react";
import SeekerRegistrationForm from "./SeekerRegister";
import EmployerRegistrationForm from "./EmployerRegister";

function Register() {

  const [registerPage,setRegisterPage]=useState<string>('register')

  return (
    <>
    {registerPage=='register'?(
      <div className="w-full flex flex-wrap justify-center mt-12">
      <div className="min-w-[300px] w-full sm:w-[350px] bg-1-color m-4 sm:m-6 rounded-lg shadow-md border-[1px] border-gray-300">
        <div className="w-full flex items-center justify-center h-20 border-b border-gray-300">
          <h1 className="text-center text-2xl font-bold text-[#B08401]">Register as a Job Seeker</h1>
        </div>
        <div className="p-6">
          <p className="text-center mb-4 text-gray-700">Find your dream job, get career advice, and more.</p>
          <div className="mt-4 p-2 border-t border-gray-200">
            <h2 className="text-center text-xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Easy profile setup</li>
              <li>Access to job listings</li>
              <li>Personalized job alerts</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={() => setRegisterPage('seeker')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
              Register
            </button>
          </div>
        </div>
      </div>
    
      <div className="min-w-[300px] w-full sm:w-[350px] bg-1-color m-4 sm:m-6 rounded-lg shadow-md border-[1px] border-gray-300">
        <div className="w-full flex items-center justify-center h-20 border-b border-gray-300">
          <h1 className="text-center text-2xl font-bold text-[#B08401]">Register as an Employer</h1>
        </div>
        <div className="p-6">
          <p className="text-center mb-4 text-gray-700">Post job listings, manage applications, and more.</p>
          <div className="mt-4 p-2 border-t border-gray-200">
            <h2 className="text-center text-xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Easy job posting</li>
              <li>Access to a vast pool of talent</li>
              <li>Advanced filtering options</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={() => setRegisterPage('employer')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    
    ):(
      <>
      {registerPage=='employer'?(<EmployerRegistrationForm/>):
      (<SeekerRegistrationForm/>)}
      </>
    )}
    </>
  );
}

export default Register;
