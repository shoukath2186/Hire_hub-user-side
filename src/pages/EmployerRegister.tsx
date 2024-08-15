import { useState } from 'react';
import { useRegisterMutation } from '../slices/userApiSlice';
import Loader from '../components/loading';
import { useNavigate } from 'react-router-dom';

//interface
import { ErrorResponseDisplay } from '../datatypes.ts/userRes';
import { FormData } from '../datatypes.ts/IUserData';
import { FormErrors } from '../datatypes.ts/IUserData';
import { ErrorResponse } from '../datatypes.ts/userRes';


import { Box, Button, Container, TextField, Typography, Grid, Paper, Link, useTheme, useMediaQuery, InputAdornment, IconButton, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { toast } from 'react-toastify';



const SeekerRegistrationForm: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({}); 

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const navigate = useNavigate();

  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits long.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [register, { isLoading }] = useRegisterMutation()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();



    if (validateForm()) {
      try {
        const res:ErrorResponse = await register({
          userName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userRole: 'employer'
        }).unwrap();

        if(res.response?.message=="Verification otp sent to your email"){
           const Otpid:string=res.response?.data;
           navigate(`/otp-verification?Id=${Otpid}`)
        }

      } catch (err) {

        if (err && typeof err === 'object' && 'data' in err) {
          const errorData = (err as { data: ErrorResponseDisplay }).data;
          toast.error(`The ${errorData}.`);
          console.error(errorData);
          if (typeof errorData === 'string' && errorData == 'User already exist') {
                navigate('/login'); 
          }
      
        } else {
          toast.error('An unexpected error occurred.');
          console.error('Unexpected error:', err);
        }

      }

    }
  };

  return (
    <div className='w-[100%] mb-[70px]'>
      <Container component="main" maxWidth="sm" >
        <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom sx={{ mb: 2 }}>
            Employer Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  autoFocus
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                        >
                          {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                        >
                          {isConfirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2 }} align='center'>
              I have alredy an {''}
              <Link

                href="/login"
                color="primary"
                sx={{ cursor: 'pointer', textDecoration: 'underline', }}
              >
                Account.
              </Link>
            </Typography>
            {isLoading ? (
              
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,backgroundColor: '#DED1BD','&:hover': {backgroundColor: '#DED1BD'} }}
              >
                <Loader />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default SeekerRegistrationForm;