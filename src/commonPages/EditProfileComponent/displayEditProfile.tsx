
import UserInfo from './EditProfileComponents/UserInfo';
import UserBio from './EditProfileComponents/UserBio';
import LocationPro from './EditProfileComponents/LocationEdit';
import Website from './EditProfileComponents/Website';
import Skill from './EditProfileComponents/Skill';
import SocialMedia from './EditProfileComponents/SocialMedia';
import Experience from './EditProfileComponents/Experience';
import Education from './EditProfileComponents/Education';
import Hobby from './EditProfileComponents/Hobby';

import { UserProfile } from '../../datatypes.ts/IJobProfile';

import { useState } from 'react';

const userProfile = {
  id: "12345",
  username: "StylishCoder",
  fullName: "Shoukath Otm",
  email:"shoukathot77@gmail.com", 
  profilePicture: "https://example.com/path/to/profile-picture.jpg",
  bio: "Full-Stack Developer | MERN Enthusiast | Coffee Lover ☕",
  location: "New York, USA",
  website: "https://stylishcoder.dev",
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Tailwind CSS"],
  socialLinks: {
    github: "https://github.com/StylishCoder",
    linkedin: "https://linkedin.com/in/StylishCoder",
    twitter: "https://twitter.com/StylishCoder"
  },
  experience: [
    {
      role: "MERN Stack Developer",
      company: "Tech Innovators Inc.",
      duration: "Jan 2023 - Present",
      description: "Developing scalable web applications using the MERN stack."
    },
    {
      role: "Frontend Developer",
      company: "Creative Solutions",
      duration: "May 2021 - Dec 2022",
      description: "Designed and implemented user-friendly UI/UX with React."
    }
  ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      institution: "Tech University",
      year: "2020"
    }
  ],
  hobbies: ["Coding", "Blogging", "Traveling", "Photography"]
};

function EditProfilePage() {

  // const [profile, setProfile] = useState(userProfile);
  const [editProfile,setEditProfile]=useState<UserProfile>(userProfile)

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated Profile:', editProfile);
  };

  return (
    <div className="min-h-screen  py-12 ">
      <div className="w-full mx-auto">
        <form action="" onClick={handleSubmit}>

       <UserInfo profile={editProfile} setEditProfile={setEditProfile}/>

       <UserBio profile={editProfile} setEditProfile={setEditProfile}/>

       <LocationPro profile={editProfile} setEditProfile={setEditProfile}/>
       
       <Website profile={editProfile} setEditProfile={setEditProfile}/>

       <Skill profile={editProfile} setEditProfile={setEditProfile}/>
       
       <SocialMedia profile={editProfile} setEditProfile={setEditProfile}/>
        
       <Experience profile={editProfile} setEditProfile={setEditProfile}/>

       <Education profile={editProfile} setEditProfile={setEditProfile}/>
        
       <Hobby profile={editProfile} setEditProfile={setEditProfile}/>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
export default EditProfilePage;
