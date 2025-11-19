// school-event-backend/routes/attendance.js
import express from "express";
import Event from "../models/Event.js";
import Student from "../models/Students.js"; // ✅ correct file and ES module

const router = express.Router();

// Initialize attendance for an event
router.post("/:eventId/init", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Fetch all students
    const students = await Student.find({});

    // Initialize attendance: all students start as "Absent"
    event.attendees = students.map(s => ({
      studentId: s._id || s.studentId,
      status: "absent",
    }));

    // Initialize stats
    event.attendanceStats = {
      registered: students.length,
      checkedIn: 0,
      absent: students.length
    };

    await event.save();

    res.json({
      message: "Attendance initialized successfully",
      attendees: event.attendees,
      stats: event.attendanceStats
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Get event attendance stats
router.get("/:eventId/stats", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Calculate stats from attendees if attendanceStats is not set or is empty
    let stats = event.attendanceStats;

    if (!stats || (stats.registered === 0 && event.attendees && event.attendees.length > 0)) {
      stats = {
        registered: event.attendees?.length || 0,
        checkedIn: event.attendees?.filter(a => a.status === "present").length || 0,
        absent: 0
      };
      stats.absent = stats.registered - stats.checkedIn;
    } else {
      stats.absent = stats.registered - stats.checkedIn;
    }

    res.json({
      message: "Attendance stats retrieved successfully",
      stats
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch attendance stats" });
  }
});

// Update attendance stats (manual entry of registered and checked-in counts)
router.put("/:eventId/stats", async (req, res) => {
  try {
    const { eventId } = req.params;
    let { registered, checkedIn } = req.body;

    // Convert to numbers if they're strings
    if (typeof registered === 'string') registered = parseInt(registered, 10);
    if (typeof checkedIn === 'string') checkedIn = parseInt(checkedIn, 10);

    // Validate input
    if (isNaN(registered) || isNaN(checkedIn)) {
      return res.status(400).json({ error: "Registered and checkedIn must be valid numbers" });
    }

    if (registered < 0 || checkedIn < 0) {
      return res.status(400).json({ error: "Numbers cannot be negative" });
    }

    if (checkedIn > registered) {
      return res.status(400).json({ error: "Checked-in cannot exceed registered" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Calculate absent
    const absent = registered - checkedIn;

    // Update stats
    event.attendanceStats = {
      registered,
      checkedIn,
      absent
    };

    await event.save();

    res.json({
      message: "Attendance stats updated successfully",
      stats: event.attendanceStats
    });
  } catch {
    res.status(500).json({ error: "Failed to update attendance stats" });
  }
});

export default router;
