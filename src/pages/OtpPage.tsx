import { useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import Loader from '../components/loading';
import { useNavigate } from 'react-router-dom';

import { useVerifyOtpMutation,useResendOtpMutation} from '../slices/userApiSlice';


import { ErrorResponseDisplay } from '../datatypes.ts/userRes';
import { useDispatch} from 'react-redux';
import { setCredentials } from '../slices/authSlice';

// import { Response } from '../datatypes.ts/userRes';



const OTP_LENGTH = 4;
const RESEND_TIMEOUT = 60; // 1 minute in seconds

const OTPRegisterForm: React.FC = () => {

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? parseInt(savedTime, 10) : RESEND_TIMEOUT; 
  });
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const resendTriggered = useRef(false);


  const navigate = useNavigate();
  const dispatch=useDispatch();


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId: string = queryParams.get('Id') || '';

  const resend: string = queryParams.get('resend') || '';
   

  useEffect(() => {
    if (resend === 'success' && !resendTriggered.current) {
      
      handleResendOtp();
      resendTriggered.current = true; 
      console.log('OTP resend activated');
    }
  }, [resend]);
 

  useEffect(() => {

   localStorage.setItem('timer', timer.toString());

   if (timer > 0) {
     const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
     return () => clearInterval(countdown);
   } else {
     localStorage.removeItem('timer'); 
   }
  }, [timer]);

  

  const handleOtpChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { // Only accept digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next field if a digit is entered
      if (value && index < OTP_LENGTH - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index]) {
      // Move to the previous field when backspace is pressed
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    }
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length === OTP_LENGTH) {
      //console.log('Submitted OTP:', fullOtp);


      try {
        const res= await verifyOtp({
          otp: fullOtp,
          email: userId
        }).unwrap();

         //console.log(12345,res);
          
        
         dispatch(setCredentials(res));
          localStorage.removeItem('timer');
           navigate('/')
      } catch (err) {

        if (err && typeof err === 'object' && 'data' in err) {
          const errorData = (err as { data: ErrorResponseDisplay }).data;
          console.log(errorData);

          if (typeof errorData === 'string' && errorData == 'Email does not exist.') {
            setTimer(0)
            toast.error('OTP not found. Please resend the OTP.');
          }
          if (typeof errorData === 'string' && errorData == 'User does not exist.') {
            navigate('/Register')
            toast.error('User data not found. Please register again.');
          }
          if (typeof errorData === 'string' && errorData == 'OTP did not match.') {
            toast.error('OTP did not match.');
          }


        }

      }


    } else {
      if (fullOtp.length < 1) {
        console.error('Enter OTP');
        toast.error('Enter OTP');
      } else {
        console.error('Invalid OTP');
        toast.error('Invalid OTP');
      }
    }
  };


  const handleResendOtp = async () => {
    console.log('OTP resent');

    try {
      const res = await resendOtp({
        email: userId
      }).unwrap();

       toast.success(res)


    } catch (err) {
          console.log(2222,err);
          
    }

    navigate(`/otp-verification?Id=${userId}`)
   
    setOtp(Array(OTP_LENGTH).fill('')); 
    setTimer(RESEND_TIMEOUT); 
  };


  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={8} p={3} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom m={3}>
          OTP Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            {otp.map((digit, index) => (
              <Grid item key={index} xs={2}>
                <TextField
                  inputRef={(el) => otpRefs.current[index] = el}
                  value={digit}
                  onChange={handleOtpChange(index)}
                  onKeyDown={handleKeyDown(index)}
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                />
              </Grid>
            ))}
          </Grid>
          <Box m={4}>
            {isResending || isVerifying ? (<Button variant="contained" fullWidth
              sx={{ backgroundColor: '#DED1BD', '&:hover': { backgroundColor: '#DED1BD' } }}>
              <Loader />
            </Button>) : (
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            )}

          </Box>
        </form>
        <Box mt={2} textAlign="center">
          {timer > 0 ? (
            <Typography variant="body2" color="textSecondary">
              Resend OTP in {timer} seconds
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              <span onClick={handleResendOtp} 
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  margin: 0,
                  display: 'inline',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')} >Resend OTP.</span>
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default OTPRegisterForm;
