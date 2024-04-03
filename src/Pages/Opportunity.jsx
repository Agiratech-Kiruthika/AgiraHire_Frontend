import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogContent,
  Typography,
  IconButton
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


// Status text mapping
const statusText = {
  0: 'Open',
  1: 'Closed',
  2: 'On Hold'
};

// Styled components using @emotion/styled
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#CCFFCC', // Change the background color here
  },
}));

export default function Opportunity() {
  const [opportunity, setOpportunity] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await axios.get('https://localhost:7199/api/Opportunities');
        setOpportunity(response.data.data);
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

  const handleAddOpportunity = () => {
    console.log('Add opportunity clicked');
    navigate('/opportunityForm');
  };

 

  return (
    <>
      <ToastContainer />
      <Box display="flex" flexDirection="column" alignItems="center" height="100vh" p={2}>
        <Button
         variant="contained"
          color="primary" 
          onClick={handleAddOpportunity}
          style={{ marginBottom: '20px' }}
          startIcon={<AddIcon />}>
          Add Opportunity
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="opportunities table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Position</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Date Posted</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunity.map((opp) => (
                <StyledTableRow key={opp.opportunity_Id}>
                  <TableCell align="center">
                    {opp.position}
                  </TableCell>
                  <TableCell align="center">{opp.location}</TableCell>
                  <TableCell align="center"> {new Date(opp.date_Posted).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{statusText[opp.status]}</TableCell>
                  <TableCell align="center">
                    <Button style={{ color: '#D37676' }} onClick={() => handleViewDetails(opp)}>
                      <RemoveRedEyeSharpIcon />
                      
                    </Button>
                    <Button style={{ color: 'green' }} onClick={() => handleViewDetails(opp)}>
                      <ModeEditOutlineIcon/>
                      
                    </Button>
                 
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
          <DialogTitle>Opportunity Details</DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
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
