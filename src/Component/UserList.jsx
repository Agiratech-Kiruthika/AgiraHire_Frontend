import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../css/UserList.css'; // Import CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7199/api/User/getUsers')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="button-class">
        <Button variant="contained" color="primary" className="add-button">
          + Add Users
        </Button>
      </div>

      <div className="table-container">
        <TableContainer component={Paper} className="table-container">
          <Table sx={{ minWidth: 700 }} aria-label="customized table" className="custom-table">
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Employee ID</TableCell>
                <TableCell className="table-header">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell>{user.employee_Id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UserList;
