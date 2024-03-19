import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink component
import '../css/SideNavigation.css'; // Import CSS file

const SideNavigation = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/opportunity" activeClassName="active">Opportunities</NavLink></li>
        <li><NavLink to="/signup" activeClassName="active">Register</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
