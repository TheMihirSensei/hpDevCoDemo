const { DataTypes } = require("sequelize");
const { sendOtpMailToUser, generateToken } = require("../helpers");
const Otp = require("../models/otp");
const uuid = require("uuid");
const User = require("../models/user");

const signUp = (userBody, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userName, email, otp } = userBody;
      //Verify the OTP of User
      const userWithOtp = await Otp.findOne({
        where: {
          email,
          otp,
        },
      });

      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        reject({
          message: "User is Already Exist! Please try again with other email",
          status: 401,
        });
      }

      if (!userWithOtp) {
        return reject({
          message: "OTP is Invalid! Please Try again",
          status: 400,
        });
      }
      //save user into database
      let saveUserObj = {
        userName,
        email,
        userId: uuid.v4(),
      };
      const newUser = await User.create(saveUserObj);

      //generate JWT token for user
      const token = await generateToken({ userId: newUser.dataValues.id });
      await Otp.destroy({
        where: {
          email,
        },
      });
      resolve({
        ...newUser.dataValues,
        token: token,
      });
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};
const signIn = (userBody, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, otp } = userBody;
      //Verify the OTP of User
      const userWithOtp = await Otp.findOne({
        where: {
          email,
          otp,
        },
      });

      const userExist = await User.findOne({
        email,
      });

      if (!userExist) {
        reject({
          message: "User is not exist with Us. please Sign Up!",
          status: 401,
        });
      }

      if (!userWithOtp) {
        return reject({
          message: "OTP is Invalid! Please Try again",
          status: 400,
        });
      }

      //generate JWT token for user
      const token = await generateToken({
        userId: userExist.dataValues.id,
      });
      await Otp.destroy({
        where: {
          email,
        },
      });
      resolve({
        ...userExist.dataValues,
        token: token,
      });
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};

const OtpSentToUser = (email, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("OTP sent sercie", email, type);
      //check email is already exist. give the already exist error else process
      let userExist = await User.findOne({
        where: {
          email,
        },
      });
      console.log("userExist..", userExist);
      if (type == "signUp" && userExist) {
        return reject({
          message:
            "User is Already Exist With this mail Please try another Email",
          status: 400,
        });
      }

      if (type == "SignIn" && !userExist) {
        return reject({
          message: "User is not exist with us. please sign Up!",
          status: 400,
        });
      }
      //clean up all the old otp if they are exist to email
      await Otp.destroy({
        where: {
          email,
        },
      });

      //addOTP to database
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log("OPT", otp);
      await Otp.create({
        email,
        otp,
      });

      await sendOtpMailToUser(email, otp);
      console.log("otp sent");
      resolve();
    } catch (err) {
      console.log("eror", err);
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};

module.exports = {
  signUp,
  OtpSentToUser,
  signIn,
};
