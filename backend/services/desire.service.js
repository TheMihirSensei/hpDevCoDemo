const Desire = require("../models/desire");

const addDesire = (user, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check desire exist or not.
      //   const desireExistOfUser = await Desire.findOne({
      //     where: {
      //       desire: body.desire,
      //       userId: user.Id,
      //     },
      //   });

      console.log("user.Id", user.userId);
      const newDesire = await Desire.create({
        desire: body.desire,
        userId: user.userId,
      });

      resolve(newDesire.dataValues);
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};
const editDesire = (user, desireId, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check desire exist or not.
      //   const desireExistOfUser = await Desire.findOne({
      //     where: {
      //       desire: body.desire,
      //       userId: user.Id,
      //     },
      //   });

      console.log("user.Id", user.userId);
      let updatedUser = await Desire.update(
        {
          desire: body.desire,
        },
        {
          where: {
            id: desireId,
          },
          returning: true,
        }
      );
      if (updatedUser[1] >= 1) resolve();
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};
const deleteDesire = (user, desireId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check desire exist or not.
      //   const desireExistOfUser = await Desire.findOne({
      //     where: {
      //       desire: body.desire,
      //       userId: user.Id,
      //     },
      //   });

      let deletedDesire = await Desire.destroy({
        where: {
          id: desireId,
        },
      });
      if (deletedDesire) resolve();
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};
const getAllDesire = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userAllDesires = await Desire.findAll({
        where: {
          userId: user.userId,
        },
      });
      resolve(userAllDesires);
    } catch (err) {
      reject({
        message: err?.message || "Internal server Error!",
      });
    }
  });
};

module.exports = {
  addDesire,
  editDesire,
  deleteDesire,
  getAllDesire,
};
