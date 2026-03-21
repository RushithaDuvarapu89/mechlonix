const express = require("express");
const router = express.Router();

// GET users
router.get("/", (req, res) => {
  res.json({ message: "Users from separate route file 🚀" });
});

module.exports = router;