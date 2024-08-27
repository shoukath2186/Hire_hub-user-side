import UserInfo from './EditProfileComponents/UserInfo';
import UserBio from './EditProfileComponents/UserBio';
import LocationPro from './EditProfileComponents/LocationEdit';
import Website from './EditProfileComponents/Website';
import Skill from './EditProfileComponents/Skill';
import SocialMedia from './EditProfileComponents/SocialMedia';
import Experience from './EditProfileComponents/Experience';
import Education from './EditProfileComponents/Education';
import Hobby from './EditProfileComponents/Hobby';
import Resume from './EditProfileComponents/Resume';

import { UserProfile } from '../../datatypes.ts/IJobProfile';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../Modal/APIforaxios';

import ChechChenges from './findChenges';
import { useSelector } from 'react-redux';
import { AuthState } from '../../datatypes.ts/IUserData';

import { toast } from 'react-toastify';

function EditProfilePage() {
  const [profile,seProfile]=useState<UserProfile | null>(null);
  const [editProfile, setEditProfile] = useState<UserProfile | null>(null);

  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [loading,setLoading]=useState<boolean>(false)

  
  

  useEffect(() => {
    axiosInstance.get('/profile/userJobProfile')
      .then(res => {
        setEditProfile(res.data[0]);
        seProfile(res.data[0])
      })
      .catch(error => {
        setEditProfile(null);
        console.log('Error fetching profile:', error);
      });
  }, []);

  const createProfile = () => {
 
    axiosInstance.post('/profile/createProfile')
      .then(res => {
        
        setEditProfile(res.data[0]);
        seProfile(res.data[0])
      })
      .catch(error => {
        console.log('Error creating profile:', error.message);
      });
  };

 

  const handleSubmit = (e: React.FormEvent) => {
    setLoading(true)

    e.preventDefault();
    const data=ChechChenges(profile,editProfile);

  
   console.log(9999,data);
   
  if (Object.keys(data).length === 0) {
    toast.error('Could not find the edited value. Please check and try again.')
    setLoading(false)
      return; 
  }

    axiosInstance.put('/profile/updateJobProfile',data,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    }).then((res)=>{

      toast.success('Update successful! Your changes have been saved.');
      setLoading(false)
      setEditProfile(res.data);
        seProfile(res.data)
      
    }).catch((error)=>{
      console.log(error);
      
    })
    
  };

  return (
    <div className="min-h-screen py-12 bg-[#EFE8DE]">
      <div className="w-full mx-auto">
        {editProfile ? (
          <form onSubmit={handleSubmit}>
            <UserInfo profile={userInfo} />
            <UserBio profile={editProfile} setEditProfile={setEditProfile} />
            <LocationPro profile={editProfile} setEditProfile={setEditProfile} />
            <Website profile={editProfile} setEditProfile={setEditProfile} />
            <Skill profile={editProfile} setEditProfile={setEditProfile} />
            <SocialMedia profile={editProfile} setEditProfile={setEditProfile} />
            <Experience profile={editProfile} setEditProfile={setEditProfile} />
            <Education profile={editProfile} setEditProfile={setEditProfile} />
            <Resume profile={editProfile} setEditProfile={setEditProfile}/>
            <Hobby profile={editProfile} setEditProfile={setEditProfile} />
            <div className="flex items-center justify-center mt-7">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading?'Loading....':'Save Changes'}
                
              </button>
            </div>
          </form>
        ) : (
          <>
          <UserInfo profile={userInfo} />
          <div className="flex items-center justify-center mt-7">

          <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={createProfile}>Create Job Profile</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditProfilePage;
