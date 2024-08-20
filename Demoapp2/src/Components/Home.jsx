import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles


import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function Home() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: '',
  });

  const handleChange = (changedValues) => {
    setFormData(prevData => ({ ...prevData, ...changedValues }));
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      const result = await response.json();
      if (response.ok) {
        message.success(result.message || 'User registered successfully');
      } else {
        message.error(result.message || 'Failed to register user');
      }
    } catch (error) {
      message.error('An error occurred');
      console.error('Error:', error);
    }
  };

  const handleLoginClick=()=>{
    navigate('/login')

  }
  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      <Form
        layout="vertical"
        initialValues={formData}
        onFinish={handleSubmit}
        onValuesChange={handleChange}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option value="moderator">Moderator</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
          <Button type=""  block onClick={handleLoginClick}>
           Already Have an account? Login
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default Home;
