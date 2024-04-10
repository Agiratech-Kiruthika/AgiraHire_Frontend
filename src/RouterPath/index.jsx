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
import Applicant from '../Component/Applicant';
import RoleList from '../Component/RoleList';
import FeedbackForm from '../Component/FeedbackForm';
import InterviewSlotForm from '../Component/InterviewSlot/InterviewSlot';
import InterviewSlotsList from '../Component/InterviewSlot/InterviewSlotList';



const RouterPath = () => {
  // Get user role from Redux store and convert it to lowercase
  const userRole = useSelector(state => state.role.toLowerCase());

  // Define a function to check if the user has access to the route
  const hasAccess = (allowedRoles) => {
    // Convert allowed roles to lowercase
    const lowercaseAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    return lowercaseAllowedRoles.includes(userRole);
  };

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/opportunity" element={hasAccess(['Admin','HR']) ? <Opportunity /> : <Navigate to="/" />} />
      <Route path="/opportunityForm" element={<OpportunityForm />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path='/userslist' element={hasAccess(['Admin','HR']) ? <UserList /> : <Navigate to="/" />} />
      <Route path='/dashboard' element={hasAccess(['Admin', 'HR','Interviewer']) ? <Dashboard /> : <Navigate to="/" />} />
      <Route path='/role' element={hasAccess(['Admin','HR']) ? <RoleForm /> : <Navigate to="/" />} />
      <Route path='/feedback' element={hasAccess(['Admin','HR']) ? <FeedbackForm /> : <Navigate to="/" />} />
      <Route path='/applicant' element={hasAccess(['Admin','HR']) ? <Applicant/> : <Navigate to="/" />} />
      <Route path='/slot' element={hasAccess(['Admin','HR']) ? <InterviewSlotForm/> : <Navigate to="/" />} />
      <Route path='/slotlist' element={hasAccess(['Admin','HR']) ? <InterviewSlotsList/> : <Navigate to="/" />} />
      
      InterviewSlotForm
    </Routes>
  );
}

export default RouterPath;
