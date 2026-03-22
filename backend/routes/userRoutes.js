const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authMiddleware");

// ==========================
// GET ALL USERS (ADMIN ONLY)
// ==========================
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================
// UPDATE USER ROLE (ADMIN)
// ==========================
router.patch("/:id/role", protect, authorize("admin"), async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      message: "Role updated successfully 🎉",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;