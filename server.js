import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import addEventRoute from "./school-event-backend/routes/events.js"; // use .js for ES modules

// fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Debug incoming requests
app.use((req, res, next) => {
  console.log("💥 Incoming request:", req.method, req.path);
  next();
});

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/events", addEventRoute);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(__dirname));

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// MongoDB connection
const mongoURI = "Your MongoDB Connection String Here";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
