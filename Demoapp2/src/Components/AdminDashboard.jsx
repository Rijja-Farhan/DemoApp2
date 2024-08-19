import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseForm from './CourseForm';

function AdminDashboard() {
  const [editingCourse, setEditingCourse] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <CourseForm  />
      <CourseList  />
    </div>
  );
}

export default AdminDashboard;
