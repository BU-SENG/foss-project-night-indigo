const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const dayjs = require("dayjs");

// Multer (file upload setup)
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/events",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// CREATE EVENT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, date, startTime, endTime, location, description } = req.body;

    if (!title || !date || !startTime || !endTime || !location) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const eventDate = dayjs(date);
    const now = dayjs();
    const status = eventDate.isAfter(now) ? "upcoming" : "past";

    const newEvent = new Event({
      title,
      date,
      startTime,
      endTime,
      location,
      description,
      status,
      imageUrl: req.file ? "/uploads/events/" + req.file.filename : null
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created!", event: newEvent });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
