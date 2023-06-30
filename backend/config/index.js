const config = {
  dbConfig: {
    host: "localhost",
    user: "root",
    password: "admin",
    name: "hpdevdemo",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  //jwt configuration
  jwtConfig: {
    secretKey: "hpdevCoDemo@2023",
    expiresIn: "7d",
  },
};

module.exports = config;
