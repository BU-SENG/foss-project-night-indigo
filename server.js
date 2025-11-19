// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import addEventRoute from "./school-event-backend/routes/events.js";
import attendanceRoute from "./school-event-backend/routes/attendance.js";
import authRoute from "./school-event-backend/routes/autRoutes.js"; // authentication API

// Load environment variables
dotenv.config();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoute);                 // authentication routes
app.use("/events", addEventRoute);           // events CRUD routes
app.use("/attendance", attendanceRoute);     // attendance tracking routes

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(__dirname));

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || "Input your key here";
mongoose
  .connect(mongoURI)
  .then(() => {})
  .catch(() => {});

// Start server
const PORT = 5000;
app.listen(PORT, () => {});
