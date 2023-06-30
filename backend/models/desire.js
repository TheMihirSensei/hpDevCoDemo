const { DataTypes } = require("sequelize");
const db = require("./index");
const User = require("./user");
const { sequelize, Sequelize } = db;

//Desire Model

const Desire = sequelize.define(
  "desire",
  {
    desire: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },

  {
    timestamps: true,
  }
);

db["desire"] = Desire;
Desire.hasOne(User);

sequelize
  .sync()
  .then(() => {
    console.log("disere synce...");
  })
  .catch((err) => {
    console.log("error in desire sync", err);
  });
module.exports = Desire;
