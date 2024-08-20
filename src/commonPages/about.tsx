// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Work, People, Share, Search } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
interface AboutSectionProps {
    icon: React.ReactElement<SvgIconProps>;
    title: string;
    description: string;
  }
  
  const AboutSection: React.FC<AboutSectionProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    {icon}
    <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-center text-gray-600">{description}</p>
  </div>
);

function About() {
    const navigation=useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-4-color mb-8">About HireHub</h1>
        
        <p className="text-xl text-center text-gray-700 mb-12">
          HireHub is a revolutionary job portal with social media integration, 
          connecting employers and job seekers in a dynamic, interactive environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutSection 
            icon={<Work className="text-5xl text-blue-500" />}
            title="Job Opportunities"
            description="Browse and apply for a wide range of job openings across various industries."
          />
          <AboutSection 
            icon={<People className="text-5xl text-green-500" />}
            title="Dual User Types"
            description="Cater to both employers and job seekers, providing tailored experiences for each."
          />
          <AboutSection 
            icon={<Share className="text-5xl text-purple-500" />}
            title="Social Sharing"
            description="Share job postings and professional updates with your network."
          />
          <AboutSection 
            icon={<Search className="text-5xl text-red-500" />}
            title="Smart Job Matching"
            description="Find jobs that match your skills and requirements with our intelligent search system."
          />
        </div>

        <div className="mt-16 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-12 sm:px-12">
            <h2 className="text-3xl font-bold  text-4-color mb-6">Why Choose HireHub?</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-700">
              <li>Seamless integration of job search and social networking</li>
              <li>Easy job posting and application process</li>
              <li>Robust profile creation for both employers and job seekers</li>
              <li>Advanced search filters to find the perfect job or candidate</li>
              <li>Regular updates on new job postings and industry trends</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold  text-4-color mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8">Join HireHub today and take the next step in your career!</p>
          <div className="space-x-4">
            <button onClick={()=>navigation('/job')}  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">Find Your Job</button>
            {/* <a href="#" className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">Learn More</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;