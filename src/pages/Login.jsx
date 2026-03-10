import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import  supabase  from "../services/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  
  const onFinish = async (values) => {
  const { email, password } = values;

  console.log(email,password);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.error(error.message);
    } else {
      message.success("Login Successful");
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 350 }}>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

        </Form>

      </Card>
    </div>
  );
};

export default Login;