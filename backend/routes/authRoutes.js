const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// ==========================
// REGISTER
// ==========================
router.post("/register", async (req, res) => {
  try {
    console.log("Register API hit");

    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: role || "customer",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,   // ✅ important
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,   // ✅ important
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;