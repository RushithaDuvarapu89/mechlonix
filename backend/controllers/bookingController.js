const Booking = require("../models/Booking");

// ==========================
// CREATE BOOKING
// ==========================
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      customer: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      data: booking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// GET BOOKINGS (FILTERED)
// ==========================
exports.getBookings = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    // 🔐 ROLE-BASED FILTER
    if (req.user.role === "customer") {
      filter.customer = req.user._id;
    }

    if (req.user.role === "mechanic") {
      filter.mechanic = req.user._id;
    }

    // 👑 Admin → sees all (no filter needed)

    // 🎯 STATUS FILTER (optional)
    if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter)
      .populate("customer", "name email")
      .populate("mechanic", "name email");

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// UPDATE STATUS
// ==========================
exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = req.body.status;
    await booking.save();

    res.json({
      message: "Status updated ✅",
      booking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// DELETE BOOKING
// ==========================
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking deleted 🗑️" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// ASSIGN MECHANIC (ADMIN)
// ==========================
exports.assignMechanic = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.mechanic = req.body.mechanicId;
    booking.status = "confirmed";

    await booking.save();

    res.json({
      message: "Mechanic assigned ✅",
      booking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ==========================
// GET BOOKING STATS
// ==========================
exports.getBookingStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert array → object
    let result = {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
    };

    stats.forEach((s) => {
      result[s._id] = s.count;
      result.total += s.count;
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};