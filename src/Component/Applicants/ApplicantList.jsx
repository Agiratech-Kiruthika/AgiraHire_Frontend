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
  Typography,
  Grid,
  TextField
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

function ApplicantList() {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('https://localhost:7199/api/Applicant/Applicants');
      setApplicants(response.data.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleSearch = () => {
    const filteredApplicants = applicants.filter(applicant =>
      (applicant.name && applicant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setApplicants(filteredApplicants);
  };

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchApplicants();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const count = Math.ceil(applicants.length / 10);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => navigate('/applicant')}>
          Add Applicant
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <TextField
            label="Search Applicants"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleChangeSearch}
          />
          <Button onClick={handleSearch} startIcon={<SearchIcon />}>Search</Button>
          <Button onClick={handleClearSearch}>Clear</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="applicants table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Applied Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.slice(page * 10, page * 10 + 10).map((applicant) => (
              <StyledTableRow key={applicant.applicantId}>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.emailId}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>
                <TableCell>{new Date(applicant.appliedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {applicant.status === 0 && 'Under Review'}
                  {applicant.status === 1 && 'Rejected'}
                  {applicant.status === 2 && 'Selected'}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledPagination count={count} page={page + 1} onChange={handleChangePage} />
        </Box>
      </TableContainer>
    </Box>
  );
}

export default ApplicantList;
