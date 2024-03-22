import React, { useState } from 'react';
import { Box, Typography, FormControl, TextField, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }

    // Here you can add further validation or authentication logic

    // Redirect to dashboard or perform other actions
    toast.success('Logged in successfully');
  };

  return (
    <>
      <ToastContainer />
      <Box
//className="container"
        // sx={{
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   height: '100vh',
        // }}
      >
        <Box className="formContainer">
          <Typography variant="h5">Login</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="email-input"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="password-input"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </FormControl>
            </div>
            <div>
              <Button type="submit" variant="contained" fullWidth>Log in</Button>
            </div>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
