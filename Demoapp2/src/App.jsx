import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import StudentDashboard from './Components/StudentCourses'

import Home from './Components/Home';

import LoginPage from './Components/LoginPage';
import Navbar from './Components/Navbar';

import CourseForm from "./Components/CourseManager/CourseForm"


const AppContent = () => {
  const location = useLocation();
  
  // Determine if Navbar should be displayed
  const showNavbar = !['/', '/login'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/UserDashboard' element={<UserDashboard />} />
        <Route path='/studentCourses' element={<StudentDashboard />} />
        <Route path='/CourseForm' element={<CourseForm />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;