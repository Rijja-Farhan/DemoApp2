import React from 'react';
import CourseList from './CourseList';
import {useLocation} from 'react-router-dom'


function UserDashboard() {
  const {state} =location
  const {userrole} =state || {}

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Dashboard</h1>
      
      

      <div className="max-w-4xl mx-auto mt-10">
      <CourseList  userRole={userrole}  />
      </div>
    </div>
  );
}

export default UserDashboard;
