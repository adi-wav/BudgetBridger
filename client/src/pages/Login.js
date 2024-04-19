import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  // form handler
  const onfinishHandler = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login Form</h3>
          {/* <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item> */}
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>
          <Link to="/register" className="ms-2">
            Not a User login here
          </Link>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
