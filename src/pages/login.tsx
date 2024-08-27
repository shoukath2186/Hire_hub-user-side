import { useState, FormEvent } from 'react';
import { Box, Button, TextField, Typography, Container, Link, IconButton, Modal } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useLoginReqMutation } from '../slices/userApiSlice';
import { useGoogleloginMutation } from '../slices/userApiSlice';
import Loader from '../components/loading';


import { ErrorStateLogin } from '../datatypes.ts/IError';
import { toast } from 'react-toastify';
import { ErrorResponseDisplay } from '../datatypes.ts/userRes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login(): JSX.Element {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorStateLogin>({ email: '', password: '' });
  const [open, setOpen] = useState<boolean>(false);
  const [modalMessage, setModaMessage] = useState<string>('')

  const [login, { isLoading: isVerifying }] = useLoginReqMutation();
  const [googleLogin, { isLoading: isVerifyingoogle }] = useGoogleloginMutation()

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const validate = (): boolean => {

    let emailError = '';
    let passwordError = '';

    if (!email.trim()) {
      emailError = 'Email is required';
    } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      emailError = 'Email is invalid';
    }
    if (!password.trim()) {
      passwordError = 'Password is required';
    } else if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters long';
    }


    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: '', password: '' });
    return true;
  };

  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleModal = () => {

    setOpen(false);
    navigate(`/otp-verification?Id=${email}&resend=success`)

  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form submitted');
      try {
        console.log(email, password);

        const res = await login({ email: email, password: password }).unwrap()

        dispatch(setCredentials(res));

        navigate('/')


      } catch (error) {
        //console.log(error);

        const errorData = (error as { data: ErrorResponseDisplay }).data;
        //console.log(errorData);
        if (typeof errorData === 'string' && errorData == 'OTP is not verified.') {
          setModaMessage('OTP is not verified.Please verify it to proceed. If you need a new OTP, request one through the option.')
          handleOpen()

          toast.error(errorData)
        } else {
          toast.error(errorData)
        }

      }

    }
  };

  const handleGoogleLogin = useGoogleLogin({

    onSuccess: (codeResponse: any) => {
      
      googleData(codeResponse)

    },
    onError: (error) => {
      console.log(error);

    }
  });

  function googleData(user: any) {

    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json'
      }
    })
      .then(async (res) => {
        try {
          const responce = await googleLogin(res.data).unwrap()

          dispatch(setCredentials(responce));

          navigate('/')
        } catch (error) {
          console.log(error);
          const errorData = (error as { data: ErrorResponseDisplay }).data;
          toast.error(errorData)
        }


      })
      .catch((err) => console.log(err));

  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
          maxWidth: '500px', // Maximum width for larger screens
          textAlign: 'center'
        }}>
          <Typography id="child-modal-title" variant="h6" component="h2" fontWeight="bold">
            OTP Verification Required
          </Typography>
          <Typography id="child-modal-description" sx={{ mt: 2, mb: 3 }}>
            {modalMessage}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                bgcolor: '#f44336',
                color: 'white',
                '&:hover': { bgcolor: '#d32f2f' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModal}
              sx={{
                bgcolor: '#3f51b5',
                color: 'white',
                '&:hover': { bgcolor: '#303f9f' }, 
              }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Modal>

      <Container maxWidth="lg">

        <Box
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          alignItems="center"
          justifyContent="center"
          mt={5}
          mb={7}
        >

          <Box
            sx={{
              flex: { xs: '1', lg: '0 0 45%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: { xs: 6, lg: 0 },
              pr: { lg: 4 },
            }}
          >
            <img
              src="https://demo.graygrids.com/themes/jobmate/assets/images/header_banner.png"
              alt="Login"
              style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
            />
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              flex: { xs: '0', lg: '0 0 40%' },
              width: '100%',
              maxWidth: '450px',
              bgcolor: 'background.paper',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" gutterBottom fontWeight="bold" color="#1b2a6b">
              Login
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ mb: 3 }}
            />
            <Box width="100%" position="relative" mb={3}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </Box>
            {/* {errors.email && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{errors.email}</Alert>}
            {errors.password && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{errors.password}</Alert>} */}
            <Link href="/forget-password" sx={{ alignSelf: 'flex-end', mb: 3, color: '#1b2a6b' }}>
              <Typography variant="body2">Forgot Password?</Typography>
            </Link>
            {isVerifying || isVerifyingoogle ? (
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  bgcolor: '#DED1BD',
                  '&:hover': { bgcolor: '#DED1BD' }
                }}
              >
                <Loader />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  bgcolor: '#3b82f6',
                  '&:hover': { bgcolor: '#2563eb' }
                }}
              >
                Login
              </Button>
            )}

            <Typography variant="body2" sx={{ mb: 3 }}>
              Don't have an account?{' '}
              <Link href="/register" sx={{ color: '#1b2a6b', fontWeight: 'bold' }}>
                Sign Up
              </Link>
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.5,
                color: '#1b2a6b',
                borderColor: '#1b2a6b',
                '&:hover': { bgcolor: 'rgba(27, 42, 107, 0.04)' }
              }}

              onClick={() => handleGoogleLogin()}
            >
              <FaGoogle style={{ marginRight: '12px' }} /> Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
