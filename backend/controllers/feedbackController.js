const Feedback = require("../models/Feedback");
const Booking = require("../models/Booking");

// Add feedback
exports.addFeedback = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  // Check booking exists
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  // Only completed bookings
  if (booking.status !== "completed") {
    return res.status(400).json({
      message: "Cannot give feedback before completion"
    });
  }

  // Only booking owner
  if (booking.customer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const feedback = await Feedback.create({
    booking: booking._id,
    customer: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment
  });

  res.status(201).json(feedback);
};

// Get all feedback (admin)
exports.getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate("customer", "name")
    .populate("booking");

  res.json(feedbacks);
};