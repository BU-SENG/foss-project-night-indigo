import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import styles from './EditEventPage.module.css'; // new CSS module

export default function EditEventPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const event = state?.event;

  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [startTime, setStartTime] = useState(event?.startTime || '');
  const [endTime, setEndTime] = useState(event?.endTime || '');
  const [location, setLocation] = useState(event?.location || '');
  const [description, setDescription] = useState(event?.description || '');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('location', location);
    formData.append('description', description);
    if (file) formData.append('file-upload', file);

    try {
      const res = await fetch(`http://localhost:5000/events/${event._id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await res.json();
      alert(result.message || 'Event updated successfully');
      navigate('/events');
    } catch (err) {
      console.error(err);
      alert('Failed to update event');
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.headerMain}>Edit Event</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Title
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Date
            <input
              className={styles.input}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Start Time
            <input
              className={styles.input}
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            End Time
            <input
              className={styles.input}
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Location
            <input
              className={styles.input}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Description
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            File Upload
            <input
              className={styles.input}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            Update Event
          </button>
        </form>
      </div>
    </Layout>
  );
}
