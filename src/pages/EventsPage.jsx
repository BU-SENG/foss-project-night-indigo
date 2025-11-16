import { useState } from 'react'
import Layout from '../components/Layout'
import styles from './EventsPage.module.css'
import AddEventPage from './AddEventPage'
import { Link } from "react-router-dom";



export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [eventFilter, setEventFilter] = useState('upcoming')

  const events = [
    {
      id: 1,
      title: 'Annual Science Fair',
      date: 'Oct 26, 2024',
      time: '10:00 AM - 12:00 PM',
      description: 'A showcase of student science projects from grades 6-8. Parents and staff are welcome to attend.',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference',
      date: 'Nov 05, 2024',
      time: '03:00 PM - 07:00 PM',
      description: 'Scheduled meetings between parents and teachers to discuss student progress.',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Sports Day Championship',
      date: 'Sep 30, 2024',
      time: '09:00 AM - 04:00 PM',
      description: 'The final day of our annual sports competition. Join us to cheer for our student athletes!',
      status: 'live'
    },
  ]

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
            <div className={styles.filterButtons}>
              <button className={styles.filterButton}>
                <p className={styles.filterButtonText}>Event Type</p>
                <span className={`material-symbols-outlined ${styles.filterIcon}`}>expand_more</span>
              </button>
              <button className={styles.filterButton}>
                <p className={styles.filterButtonText}>Date Range</p>
                <span className={`material-symbols-outlined ${styles.filterIcon}`}>expand_more</span>
              </button>
              <button className={styles.filterButton}>
                <p className={styles.filterButtonText}>Audience</p>
                <span className={`material-symbols-outlined ${styles.filterIcon}`}>expand_more</span>
              </button>
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
                  onChange={(e) => setEventFilter(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.eventsList}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                  <div className={styles.eventTitle}>
                    <h3 className={styles.eventTitleText}>{event.title}</h3>
                    <span className={`${styles.badge} ${event.status === 'upcoming' ? styles.badgeUpcoming : styles.badgeLive}`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Live'}
                    </span>
                  </div>
                  <p className={styles.eventDate}>{event.date} | {event.time}</p>
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
              </div>
              <div className={styles.eventActions}>
                <button className={styles.actionButton}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
                </button>
                <button className={styles.actionButton}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <p className={styles.paginationInfo}>Showing 1 to 3 of 15 results</p>
          <nav className={styles.paginationNav}>
            <button className={styles.pageButton} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
            </button>
            <button className={`${styles.pageButton} ${styles.active}`}>1</button>
            <button className={styles.pageButton}>2</button>
            <button className={styles.pageButton}>3</button>
            <span className={styles.paginationInfo}>...</span>
            <button className={styles.pageButton}>5</button>
            <button className={styles.pageButton}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
