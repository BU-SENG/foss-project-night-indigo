// school-event-backend/routes/attendance.js
import express from "express";
import Event from "../models/Event.js";
import Student from "../models/Students.js"; // ✅ correct file and ES module

const router = express.Router();

// Initialize attendance for an event
router.post("/:eventId/attendance/init", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Fetch all students
    const students = await Student.find({});

    // Initialize attendance: all students start as "Absent"
    event.attendance = students.map(s => ({
      studentId: s.studentId,
      status: "Absent",
    }));

    await event.save();

    res.json({
      message: "Attendance initialized successfully",
      attendance: event.attendance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
