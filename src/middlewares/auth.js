const jwt = require("jsonwebtoken");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../utils/errorHandler");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ error: "Access denied, No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // Assuming decoded user object has a "role" property indicating user role
    if (req.user && req.user.role === "user") {
      // User is authenticated and has the role of "user"
      next();
    } else {
      // User is not authenticated or does not have the role of "user"
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not authorized" });
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // Assuming decoded user object has a "role" property indicating user role
    if (req.user && req.user.role === "admin") {
      // User is authenticated and has the role of "admin"
      next();
    } else {
      // User is not authenticated or does not have the role of "admin"
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not an admin" });
    }
  });
};
