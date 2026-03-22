const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateStatus,
  deleteBooking,
  assignMechanic,
  getBookingStats   // ✅ ADD THIS LINE
} = require("../controllers/bookingController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ==============================
// Create booking → ONLY CUSTOMER
// ==============================
router.post("/", protect, authorize("customer"), createBooking);

// ==============================
// Get bookings → ALL LOGGED-IN
// ==============================
router.get("/", protect, getBookings);
router.get("/stats", protect, authorize("admin"), getBookingStats);

// ==============================
// Update status → MECHANIC + ADMIN
// ==============================
router.patch("/:id/status", protect, authorize("mechanic", "admin"), updateStatus);

// ==============================
// Delete booking → CUSTOMER + ADMIN
// ==============================
router.delete("/:id", protect, authorize("customer", "admin"), deleteBooking);

// ==============================
// Assign mechanic → ADMIN ONLY
// ==============================
router.patch("/:id/assign", protect, authorize("admin"), assignMechanic);

module.exports = router;