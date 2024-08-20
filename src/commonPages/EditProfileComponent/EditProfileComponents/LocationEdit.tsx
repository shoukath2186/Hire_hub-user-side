 import { useState } from 'react'
import { Edit, LocationOn } from "@mui/icons-material"
import { UserProfile } from "../../../datatypes.ts/IJobProfile";

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}


const LocationPro: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {

  const [value,setValue]=useState<string>(profile.location);
  const [edit,setEdit]=useState<boolean>(true)
  const [error,setError]=useState<string>('');

  function errorHandil(message:string){
    setError(message);
    setTimeout(() => {
       setError('')
    }, 5000);
  }

  function hanile(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
    const value= e.target.value;
    setValue(value)
  }
  

  function editAccess(){
    setEdit(false)
  }
  function conform(){
    setError('')
    // if(!value.trim()){
    //     errorHandil('Bio is requred');
    //     return
    // }
    if(value&&value.length<6){
      errorHandil('value must have 5 length');
      return
    }

    setEditProfile(prev => ({ ...prev, bio: value }))
    setEdit(true)
  }



  function canceld(){
      setValue(profile.location)
      setEdit(true)
  }
  
  return (
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <div className="flex items-center">
            <LocationOn className="text-gray-500 mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              name="location"
              value={value}
              disabled={edit}
              onChange={hanile}
            />
          </div>
          <p className="text-red-600">{error}</p>
          {!edit?(
          <div>
              <button onClick={conform} className="bg-green-500 m-3 text-white font-bold py-2 px-4 rounded mt-2"> Conform </button>
              <button onClick={canceld} className="bg-red-500 m-3 text-white font-bold py-2 px-4 rounded mt-2"> Cancel </button> 
           </div>
          
         ):(
         <div onClick={editAccess} className=" hover:cursor-pointer ml-7 mt-4"> <Edit /></div>

         )}
        </div>
  )
}

export default LocationPro