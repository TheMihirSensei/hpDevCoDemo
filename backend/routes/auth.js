const { Router } = require("express");
const {
  signUpController,
  OtpSentToUserController,
  signInController,
} = require("../controller");

const authRoute = Router();

authRoute.post("/signup", signUpController);
authRoute.post("/otp", OtpSentToUserController);
authRoute.post("/signin", signInController);

module.exports = authRoute;
