
import { Edit, GitHub, LinkedIn, Twitter } from '@mui/icons-material'

import { UserProfile } from "../../../datatypes.ts/IJobProfile";
import { SocialLinks } from '../../../datatypes.ts/IJobProfile';
import { useState } from 'react';

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}


const SocialMedia: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {


  const [value, setValue] = useState<SocialLinks>(profile.socialLinks);
  const [edit, setEdit] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  function errorHandil(message: string) {

    setError(message);
    setTimeout(() => {
      setError('')
    }, 5000);
  }

  function editAccess() {
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

  function hanileChinge(filed: string, value: string) {

    setError('')


    if (filed == 'git') {
      setValue(val => ({ ...val, github: value }))
    } else if (filed == 'link') {
      setValue(val => ({ ...val, linkedin: value }))
    } else if (filed == 'twit') {
      setValue(val => ({ ...val, twitter: value }))
    }
    // setEdit(true)
  }

  function canceld() {
    setValue(profile.socialLinks)
    setEdit(true)
  }

  function conform() {

    let data: SocialLinks = { github: '', twitter: '', linkedin: '' };
    let conform=true
    if (value.github && !isValidUrl(value.github)) {
      errorHandil('The GitHub link is not a valid URL format. Please enter a valid URL starting with http:// or https://');
      data.github = profile.socialLinks.github;
      conform=false
    } else {
      data.github = value.github;
      
    }
  
    if (value.twitter && !isValidUrl(value.twitter)) {
      errorHandil('The Twitter link is not a valid URL format. Please enter a valid URL starting with http:// or https://');
      data.twitter = profile.socialLinks.twitter;
      conform=false
    } else {
      data.twitter = value.twitter;
    
    }
  
    if (value.linkedin && !isValidUrl(value.linkedin)) {
      errorHandil('The LinkedIn link is not a valid URL format. Please enter a valid URL starting with http:// or https://');
      data.linkedin = profile.socialLinks.linkedin;
      conform=false
    } else {
      data.linkedin = value.linkedin;
      
    }
  
    setValue(data);
    setEditProfile(v => ({ ...v, socialLinks: data }));
    if(conform){
      setEdit(true)
    }
   
  }
  


  return (
    <div className="mb-4">
      <label className="block  text-4-color text-2xl mb-5 mt-7 font-bold">
        Social Links
      </label>
      <div className="flex items-center mb-2">
        <GitHub className="text-gray-500 mr-2" />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
          value={value.github}
          onChange={(e) => hanileChinge('git', e.target.value)}
          placeholder="GitHub URL"
          disabled={edit}
        />
      </div>
      <div className="flex items-center mb-2">
        <LinkedIn className="text-gray-500 mr-2" />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
          value={value.linkedin}
          onChange={(e) => hanileChinge('link', e.target.value)}
          placeholder="LinkedIn URL"
          disabled={edit}
        />
      </div>
      <div className="flex items-center mb-2">
        <Twitter className="text-gray-500 mr-2" />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="url"
          value={value.twitter}
          onChange={(e) => hanileChinge('twit', e.target.value)}
          placeholder="Twitter URL"
          disabled={edit}

        />
      </div>
      <p className="text-red-600">{error}</p>
      {edit ? (
        <div onClick={editAccess} className=" hover:cursor-pointer">
          <button className=' bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2'>
            <Edit />Edit Skill
          </button>

        </div>


      ) : (

        <div>
          <button onClick={conform} className="bg-green-500 m-3 text-white font-bold py-2 px-4 rounded mt-2"> Conform </button>
          <button onClick={canceld} className="bg-red-500 m-3 text-white font-bold py-2 px-4 rounded mt-2"> Cancel </button>
        </div>
      )}
    </div>
  )
}

export default SocialMedia