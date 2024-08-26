import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import StudentDashboard from './Components/StudentCourses'

import Home from './Components/Home';

import LoginPage from './Components/LoginPage';
import Navbar from './Components/Navbar';

function App() {
 
  

  return (
    <BrowserRouter>
    <div>
      <Navbar />
      
     
    </div>

    <Routes>
      <Route path='/'element={<Home/>}/>
      <Route path='/login'element={<LoginPage/>}/>
      <Route path='/AdminDashboard'element={<AdminDashboard/>}/>
      <Route path='/UserDashboard'element={<UserDashboard/>}/>
      <Route path='/studentCourses'element={<StudentDashboard/>}/>
     
    </Routes>

    </BrowserRouter>
    
  );
}

export default App;
