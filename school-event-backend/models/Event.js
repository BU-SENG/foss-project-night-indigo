// school-event-backend/models/event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    filePath: { type: String }, // optional uploaded file path
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Event = mongoose.model("Event", eventSchema);

// ✅ Default export for ES modules
export default Event;
