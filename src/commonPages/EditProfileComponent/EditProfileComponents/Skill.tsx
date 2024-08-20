import { Delete, Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import { skills as allSkillData } from "../../../entities/data";
import { UserProfile } from "../../../datatypes.ts/IJobProfile";

interface UserProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}


const Skill: React.FC<UserProps> = ({ profile, setEditProfile }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [allSkill]=useState<string[]>(allSkillData);
  const [sugetion,setSugetion]=useState<{value:boolean,Id:number}>({value:false,Id:-0})
  const [error,setError]=useState<string>('');

  function errorHandil(message:string){
    setError(message);
    setTimeout(() => {
       setError('')
    }, 5000);
  }

  const openSugetion=(index:number)=>{
      setSugetion({Id:index,value:true})
  }
 
  const handleSkillChange = (index: number, value: string) => {

    setSugetion({Id:-0,value:false})

    if(!profile.skills.includes(value)){

      const newSkills = [...profile.skills];

      newSkills[index] = value;
  
     
      setEditProfile(prev => ({ ...prev, skills: newSkills }));
    }else{
      errorHandil('The skill you entered already exists in the list.')
    }
 
    
  };

 
  const addSkill = () => {
     
    setEditProfile(prev => ({
          ...prev,
          skills: prev.skills.filter(skill => skill.trim() !== '')
        }));
        

    setEditProfile(prev => ({ ...prev, skills: [...prev.skills, ''] }));

  };

  
  const removeSkill = (index: number) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setEditProfile(prev => ({ ...prev, skills: newSkills }));
  };

  
  const toggleEditMode = () => {
    setEdit(v => !v);
  };
  const conform=()=>{
    setEditProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.trim() !== '')
    }));
     setEdit(false)
  }

  return (
    <div className="mb-4">
  <label className="block text-4-color text-2xl font-bold mb-2">
    Skills
  </label>

  {profile.skills.map((skill, index) => (
    <div key={index} className="flex items-center mb-2 relative">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        type="text"
        value={skill}
        onClick={() => openSugetion(index)}
        disabled={!edit} 
      />

      {sugetion.value && sugetion.Id !== -1 && sugetion.Id === index && (
        <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-1 max-h-40 overflow-y-auto w-full z-10">
          {allSkill.map((item, i) => (
            <div
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSkillChange(index, item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
     
      {edit && (
        <button
          type="button"
          onClick={() => removeSkill(index)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          <Delete />
        </button>
      )}
    </div>
  ))}
   <p className="text-red-700">{error}</p>
  <button
    type="button"
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${edit ? 'bg-green-500 hover:bg-green-700' : ''}`}
    onClick={edit ? addSkill : toggleEditMode}
  >
    {edit ? <Add /> : <Edit />} {edit ? 'Add Skill' : 'Edit Skill'}
  </button>
  {edit?(
      <button
      type="button"
      className={`bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded mt-2 `}
      onClick={conform}
    >
       Conform
    </button>
  ):(<p></p>)}
</div>

  );
};

export default Skill;
