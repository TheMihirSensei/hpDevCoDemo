const { DataTypes } = require("sequelize");
const db = require("./index");
const { sequelize, Sequelize } = db;

//User Model
const User = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
  },
  userName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

db["user"] = User;

module.exports = User;
