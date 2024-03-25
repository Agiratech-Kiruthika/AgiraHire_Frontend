import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const statusText = {
    0: 'Open',
    1: 'Closed',
    2: 'On Hold'
  };

export default function Opportunity() {
   
      
  const [opportunity, setOpportunity] = useState([]);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await axios.get('https://localhost:7199/api/Opportunities');
        setOpportunity(response.data);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    }
    fetchOpportunities();
    
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="opportunities table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Employment Type</TableCell>
            <TableCell align="right">Qualification</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Date Posted</TableCell>
            <TableCell align="right">No. of Openings</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {opportunity.map((opportunity) => (
            <TableRow key={opportunity.opportunity_Id}>
              <TableCell component="th" scope="row">
                {opportunity.position}
              </TableCell>
              <TableCell align="right">{opportunity.location}</TableCell>
              <TableCell align="right">{opportunity.employment_Type}</TableCell>
              <TableCell align="right">{opportunity.qualification}</TableCell>
              <TableCell align="right">{opportunity.salary}</TableCell>
              <TableCell align="right">{opportunity.date_Posted}</TableCell>
              <TableCell align="right">{opportunity.no_Of_Openings}</TableCell>
              <TableCell align="right">{statusText[opportunity.status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
