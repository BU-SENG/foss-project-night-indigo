import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from '../components/Layout';
import styles from './EventsPage.module.css';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // for programmatic navigation

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = eventFilter === 'upcoming'
          ? 'http://localhost:5000/events/upcoming'
          : 'http://localhost:5000/events';
        const res = await fetch(url);
        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventFilter]);

  // Filter events by search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine event status
  const getStatus = (eventDate) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    return eventDay >= today ? 'upcoming' : 'past';
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" });
      const result = await res.json();
      alert(result.message);
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  // Navigate to edit event page
  const handleEdit = (event) => {
    navigate('/edit-event', { state: { event } });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h1 className={styles.headerMain}>School Events</h1>
            <p className={styles.headerSub}>Manage all upcoming and past school events.</p>
          </div>

          <Link to="/add-event">
            <button className={styles.addButton}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
              <span>Add New Event</span>
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterRow}>
            <div className={styles.searchInput}>
              <label className={styles.searchInputLabel}>
                <div className={styles.searchInputWrapper}>
                  <div className={styles.searchIcon}>
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className={styles.searchInputField}
                    placeholder="Search by event name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className={styles.tabsContainer}>
            <div className={styles.tabsWrapper}>
              <label className={styles.tab}>
                <span>Upcoming Events</span>
                <input
                  className={styles.tabInput}
                  type="radio"
                  name="event-time"
                  value="upcoming"
                  checked={eventFilter === 'upcoming'}
                  onChange={(e) => setEventFilter(e.target.value)}
                />
              </label>
              <label className={styles.tab}>
                <span>Past Events</span>
                <input
                  className={styles.tabInput}
                  type="radio"
                  name="event-time"
                  value="past"
                  checked={eventFilter === 'past'}
                  onChange={(e) => setEventFilter(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className={styles.eventsList}>
          {loading ? (
            <p>Loading events...</p>
          ) : filteredEvents.length === 0 ? (
            <p>No events found</p>
          ) : (
            filteredEvents.map(event => (
              <div key={event._id} className={styles.eventCard}>
                <div className={styles.eventContent}>
                  <div className={styles.eventHeader}>
                    <div className={styles.eventTitle}>
                      <h3 className={styles.eventTitleText}>{event.title}</h3>
                      <span className={`${styles.badge} ${getStatus(event.date) === 'upcoming' ? styles.badgeUpcoming : styles.badgePast}`}>
                        {getStatus(event.date) === 'upcoming' ? 'Upcoming' : 'Past'}
                      </span>
                    </div>
                    <p className={styles.eventDate}>{event.date} | {event.startTime} - {event.endTime}</p>
                    <p className={styles.eventDescription}>{event.description}</p>
                    {event.filePath && (
                      <img src={`http://localhost:5000/${event.filePath}`} alt={event.title} className={styles.eventImage} />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.eventActions}>
                  <button className={styles.actionButton} onClick={() => handleEdit(event)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                  <button className={styles.actionButton} onClick={() => handleDelete(event._id)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
