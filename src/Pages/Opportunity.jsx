import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import CloseIcon from '@mui/icons-material/Close';

const statusText = {
    0: 'Open',
    1: 'Closed',
    2: 'On Hold'
  };

export default function Opportunity() {
      
  const [opportunity, setOpportunity] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await axios.get('https://localhost:7199/api/Opportunities');
        setOpportunity(response.data);
      } catch (error) {
        toast.error('Error fetching opportunities:', error);
      }
    }
    fetchOpportunities();
    
  }, []);

 
  const handleViewDetails = (opp) => {
    setSelectedOpportunity(opp);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
    <ToastContainer/>
   <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="opportunities table">
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Date Posted</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {opportunity.map((opp) => (
              <TableRow key={opp.opportunity_Id}>
                <TableCell component="th" scope="row">
                  {opp.position}
                </TableCell>
                <TableCell align="right">{opp.location}</TableCell>
                <TableCell align="right">{opp.date_Posted}</TableCell>
                <TableCell align="right">{statusText[opp.status]}</TableCell>
                <TableCell align="center">
                <Button className='success' onClick={() => handleViewDetails(opp)}>
                  <RemoveRedEyeSharpIcon />
                </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
      <DialogTitle>Opportunity Details</DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseDialog} // Close the dialog when the close button is clicked
        sx={{ position: 'absolute', top: 0, right: 0 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent >
       
        {selectedOpportunity && (
          <>
            <Typography variant="body1"><strong>Position:</strong> {selectedOpportunity.position}</Typography>
            <Typography variant="body1"><strong>Location:</strong> {selectedOpportunity.location}</Typography>
            <Typography variant="body1"><strong>Employment Type:</strong> {selectedOpportunity.employment_Type}</Typography>
            <Typography variant="body1"><strong>Qualification:</strong> {selectedOpportunity.qualification}</Typography>
            <Typography variant="body1"><strong>Salary:</strong> {selectedOpportunity.salary}</Typography>
            <Typography variant="body1"><strong>Date Posted:</strong> {selectedOpportunity.date_Posted}</Typography>
            <Typography variant="body1"><strong>No. of Openings:</strong> {selectedOpportunity.no_Of_Openings}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {statusText[selectedOpportunity.status]}</Typography>
          </>
        )}
      </DialogContent>
    </Dialog>

        </Box>
    </>
  );
}
