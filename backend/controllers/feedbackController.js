const Feedback = require("../models/Feedback");

// CREATE FEEDBACK (Customer)
exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({
      user: req.user._id,
      message: req.body.message,
      rating: req.body.rating,
    });

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL FEEDBACK (Admin)
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};