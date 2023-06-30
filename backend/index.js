const express = require("express");
const app = express();
const db = require("./models");
const apiRoute = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//express middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//database sync
db.sequelize
  .sync()
  .then(() => {
    console.log("sync the db");
  })
  .catch((error) => {
    console.log("error in sync", error);
  });

//intialroute
app.get("/", (req, res) => {
  console.log("API is up");
  res.send("Initial Route");
});

app.use("/api", apiRoute);

app.listen(5000, (req, res) => {
  console.log("server started");
});
