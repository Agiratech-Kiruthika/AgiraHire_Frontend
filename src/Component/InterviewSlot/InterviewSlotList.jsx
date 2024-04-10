import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function InterviewSlotsList() {
  const [interviewSlots, setInterviewSlots] = useState([]);

  useEffect(() => {
    const fetchInterviewSlots = async () => {
      try {
        const response = await axios.get('https://localhost:7199/InterviewSlot/getInterviewSlots');
        setInterviewSlots(response.data.data); // Assuming the response data is an array of interview slots
      } catch (error) {
        console.error('Error fetching interview slots:', error);
      }
    };

    fetchInterviewSlots();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Interview Slots
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Interview Slot ID</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Interviewer ID</TableCell>
              <TableCell>Round ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviewSlots.map((slot) => (
              <TableRow key={slot.slotId}>
                <TableCell>{slot.slotId}</TableCell>
                <TableCell>{formatDateTime(slot.startTime)}</TableCell>
                <TableCell>{formatDateTime(slot.endTime)}</TableCell>
                <TableCell>{slot.venue}</TableCell>
                <TableCell>{slot.interviewerId}</TableCell>
                <TableCell>{slot.roundId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
