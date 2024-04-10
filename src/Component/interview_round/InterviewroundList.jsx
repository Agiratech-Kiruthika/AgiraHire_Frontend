import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function InterviewroundList() {
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
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Interview Rounds
      </Typography>
      <List>
        {rounds.map((round) => (
          <Paper elevation={2} key={round.roundID} style={{ margin: '10px 0' }}>
            <ListItem>
              <ListItemText
                primary={round.round_Name}
                secondary={round.description}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
}
