import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes, FaUserPlus } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { useSelector } from 'react-redux';
import { AuthState } from '../datatypes.ts/IUserData';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavLink from './NavbarElemets/NavLink';
import UserMenu from './NavbarElemets/UserMenu';
import UserIcon from './NavbarElemets/UserIcon';
import MessageDropdown from './NavbarElemets/MessageDropdown';
import Calling from './NavbarElemets/Calling';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { userInfo } = useSelector((state: AuthState | any) => state.auth);
  const [activeItem, setActiveItem] = useState<string>('HOME');


  const menuRef = useRef<HTMLDivElement>(null);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) {

      setActiveItem('HOME');
    } else {
      const lastSegment = pathSegments[pathSegments.length - 1];

      if (lastSegment === 'job') {
        setActiveItem('JOBS');
      } else if (lastSegment === 'about') {
        setActiveItem('ABOUT');
      } else if (lastSegment === 'contact') {
        setActiveItem('CONTACT');
      } else {
        setActiveItem('');
      }
    }

  }, [location.pathname.split('/').filter(Boolean)])
  //'POST',
  const navItems: string[] = ['HOME', 'JOBS', 'ABOUT', 'CONTACT', ''];

  const toggleDropdown = () => setIsOpenMenu(prevState => !prevState);

  const toggleMobileMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu')) {
      setIsOpenMenu(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
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
    } else if (item === 'JOBS') {
      navigate('/job')
    } else if (item === 'ABOUT') {
      navigate('/about')
    } else if (item === 'CONTACT') {
      navigate('/contact')
    }
    setIsOpen(false);
  }

 

  

  return (

    <nav className="sticky z-10 top-0 w-full bg-white shadow-lg border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 onClick={() => navigate('/')} className="text-blue-600 font-bold text-3xl cursor-pointer">Hire<span className="text-yellow-600">Hub</span></h1>
          <div className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item} item={item} active={activeItem} onItemClick={handilNavbar} />
              ))}
            </ul>
          </div>
          {userInfo ? (
            <div className="hidden md:flex items-center space-x-6">
              <Calling />
              <MessageDropdown />

              <div className="flex items-center space-x-1">
                <UserIcon userInfo={userInfo} />
                <UserMenu setIsOpen={setIsOpen} userInfo={userInfo} isOpenMenu={isOpenMenu} toggleDropdown={toggleDropdown} />
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
          <div className="flex md:hidden items-center space-x-6">
            <Calling />

            <MessageDropdown />
            <button
              onClick={toggleMobileMenu}
              className=" text-blue-600 hover:text-yellow-600 focus:outline-none transition duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white" ref={menuRef} >
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item} item={item} mobile active={activeItem} onItemClick={handilNavbar} />
            ))}
          </ul>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-between px-5">
              {userInfo ? (
                <>
                  <div className="flex items-center space-x-2">
                    <UserIcon userInfo={userInfo} />
                    <UserMenu setIsOpen={setIsOpen} mobile userInfo={userInfo} isOpenMenu={isOpenMenu} toggleDropdown={toggleDropdown} />
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