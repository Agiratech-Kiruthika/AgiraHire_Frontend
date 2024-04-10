import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateOpportunity({ opportunityId }) {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [qualification, setQualification] = useState("  ");
  const [salary, setSalary] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [noOfOpenings, setNoOfOpenings] = useState("");
  const [status, setStatus] = useState(0); // Default value for status

  useEffect(() => {
    fetchOpportunityData(); // Fetch opportunity data when component mounts
  }, []);

  const fetchOpportunityData = async () => {
    try {
      const response = await axios.get(`https://localhost:7199/api/Opportunities/${opportunityId}`);
      const opportunityData = response.data.data;
      console.log(opportunityData);
      setPosition(opportunityData.position);
      setLocation(opportunityData.location);
      setEmploymentType(opportunityData.employmentType);
      setQualification(opportunityData.qualification);
      setSalary(opportunityData.salary);
      setDatePosted(opportunityData.datePosted);
      setNoOfOpenings(opportunityData.noOfOpenings);
      setStatus(opportunityData.status);
    } catch (error) {
      console.error('Error fetching opportunity data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Frontend validation
    if (!position || !location || !employmentType || !qualification || !salary || !datePosted || !noOfOpenings || !status) {
      toast.error('All fields are required');
      return;
    }
    try {
      const response = await axios.put(`https://localhost:7199/api/Opportunities/${opportunityId}`, {
        position: position,
        location: location,
        employmentType: employmentType,
        qualification: qualification,
        salary: salary,
        datePosted: datePosted,
        noOfOpenings: noOfOpenings,
        status: status,
        isDeleted: false
      });
      console.log('Opportunity updated successfully:', response.data);
      toast.success('Opportunity updated successfully');
      // Optionally, redirect to another page after successful form submission
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast.error('Error updating opportunity');
      // Handle errors (e.g., display error messages)
    }
  };
  
  return (
    <>
    <ToastContainer/>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} style={{ height: '100vh' }}>
      <form onSubmit={handleSubmit} className="opp_form">
      <Grid container spacing={4} style={{ maxWidth: '700px', margin: 'auto', }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">Update Opportunity</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={position}
            variant="standard"
            onChange={(e) => setPosition(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            variant="standard"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Employment Type"
            name="employmentType"
            variant="standard"
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Qualification"
            name="qualification"
            variant="standard"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            variant="standard"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date Posted"
            name="datePosted"
            variant="standard"
            type="date"
            value={datePosted}
            onChange={(e) => setDatePosted(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Number of Openings"
            name="noOfOpenings"
            variant="standard"
            type="number"
            value={noOfOpenings}
            onChange={(e) => setNoOfOpenings(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              variant="standard"
              onChange={(e) => setStatus(Number(e.target.value))}
            >
              <MenuItem value={0}>Open</MenuItem>
              <MenuItem value={1}>Closed</MenuItem>
              <MenuItem value={2}>Hold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>

      </form>
    </Box>
    </>
  );
}
