// Dashboard.js
import React from 'react';
import SideNavigation from './SideNavigation';
import '../css/Dashboard.css'

const Dashboard = () => {
  return (
    
    <div className="dashboard">
      <SideNavigation />
      <div className="dashboard-content">
       <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
