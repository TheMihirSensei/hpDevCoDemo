import axios from "axios";
const axiosInstanceWithOutToken = axios.create({
  baseURL: "http://localhost:5000/api",
});
const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
const axiosInstanceWithToken = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const otpSendToEmail = (email, type) => {
  return axiosInstanceWithOutToken.post("/auth/otp", {
    email,
    type,
  });
};

export const signUpApi = ({ email, userName, otp }) => {
  return axiosInstanceWithOutToken.post("/auth/signup", {
    email,
    userName,
    otp,
  });
};
export const signInApi = ({ email, otp }) => {
  return axiosInstanceWithOutToken.post("/auth/signin", {
    email,
    otp,
  });
};

export const getAllDesireApi = () => {
  return axiosInstanceWithToken.get("/desires");
};

export const deleteDesireApi = (desireId) => {
  return axiosInstanceWithToken.delete(`/desires/${desireId}`);
};
export const addDesireApi = (desire) => {
  return axiosInstanceWithToken.post(`/desires`, {
    desire,
  });
};

export const editDesireApi = (desireId, desire) => {
  //type is for which process you are sending for eithe signUp and signIn
  return axiosInstanceWithToken.put(`/desires/${desireId}`, {
    desire: desire,
  });
};
