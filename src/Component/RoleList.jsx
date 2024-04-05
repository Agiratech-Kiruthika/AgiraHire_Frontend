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
//import CloseIcon from '@mui/icons-material/Close';
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


const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get('https://localhost:7199/api/Auth/getroles')
        .then((res) => {
            setRoles(res.data.data);
        })
        .catch((err) =>{
            console.error('Error fetching roles:',err);
            toast.error('Error fetching the roles')
        });
    },[]);

    const handleAddRoles = () =>{
        navigate('/role');
    };

    return (
        <>
          <ToastContainer />
          <Box display="flex" flexDirection="column" alignItems="center" height="100vh" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRoles}
              style={{ marginBottom: '20px' }}
              startIcon={<AddIcon />}
            >
              Add Role
            </Button> 
            <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default RoleList;