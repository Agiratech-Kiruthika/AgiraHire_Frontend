import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/UserSignUp.css";

export default function UserSignUp() {
  const [empID, setEmpID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles(); // Fetch roles when component mounts
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:7199/api/Auth/getroles');
      const responseData = response.data;
      console.log(responseData)
      if (responseData.data && Array.isArray(responseData.data)) {
        setRoles(responseData.data); // Update roles state with fetched data
      } else {
        console.error('Error fetching roles: Response data format is incorrect');
        toast.error("An error occurred while fetching roles.");
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error("An error occurred while fetching roles.");
    }
  };
  

  const handleChangeEmpID = (e) => {
    setEmpID(e.target.value);
  };

  const handleChangeSelectedRole = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empID || !email || !password || !selectedRole) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one special character");
      return;
    }

    // Open the confirmation dialog only if all fields are filled
    setOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const userResponse = await axios.post('https://localhost:7199/api/User/addUser', {
        employee_Id: empID,
        email: email,
        password: password,
        isDeleted: false
      });

      const userId = userResponse.data.userId;

      const roleResponse = await axios.post('https://localhost:7199/api/Auth/assignRole', {
        UserId: userId,
        RoleIds: [selectedRole] // Sending selectedRole as an array
      });

      toast.success('User signed up successfully');
      // Delay before navigating to the dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred while signing up. Please try again later.");
      }
    } finally {
      // Close the confirmation dialog
      setOpen(false);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };


  const validatePassword = (password) => {
    // Check if the password length is at least 8 characters
    if (password.length < 8) {
      return false;
    }
  
    // Check if the password contains at least one special character
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
      return false;
    }
  
    // If both conditions are met, return true
    return true;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <Box
        className="signup_container"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box className="signup_formContainer">
          <Typography className="typo_signup" variant="h6">Signup</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="employee-id-input"
                  label="Employee ID"
                  variant="outlined"
                  type="text"
                  value={empID}
                  onChange={handleChangeEmpID}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  id="email-input"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="select-role-label">Select Role</InputLabel>
                <Select
                  labelId="select-role-label"
                  id="select-role"
                  value={selectedRole}
                  onChange={handleChangeSelectedRole}
                  label="Select Role"
                >
                  <MenuItem value="">
                    <em>Select role</em>
                  </MenuItem>
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Button type="submit" variant="contained" disabled={!empID || !email || !password || !selectedRole}>Sign Up</Button>
          </form>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
              Are you sure you want to submit the form?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirmSubmit} variant="contained" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
}

