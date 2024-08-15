import { useEffect, useState } from 'react';
import { FaUser, FaBars, FaTimes, FaUserPlus } from 'react-icons/fa';
import { IoMdLogIn, IoMdArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineMessage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../datatypes.ts/IUserData';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Modal } from '@mui/material';




const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('HOME');

  const dispatch = useDispatch();

  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleModal = async () => {

    setOpen(false);
    try {

      await logoutServer({ userId: userInfo._id }).unwrap();

      dispatch(logout())


    } catch (error) {
      console.log(2222, error);

    }




  };

  const navItems: string[] = ['HOME', 'POST', 'JOBS', 'ABOUT', 'CONTACT'];

  const toggleDropdown = () => setIsOpenMenu(prevState => !prevState);
  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu')) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [logoutServer] = useLogoutMutation()

  async function handileProfile(clik: string) {
    toggleDropdown()
    if (clik == 'Logout') {

      handleOpen()
    }
    if (clik == 'Profile') {
      navigate('/profile')
    }

  }

  const navigate = useNavigate()


  function handilNavbar(item: string) {

    setActiveItem(item);
    if (item == 'HOME') {
      console.log('sucess');
      navigate('/');
    }
    console.log(item);

  }






  const NavLink: React.FC<{ item: string; mobile?: boolean,active: string; onItemClick: (item: string) => void; }> = ({ item, mobile ,active,onItemClick}) => (

    <li onClick={() => onItemClick(item)}>

      <a
        href="#"
        className={`${mobile
            ? "block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            : "text-base font-semibold border-b-2 pb-1"
          } transition duration-300 ease-in-out ${active === item
            ? mobile
              ? "text-blue-600 bg-gray-100"
              : "text-blue-600 border-blue-600"
            : "text-gray-700 hover:text-blue-600 border-transparent hover:border-blue-600"
          }`}
      >
        {item}
      </a>
    </li>
  );

  const UserMenu = ({ mobile }: { mobile?: boolean }) => (
    <div className={`relative ${mobile ? 'inline-block' : ''}`}>
      <IoMdArrowDropdown
        className="text-gray-500 cursor-pointer hover:text-black transition duration-300 ease-in-out"
        size={24}
        onClick={toggleDropdown}
      />
      {isOpenMenu && (
        <div className={`${mobile ? 'relative' : 'absolute'} right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 dropdown-menu`}>
          <ul className="py-1">
            <div className='bg-slate-200 flex justify-end p-1'>
              <IoClose
                className="text-gray-600 cursor-pointer hover:text-black transition duration-300 ease-in-out"
                size={24}
                onClick={() => setIsOpenMenu(false)}
              />
            </div>
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
  );

  const UserIcon = () => (
    userInfo.profilePicture === 'hello' ? (
      <FaUser className="text-blue-600 transition duration-300 ease-in-out" size={28} />
    ) : (
      <img src={userInfo.profilePicture} alt="User" className="w-8 h-8 rounded-full" />
    )
  );

  return (
    <nav className="sticky z-10 top-0 w-full bg-white shadow-lg border-b-2 border-gray-200">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
          maxWidth: '500px', // Maximum width for larger screens
          textAlign: 'center'
        }}>
          <Typography id="child-modal-title" variant="h6" component="h2" fontWeight="bold">
            Logout Confirmation
          </Typography>
          <Typography id="child-modal-description" sx={{ mt: 2, mb: 3 }}>
            Are you sure you want to log out?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                bgcolor: 'green',
                color: 'white',
                '&:hover': { bgcolor: '#388e3c' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModal}
              sx={{
                bgcolor: '#f44336', // Blue color for Submit button
                color: 'white',
                '&:hover': { bgcolor: '#d32f2f' }, // Darker blue on hover
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-blue-600 font-bold text-3xl">Hire<span className="text-yellow-600">Hub</span></h1>

          <div className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => <NavLink key={item} item={item} active={activeItem} onItemClick={handilNavbar} />)}
            </ul>
          </div>

          {userInfo ? (
            <div className="hidden md:flex items-center space-x-6">
              <MdOutlineMessage className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
              <div className="flex items-center space-x-1">
                <UserIcon />
                <UserMenu />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/login">
                <IoMdLogIn className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
              </Link>
              <Link to="/register">
                <FaUserPlus className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={24} />
              </Link>
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-blue-600 hover:text-yellow-600 focus:outline-none transition duration-300 ease-in-out"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => <NavLink key={item} item={item} mobile active={activeItem} onItemClick={handilNavbar} />)}
          </ul>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              {userInfo ? (
                <>
                  <MdOutlineMessage className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
                  <div className="flex items-center space-x-2">
                    <UserIcon />
                    <UserMenu mobile />
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <IoMdLogIn className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
                  </Link>
                  <Link to="/register">
                    <FaUserPlus className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={24} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;