import { TextField } from "@mui/material";
import { UserDataUpdate } from "../../../../datatypes.ts/IUpdateForm";
import { useState } from "react";

interface NameProps {
  user: UserDataUpdate;
  setUser: React.Dispatch<React.SetStateAction<UserDataUpdate>>;
  setError:React.Dispatch<React.SetStateAction<boolean>>
}

const Name: React.FC<NameProps> = ({ user, setUser,setError }) => {
  const [value, setValue] = useState({ user_name: user.user_name, last_name: user.last_name });
  const [errors, setErrors] = useState({ user_name: "", last_name: "" });

  const validateName = (name: string) => {

    if (name.trim() === "") {
      return "Username is required";
    } else if ((name.match(/[a-zA-Z]/g) || []).length < 3) {
      return "Username must contain at least 3 letters";
    } else if (name.length > 50) {
      return "Username should not exceed 50 characters";
    }

    return "";

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  

    const { name, value } = e.target;

    setError(true)
    if(name=='last_name'&& value==user.last_name){
      setError(false)
      setValue((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));

      return
    }
    if(name=='user_name'&& value==user.user_name){
      setError(false)
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
      return
    }


    if(name=='last_name'){
      setError(false)
      setValue((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));

      return

    }

    const error = validateName(value);
    
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));


    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (!error) {
      setError(false)
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField
          id="user_name"
          name="user_name"
          label="First Name"
          fullWidth
          variant="outlined"
          value={value.user_name}
          onChange={handleChange}
          error={!!errors.user_name}
          helperText={errors.user_name}
        />
        <TextField
          id="last_name"
          name="last_name"
          label="Last Name"
          fullWidth
          variant="outlined"
          value={value.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
      </div>
    </>
  );
};

export default Name;
