import React, { useState } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';

const Navbar: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);



  const navItems: string[] = ['HOME', 'JOBS', 'ABOUT', 'CONTACT'];




  return (

    <nav className="sticky z-10 display-fix top-0 w-full bg-2-color shadow-lg border-b-[2px] border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-4-color font-bold text-[45px]">Hire</h1><h1 className="text-[#B08401] font-bold text-[45px]">Hub</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item: string) => (
                <h4 key={item} className="text-black font-bold  cursor-pointer hover:text-4-color">
                  {item}
                </h4>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-3 flex items-center md:ml-6 space-x-8">
              <MdOutlineMessage className="text-4-color cursor-pointer hover:text-black" size={35} />
              <FaUser className="text-4-color cursor-pointer hover:text-black" size={30} />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-4-color hover:text-black focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        
        <div className="md:hidden bg-2-color" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item: string) => (
                <a
                key={item}
                href="#"
                className="text-black font-bold block px-3 py-2 rounded-md text-base  hover:text-4-color"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <MdOutlineMessage className="text-4-color cursor-pointer hover:text-black m-6" size={35} />
              <FaUser className="text-4-color cursor-pointer hover:text-black" size={30} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;