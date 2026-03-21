const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  serviceType: String,
  scheduledDate: Date,
  status: {
    type: String,
    enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);