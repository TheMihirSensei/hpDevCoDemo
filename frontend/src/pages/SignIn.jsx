import { message, Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { otpSendToEmail, signInApi } from "../apis";

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
            <div className="sign-up-header">
                <div>HpDevCo Demo Project</div>
                <div>Sign In</div>
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
        </div>);
};