import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Routes and Route
import Opportunity from '../Pages/Opportunity';
import UserSignUp from '../Component/UserSignUp';
import OpportunityForm from '../Component/OpportunityForm';
import UserList from '../Component/UserList';
import Home from '../Pages/Home';
import Login from '../Component/Login';
import Dashboard from '../Pages/Dashboard';
import RoleForm from '../Component/Role';
import SideNavigation from '../Component/SideNavigation';

const RouterPath = () => {
  return (
    <Router>
     
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/" element={<Navigate to="home" replace />} />
      <Route element={ <SideNavigation />} >
      <Route path="/opportunityForm" element={<OpportunityForm />} /> {/* Use element prop */}
      <Route path="/opportunity" element={<Opportunity />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path='/userslist' element={<UserList/>}/>     
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/role' element={<RoleForm/>}/>
      {/* <Route path='/usememo' element={<UseMemo/>}/> */}
      {/* <Route path='/signup' element={<SignUp/>}/> */}
      </Route>




    </Routes>
</Router>
  )
}

export default RouterPath;