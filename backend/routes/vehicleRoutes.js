const express = require("express"); 
const router = express.Router();

const Vehicle = require("../models/Vehicle");

// ✅ FIX: correct import (destructuring)
const { protect } = require("../middleware/authMiddleware");

// ==============================
// Add Vehicle
// ==============================
router.post("/", protect, async (req, res) => {
    const vehicle = await Vehicle.create({
        ...req.body,
        owner: req.user.id
    });

    res.json(vehicle);
});

// ==============================
// Get logged-in user's vehicles
// ==============================
router.get("/", protect, async (req, res) => {
    const vehicles = await Vehicle.find({ owner: req.user.id });
    res.json(vehicles);
});

// ==============================
// Delete vehicle
// ==============================
router.delete("/:id", protect, async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
    }

    // Check ownership
    if (vehicle.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
    }

    await vehicle.deleteOne();

    res.json({ message: "Vehicle deleted" });
});

module.exports = router;