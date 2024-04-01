
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Component/Layout';
import Opportunity from '../Pages/Opportunity';
import UserSignUp from '../Component/UserSignUp';
import OpportunityForm from '../Component/OpportunityForm';
import UserList from '../Component/UserList';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import RoleForm from '../Component/Role';

const RouterPath = () => {
  
  return (
    <Routes>
      {/* Define routes with Layout component */}
      <Route path='/' element={<Layout> <Home /></Layout>} />
      <Route path="/opportunityForm" element={<Layout><OpportunityForm /></Layout>} />
      <Route path="/opportunity" element={<Layout><Opportunity /></Layout>} />
      <Route path="/signup" element={<Layout><UserSignUp /></Layout>} />
      <Route path='/userslist' element={<Layout><UserList /></Layout>} />
      <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
      <Route path='/role' element={<Layout><RoleForm /></Layout>} />
      {/* Additional routes */}
    </Routes>
  );
}

export default RouterPath;
