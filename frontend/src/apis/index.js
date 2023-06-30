import { message } from "antd";
import axios from "axios";
const axiosInstanceWithOutToken = axios.create({
  baseURL: "http://localhost:3000/api",
});
const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
const axiosInstanceWithToken = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const otpSendToEmail = (email, type) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithOutToken.post("/auth/otp", {
    email,
    type,
  });
};

export const signUpApi = ({ email, userName, otp }) => {
  //type is for which process you are sending for eithe signUp and signIn
  console.log("email, ", email);
  console.log("userName, ", userName);
  console.log("otp, ", otp);
  return axiosInstanceWithOutToken.post("/auth/signup", {
    email,
    userName,
    otp,
  });
};
export const signInApi = ({ email, otp }) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithOutToken.post("/auth/signin", {
    email,
    otp,
  });
};

export const getAllDesireApi = () => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithToken.get("/desires");
};

export const deleteDesireApi = (desireId) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithToken.delete(`/desires/${desireId}`);
};
export const addDesireApi = (desire) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithToken.post(`/desires`, {
    desire,
  });
};
//commit
//okay
export const editDesireApi = (desireId, desire) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithToken.put(`/desires/${desireId}`, {
    desire: desire,
  });
};
