import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, setEditingCourse } from '../../state/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { List, Button, Typography, Space, Alert, message } from 'antd';

const { Title } = Typography;

function CourseList({ availablecourses = [] }) { // Default to empty array if not provided
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.user);
  const { courses, studentCourses, loading, error } = useSelector((state) => state.courses || {});

  

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
  
  }, [courses, studentCourses]);

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3000/course/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      message.success('Course deleted successfully');
      dispatch(fetchCourses()); // Refresh courses list
    } catch (error) {
      message.error('Failed to delete course');
      console.error(error);
    }
  };

  const handleEdit = (course) => {
    navigate('/CourseForm', { state: { course } });
  };



  

  const handleStudentCourseAdd = async (courseId) => {
    if (!user || !user.id) return; // Check if user and user.id are available
    console.log(courseId)
    try {
      const response = await fetch(`http://localhost:3000/student/${user.id}/courseadd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        message.success('Course added successfully');
      // filterAvailableCourses()
      // setFilteredCourses(result); 
      } else {
        throw new Error('Failed to add course');
      }
    } catch (error) {
      message.error('Failed to add course');
      console.error(error);
    }
  };

  const handleStudentCourseDelete = async (courseId) => {
    if (!user || !user.id) return; // Check if user and user.id are available

    try {
      const response = await fetch(`http://localhost:3000/student/${user.id}/${courseId}/coursedelete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove course');
      }

      message.success('Course removed successfully');
      dispatch(fetchCourses()); // Refresh courses list
    } catch (error) {
      message.error('Failed to remove course');
      console.error(error);
    }
  };

  // Determine the list of courses based on user role
  const dataSource = user?.role === 'admin' ? courses : filteredCourses;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2} className="mb-4 text-gray-800">Courses</Title>
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(course) => (
          <List.Item
            actions={
              user?.role === 'admin'
                ? [
                    <Button
                      type="primary"
                      onClick={() => handleEdit(course)}
                      key="edit"
                    >
                      Edit
                    </Button>,
                    <Button
                      type="danger"
                      onClick={() => handleDelete(course._id)}
                      key="delete"
                    >
                      Delete
                    </Button>,
                  ]
                : user?.role === 'student'
                ? [
                    <Button
                      type="primary"
                      onClick={() => handleStudentCourseAdd(course._id)}
                      key="add"
                    >
                      Add Course
                    </Button>,
                    <Button
                      type="danger"
                      onClick={() => handleStudentCourseDelete(course._id)}
                      key="remove"
                    >
                      Remove Course
                    </Button>,
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
