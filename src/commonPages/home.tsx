// import React from 'react';

 import image from '../assets/about_image-2.png'
 import DisplayJob from './Home/HomePage/DisplayJob';

const Home: React.FC = () => {
  return (
    <>
    <div className='w-full bg-blue-50 flex flex-col md:flex-row items-center justify-center p-5'>
  <div className='w-full md:w-1/2 m-5'>
    <img src={image} alt="" className='w-full h-auto' />
  </div>
  <div className='w-full md:w-2/5 m-5 text-left'>
    <h3 className='text-center text-1xl font-semibold mb-2'>Get your jobs</h3>
    <h1 className='text-3xl font-bold mb-4'>Over 12,000 Jobs</h1>

    <p className='mb-4'>Our platform is designed to connect job seekers with the perfect opportunities.
       With an intuitive interface and advanced search filters, finding your ideal job has never been easier.
        Whether you're looking for full-time, part-time, or remote work, our application has you covered.</p>
    
    <ul className='list-disc list-inside mb-4'>
      <li>Flexible work hours</li>
      <li>Remote job opportunities</li>
      <li>Competitive salaries</li>
      <li>Career growth prospects</li>
    </ul>

      <div className='flex items-center justify-center'>
         <button className='bg-blue-800 text-white w-1/2 py-2 px-4 rounded hover:bg-blue-700 transition'>Find Your Job</button>
         <button className='m-4 text-blue-800 hover:text-blue-600 transition'>Update Your Profile</button>
       </div>
     </div>
  </div>
   <div>
    <DisplayJob/>
   </div>

    </>
  );
};

export default Home;
