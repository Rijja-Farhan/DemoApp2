import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCourse, setEditingCourse } from '../state/slices/courseSlice';
import { List, Button, Typography, Space, Alert } from 'antd';

const { Title } = Typography;

function CourseList() {
    const userRole = useSelector((state) => state.user.role);
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  const handleDelete = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const handleEdit = (course) => {
    dispatch(setEditingCourse(course));
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
                userRole === 'admin'?[
              <Button
                type="primary"
                onClick={() => handleEdit(course)}
              >
                Edit
              </Button>,
              <Button
                type="danger"
                onClick={() => handleDelete(course.id)}
              >
                Delete
              </Button>
            ]:[]}
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
