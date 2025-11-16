import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    file: null
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/events`);
        const data = await res.json();
        const event = data.data.find(e => e._id === id);
        if (event) setFormData({ ...event, file: null });
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) payload.append(key, formData[key]);
      });

      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: 'PUT',
        body: payload
      });
      const result = await res.json();
      alert(result.message);
      navigate('/events');
    } catch (err) {
      console.error(err);
      alert("Failed to update event");
    }
  };

  return (
    <Layout>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="file" name="file-upload" onChange={handleChange} />
        <button type="submit">Update Event</button>
      </form>
    </Layout>
  );
}
