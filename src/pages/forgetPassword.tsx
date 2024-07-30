import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Link
} from '@mui/material';
import { toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for sending password reset email
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error('Error sending password reset link');
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
          />
          <Box mt={3} position="relative">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
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
