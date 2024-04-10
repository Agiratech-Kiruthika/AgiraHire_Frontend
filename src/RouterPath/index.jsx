import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access state from Redux store
import Opportunity from '../Pages/Opportunity';
import UserSignUp from '../Component/UserSignUp';
import OpportunityForm from '../Component/Opportunity/CreateOpportunity';
import UserList from '../Component/UserList';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';
import RoleForm from '../Component/Roles/Role';
import Applicant from '../Component/Applicants/Applicant';
import RoleList from '../Component/Roles/RoleList';
import UpdateOpportunity from '../Component/Opportunity/UpdateOpportunity'
import CreateOpportunity from '../Component/Opportunity/CreateOpportunity';
import InterviewAssignment from '../Component/interview_Assignment/InterviewAssignment';
import InterviewSlot from '../Component/InterviewSlot/InterviewSlotList';
import InterviewroundList from '../Component/interview_round/InterviewroundList';

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
      <Route path="/opportunity" element={hasAccess(['admin', 'hr']) ? <Opportunity /> : <Navigate to="/" />} />
      <Route path="/addOpportunity" element={hasAccess(['admin', 'hr']) ?<CreateOpportunity />:<Navigate to="/" />} />
      <Route path="/updateOpportunity/:id" element={hasAccess(['admin', 'hr']) ?<UpdateOpportunity />:<Navigate to="/" />} />    
      {/* <Route path="/signup" element={<UserSignUp />} />  */}
      <Route path='/userslist' element={hasAccess(['admin']) ? <UserList /> : <Navigate to="/" />} />
      <Route path='/dashboard' element={hasAccess(['admin', 'hr', 'interviewer']) ? <Dashboard /> : <Navigate to="/" />} />
      <Route path='/role' element={hasAccess(['admin']) ? <RoleForm /> : <Navigate to="/" />} />
      <Route path="/interviewAssignment" element={hasAccess(['admin', 'hr','interviewer']) ? <InterviewAssignment /> : <Navigate to="/" />} />
      <Route path="/interviewSlot" element={hasAccess(['admin', 'hr']) ? <InterviewSlot /> : <Navigate to="/" />} />
      <Route path="/interviewRound" element={hasAccess(['admin', 'hr',]) ? <InterviewroundList/> : <Navigate to="/" />} />
      <Route path="/applicant" element={hasAccess(['admin', 'hr']) ? <Applicant /> : <Navigate to="/" />} />

    </Routes>
  );
}

export default RouterPath;
