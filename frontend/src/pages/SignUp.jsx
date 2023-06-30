import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./SignUp.css";
import { otpSendToEmail, signUpApi } from "../apis";
import { useNavigate } from "react-router-dom";

export default () => {
  //this state mangage should called otp API or Sign Up APi
  const navigate = useNavigate();
  const [requestFor, setRequestFor] = useState("otp");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSignUp = async (values) => {
    try {
      if (requestFor == "otp") {
        await otpSendToEmail(values.email, "signUp");
        messageApi.open({
          type: "success",
          content: `Otp Sent to ${values.email}`,
        });
        setRequestFor("signup");
      }

      if (requestFor == "signup") {
        let { data: userResponse } = await signUpApi({
          email: values.email,
          otp: values.otp,
          userName: values.userName,
        });
        console.log("re.q.ust", userResponse);
        localStorage.setItem("user", JSON.stringify(userResponse?.data));
        // navigate()
      }
    } catch (err) {
      console.log("error is", err);
      messageApi.open({
        type: "error",
        content:
          err?.response?.data?.message ||
          "Something went wrong please try again later",
      });
    }
  };

  return (
    <div className="sign-up-page-container">
      {contextHolder}
      <div>
        <img className="login-banner" src={require("../assets/authimage.jpg")} alt="" />
      </div>
      <div className="sign-up-main-container">
        <div className="sign-up-header">
          <div style={{ fontSize: "1.4em" }}>HpDevCo Demo Project</div>
          <div style={{ margin: "1em" }}>Sign Up</div>
        </div>
        <Form onFinish={handleSignUp} className="sign-up-form-container">
          <Form.Item name="userName">
            <Input placeholder="e.g: mihir" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "Should be proper Email" },
              { required: true, message: "Email is Required" },
            ]}
          >
            <Input placeholder="e.g:mihir@yopmail.com" />
          </Form.Item>
          {requestFor == "signup" && (
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please provide OTP" }]}
            >
              <Input placeholder="e.g: 123456" />
            </Form.Item>
          )}
          <Button htmlType="submit" type="primary">
            {requestFor == "otp" ? "Send OTP" : "Sign Up"}
          </Button>
        </Form>
        <div>
          Already Have Account? {"  "}
          <span
            style={{ color: "blue", textDecoration: "underline" }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </span>{" "}
        </div>
      </div>
    </div>
  );
};
