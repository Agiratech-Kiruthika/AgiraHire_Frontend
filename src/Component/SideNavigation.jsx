import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { logout } from '../Redux/Store'; // Import logout action creator
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import '../css/SideNavigation.css';

const SideNavigation = () => {
  const userEmail = useSelector(state => state.email);
  const userRole = useSelector(state => state.role.toLowerCase());
  const dispatch = useDispatch();

  const initials = userEmail ? userEmail.substring(0, 2).toUpperCase() : '';

  const handleLogoutClick = () => {
    // Dispatch the logout action to clear user data from Redux store
    dispatch(logout());
    // Remove the token from local storage
    localStorage.removeItem('token');
  };

  return (
    <nav className="sidenav">
      <ul>
        <li>
          <div className="avatar">
            <Avatar>{initials}</Avatar>
          </div>
        </li>

        {(['admin', 'hr', 'interviewer'].includes(userRole)) && (
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <DashboardCustomizeIcon /> Dashboard
            </NavLink>
          </li>
        )}

        {(['admin', 'hr'].includes(userRole)) && (
          <li>
            <NavLink to="/opportunity" activeClassName="active">
              <ContentPasteSearchIcon/> Opportunities
            </NavLink>
          </li>
        )}

        {(['admin'].includes(userRole)) && (
          <li>
            <NavLink to="/userslist" activeClassName="active">
              <PeopleIcon /> Employees
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/" activeClassName="active" onClick={handleLogoutClick}>
            <LogoutIcon/> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;