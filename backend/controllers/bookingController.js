const Booking = require("../models/Booking");
exports.createBooking = async (req, res) => {
    try {
      const booking = await Booking.create({
        ...req.body,
        customer: req.user._id,
      });
  
      res.status(201).json({
        success: true,
        data: booking,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getBookings = async (req, res) => {
    let bookings;
  
    if (req.user.role === "admin") {
      bookings = await Booking.find().populate("vehicle mechanic");
    } 
    else if (req.user.role === "mechanic") {
      bookings = await Booking.find({ mechanic: req.user._id });
    } 
    else {
      bookings = await Booking.find({ customer: req.user._id });
    }
  
    res.json(bookings);
  };
  exports.updateStatus = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
  
    booking.status = req.body.status;
    await booking.save();
  
    res.json(booking);
  };
  exports.deleteBooking = async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
  
    res.json({ message: "Booking deleted" });
  };
  exports.assignMechanic = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
  
    booking.mechanic = req.body.mechanicId;
    booking.status = "confirmed";
  
    await booking.save();
  
    res.json(booking);
  };