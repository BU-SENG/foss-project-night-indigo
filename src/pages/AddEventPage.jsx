import { useState } from "react";
import Layout from "../components/Layout";
import styles from "./AddEventPage.module.css";

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file-upload") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("date", formData.date);
      payload.append("startTime", formData.startTime);
      payload.append("endTime", formData.endTime);
      payload.append("location", formData.location);
      payload.append("description", formData.description);
      if (formData.file) payload.append("file", formData.file);

      const response = await fetch("http://localhost:5000/events/addevents", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("Failed to submit event");

      const result = await response.json();
      alert(result.message);
      console.log("Server Response:", result);

      // Optional: clear form
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        description: "",
        file: null,
      });
    } catch (err) {
      console.error(err);
      alert("Error adding event");
    }
  };

  return (
    <Layout>
      <div className={styles.formContainer}>
        <p className={styles.pageTitle}>Add New Event</p>
        <form onSubmit={handleSubmit}>
          {/* Event Title */}
          <div>
            <label className={styles.label} htmlFor="title">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Annual Science Fair"
              className={styles.input}
            />
          </div>

          {/* Date & Times */}
          <div className={styles.grid3}>
            <div>
              <label className={styles.label} htmlFor="date">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className={styles.input} />
            </div>
            <div>
              <label className={styles.label} htmlFor="startTime">Start Time</label>
              <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className={styles.input} />
            </div>
            <div>
              <label className={styles.label} htmlFor="endTime">End Time</label>
              <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className={styles.input} />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className={styles.label} htmlFor="location">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Auditorium, Gym, or Virtual Link" className={styles.input} />
          </div>

          {/* Description */}
          <div>
            <label className={styles.label} htmlFor="description">Event Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={styles.textarea} placeholder="Provide a detailed description of the event..." />
          </div>

          {/* File Upload */}
          <div className={styles.fileUpload}>
            <span className="material-symbols-outlined">upload_file</span>
            <label htmlFor="file-upload">Upload a file
              <input type="file" id="file-upload" name="file-upload" onChange={handleChange} />
            </label>
            <p>or drag and drop</p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", paddingTop: "1rem" }}>
            <button type="button" className={styles.buttonCancel}>Cancel</button>
            <button type="submit" className={styles.buttonSubmit}>Save Event</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
