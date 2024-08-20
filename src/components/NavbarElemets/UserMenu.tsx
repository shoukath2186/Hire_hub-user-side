import { logout } from '../../slices/authSlice'; 
import { useLogoutMutation } from '../../slices/userApiSlice';
import { useDispatch } from 'react-redux';
 import {useState} from 'react';
 import { useNavigate } from 'react-router-dom';
 import CustomModal from '../../commonPages/Modal/LogoutModal';
 import AddJobModal from '../../commonPages/Modal/AddJobModal';


interface UserMenuProps {
  userInfo: any;
  isOpenMenu: boolean;
  toggleDropdown: () => void; 
  mobile?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ userInfo, isOpenMenu, toggleDropdown, mobile }) =>{ 

  const [open, setOpen] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const [openJob, setOpenJob] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [logoutServer] = useLogoutMutation();

    
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModal = async () => {
    setOpen(false);
    try {
      await logoutServer({ userId: userInfo._id }).unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  async function handileProfile(click: string) {

    toggleDropdown();

    if (click === 'Logout') {
      setModalHeading('Logout Confirmation');
      setModalMessage('Are you sure you want to log out?')
      handleOpen();
    } else if (click === 'Profile') {

      navigate('/profile');

    } else if (click === 'Create new Job') {
      setOpenJob(true);
      
    }
  } 
  const handleCloseJob = () => {
    setOpenJob(false);
  };

    return(
  <>
    <CustomModal open={open}  handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />

    <AddJobModal open={openJob} onClose={handleCloseJob} />
    <div className={`relative inline-block text-left ${mobile ? 'w-full' : ''}`}>
      <div>
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isOpenMenu}
        >
          <span className="text-gray-700 font-semibold">{userInfo?.name}</span>
          <svg className={`w-5 h-5 ${isOpenMenu ? "rotate-180" : ""} transition-transform duration-200`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.44l3.71-3.25a.75.75 0 111.04 1.08l-4 3.5a.75.75 0 01-1.02 0l-4-3.5a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpenMenu && (
        <div className={`${mobile ? 'relative' : 'absolute'} right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 dropdown-menu`}>
          <ul className="py-1">
            
            {userInfo.user_role == 'employer' ? (['Profile', 'Add New Post', 'Create new Job', 'Logout'].map((item) => (
              <li key={item} onClick={() => handileProfile(item)} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                {item}
              </li>
            ))) : (['Profile', 'Add New Post', 'Logout'].map((item) => (
              <li key={item} onClick={() => handileProfile(item)} className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                {item}
              </li>
            )))}
          </ul>
        </div>
      )}
    </div>
  </>
)
};
export default UserMenu;