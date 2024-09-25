import { useState } from 'react';
import { Button, Avatar } from '@mui/material';

import Name from './SettingsComponents/Name';
import Contact from './SettingsComponents/Contact';
import Password from './SettingsComponents/Password'
import UserProfile from './SettingsComponents/UserProfile';
import ConformationModal from './SettingsComponents/ConformationModal';
import UserIn from './SettingsComponents/UserInfo';

import CheckUpdat from './checkUpdate';

import { useSelector,useDispatch } from 'react-redux';
import { AuthState } from '../../../datatypes.ts/IUserData';

import { UserDataUpdate } from '../../../datatypes.ts/IUpdateForm';
import { toast } from 'react-toastify';

import { axiosInstance } from '../../Modal/APIforaxios';

import { setCredentials } from '../../../slices/authSlice';
 

const ProfileEdit: React.FC = () => {


  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState<UserDataUpdate>(userInfo)
  const [error,setError]=useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);


   
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };


  const handleConfirm = () => {
    setShowConfirmation(false);
    setLoading(true)
    if(error){
      toast.error('An unexpected error occurred.')
      return 
    }

    const formData=CheckUpdat(userInfo,user);

    if (Object.keys(formData).length === 0) {

      toast.error('Could not find the edited value. Please check and try again.')
      setIsEditing(false);
      setShowConfirmation(false);
      setLoading(false)
     
      return; 
  }

    axiosInstance.patch('/profile/updateMain', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      
      setLoading(false)
      setIsEditing(false);
      setShowConfirmation(false);
      
      console.log('previes data',userInfo);
      
      console.log('updated dtata',res.data);
      

      dispatch(setCredentials(res.data));
      toast.success('Update successful!');
      setUser(res.data)
      
    }).catch((error) => {
      console.log('Error:', error);
    });

   


  };

  const handleCancel = () => {
    setUser(userInfo);

    setIsEditing(false);
    setShowConfirmation(false);
  };



  const profilePictureUrl =
    typeof user.profilePicture === 'string'
      ? user.profilePicture
      : user.profilePicture instanceof File
        ? URL.createObjectURL(user.profilePicture)
        : undefined;

  return (
    <>
      <div className="w-full  min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-full mx-auto bg-[#EFE8DE] ">
          <div className="px-6 py-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Avatar
                  src={profilePictureUrl}
                  alt="Profile"
                  sx={{ width: 150, height: 150, marginBottom: 2 }}
                />
              </div>
            </div>
            {isEditing ? (

              <form onSubmit={handleSubmit} className="space-y-6">

                <UserProfile setUser={setUser}  />
                <Name user={user} setUser={setUser} setError={setError} />
                <Contact user={user} setUser={setUser} setError={setError} />
                <Password setUser={setUser} setError={setError} />

                <div className="flex justify-end space-x-4">
                  <>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      {loading?'Loading...':'Save Changes'}
                      
                    </Button>
                  </>
                </div>
              </form>
            ) : (
              <>
                <UserIn user={user}/>
                
                <div className="flex justify-end mt-6 space-x-4">
                  <Button
                    variant="contained"
                    color="primary"
                    className="transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            )}




          </div>
        </div>
        <ConformationModal showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} handleConfirm={handleConfirm} />


      </div>
    </>
  );
};

export default ProfileEdit;
