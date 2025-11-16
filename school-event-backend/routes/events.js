// school-event-backend/routes/events.js
import express from "express";
import Event from "../models/event.js";
import multer from "multer";
import path from "path";

const router = express.Router();
console.log("🔥 EVENTS ROUTER FILE LOADED");

// ----------------- MULTER CONFIG -----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// ----------------- ROUTES -----------------

// POST /events/addevents
router.post("/addevents", upload.single("file-upload"), async (req, res) => {
  try {
    const { title, date, startTime, endTime, location, description } = req.body;
    const file = req.file;

    const newEvent = new Event({
      title, date, startTime, endTime, location, description,
      filePath: file ? file.path : null,
    });
    await newEvent.save();
    res.json({ message: "Event added successfully", data: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save event" });
  }
});

// GET /events - all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json({ data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET /events/upcoming - future events only
router.get("/upcoming", async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today.toISOString().split("T")[0] } }).sort({ date: 1 });
    res.json({ data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch upcoming events" });
  }
});

// PUT /events/:id - update event
router.put("/:id", upload.single("file-upload"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.filePath = req.file.path;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "Event updated", data: updatedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE /events/:id - delete event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
