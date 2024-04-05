import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access state from Redux store
import Opportunity from '../Pages/Opportunity';
import UserSignUp from '../Component/UserSignUp';
import OpportunityForm from '../Component/OpportunityForm';
import UserList from '../Component/UserList';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import RoleForm from '../Component/Role';

const RouterPath = () => {
  // Get user role from Redux store
  const userRole = useSelector(state => state.role);


  // Define a function to check if the user has access to the route
  const hasAccess = (allowedRoles) => {
    return allowedRoles.includes(userRole);
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* Check if user is authenticated and has the required role to access the route */}
      <Route path="/opportunity" element={hasAccess(['Admin','HR']) ? <Opportunity /> : <Navigate to="/" />} />
      <Route path="/opportunityForm" element={<OpportunityForm />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path='/userslist' element={hasAccess(['Admin']) ? <UserList /> : <Navigate to="/" />} />
      <Route path='/dashboard' element={hasAccess(['Admin', 'HR','Interviewer']) ? <Dashboard /> : <Navigate to="/" />} />
      <Route path='/role' element={hasAccess(['Admin']) ? <RoleForm /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default RouterPath;
