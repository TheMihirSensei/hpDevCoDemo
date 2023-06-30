const authController = require("./auth.controller");
const desireController = require("./desire.controller");

module.exports = {
  ...authController,
  ...desireController,
};
