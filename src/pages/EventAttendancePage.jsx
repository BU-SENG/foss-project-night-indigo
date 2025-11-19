import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from './EventAttendancePage.module.css';

export default function EventAttendancePage() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [registeredInput, setRegisteredInput] = useState('');
  const [checkedInInput, setCheckedInInput] = useState('');
  const [stats, setStats] = useState({
    registered: 0,
    checkedIn: 0,
    absent: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all events - ONLY from online database
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('http://localhost:5000/events');
        const data = await res.json();
        const eventsList = Array.isArray(data) ? data : data.data || [];
        setEvents(eventsList);

        // Do NOT use localStorage - keep state only in memory
      } catch (err) {
      }
    }
    fetchEvents();
  }, []);

  // Fetch attendance stats for selected event
  useEffect(() => {
    if (!selectedEventId) {
      setStats({ registered: 0, checkedIn: 0, absent: 0 });
      setRegisteredInput('');
      setCheckedInInput('');
      return;
    }

    async function fetchAttendanceStats() {
      try {
        const res = await fetch(`http://localhost:5000/attendance/${selectedEventId}/stats`);
        const data = await res.json();

        if (!res.ok) {
          setMessage(`❌ Error: ${data.error || data.message}`);
          return;
        }

        if (data.stats) {
          setStats(data.stats);
          setRegisteredInput(data.stats.registered);
          setCheckedInInput(data.stats.checkedIn);
          setMessage('');
        } else {
          setMessage('❌ Invalid response format from server');
        }
      } catch (err) {
      }
    }

    fetchAttendanceStats();
  }, [selectedEventId]);

  // Handle registered input change
  const handleRegisteredChange = (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setRegisteredInput(value);
  };

  // Handle checked-in input change
  const handleCheckedInChange = (e) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setCheckedInInput(value);
  };

  // Save attendance stats
  const handleSaveAttendance = async () => {
    setMessage('');

    // Validation
    if (registeredInput === '' || checkedInInput === '') {
      setMessage('❌ Please enter both registered and checked-in counts');
      return;
    }

    const registered = parseInt(registeredInput, 10);
    const checkedIn = parseInt(checkedInInput, 10);

    // Validate parsing
    if (isNaN(registered) || isNaN(checkedIn)) {
      setMessage('❌ Please enter valid numbers');
      return;
    }

    if (registered < 0 || checkedIn < 0) {
      setMessage('❌ Numbers cannot be negative');
      return;
    }

    if (checkedIn > registered) {
      setMessage('❌ Checked-in cannot be more than registered');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/attendance/${selectedEventId}/stats`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registered, checkedIn }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || data.message || 'Failed to save attendance';
        setMessage(`❌ ${errorMsg}`);
        setLoading(false);
        return;
      }

      // Update local state with response data
      if (data.stats) {
        setStats(data.stats);
      } else {
        const absent = registered - checkedIn;
        setStats({ registered, checkedIn, absent });
      }

      setMessage('✓ Attendance data saved successfully');
      setLoading(false);
    } catch (err) {
      setMessage(`❌ Error saving attendance: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Event Attendance</h1>
          <p className={styles.subtitle}>Track and manage attendance for school events.</p>
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

        {selectedEventId && (
          <>
            {/* Input Section */}
            <div style={{
              backgroundColor: 'var(--bg-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: '24px',
              marginBottom: '24px',
            }}>
              <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
                Attendance Input
              </h2>

              {message && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  backgroundColor: message.includes('✓') ? '#dcfce7' : '#fee2e2',
                  color: message.includes('✓') ? '#166534' : '#dc2626',
                  fontSize: '14px',
                }}>
                  {message}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Registered Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    Total Registered
                  </label>
                  <input
                    type="number"
                    value={registeredInput}
                    onChange={handleRegisteredChange}
                    placeholder="Enter number of registered attendees"
                    min="0"
                    style={{
                      padding: '12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-base)',
                    }}
                  />
                </div>

                {/* Checked-In Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    Checked In
                  </label>
                  <input
                    type="number"
                    value={checkedInInput}
                    onChange={handleCheckedInChange}
                    placeholder="Enter number checked in"
                    min="0"
                    style={{
                      padding: '12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '14px',
                      fontFamily: 'var(--font-base)',
                    }}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveAttendance}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: loading ? '#d4d4d8' : 'var(--accent-purple)',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {loading ? 'Saving...' : 'Save Attendance Data'}
              </button>
            </div>

            {/* Stats Display */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Total Registered</p>
                <p className={styles.statValue}>{stats.registered}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Checked In</p>
                <p className={styles.statValue} style={{ color: '#10B981' }}>{stats.checkedIn}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Absent</p>
                <p className={styles.statValue} style={{ color: '#EF4444' }}>{stats.absent}</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statLabel}>Attendance Rate</p>
                <p className={styles.statValue}>
                  {stats.registered > 0 ? `${Math.round((stats.checkedIn / stats.registered) * 100)}%` : '0%'}
                </p>
              </div>
            </div>
          </>
        )}

        {!selectedEventId && (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
            Select an event to enter attendance data
          </p>
        )}
      </div>
    </Layout>
  );
}
