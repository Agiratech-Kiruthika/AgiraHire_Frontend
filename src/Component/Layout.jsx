// Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigation from './SideNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const showSideNavigation = location.pathname !== '/'; // Check if the current route is not the Home page

  return (
    <>
      {showSideNavigation && <SideNavigation />}
      {children}
    </>
  );
};

export default Layout;
