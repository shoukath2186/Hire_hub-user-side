


import { useState } from 'react'

import {Edit, Link as LinkIcon} from '@mui/icons-material'
import { UserProfile } from '../../../datatypes.ts/IJobProfile';

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}


const Website: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {

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
  function isValidUrl(value: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + 
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + 
      '((\\d{1,3}\\.){3}\\d{1,3}))' + 
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + 
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + 
      '(\\#[-a-zA-Z\\d_]*)?$', 'i' 
    );
    return !!urlPattern.test(value);
  }
  function conform(){
    setError('')
    // if(!value.trim()){
    //     errorHandil('Bio is requred');
    //     return
    // }
    if(value&&!isValidUrl(value) ){
      errorHandil('The Website link is not a valid URL format.');
      return
    }

    setEditProfile(prev => ({ ...prev, website: value }))
    setEdit(true)
  }



  function canceld(){
      setValue(profile.location)
      setEdit(true)
  }
  

  return (
    <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
            Website
          </label>
          <div className="flex items-center">
            <LinkIcon className="text-gray-500 mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="website"
              type="url"
              name="website"
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

export default Website