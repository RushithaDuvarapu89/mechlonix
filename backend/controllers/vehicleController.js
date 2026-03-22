const Vehicle = require("../models/Vehicle");

// CREATE VEHICLE
exports.addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({
      ...req.body,
      user: req.user._id,
    });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET VEHICLES
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE VEHICLE
exports.deleteVehicle = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};