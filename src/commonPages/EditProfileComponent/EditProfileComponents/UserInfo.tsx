


interface Profile {
    profilePicture: string;
    username: string;
    fullName: string;
    email: string;
}

function UserInfo({profile,setEditProfile}:{ profile: Profile,setEditProfile:any }) {
  return (
    <>
    <div className="w-full flex flex-col items-center pb-7 mt-[-50px]">
    <img
      src={profile.profilePicture}
      alt="User icon"
      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md"
    />
    
  </div>
  
  <div className="mb-4 flex flex-col items-center space-y-4">
  
    <div className="flex items-center justify-center space-x-4">
   
      <label className="text-gray-700 text-sm font-bold  ">
        Username:
      </label>
      <p className="text-gray-900 font-semibold  text-2xl">{profile.username}</p>
    </div>
    <div className="flex items-center justify-center space-x-4">
      <label className="text-gray-700 text-sm font-bold">
        Full Name:
      </label>
      <p className="text-gray-900 font-semibold  text-2xl">{profile.fullName}</p>
    </div>
    <div className="flex items-center justify-center space-x-4">
      <label className="text-gray-700 text-sm font-bold">
        Email:
      </label>
      <p className="text-gray-900 font-semibold  text-1xl">{profile.email}</p>
    </div>
    </div>
    </>
  )
}

export default UserInfo