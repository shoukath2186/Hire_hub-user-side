 import  { useEffect, useState } from 'react'
import CustomModal from "../Modal/LogoutModal"
import { useLogoutMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { AuthState } from '../../datatypes.ts/IUserData';

function logOut() {
  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [logoutServer] = useLogoutMutation();
  const dispatch = useDispatch();

  useEffect(()=>{
    setModalHeading('Logout Confirmation');
    setModalMessage('Are you sure you want to log out?')
    setOpen(true)
  },[])
  function handleClose(){
    setOpen(false)
  }
 
  async function handleModal(){
    
    try {
      await logoutServer({ userId: userInfo._id }).unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  }

  return (
     <>
     <CustomModal open={open}  handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />
      <button onClick={()=>setOpen(true)}>Log Out</button>
     </>
  )
}

export default logOut