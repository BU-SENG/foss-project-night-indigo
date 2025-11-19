import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  status: { type: String, enum: ["absent", "present"], default: "absent" },
  attendanceDate: { type: Date }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: String,
  endTime: String,
  location: String,
  description: String,
  filePath: String,
  attendees: [attendeeSchema],
  attendanceStats: {
    registered: { type: Number, default: 0 },
    checkedIn: { type: Number, default: 0 },
    absent: { type: Number, default: 0 }
  }
});

// ✅ Check if model already exists, otherwise create
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
