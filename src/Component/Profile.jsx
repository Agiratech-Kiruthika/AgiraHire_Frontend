// Profile.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom'; // Import NavLink component
import "../css/Profile.css";

const Profile = ({ email }) => {
  const initials = email ? email.substring(0, 2).toUpperCase() : '';
  console.log(initials)

  return (
    <div className="profile">
      <Avatar>{initials}</Avatar>
     
    </div>
  );
};

export default Profile;
