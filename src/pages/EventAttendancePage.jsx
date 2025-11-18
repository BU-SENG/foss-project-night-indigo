import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from './EventAttendancePage.module.css';

export default function EventAttendancePage() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    checkedIn: 0,
    absent: 0,
    total: 0,
    percentage: '0%',
  });

  // -----------------------------
  // Fetch all events
  // -----------------------------
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('http://localhost:5000/events');
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  // -----------------------------
  // Fetch attendees for selected event
  // -----------------------------
  useEffect(() => {
    if (!selectedEventId) {
      setStudents([]);
      setStats({ checkedIn: 0, absent: 0, total: 0, percentage: '0%' });
      return;
    }

    async function fetchAttendance() {
      try {
        const res = await fetch(`http://localhost:5000/events/${selectedEventId}`);
        const data = await res.json();

        console.log("Fetched event data:", data); // Debug

        const attendees = data?.data?.attendees || [];
        const list = attendees.map(a => ({
          id: a.studentId?._id || "",
          name: a.studentId?.name || "Unknown",
          status: a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : "Absent",
        }));

        setStudents(list);

        const checkedIn = list.filter(s => s.status === 'Present').length;
        const total = list.length;
        const absent = total - checkedIn;
        const percentage = total > 0 ? `${Math.round((checkedIn / total) * 100)}%` : '0%';
        setStats({ checkedIn, absent, total, percentage });
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    }

    fetchAttendance();
  }, [selectedEventId]);

  // -----------------------------
  // Toggle attendance
  // -----------------------------
  const toggleAttendance = async (studentId) => {
    try {
      const student = students.find(s => s.id === studentId);
      if (!student) return;

      const newStatus = student.status === 'Present' ? 'Absent' : 'Present';

      // Update backend
      await fetch(`http://localhost:5000/events/${selectedEventId}/attend`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, status: newStatus.toLowerCase() }),
      });

      // Update frontend
      const updated = students.map(s =>
        s.id === studentId ? { ...s, status: newStatus } : s
      );
      setStudents(updated);

      const checkedIn = updated.filter(s => s.status === 'Present').length;
      const total = updated.length;
      const absent = total - checkedIn;
      const percentage = total > 0 ? `${Math.round((checkedIn / total) * 100)}%` : '0%';
      setStats({ checkedIn, absent, total, percentage });
    } catch (err) {
      console.error("Error updating attendance:", err);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Event Attendance</h1>
          <p className={styles.subtitle}>Track attendance for school events.</p>
        </div>

        {/* Event Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 600 }}>Select Event:</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginLeft: '10px' }}
          >
            <option value="">-- Choose Event --</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>
                {event.title || event.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Checked In</p>
            <p className={styles.statValue}>{stats.checkedIn}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Absent</p>
            <p className={styles.statValue}>{stats.absent}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Registered</p>
            <p className={styles.statValue}>{stats.total}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Attendance</p>
            <p className={styles.statValue}>{stats.percentage}</p>
          </div>
        </div>

        {/* Student List */}
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <h2>Student Attendance List</h2>
          </div>

          {!selectedEventId && <p style={{ color: "#888" }}>Select an event to view attendance.</p>}

          {selectedEventId && students.map((student) => (
            <div key={student.id} className={styles.listRow}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, margin: 0 }}>{student.name}</p>
                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0'}}>ID: {student.id}</p>
              </div>

              <button
                onClick={() => toggleAttendance(student.id)}
                style={{
                  minWidth: '100px',
                  padding: '6px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  backgroundColor: student.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: student.status === 'Present' ? '#10B981' : '#EF4444',
                }}
              >
                {student.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
