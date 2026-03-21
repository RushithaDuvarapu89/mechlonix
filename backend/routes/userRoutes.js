const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user (NO hashing here)
    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save(); // 🔥 hashing happens automatically here

    res.status(201).json({
      message: "User registered successfully 🎉",
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;