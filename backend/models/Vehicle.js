const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // linking to User model
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: Number,
    registrationNumber: String,
    fuelType: String,
    mileage: Number
}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);