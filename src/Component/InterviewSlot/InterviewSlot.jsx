import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InterviewSlotForm() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venue, setVenue] = useState('');
  const [interviewerId, setInterviewerId] = useState('');
  const [interviewers, setInterviewers] = useState([]);
  const [roundId, setRoundId] = useState('');
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await axios.get('https://localhost:7199/InterviewRound/getallrounds');
        if (response.data.statusCode === 200) {
          setRounds(response.data.data);
        } else {
          console.error('Failed to fetch rounds:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching rounds:', error);
      }
    };

    fetchRounds();
  }, []);

  useEffect(() => {
    const fetchInterviewers = async () => {
      try {
        const response = await axios.get('https://localhost:7199/api/User/getUsers');
        setInterviewers(response.data.users.filter(user => !user.isDeleted));
      } catch (error) {
        console.error('Error fetching interviewers:', error);
      }
    };

    fetchInterviewers(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !venue || !interviewerId) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7199/InterviewSlot', {
        startTime,
        endTime,
        venue,
        interviewerId,
        roundId
      });
      console.log('Interview slot added successfully:', response.data);
      toast.success('Interview slot added successfully');
      // Optionally, clear form fields here
    } catch (error) {
      console.error('Error adding interview slot:', error);
      toast.error('Error adding interview slot');
    }
  };

  return (
    <>
      <ToastContainer/>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} style={{ height: '100vh' }}>
        <form onSubmit={handleSubmit} className="interview-slot-form">
          <Grid container spacing={4} style={{ maxWidth: '700px', margin: 'auto' }}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">Interview Slot Form</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Time"
                type="datetime-local"
                variant="standard"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Time"
                type="datetime-local"
                variant="standard"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Venue"
                variant="standard"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Interviewer</InputLabel>
                <Select
                  value={interviewerId}
                  onChange={(e) => setInterviewerId(e.target.value)}
                >
                  {interviewers.map((interviewer) => (
                    <MenuItem key={interviewer.userId} value={interviewer.userId}>
                      {interviewer.employee_Id} - {interviewer.email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel>Round</InputLabel>
                <Select
                  value={roundId}
                  onChange={(e) => setRoundId(e.target.value)}
                >
                  {rounds.map((round) => (
                    <MenuItem key={round.roundID} value={round.roundID}>
                      {round.round_Name}
                    </MenuItem>
                  ))}
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