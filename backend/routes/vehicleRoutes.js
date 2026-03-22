const express = require("express");
const router = express.Router();
const {
  addVehicle,
  getVehicles,
  deleteVehicle,
} = require("../controllers/vehicleController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addVehicle);
router.get("/", protect, getVehicles);
router.delete("/:id", protect, deleteVehicle);

module.exports = router;