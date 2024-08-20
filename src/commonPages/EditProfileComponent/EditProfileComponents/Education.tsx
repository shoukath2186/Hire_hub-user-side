import { Add, Delete, Edit } from '@mui/icons-material';
import { useState } from 'react';
import { UserProfile, Education as EducationType } from '../../../datatypes.ts/IJobProfile';

interface UserBioProps {
  profile: UserProfile;
  setEditProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Education: React.FC<UserBioProps> = ({ profile, setEditProfile }) => {
  const [edit, setEdit] = useState<{ value: boolean; id: number | null }>({ value: false, id: null });
  const [educationState, setEducationState] = useState<EducationType[]>(profile.education);
  const [errors, setErrors] = useState<{ [key: number]: { degree: string; institution: string; year: string } }>({});

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...educationState];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEducationState(updatedEducation);
  };

  const addEducation = () => {
    setEducationState([...educationState, { degree: '', institution: '', year: '' }]);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = educationState.filter((_, i) => i !== index);
    setEducationState(updatedEducation);

    
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[index];
      return newErrors;
    });
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors: { [key: number]: { degree: string; institution: string; year: string } } = {};

    educationState.forEach((edu, index) => {
      newErrors[index] = { degree: '', institution: '', year: '' };
      if (!edu.degree.trim()) {
        newErrors[index].degree = 'Degree is required';
        isValid = false;
      }
      if (!edu.institution.trim()) {
        newErrors[index].institution = 'Institution is required';
        isValid = false;
      }
      if (!edu.year.trim()) {
        newErrors[index].year = 'Year is required';
        isValid = false;
      } else if (isNaN(Number(edu.year))) {
        newErrors[index].year = 'Year must be a number';
        isValid = false;
      } else {
        const year = Number(edu.year);
        if (year < 1900 || year > new Date().getFullYear()) {
          newErrors[index].year = 'Year must be a valid year';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateFields()) {
      setEditProfile((prev) => ({
        ...prev,
        education: educationState,
      }));
      setEdit({ value: false, id: null });
    }
  };

  const handleEdit = (index: number) => {
    setEdit({ value: true, id: index });
  };

  const handleCancel = () => {
    setEducationState(profile.education);
    setEdit({ value: false, id: null });
    setErrors({});
  };

  return (
    <div className="mb-4">
      <label className="block text-4-color text-2xl mb-3 mt-8 font-bold">Education</label>
      {educationState.map((edu, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${
              errors[index]?.degree ? 'border-red-500' : ''
            }`}
            type="text"
            value={edu.degree}
            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            placeholder="Degree"
            disabled={!edit.value || edit.id !== index}
          />
          {errors[index]?.degree && <p className="text-red-500 text-xs italic">{errors[index].degree}</p>}

          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${
              errors[index]?.institution ? 'border-red-500' : ''
            }`}
            type="text"
            value={edu.institution}
            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
            placeholder="Institution"
            disabled={!edit.value || edit.id !== index}
          />
          {errors[index]?.institution && <p className="text-red-500 text-xs italic">{errors[index].institution}</p>}

          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${
              errors[index]?.year ? 'border-red-500' : ''
            }`}
            type="text"
            value={edu.year}
            onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
            placeholder="Year"
            disabled={!edit.value || edit.id !== index}
          />
          {errors[index]?.year && <p className="text-red-500 text-xs italic">{errors[index].year}</p>}

          {edit.value && edit.id === index ? (
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={() => removeEducation(index)}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-700"
              >
                <Delete /> Remove Education
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700"
              >
                <Edit /> Edit Education
              </button>
            </div>
          )}
        </div>
      ))}
    
    {!edit.value?(
      <button
        type="button"
        onClick={addEducation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        <Add /> Add Education
      </button>
           ):''}
    </div>
  );
};

export default Education;
