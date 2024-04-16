import React from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux
import Box from '@mui/material/Box';
import '../css/Dashboard.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = ({ userEmail }) => {
  // Getting opportunitiesCount from Redux state
  const opportunitiesCount = useSelector((state) => state.opportunitiesCount);

  return (
    <Box p={2}>
      <Grid container spacing={2}>  
        <Grid item xs={6}>
          <Item>
            <h2>Ongoing Opportunities</h2>
            {/* Displaying opportunitiesCount from Redux */}
            <h2> {opportunitiesCount}</h2>
          </Item> 
        </Grid>
        <Grid item xs={6}>
          <Item>
            <h2>Applicants</h2>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
