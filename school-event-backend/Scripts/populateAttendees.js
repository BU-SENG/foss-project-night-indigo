// school-event-backend/scripts/populateAttendees.js
import mongoose from "mongoose";
import Event from "../models/Event.js";
import Student from "../models/Students.js"; // adjust filename if your model file is different

// MongoDB connection URI
const mongoURI = "mongodb+srv://olaluko20_db_user:gwdGNUoQKKcOMJMz@eventmanage.s9gx9lq.mongodb.net/";

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Main function
async function populateAttendees() {
  try {
    // Fetch all events
    const events = await Event.find({});
    console.log(`Found ${events.length} events in total.`);

    // Fetch all students
    const students = await Student.find({}, "_id");
    if (students.length === 0) {
      console.error("❌ No students found. Add students first.");
      process.exit(1);
    }

    let updatedCount = 0;

    for (const event of events) {
      // Skip if attendees array already exists and is not empty
      if (event.attendees && event.attendees.length > 0) continue;

      // Populate attendees
      event.attendees = students.map(s => ({
        studentId: s._id,
        status: "absent",
      }));

      await event.save();
      console.log(`✅ Populated attendees for event: ${event.title}`);
      updatedCount++;
    }

    console.log(`🎉 Finished! Updated ${updatedCount} event(s) with attendees.`);
  } catch (err) {
    console.error("❌ Error populating attendees:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
populateAttendees();
