// school-event-backend/routes/events.js
import express from "express";
import Event from "../models/event.js";
import multer from "multer";
import path from "path";

const router = express.Router();

console.log("🔥 EVENTS ROUTER FILE LOADED");

// ----------------- MULTER CONFIG -----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// ----------------- ROUTES -----------------

// POST /events/addevents - handles form data + optional file upload
router.post("/addevents", upload.single("file-upload"), async (req, res) => {
  try {
    const { title, date, startTime, endTime, location, description } = req.body;
    const file = req.file;

    const newEventData = {
      title,
      date,
      startTime,
      endTime,
      location,
      description,
      filePath: file ? file.path : null,
    };

    console.log("🔥 ROUTE HIT /addevents", newEventData);

    const newEvent = new Event(newEventData);
    await newEvent.save();

    res.json({
      message: "Event added successfully",
      data: newEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// GET /events - fetch all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Export router as default for ES modules
export default router;
