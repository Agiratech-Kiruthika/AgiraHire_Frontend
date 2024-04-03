import React from 'react';
//import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Layout from './Component/Layout'; // Import the Layout component
import RouterPath from './RouterPath/index.jsx';
import { Grid } from '@mui/material'; // Import Grid component from Material-UI
import SideNavigation from './Component/SideNavigation.jsx';
import { useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom

function App() {
  const location = useLocation();
  const showSideNavigation = location.pathname !== '/'; // Check if the current route is not the Home page

  return (
    <Grid container>
      {/* Render SideNavigation only if it's not the Home page */}
      {showSideNavigation && (
        <Grid item xs={2}>
          <SideNavigation />
        </Grid>
      )}
      <Grid item xs={showSideNavigation ? 10 : 12}>
        <Layout>
          <RouterPath />
        </Layout>
      </Grid>
    </Grid>
  );
}

export default App;
