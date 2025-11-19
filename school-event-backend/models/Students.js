// models/Student.js
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, required: true },
  class: String,
  email: String
});

// ✅ Prevent overwrite
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;
