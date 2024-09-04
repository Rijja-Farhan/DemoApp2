import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchStudentCourses} from "../state/slices/courseSlice"

const StudentCourses = () => {
  const location = useLocation();
  
  const { courses, studentCourses, loading, error } = useSelector((state) => state.courses || {});
  const {  user } = useSelector((state) => state.user);
  const [courseList, setCourseList] = useState(courses);
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const fullState = useSelector((state) => state);

  // Log the full state to the console
  console.log("Full Redux State:", fullState);
  

  useEffect(() => {
    
    dispatch(fetchStudentCourses())
  }, []);

  const handleAddCourse=()=>{
    navigate("/UserDashboard")
  }
  

  // Handler for deleting a course
  const handleDelete = async (courseId) => {
    try {
      
      console.log(courseId)
      const response = await fetch(
        `http://localhost:3000/student/${user.id}/${courseId}/coursedelete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(fetchStudentCourses())

      const result = await response.json();

      if (response.ok) {
        setCourseList((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        message.success("Course deleted successfully");
      } else {
        message.error(result.message || "Failed to delete course");
      }
    } catch (error) {
      message.error("An error occurred while deleting the course");
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credit Hours",
      dataIndex: "creditHours",
      key: "creditHours",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Courses</h1>
      <Button
                      type="primary"
                      onClick={() => handleAddCourse()}
                    >
                      Add Courses
      </Button>
      <Table
        columns={columns}
        dataSource={studentCourses} 
        rowKey="id" 
      />
    </div>
  );
};

export default StudentCourses;
