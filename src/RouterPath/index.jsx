import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Opportunity from '../Pages/Opportunity';
import UserSignUp from '../Component/UserSignUp';
import OpportunityForm from '../Component/OpportunityForm';
import UserList from '../Component/UserList';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import RoleForm from '../Component/Role';
import RoleList from '../Component/RoleList';

const RouterPath = () => {
  
  return (
    <Routes>
    
      <Route path='/' element={<Home />} />
      <Route path="/opportunityForm" element={<OpportunityForm />} />
      <Route path="/opportunity" element={<Opportunity />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path='/userslist' element={<UserList />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/role' element={<RoleForm />} />
      <Route path='/rolelist' element={<RoleList />} />
   
    </Routes>
  );
}

export default RouterPath;
