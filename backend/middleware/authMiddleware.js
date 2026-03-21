const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// ==========================
// PROTECT MIDDLEWARE
// ==========================
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ IMPORTANT: return here
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  return res.status(401).json({ message: "No token" }); // ✅ always return
};

// ==========================
// AUTHORIZE MIDDLEWARE
// ==========================
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};