import React from 'react';
import Box from '@mui/material/Box'; // Import Box component from MUI

const Layout = ({ children }) => {
  return (
    <Box className="layout-container" sx={{ padding: 2 }}> {/* Add padding using sx prop */}
      <main>
        {children}
      </main>
    </Box>
  );
};

export default Layout;
