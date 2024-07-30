import { useState, FormEvent, ChangeEvent } from 'react';
import { Box, Button, TextField, Typography, Container, Link, Alert, InputAdornment, IconButton } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { Visibility, VisibilityOff } from '@mui/icons-material';


interface ErrorState {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ErrorState>({ email: '', password: '' });

  

  const validate = (): boolean => {
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = 'Email address is invalid';
    }

    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: '', password: '' });
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (validate()) {
      console.log('Form submitted');
      // Handle form submission logic
    }
  };

  const handleGoogleLogin = (): void => {
    // Logic for handling Google login
    console.log('Google login');
  };

  return (
    <Container maxWidth="xs" >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={6}
        p={3}
        color='#1b2a6b'
        boxShadow={3}
        sx={{ bgcolor: '' }}
      >
        <Typography component="h1" variant="h4">
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        {errors.email && <Alert severity="error">{errors.email}</Alert>}
        {errors.password && <Alert severity="error">{errors.password}</Alert>}
        <Link
        href="/forget-password"
        ><Typography
          color=''
          sx={{ ml: 0 }}
        >Forget Password.</Typography></Link>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 1, mb: 1 }}
        >
          Login
        </Button>
        <Typography sx={{ ml: 0 }}>
          Create a new {' '}
          <Link
            href="/register"
            color="primary"
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Account.
          </Link>
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ mt: 1, mb: 2 }}
          onClick={handleGoogleLogin}
        >
          <FaGoogle className='m-2' /> Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}

export default Login;