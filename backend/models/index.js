const { Sequelize } = require("sequelize");
const { dbConfig } = require("../config");
const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("connected MySQL DB");
  })
  .catch((error) => {
    console.log("Error", error);
  });

module.exports = db;
