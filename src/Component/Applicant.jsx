import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
//import "../css/OpportunityForm.css"

export default function Applicant() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [opportunityId, setOpportunityId] = useState("");
  const [appliedDate, setAppliedDate] = useState("")
  const [referredId, setReferredId] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [status, setStatus] = useState(0); // Default value for status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7199/api/Applicant', {
        name: name,
        email: email,
        phonenum: phonenum,
        opportunityId: opportunityId,
        appliedDate:appliedDate,
        referredId: referredId,
        addedBy: addedBy,
        status: status,
      });
      console.log('Applicant added successfully:', response.data);
      // Optionally, redirect to another page after successful form submission
    } catch (error) {
      console.error('Error adding applicant:', error);
      // Handle errors (e.g., display error messages)
    }
  };

  return (
    <div className="opp_container">
    <form onSubmit={handleSubmit} className="opp_form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Applicant</Typography>
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
            label="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phonenum"
            name="phonenum"
            type="number"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="OpportunityId"
            name="opportunityId"
            value={opportunityId}
            onChange={(e) => setOpportunityId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="AppliedDate"
            name="appliedDate"
            type="date"
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ReferredId"
            name="referredId"
            
            value={referredId}
            onChange={(e) => setReferredId(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="AddedBy"
            name="addedBy"
            //type="number"
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
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </form>
    </div>
  );
}
