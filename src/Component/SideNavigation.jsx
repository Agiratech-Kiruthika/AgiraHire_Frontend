// SideNavigation.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink component
import '../css/SideNavigation.css'; // Import CSS file
import { Avatar } from '@mui/material';


const SideNavigation = ({ userEmail=null }) => {
  const initials = userEmail ? userEmail.substring(0, 2).toUpperCase() : '';
  return (
    <nav className="sidenav">
     
      <ul>
        <li> <Avatar>{initials}</Avatar> </li>
        <li><NavLink  to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
        <li><NavLink to="/opportunity" activeClassName="active">Opportunities</NavLink></li>
        <li><NavLink to="/signup" activeClassName="active">Register</NavLink></li>
        <li><NavLink to="/role" activeClassName="active">Role</NavLink></li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
