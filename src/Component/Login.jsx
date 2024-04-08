import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, FormControl, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import '../css/Login.css';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setEmail, setUserRole, setToken } from '../Redux/Store'; // Update the import path accordingly

const Login = () => {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
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


      const response = await Axios.post('https://localhost:7199/api/Auth/login', { email, password });

      if (response.data.message === 'Login successful') {
        const token = response.data.data; // Assuming your API returns the token
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        
        dispatch(setEmail(email));
        dispatch(setUserRole(userRole));
        dispatch(setToken(token)); // Dispatch action to set token in Redux store
        
        // Store the token in local storage
        localStorage.setItem('token', token);

        toast.success('Logged in successfully');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
  
    
  };

  return (
    <>
      <ToastContainer />
      <Box className="login_container">
        <Box className="login_formContainer">
          <Typography className="typo_login" variant="h6">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="email-input"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmailState(e.target.value)}
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
              <Button type="submit" variant="contained" fullWidth>
                Log in
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
