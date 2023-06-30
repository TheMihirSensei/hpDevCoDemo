const { DataTypes } = require("sequelize");
const db = require("./index");
const { sequelize, Sequelize } = db;

//User Model
const Otp = sequelize.define("otp", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.BIGINT,
  },
});

db["otp"] = Otp;

module.exports = Otp;
