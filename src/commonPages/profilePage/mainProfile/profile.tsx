
// import React from 'react';
import { useSelector, UseSelector } from "react-redux";
import { AuthState } from "../../../datatypes.ts/IUserData";

const ProfilePage = () => {

    const { userInfo } = useSelector((state: AuthState | any) => state.auth);
    console.log(userInfo);
    
    return (
      <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <div className="flex items-center mb-8">
          <img
            src={userInfo.profilePicture}
            alt={`${userInfo.user_name} ${userInfo.last_name}`}
            className="w-36 h-36 rounded-full object-cover mr-6 border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{`${userInfo.user_name} ${userInfo.last_name}`}</h1>
            <p className="text-xl text-gray-600 capitalize">Hire Hub Role: {userInfo.user_role}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600 ml-2">{userInfo.email}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="text-gray-600 ml-2">{userInfo.phone}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">userInfo ID:</span>
            <span className="text-gray-600 ml-2">{userInfo._id}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  