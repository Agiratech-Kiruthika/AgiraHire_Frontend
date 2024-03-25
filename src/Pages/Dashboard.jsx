// Dashboard.js
import React from 'react';
import SideNavigation from '../Component/SideNavigation';
import { Avatar } from '@mui/material';
import '../css/Dashboard.css';

const Dashboard = ({ userEmail }) => {
 
  return (
    <div className="dashboard">
      {/* <SideNavigation /> */}
      {/* <Avatar>{initials}</Avatar>  */}
      {/* <div className="dashboard-content">
        <Avatar>{initials}</Avatar> 
        <h1>Welcome, {initials}!</h1>
      </div> */}
    </div>
  );
};

export default Dashboard;
