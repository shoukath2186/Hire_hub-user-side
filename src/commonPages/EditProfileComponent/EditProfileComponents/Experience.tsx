import { Add, Edit, Delete } from "@mui/icons-material";
import { UserProfile } from '../../../datatypes.ts/IJobProfile';
import { useState, useEffect } from "react";
import { Experience as ExperienceModal } from "../../../datatypes.ts/IJobProfile";
import CustomModal from "../../Modal/LogoutModal";

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile|null>>;
}

const Experience: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {

  const [edit, setEdit] = useState<{ value: boolean, Id: number | undefined }>({ value: false, Id: undefined });
  const [error, setError] = useState<{ value: string, id: number }>({ value: '', id: -1 });

  //  modal conformation

  const [open, setOpen] = useState<boolean>(false);
  const [removeIndex,setRemoveIndex]=useState<number>(-1)
  const [modalHeading,setModalHeading]=useState<string>('')
  const [modalMessage,setModalMessage]=useState<string>('')

 
  const [value, setValue] = useState<ExperienceModal[]>([]);

 

  useEffect(() => {
    setEdit({ value: false, Id: undefined })
    setValue(profile.experience);
  }, [profile]);

  const handleExperienceChange = (index: number, field: string, newValue: string) => {
    const newExperience = [...value];
    newExperience[index] = { ...newExperience[index], [field]: newValue };
    setValue(newExperience);
  };

  const addExperience = () => {
    const newExperience = {
      role: '',
      company: '',
      duration: '',
      description: ''
    };
    const index=profile.experience.length;
    setEdit({ value: true, Id: index });
    setValue([...value, newExperience]);
  };

  const editPermission = (index: number) => {
    setEdit({ value: true, Id: index });
  };

 

  const confirm = (index: number) => {
    const experience = value[index];
    if (!experience.role || !experience.company || !experience.duration || !experience.description) {
      setError({ value: 'All fields are required.', id: index });
      return;
    }

   
    setEditProfile(prev => {
      if (prev !== null) {
        return { ...prev, experience: value } as UserProfile;
      }
      return prev;
    });
    setEdit({ value: false, Id: undefined });
    setError({ value: '', id: -1 });
  };

  const cancel = () => {
    
    setValue(profile.experience);
    setEdit({ value: false, Id: undefined });
    setError({ value: '', id: -1 }); 
  };

  
  //  modal conformation

  

  const handleOpen = (index:number) =>{
    setModalHeading('Confirmation of Experience Removal');
    setModalMessage('Are you sure you want to remove this experience?');
    setRemoveIndex(index)
     setOpen(true)

  };
  const handleClose = () => setOpen(false);

  const handleModal = async () => {
    const removeExperience = (index: number) => {
    

      const newExperience = value.filter((_, i) => i !== index);
      setValue(newExperience);
      setError({ value: '', id: -1 });
      setEdit({ value: false, Id: undefined });
    };

     removeExperience(removeIndex)

    setOpen(false);
  
  }

  

  return (
    <div className="mb-4">
      <CustomModal open={open}  handleClose={handleClose} handleModal={handleModal} title={modalHeading} message={modalMessage} />
      <label className="block text-4-color text-2xl mb-5 mt-7 font-bold ">
        Experience
      </label>
      {value.map((exp, index) => (   
        <div key={index} className="mb-4 p-4 border rounded">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            type="text"
            value={exp.role}
            onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
            placeholder="Role"
            disabled={!edit.value || edit.Id !== index}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            type="text"
            value={exp.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            placeholder="Company"
            disabled={!edit.value || edit.Id !== index}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            type="text"
            value={exp.duration}
            onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
            placeholder="Duration"
            disabled={!edit.value || edit.Id !== index}
          />
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            value={exp.description}
            onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
            placeholder="Description"
            rows={3}
            disabled={!edit.value || edit.Id !== index}
          ></textarea>
          <p className="text-red-600">{error.id === index ? error.value : ''}</p>

          {!edit.value || edit.Id !== index ? (
            <div className="flex justify-between">
              <button
                onClick={() => editPermission(index)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700"
              >
                <Edit /> Edit Experience
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                onClick={() => confirm(index)}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={cancel}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOpen(index)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-700"
              >
                <Delete /> Remove Experience
              </button>
            </div>
          )}
        </div>
      ))} 
      {!edit.value?(
        <button
        type="button"
        onClick={addExperience}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        <Add /> Add Experience
      </button>
      ):''}
      <hr className="w-full border-t-2 border-3-color my-4"/>
    </div>
  );
}

export default Experience;
