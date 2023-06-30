const { jwtConfig } = require("../config");
const jwt = require("jsonwebtoken");

exports.generateToken = async (payload) => {
  const jwtSecret = jwtConfig.secretKey;
  const expiresIn = jwtConfig.expiresIn;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

exports.verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    const jwtSecret = jwtConfig.secretKey;
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
};
