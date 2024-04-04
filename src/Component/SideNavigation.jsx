import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import '../css/SideNavigation.css';

const SideNavigation = () => {
  const userEmail = useSelector(state => state.email); // Get userEmail from Redux state
  console.log(userEmail)

  const initials = userEmail ? userEmail.substring(0, 2).toUpperCase() : '';

  return (
    <nav className="sidenav">
      <ul>
      <li>
        <div className="avatar">
          <Avatar>{initials}</Avatar>
        </div>
      </li>

        <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
        <li><NavLink to="/opportunity" activeClassName="active">Opportunities</NavLink></li>
        {/* <li><NavLink to="/signup" activeClassName="active">Employees</NavLink></li> */}
        <li><NavLink to="/userslist" activeClassName="active">Users</NavLink></li>
        <li><NavLink to="/role" activeClassName="active">Role</NavLink></li>
        
      </ul>
    </nav>
  );
}

export default SideNavigation;
