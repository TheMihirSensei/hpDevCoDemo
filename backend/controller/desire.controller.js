const {
  addDesire,
  editDesire,
  deleteDesire,
  getAllDesire,
} = require("../services");

exports.addDesireController = async (req, res, next) => {
  try {
    const data = await addDesire(req.user, req.body);
    res.json({ data });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};
exports.editDesireController = async (req, res, next) => {
  try {
    const data = await editDesire(req.user, req.params.id, req.body);
    res.json({ data, message: "Edited Successfully!" });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};
exports.deleteDesireController = async (req, res, next) => {
  try {
    const data = await deleteDesire(req.user, req.params.id);
    res.json({ data, message: "Deleted Successfully!" });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};
exports.getAllDesireController = async (req, res, next) => {
  try {
    const data = await getAllDesire(req.user);
    res.json({ data, message: "Success!" });
  } catch (err) {
    res.status(err?.status || 500).json({ message: err?.message });
  }
};
