const User = require("../models/user");
const { signUp, OtpSentToUser, signIn } = require("../services");

exports.signUpController = async (req, res, next) => {
  try {
    const data = await signUp(req.body);
    res.json({ data });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};

exports.OtpSentToUserController = async (req, res, next) => {
  try {
    await OtpSentToUser(req.body.email, req.body.type || "signUp");
    res.json({ message: `Otp sent to ${req.body.email}` });
  } catch (err) {
    console.log("erro in r controler", err);
    res.status(err?.status || 500).json({ message: err?.message });
  }
};

exports.signInController = async (req, res, next) => {
  try {
    const data = await signIn(req.body);
    res.json({ data });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};
