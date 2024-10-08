import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../state/slices/userSlice";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const fullState = useSelector((state) => state);

// Log the full state to the console
console.log("Full Redux State:", fullState);

    

  const onFinish = async (values) => {
    try {
      // console.log(userId)
      const resultAction = await dispatch(loginUser(values));
    
      if (loginUser.fulfilled.match(resultAction)) {
        message.success("Login successful");
        const { role } = resultAction.payload;
       
        if (role === "admin") {
          navigate("/AdminDashboard", { state: { userRole: role } });
        } else if (role === "student") {
          navigate("/studentCourses", { state: { userRole: role } });
        }
      } else {
        message.error(resultAction.payload || "Login failed");
      }
    } catch (error) {
      message.error("An error occurred");
      console.error("Error:", error);
    }
  };
  const handleSignupClick = () => {
    navigate("/");
  };
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
          <Button type="link" block onClick={handleSignupClick}>
            Dont Have an Account? Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
