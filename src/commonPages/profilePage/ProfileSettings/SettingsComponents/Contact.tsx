import { TextField } from "@mui/material";
import { useState } from "react";
import { UserDataUpdate } from "../../../../datatypes.ts/IUpdateForm";

interface NameProps {
  user: UserDataUpdate;
  setUser: React.Dispatch<React.SetStateAction<UserDataUpdate>>;
  setError:React.Dispatch<React.SetStateAction<boolean>>
}

const Contact: React.FC<NameProps> = ({ user, setUser,setError }) => {
  const [number,setNumber]=useState<any>(user.phone)
  const [errors, setErrors] = useState({ phone: "" });

  const validatePhoneNumber = (phone: string) => {
    const phonePattern = /^[0-9]{10}$/; 
    if (phone.trim() === "") {
      return "Phone number is required";
    } else if (!phonePattern.test(phone)) {
      
      return "Please enter a valid phone number";
    }
    
    return "";
  };

  const validating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(true)
   
    setNumber(value)
    const error = validatePhoneNumber(value);

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
      <TextField
        id="phone"
        name="phone"
        label="Phone"
        fullWidth
        variant="outlined"
        onChange={validating}
         value={number}
        error={!!errors.phone}
        helperText={errors.phone}
      />
    </>
  );
};

export default Contact;
