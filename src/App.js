import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Layout from './Component/Layout';
import RouterPath from './RouterPath/index.jsx';
import { Grid } from '@mui/material';
import SideNavigation from './Component/SideNavigation.jsx';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const showSideNavigation = location.pathname !== '/';

  return (
    <div style={{ height: '100vh' }}> 
      <Grid container style={{ height: '100%' }}> 
        {showSideNavigation && (
          <Grid item xs={2} style={{ height: '100%' }}> 
            <SideNavigation />
          </Grid>
        )}
        <Grid item xs={showSideNavigation ? 10 : 12} style={{ height: '100%' }}> 
          <Layout>
            <RouterPath />
          </Layout>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
