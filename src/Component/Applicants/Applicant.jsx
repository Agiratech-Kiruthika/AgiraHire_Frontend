import React, { useState } from 'react';
import { Box, Button, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { styled } from '@mui/material/styles';

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
    flexGrow: 1
  }));

export default function Applicant() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [opportunityId, setOpportunityId] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [referredId, setReferredId] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [status, setStatus] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7199/api/Applicant', {
        name,
        email,
        phonenum,
        opportunityId,
        appliedDate,
        referredId,
        addedBy,
        status,
      });
      toast.success('Applicant added successfully');
      console.log('Applicant added successfully:', response.data);
    } catch (error) {
      toast.error('Error adding applicant');
      console.error('Error adding applicant:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <StyledPaper>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">Add Applicant</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phonenum"
                type="tel"
                value={phonenum}
                onChange={(e) => setPhonenum(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Opportunity ID"
                name="opportunityId"
                value={opportunityId}
                onChange={(e) => setOpportunityId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Applied Date"
                name="appliedDate"
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Referred ID"
                name="referredId"
                value={referredId}
                onChange={(e) => setReferredId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Added By"
                name="addedBy"
                value={addedBy}
                onChange={(e) => setAddedBy(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  <MenuItem value={0}>Open</MenuItem>
                  <MenuItem value={1}>Closed</MenuItem>
                  <MenuItem value={2}>Hold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </StyledPaper>
    </Box>
  );
}
