const { Router } = require("express");
const {
  addDesireController,
  editDesireController,
  getAllDesireController,
  deleteDesireController,
} = require("../controller");

const desireRoute = Router();

desireRoute.post("/", addDesireController);
desireRoute.get("/", getAllDesireController);
desireRoute.put("/:id", editDesireController);
desireRoute.delete("/:id", deleteDesireController);

module.exports = desireRoute;
