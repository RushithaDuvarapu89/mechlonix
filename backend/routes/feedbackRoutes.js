const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Customer → submit
router.post("/", protect, createFeedback);

// Admin → view all
router.get("/", protect, authorize("admin"), getFeedbacks);

module.exports = router;