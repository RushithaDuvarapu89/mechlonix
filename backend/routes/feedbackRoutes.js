const express = require("express");
const router = express.Router();

const {
  addFeedback,
  getAllFeedback
} = require("../controllers/feedbackController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Customer gives feedback
router.post("/:bookingId", protect, authorize("customer"), addFeedback);

// Admin views all feedback
router.get("/", protect, authorize("admin"), getAllFeedback);

module.exports = router;