import { Delete, Add, Edit } from "@mui/icons-material";
import {  useState } from "react";
import { UserProfile } from "../../../datatypes.ts/IJobProfile";

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const Hobby: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [hobbies, setHobbies] = useState<string[]>(profile.hobbies)
  const [error, setError] = useState<string>("");

  

  function errorHandle(message: string) {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  const handleHobbyChange = (index: number, value: string) => {




    const updatedHobbies = [...hobbies];
    updatedHobbies[index] = value;
    setHobbies(updatedHobbies);


  };


  const addHobby = () => {
    setHobbies(prev => prev.filter((val) => val.trim() != ''))
    setHobbies(prev => [...prev, '']);
  };

  const removeHobby = (index: number) => {
    const newHobbies = hobbies.filter((_, i) => i !== index);

    setHobbies(newHobbies)

  };

  const toggleEditMode = () => {
    setEdit(v => !v);
  };

  const confirmChanges = () => {

    const trimmedHobbies = hobbies.map(hobby => hobby.trim()).filter(hobby => hobby !== '');

   
    const uniqueHobbies = Array.from(new Set(trimmedHobbies));

    if (uniqueHobbies.length !== trimmedHobbies.length) {
      errorHandle("Duplicate values found and removed.");
    }

    setHobbies(uniqueHobbies);

   
      setEditProfile(prev => {
        if (prev) {
          return {
            ...prev,
            hobbies: hobbies
          };
        }
        return prev;
      });
      setEdit(false);
    


  };

  return (
    <div className="mb-4">
      <label className="block text-4-color text-2xl font-bold mb-2">
        Hobbies
      </label>

      {hobbies.map((hobbies, index) => (
        <div key={index} className="flex items-center mb-2 relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            value={hobbies}
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
      <hr className="w-full border-t-2 border-3-color my-4" />
    </div>
  );
}

export default Hobby;
