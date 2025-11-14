const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  startTime: String,
  endTime: String,
  location: String,
  imageUrl: String,
  status: { type: String, default: "upcoming" }
}, { timestamps: true });

module.exports = mongoose.model("Event", EventSchema);
