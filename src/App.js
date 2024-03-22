import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import Opportunity from './Component/Opportunity';
import UserSignUp from './Component/UserSignUp';
import OpportunityForm from './Component/OpportunityForm';
import UserList from './Component/UserList';
import Home from './Component/Home';
import Login from './Component/Login';
import SideNavigation from './Component/SideNavigation';
import Dashboard from './Component/Dashboard';
import RoleForm from './Component/Role';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import SignUp from './Component/SignUp';
import UseMemo from './Component/UseMemo';


function App() {
  return (
    <Router>
       
      <div className="App">
     
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/opportunityForm" element={<OpportunityForm />} /> {/* Use element prop */}
          <Route path="/opportunity" element={<Opportunity />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path='/userslist' element={<UserList/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/role' element={<RoleForm/>}/>
          <Route path='/usememo' element={<UseMemo/>}/>
          {/* <Route path='/signup' element={<SignUp/>}/> */}




        </Routes>
      </div>
    </Router>
  );
}

export default App;
