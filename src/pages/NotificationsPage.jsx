import Layout from '../components/Layout'
import styles from './NotificationsPage.module.css'
import { useState } from 'react'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All')
  const [selectedNotification, setSelectedNotification] = useState(0)

  const notifications = [
    {
      id: 1,
      icon: '📅',
      title: 'Science Fair Location Change',
      description: 'The location for the upcoming Science Fair has been changed to the Main Auditorium.',
      timestamp: '5m ago',
      category: 'Event Updates',
      isRead: false,
    },
    {
      id: 2,
      icon: '🎉',
      title: 'New Event: Annual Sports Day',
      description: 'Get ready for a day of fun and competition! The Annual Sports Day is scheduled for next month.',
      timestamp: '2h ago',
      category: 'Event Updates',
      isRead: false,
    },
    {
      id: 3,
      icon: '📢',
      title: 'Reminder: School Assembly Tomorrow',
      description: 'A special assembly will be held tomorrow morning at 9 AM in the main hall.',
      timestamp: 'Yesterday',
      category: 'Reminders',
      isRead: true,
    },
    {
      id: 4,
      icon: '⚠️',
      title: 'Urgent: School Closure Notice',
      description: 'Due to unforeseen circumstances, the school will remain closed on Friday, Oct 27th.',
      timestamp: '2 days ago',
      category: 'Event Updates',
      isRead: true,
    },
  ]

  const filteredNotifications = filter === 'All'
    ? notifications
    : filter === 'Unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications.filter((n) => n.category === filter)

  const currentNotification = filteredNotifications[selectedNotification] || filteredNotifications[0]

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
              <button style={{
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
                <button style={{
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
                <button style={{
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
