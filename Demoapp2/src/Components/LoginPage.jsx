import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css'; // Import Ant Design styles

const LoginPage = () => {
    const navigate = useNavigate()
  const onFinish = async (values) => {
    
    

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      const result = await response.json();
      if (response.ok) {
        message.success('Login successful');
       
       const role= result.role
       if(role === 'admin')
       {
        navigate('/AdminDashboard',{state:{userrole:role}}

        )
       }
       else if  (role ==='user')
       {
        navigate('/UserDashboard',{state:{userrole:role}})
       }
      } else {
        message.error(result.message || 'Login failed');
      }
    } catch (error) {
      message.error('An error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
