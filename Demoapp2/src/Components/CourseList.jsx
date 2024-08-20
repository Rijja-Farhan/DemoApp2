import React, { useEffect, useState,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses,setEditingCourse } from '../state/slices/courseSlice';
import { List, Button, Typography, Space, Alert } from 'antd';

const { Title } = Typography;

function CourseList({userRole}) {
  
  const dispatch = useDispatch();
 

  const { courses } = useSelector((state) => state.courses);
    
  

    useEffect(() => {
      dispatch(fetchCourses());
    }, [dispatch]);
  

  const handleDelete = async (courseid) => {
  
    try 
    {
     const response = await fetch(`http://localhost:3000/course/${courseid}`,
       {
         method:'DELETE',
         headers: {
         'Content-Type': 'application/json'
         }
       }
     )
     if (!response.ok) {
      throw new Error('Failed to delete course');
    }
   
   
   const result = await response.json();
 

 
   dispatch(fetchCourses())

    }
    catch(error)
    {
     console.log(error)
    }

    
  };

  const handleEdit = async(course) => {
     dispatch(setEditingCourse(course))
  
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2} className="mb-4 text-gray-800">Courses</Title>
      <List
        itemLayout="horizontal"
        dataSource={courses}
        
    

        renderItem={(courses) => (
            
          <List.Item
            actions={
                userRole === 'admin'?[
              <Button
                type="primary"
                onClick={() => handleEdit(courses)}
              >
                Edit
              </Button>,
              <Button
                type="danger"
                onClick={() => handleDelete(courses._id)}
              >
                Delete
              </Button>
            ]:[]}
          >
            <List.Item.Meta
              title={courses.name}
              description={
                <Space direction="vertical">
                  <div><strong>Code:</strong> {courses.code}</div>
                  <div><strong>Credit Hours:</strong> {courses.creditHours}</div>
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
