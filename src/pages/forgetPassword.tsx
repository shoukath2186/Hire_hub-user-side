import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import { toast } from "react-toastify";
import {useForgotPasswordMutation} from '../slices/userApiSlice'
import { ErrorResponseDisplay } from '../datatypes.ts/userRes';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');

  const [forgotPass,{isLoading}]=useForgotPasswordMutation()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(''); // Clear error when the user starts typing
  };

  const validateEmail = (email: string): boolean => {
    let emailError = '';

    if (!email.trim()) {
      emailError = 'Email is required';
    } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      emailError = 'Email is invalid';
    }

    setEmailError(emailError);
    return !emailError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    console.log(email);
    
    try {
      // Simulate API call for sending password reset email
      const res=await forgotPass({email}).unwrap();
      console.log(res,'email',email);
      
      toast.success('Password reset link sent to your email');
    } catch (error) {
      
      const errorData = (error as { data: ErrorResponseDisplay }).data;
      
      toast.error(errorData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} p={3} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Enter your email address and we will send you a link to reset your password.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
            required
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <Box mt={3} position="relative">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading || isLoading? <CircularProgress size={24} /> : 'Send Reset Link'}
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/login" variant="body2">
            Back to Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
