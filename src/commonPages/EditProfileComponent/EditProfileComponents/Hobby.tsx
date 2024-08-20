import { Delete, Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import { UserProfile } from "../../../datatypes.ts/IJobProfile";

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Hobby: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function errorHandle(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  
  const handleHobbyChange = (index: number, value: string) => {
   
    if (!profile.hobbies.includes(value)) {
      const newHobbies = [...profile.hobbies];
      newHobbies[index] = value;
      setEditProfile(prev => ({ ...prev, hobbies: newHobbies }));
    } else {
      errorHandle("The hobby you entered already exists in the list.");
    }
  };

  const addHobby = () => {
    setEditProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hobby => hobby.trim() !== "")
    }));

    setEditProfile(prev => ({ ...prev, hobbies: [...prev.hobbies, ""] }));
  };

  const removeHobby = (index: number) => {
    const newHobbies = profile.hobbies.filter((_, i) => i !== index);
    setEditProfile(prev => ({ ...prev, hobbies: newHobbies }));
  };

  const toggleEditMode = () => {
    setEdit(v => !v);
  };

  const confirmChanges = () => {
    
    setEditProfile(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hobby => hobby.trim() !== "")
    }));
    setEdit(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-4-color text-2xl font-bold mb-2">
        Hobbies
      </label>

      {profile.hobbies.map((hobby, index) => (
        <div key={index} className="flex items-center mb-2 relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            value={hobby}
            disabled={!edit}
            onChange={(e) => handleHobbyChange(index, e.target.value)}
          />

        

          {edit && (
            <button
              type="button"
              onClick={() => removeHobby(index)}
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
        onClick={edit ? addHobby : toggleEditMode}
      >
        {edit ? <Add /> : <Edit />} {edit ? 'Add Hobby' : 'Edit Hobbies'}
      </button>
      {edit && (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 ml-5 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={confirmChanges}
        >
          Confirm
        </button>
      )}
    </div>
  );
}

export default Hobby;
