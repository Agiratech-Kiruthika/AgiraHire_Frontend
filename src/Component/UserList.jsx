import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Styled TableCell and TableRow for consistent styling
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F0F0F0', // Slightly lighter than original for contrast
  },
}));

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://localhost:7199/api/User/getUsers')
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        toast.error('Error fetching users');
      });
  }, []);

  const handleAddUsers = () => {
    navigate('/signup');
  };

  return (
    <>
      <ToastContainer />
      <Box display="flex" flexDirection="column" alignItems="center" height="100vh" p={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUsers}
          style={{ marginBottom: '20px' }}
          startIcon={<AddIcon />}
        >
          Add Users
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{user.employee_Id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserList;
