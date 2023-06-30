const { Router } = require("express");
const authRoute = require("./auth");
const desireRoute = require("./desire");
const { verifyTokenMiddleware } = require("../middleware/verifyToken");

const apiRoute = Router();

apiRoute.use("/auth", authRoute);
apiRoute.use("/desires", verifyTokenMiddleware, desireRoute);

module.exports = apiRoute;
