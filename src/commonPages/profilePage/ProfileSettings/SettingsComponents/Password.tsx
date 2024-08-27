import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserDataUpdate } from "../../../../datatypes.ts/IUpdateForm";

interface NewProps {
  setUser: React.Dispatch<React.SetStateAction<UserDataUpdate>>;
  setError:React.Dispatch<React.SetStateAction<boolean>>
}

const Password: React.FC<NewProps> = ({ setUser,setError }) => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validatePassword = (password: string) => {
    if (password.trim() === "") {
      return "Password required";
    }
    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!strongPasswordPattern.test(password)) {
      return "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    return "";
  };

  const setPassword = (value: string, field: string) => {
    setError(true)
    let newErrors = { ...errors };
    let isValid = true;
    if(!value){
      setError(false)
      setUser((prevState) => ({
        ...prevState,
        previousPassword:'',
        newPassword:'',
      }));
      if(field=='old'){
        
        setPreviousPassword('')
      }else if(field=='new'){
        setNewPassword('')
      }else if(field=='con'){
        setConfirmPassword('')
      }

      setErrors({
        previousPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      return
    }

    switch (field) {
      case "old":
        setPreviousPassword(value);
        newErrors.previousPassword = validatePassword(value);
        if (newErrors.previousPassword) isValid = false;
        break;
      case "new":
        setNewPassword(value);
        newErrors.newPassword = validatePassword(value);
        if (newErrors.newPassword) isValid = false;
        break;
      case "con":
        setConfirmPassword(value);
        newErrors.confirmPassword =
          value !== newPassword
            ? "Passwords do not match"
            : validatePassword(value);
        if (newErrors.confirmPassword) isValid = false;
        break;
      default:
        break;
    }

    setErrors(newErrors);

    if (isValid) {

    if(previousPassword&&newPassword&&confirmPassword){
      setError(false)
      setUser((prevState) => ({
        ...prevState,
        previousPassword,
        newPassword,
      }));
    }else{
         
    }
    }
    
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="previous-password"
          name="previousPassword"
          label="Previous Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={previousPassword}
          onChange={(e) => setPassword(e.target.value, "old")}
          error={!!errors.previousPassword}
          helperText={errors.previousPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="new-password"
          name="newPassword"
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value, "new")}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setPassword(e.target.value, "con")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          Password must be at least 8 characters long, contain at least one
          uppercase letter, one lowercase letter, one number, and one special
          character.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Password;
