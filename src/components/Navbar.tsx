import { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaUserPlus } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineMessage } from 'react-icons/md';
import {  useSelector } from 'react-redux';
import { AuthState } from '../datatypes.ts/IUserData';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavLink from './NavbarElemets/NavLink';
import UserMenu from './NavbarElemets/UserMenu';
import UserIcon from './NavbarElemets/UserIcon';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [activeItem, setActiveItem] = useState<string>('HOME');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{

    const pathSegments = location.pathname.split('/').filter(Boolean);
   

    if (pathSegments[pathSegments.length - 1] === 'job') {
      setActiveItem('JOBS');
    }else if(pathSegments[pathSegments.length - 1] === ''){
      setActiveItem('HOME')
    }else if(pathSegments[pathSegments.length - 1] === 'about'){
      setActiveItem('ABOUT')
    }else if(pathSegments[pathSegments.length - 1] === 'contact'){
      setActiveItem('CONTACT')
    }
    
  },[location.search])
  //'POST',
  const navItems: string[] = ['HOME',  'JOBS', 'ABOUT', 'CONTACT'];

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

  function handilNavbar(item: string) {
    setActiveItem(item);
    if (item === 'HOME') {
      navigate('/');
    }else if(item==='JOBS'){
      navigate('/job')
    }else if(item==='ABOUT'){
      navigate('/about')
    }else if(item==='CONTACT'){
      navigate('/contact')
    }
  } 

  return (
    <nav className="sticky z-10 top-0 w-full bg-white shadow-lg border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-blue-600 font-bold text-3xl">Hire<span className="text-yellow-600">Hub</span></h1>
          <div className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item} item={item} active={activeItem} onItemClick={handilNavbar} />
              ))}
            </ul>
          </div> 
          {userInfo ? (
            <div className="hidden md:flex items-center space-x-6">
              <MdOutlineMessage className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
              <div className="flex items-center space-x-1">
                <UserIcon userInfo={userInfo} />
                <UserMenu userInfo={userInfo}  isOpenMenu={isOpenMenu} toggleDropdown={toggleDropdown} />
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
            {navItems.map((item) => (
              <NavLink key={item} item={item} mobile active={activeItem} onItemClick={handilNavbar} />
            ))}
          </ul>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              {userInfo ? (
                <>
                  <MdOutlineMessage className="text-blue-600 cursor-pointer hover:text-yellow-600 transition duration-300 ease-in-out" size={28} />
                  <div className="flex items-center space-x-2">
                    <UserIcon userInfo={userInfo} />
                    <UserMenu mobile userInfo={userInfo} isOpenMenu={isOpenMenu} toggleDropdown={toggleDropdown} />
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