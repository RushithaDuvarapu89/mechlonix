const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ IMPORT MIDDLEWARE (TOP ONLY ONCE)
const { protect } = require("../middleware/authMiddleware");


// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 2. Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful ✅",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ==========================
// GET PROFILE (PROTECTED)
// ==========================
router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});


module.exports = router;