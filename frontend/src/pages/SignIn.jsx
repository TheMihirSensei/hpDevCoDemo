import { message, Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { otpSendToEmail, signInApi } from "../apis";
import "./SignUp.css"
export default () => {
    //this state mangage should called otp API or Sign Up APi
    const navigate = useNavigate()
    const [requestFor, setRequestFor] = useState("otp");
    const [messageApi, contextHolder] = message.useMessage()

    const handleSignIn = async (values) => {
        try {
            if (requestFor == "otp") {
                await otpSendToEmail(values.email, 'signIn')
                messageApi.open({
                    type: 'success',
                    content: `Otp Sent to ${values.email}`,
                });
                setRequestFor("signin")
            }

            if (requestFor == 'signin') {
                let { data: userResponse } = await signInApi({
                    email: values.email,
                    otp: values.otp,
                })
                console.log("re.q.ust", userResponse)
                localStorage.setItem('user', JSON.stringify(userResponse?.data))
                messageApi.open({
                    type: 'success',
                    content: `Login Successfully`,
                });
                navigate('/')
            }
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: err?.response?.data?.message || 'Something went wrong please try again later',
            });

        }

    }

    return (
        <div className="sign-up-page-container">
            {contextHolder}
            <div>
                <img className="login-banner" src={require("../assets/authimage.jpg")} alt="" />
            </div>
            <div className="sign-up-main-container">
                <div className="sign-up-header">
                    <div style={{ fontSize: "1.4em" }}>HpDevCo Demo Project</div>
                    <div style={{ margin: "1em" }}>Sign In</div>
                </div>
                <Form onFinish={handleSignIn} className="sign-up-form-container">
                    <Form.Item name="email" rules={[
                        { type: "email", message: "Should be proper Email" },
                        { required: true, message: "Email is Required" }
                    ]}>
                        <Input placeholder="e.g:mihir@yopmail.com" />

                    </Form.Item>
                    {requestFor == 'signin' && <Form.Item name="otp" rules={[
                        { required: true, message: "Please provide OTP" }
                    ]}>
                        <Input placeholder="e.g: 123456" />
                    </Form.Item>}
                    <Button htmlType="submit" type="primary">{requestFor == "otp" ? "Send OTP" : "Sign Up"}</Button>
                </Form>
                <div >Dont' have Account ? <span style={{ color: 'blue', textDecoration: "underline" }} onClick={() => {
                    navigate("/signup")
                }}>Sign Up</span> </div>
            </div>
        </div>
    );
};