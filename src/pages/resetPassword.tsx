import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/userApiSlice';
import Loader from '../components/loading';
import { ErrorResponseDisplay } from '../datatypes.ts/userRes';
import { toast } from 'react-toastify';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [reset, { isLoading }] = useResetPasswordMutation();

  const validate = () => {
    let isValid = true;
    let errors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
      isValid = false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
      isValid = false;
    } else if (!/(?=.*[0-9])/.test(password)) {
      errors.password = 'Password must contain at least one number';
      isValid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      errors.password = 'Password must contain at least one special character';
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirming your password is required';
      isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId: string = queryParams.get('Id') || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await reset({ password, userId }).unwrap();
        
        toast.success(res)

        console.log(res);
       
         navigate('/login');
      } catch (error) {
        const errorData = (error as { data: ErrorResponseDisplay }).data;

        toast.error(errorData)

       // console.error('Failed to reset password:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={3} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Please enter your new password below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Box mt={3}>
          {isLoading?(
            <Button type="submit" variant="contained"  fullWidth sx={{ backgroundColor: '#DED1BD', '&:hover': { backgroundColor: '#DED1BD' } }}>
            <Loader/>
          </Button>
          ):(
            <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
          )}
            
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
