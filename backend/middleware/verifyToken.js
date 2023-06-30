const { verifyToken } = require("../helpers");

exports.verifyTokenMiddleware = async (req, res, next) => {
  try {
    let token = req["headers"]["authorization"]?.split(" ")[1];
    if (!!token) {
      const payload = await verifyToken(token);
      req.user = payload;
      next();
    } else {
      res.status(403).json({ messaeg: "token  missing" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ messaeg: err?.message || "Internal Server Error", error: err });
  }
};
