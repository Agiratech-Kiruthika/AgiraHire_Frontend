// Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNavigation from './SideNavigation';

const Layout = ({ children }) => {
  const location = useLocation();
  const showSideNavigation = location.pathname !== '/'; // Check if the current route is not the Home page

  return (
    <div style={layoutContainerStyle}>
      {showSideNavigation && <SideNavigation style={sideNavigationStyle} />}
      <div style={pageContentStyle}>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

const layoutContainerStyle = {
  display: 'flex',
  width: '100vw', // Full width of the screen
};

const sideNavigationStyle = {
  flex: '0 0 auto', // Take the width of its content, but don't grow or shrink
  width: '200px', // Width of the side navigation
};

const pageContentStyle = {
  flex: '1', // Take remaining space
  overflow: 'auto', // Allow scrolling if content overflows
  width: 'calc(100vw - 200px)', // Subtract the width of the side navigation
};

export default Layout;
