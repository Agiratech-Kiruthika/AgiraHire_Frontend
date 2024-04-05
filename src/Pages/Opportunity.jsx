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
  IconButton,
  Grid,
  TextField
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

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

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    backgroundColor:'#EED3D9', // make pagination buttons circular
    padding: '10px', // add padding
  },
}));

function Opportunity() {
  const [opportunity, setOpportunity] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get('https://localhost:7199/api/Opportunities');
      setOpportunity(response.data.data);
    } catch (error) {
      toast.error('Error fetching opportunities:', error);
    }
  };

  useEffect(() => {
    // Call fetchOpportunities on component mount
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

  const handleSearch = () => {
    // Filter the opportunity data based on the searchTerm
    const filteredOpportunities = opportunity.filter(data =>
      data.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(data.date_Posted).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      statusText[data.status].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOpportunity(filteredOpportunities);
    setIsSearching(true);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    fetchOpportunities() 
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1); // Subtract 1 to make the page start from 0 internally
  };

  // Calculate the count for pagination based on the number of opportunities
  const count = Math.ceil(opportunity.length / 5);

  return (
    <>
      <ToastContainer />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} style={{ height: '100vh' }}>
        <Grid container spacing={2} justifyContent="space-between" width="100%" marginBottom={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddOpportunity} startIcon={<AddIcon />}>
              Add Opportunity
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleChangeSearch}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="success" onClick={handleSearch} startIcon={<SearchIcon />}>
                  Search
                </Button>
              </Grid>
              {isSearching && (
                <Grid item>
                  <Button variant="outlined" color="secondary" onClick={handleClearSearch}>
                    Clear
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
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
              {opportunity.slice(page * 5, page * 5 + 5).map((opp) => (
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
          <Box display="flex" justifyContent="center" mt={2} p={2}>
            <StyledPagination count={count} page={page + 1} onChange={handleChangePage} />
          </Box>
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

export default Opportunity;
