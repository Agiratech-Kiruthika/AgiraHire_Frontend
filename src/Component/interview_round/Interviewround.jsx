import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Interviewround() {
  const [roundName, setRoundName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roundName || !description) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7199/InterviewRound', {
        round_Name : roundName,
        description : description
      });
      console.log('Interview round added successfully:', response.data);
      toast.success('Interview round added successfully');
      // Clear form fields

    } catch (error) {
      console.error('Error adding interview round:', error);
      toast.error('Error adding interview round');
    }
  };

  return (
    <>
      <ToastContainer/>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit} className="interview-round-form">
          <Grid container spacing={4} style={{ maxWidth: '700px', margin: 'auto' }}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Interview Round Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Round Name"
                name="roundName"
                value={roundName}
                variant="standard"
                onChange={(e) => setRoundName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
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
