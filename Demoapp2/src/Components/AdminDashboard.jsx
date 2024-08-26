import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import {useLocation} from 'react-router-dom'


function AdminDashboard() {
  const [editingCourse, setEditingCourse] = useState(null);
  const location  =useLocation();

  
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <CourseForm />
      
      <CourseList   />
    </div>
  );
}

export default AdminDashboard;
