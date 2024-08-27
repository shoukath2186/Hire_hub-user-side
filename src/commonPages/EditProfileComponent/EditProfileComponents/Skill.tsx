import { Delete, Add, Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { skills as allSkillData } from "../../../entities/data";
import { UserProfile } from "../../../datatypes.ts/IJobProfile";

interface UserProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const Skill: React.FC<UserProps> = ({ profile, setEditProfile }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [allSkill] = useState<string[]>(allSkillData);
  const [suggestion, setSuggestion] = useState<{ value: boolean; Id: number }>({ value: false, Id: -1 });
  const [error, setError] = useState<string>('');
  const [skills, setSkills] = useState<string[]>(profile.skills);

  useEffect(() => {
    setSkills(profile.skills);
  }, [profile.skills]);

  function handleError(message: string) {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  }

  const openSuggestion = (index: number) => {
    setSuggestion({ Id: index, value: true });
  };

  const handleSkillChange = (index: number, value: string) => {
    setSuggestion({ Id: -1, value: false });
    if (!skills.includes(value)) {
      setSkills(prev => {
        const newSkills = [...prev];
        newSkills[index] = value;
        return newSkills;
      });
    } else {
      handleError('The skill you entered already exists in the list.');
    }
  };

  const addSkill = () => {
    setSkills(prev => [...prev.filter(value => value.trim() !== ''), '']);
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const toggleEditMode = () => {
    setEdit(v => !v);
  };


  
  const confirm = () => {
    let cleanedSkills = skills.map(skill => skill.trim()).filter(skill => skill !== '');
  
    const uniqueSkills = Array.from(new Set(cleanedSkills));
  
    if (uniqueSkills.length !== cleanedSkills.length) {
      handleError('Duplicate skills were found and removed.');
    }
  
    setSkills(uniqueSkills);
  
    setEditProfile(prev => {
      if (prev) {
        return {
          ...prev,
          skills: uniqueSkills
        };
      }
      return prev;
    });
  
    setEdit(false);
  };
  

  return (
    <div className="mb-4">
      <label className="block text-4-color text-2xl font-bold mb-2">
        Skills
      </label>

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2 relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            value={skill}
            onClick={() => openSuggestion(index)}
            disabled={!edit}
          />

          {suggestion.value && suggestion.Id === index && (
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
      {edit && (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={confirm}
        >
          Confirm
        </button>
      )}
      <hr className="w-full border-t-2 border-3-color my-4" />
    </div>
  );
};

export default Skill;