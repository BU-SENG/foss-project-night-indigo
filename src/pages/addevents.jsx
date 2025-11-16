import { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/events/addevents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit event");
      }

      const result = await response.json();
      alert("Event added successfully!");
      console.log("Server Response:", result);

    } catch (error) {
      console.error(error);
      alert("Error adding event");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="event-form" className="flex flex-col gap-3">

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <input
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
      />

      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
      />

      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>

      <button type="submit">Add Event</button>
    </form>
  );
}
