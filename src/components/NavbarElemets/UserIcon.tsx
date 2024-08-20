// import React from 'react';

import { FaUser } from 'react-icons/fa';

interface UserIconProps {
  userInfo: any;
}

const UserIcon: React.FC<UserIconProps> = ({ userInfo }) => (
    userInfo.profilePicture === 'hello' ? (
        <FaUser className="text-blue-600 transition duration-300 ease-in-out" size={28} />
      ) : (
        <img src={userInfo.profilePicture} alt="User" className="w-8 h-8 rounded-full" />
      )
);

export default UserIcon;
