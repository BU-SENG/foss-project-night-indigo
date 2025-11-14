const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Import routes
const eventRoutes = require("./routes/events");
app.use("/events", eventRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/schoolEvents")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
