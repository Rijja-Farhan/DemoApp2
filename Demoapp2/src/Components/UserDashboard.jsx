import React, { useEffect, useState } from "react";
import CourseList from "./CourseManager/CourseList";

import { useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


function UserDashboard() {
  const navigate = useNavigate();

  const { courses, studentCourses, loading, error } = useSelector((state) => state.courses || {});

  console.log("Course: ",courses)
  console.log("Student Course: ",studentCourses)
  
  const [filteredCourses, setFilteredCourses] = useState([]);

  
  const filterAvailableCourses = () => {
    if (!courses || !studentCourses) return [];
    return courses.filter((course) =>
      !studentCourses.some((studentCourse) => studentCourse._id === course._id)
    );
  };
  

  
  useEffect(() => {
    const result = filterAvailableCourses();
    setFilteredCourses(result); 
    console.log(filteredCourses)
  }, [courses, studentCourses]);

  const handleViewCourses = async () => {
    try {
      navigate("/studentCourses",);
    } catch (error) {
      console.log(error);
    }
  };

  
 

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Dashboard
      </h1>

      <div className="max-w-4xl mx-auto mt-10">
        <Button onClick={handleViewCourses}>View Student courses</Button>
        <CourseList  />
      </div>
    </div>
  );
}

export default UserDashboard;
