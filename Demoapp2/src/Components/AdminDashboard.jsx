import React from 'react';
import CourseList from './CourseManager/CourseList';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import {  Button } from 'antd';

function AdminDashboard() {
  const navigate =useNavigate()
  const handleAddCourse=()=>{
    navigate('/CourseForm')
  }
  return (
    <div className="p-6">
      
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <Button
                      type="primary"
                      onClick={() => handleAddCourse()}
                    >
                      Add Course
      </Button>
      
      <CourseList   />
    </div>
  );
}

export default AdminDashboard;
