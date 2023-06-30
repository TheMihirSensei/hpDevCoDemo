const authService = require("./auth.service");
const desireService = require("./desire.service");

module.exports = {
  ...authService,
  ...desireService,
};
