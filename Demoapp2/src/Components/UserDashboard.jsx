import React from "react";
import CourseList from "./CourseList";

import { useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);

  const handleViewCourses = async () => {
    try {
      navigate("/studentCourses", { state: { userId } });
    } catch (error) {
      console.log(error);
    }
  };
  const { state } = location;
 

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Dashboard
      </h1>

      <div className="max-w-4xl mx-auto mt-10">
        <Button onClick={handleViewCourses}>View Student courses</Button>
        <CourseList />
      </div>
    </div>
  );
}

export default UserDashboard;
