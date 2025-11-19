import Layout from '../components/Layout'
import styles from './NotificationsPage.module.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All')
  const [selectedNotification, setSelectedNotification] = useState(0)
  const [events, setEvents] = useState([])
  const [notifications, setNotifications] = useState([])
  const navigate = useNavigate()

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events')
        const data = await res.json()
        setEvents(data.data || [])
      } catch (err) {
        console.error('Error fetching events:', err)
      }
    }
    fetchEvents()
  }, [])

  // Generate notifications from events
  useEffect(() => {
    const generateNotifications = () => {
      if (!events || events.length === 0) return

      const now = new Date()
      const generatedNotifications = events.map((event, idx) => {
        const eventDate = new Date(event.date)
        const startTime = event.startTime ? `${event.startTime}` : '12:00 PM'

        // Create a date string for comparison
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)
        const eventDateOnly = new Date(eventDate)
        eventDateOnly.setHours(0, 0, 0, 0)

        const daysUntilEvent = Math.floor((eventDateOnly - todayDate) / (1000 * 60 * 60 * 24))

        let timestamp = ''
        let title = ''
        let description = ''
        let icon = '📅'
        let isRead = false

        if (daysUntilEvent === 0) {
          // Event is today
          title = `🔔 Event Today: ${event.title}`
          description = `${event.title} is scheduled for today at ${startTime}. Location: ${event.location || 'TBD'}`
          timestamp = 'Today'
          icon = '🔔'
          isRead = false // Mark as unread for today's events
        } else if (daysUntilEvent === 1) {
          // Event is tomorrow
          title = `📢 Reminder: ${event.title} Tomorrow`
          description = `${event.title} is scheduled for tomorrow at ${startTime}. Make sure to attend!`
          timestamp = 'Tomorrow'
          icon = '📢'
          isRead = false
        } else if (daysUntilEvent > 1 && daysUntilEvent <= 7) {
          // Event is within a week
          title = `📅 Upcoming Event: ${event.title}`
          description = `${event.title} is coming up in ${daysUntilEvent} days at ${startTime}. Location: ${event.location || 'TBD'}`
          timestamp = `in ${daysUntilEvent} days`
          icon = '📅'
          isRead = true
        } else if (daysUntilEvent < 0) {
          // Event has passed
          const daysPassed = Math.abs(daysUntilEvent)
          title = `✓ Event Completed: ${event.title}`
          description = `${event.title} has been completed. Thank you for attending!`
          timestamp = `${daysPassed}d ago`
          icon = '✓'
          isRead = true
        } else {
          // Event is more than a week away
          title = `📌 Scheduled Event: ${event.title}`
          description = `${event.title} is scheduled for ${eventDate.toLocaleDateString()} at ${startTime}. Mark your calendar!`
          timestamp = `${daysUntilEvent}d away`
          icon = '📌'
          isRead = true
        }

        return {
          id: event._id || idx,
          eventId: event._id,
          icon: icon,
          title: title,
          description: description,
          timestamp: timestamp,
          category: daysUntilEvent === 0 || daysUntilEvent === 1 ? 'Reminders' : 'Event Updates',
          isRead: isRead,
          eventDate: eventDate,
          daysUntilEvent: daysUntilEvent
        }
      })

      // Sort by days until event (upcoming first, then completed)
      generatedNotifications.sort((a, b) => {
        if (a.daysUntilEvent < 0 && b.daysUntilEvent >= 0) return 1
        if (a.daysUntilEvent >= 0 && b.daysUntilEvent < 0) return -1
        return a.daysUntilEvent - b.daysUntilEvent
      })

      setNotifications(generatedNotifications)
    }

    generateNotifications()
  }, [events])

  const filteredNotifications = filter === 'All'
    ? notifications
    : filter === 'Unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications.filter((n) => n.category === filter)

  const currentNotification = filteredNotifications[selectedNotification] || filteredNotifications[0]

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  // Handle mark single notification as read
  const handleMarkAsRead = () => {
    if (currentNotification) {
      setNotifications(notifications.map(n =>
        n.id === currentNotification.id ? { ...n, isRead: true } : n
      ))
    }
  }

  // Handle view details - navigate to event page
  const handleViewDetails = () => {
    if (currentNotification && currentNotification.eventId) {
      navigate('/events')
      // Optionally, you could pass state to highlight the event, but for now navigate to events page
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.subtitle}>View and manage system notifications.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', minHeight: '600px' }}>
          {/* Notifications List */}
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Notifications
              </h3>
              <button
                onClick={handleMarkAllAsRead}
                style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: 'rgba(127, 19, 236, 0.05)',
                color: 'var(--accent-purple)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                Mark all as read
              </button>
            </div>

            {/* Filter Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-light)',
              padding: '8px',
              gap: '4px',
              backgroundColor: 'var(--bg-lighter)',
            }}>
              {['All', 'Unread', 'Event Updates', 'Reminders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setFilter(tab)
                    setSelectedNotification(0)
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: filter === tab ? 'white' : 'transparent',
                    color: filter === tab ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    transition: 'all 200ms ease',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Notifications Items */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredNotifications.map((notif, idx) => (
                <div
                  key={notif.id}
                  onClick={() => setSelectedNotification(idx)}
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    backgroundColor: selectedNotification === idx ? 'rgba(127, 19, 236, 0.05)' : 'var(--bg-white)',
                    transition: 'background-color 200ms ease',
                    borderLeft: selectedNotification === idx ? '4px solid var(--accent-purple)' : '4px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedNotification !== idx) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-lighter)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedNotification !== idx) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-white)'
                    }
                  }}
                >
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(127, 19, 236, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}>
                      {notif.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {notif.title}
                      </p>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {notif.description}
                      </p>
                      <p style={{
                        margin: '4px 0 0 0',
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                      }}>
                        {notif.timestamp}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-purple)',
                        flexShrink: 0,
                        marginTop: '6px',
                      }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Detail */}
          {currentNotification && (
            <div style={{
              backgroundColor: 'var(--bg-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--accent-purple)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px',
                  }}>
                    {currentNotification.category}
                  </p>
                  <h2 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}>
                    {currentNotification.title}
                  </h2>
                  <p style={{
                    margin: '8px 0 0 0',
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                  }}>
                    Posted {currentNotification.timestamp}
                  </p>
                </div>
                <button style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: 'var(--text-secondary)',
                }}>
                  📁
                </button>
              </div>

              <div style={{
                height: '1px',
                backgroundColor: 'var(--border-light)',
                margin: '24px 0',
              }} />

              <div style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}>
                <p>Hello students and parents,</p>
                <p>{currentNotification.description}</p>
                <p>Please take note of any additional details provided below.</p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <button
                  onClick={handleMarkAsRead}
                  style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-white)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  ✓ Mark as Read
                </button>
                <button
                  onClick={handleViewDetails}
                  style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'var(--accent-purple)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  View Details →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
