const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*"
  }));

// Debug log (VERY IMPORTANT)
console.log("Connecting to MongoDB...");

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.get("/", (req, res) => {
        res.send("Backend is running 🚀");
      });
      app.get("/api/users", (req, res) => {
        res.json({ message: "Users API working ✅" });
      });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.log("Mongo Error:", err);
});