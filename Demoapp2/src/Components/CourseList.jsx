import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, setEditingCourse } from '../state/slices/courseSlice';
import { List, Button, Typography, Space, Alert, message } from 'antd'; // Import message from Ant Design

const { Title } = Typography;

function CourseList() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const { userRole, userId } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(userRole)
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      await response.json();
      dispatch(fetchCourses());
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (course) => {
    dispatch(setEditingCourse(course));
  };

  const handleStudentCourseAdd = async (courseId) => {
    try {
      console.log("User ID:", userId);  // Log the userId to check its value
      console.log("Course ID:", courseId);  // Log the courseId to check its value
  
      const response = await fetch(`http://localhost:3000/student/${userId}/courseadd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId })
      });
  
      if (response.ok) {
        message.success('Course added successfully');
      } else {
        throw new Error('Failed to add course');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleStudentCourseDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/student/${userId}/${courseId}/coursedelete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2} className="mb-4 text-gray-800">Courses</Title>
      <List
        itemLayout="horizontal"
        dataSource={courses}
        renderItem={(course) => (
          <List.Item
            actions={
              userRole === 'admin'
                ? [
                    <Button
                      type="primary"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </Button>,
                    <Button
                      type="danger"
                      onClick={() => handleDelete(course._id)}
                    >
                      Delete
                    </Button>
                  ]
                : userRole === 'student'
                ? [
                    <Button
                      type="primary"
                      onClick={() => handleStudentCourseAdd(course._id)}
                    >
                      Add Course
                    </Button>,
                    <Button
                      type="danger"
                      onClick={() => handleStudentCourseDelete(course._id)}
                    >
                      Remove Course
                    </Button>
                  ]
                : []
            }
          >
            <List.Item.Meta
              title={course.name}
              description={
                <Space direction="vertical">
                  <div><strong>Code:</strong> {course.code}</div>
                  <div><strong>Credit Hours:</strong> {course.creditHours}</div>
                </Space>
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: <Alert message="No courses available" type="info" showIcon /> }}
      />
    </div>
  );
}

export default CourseList;
