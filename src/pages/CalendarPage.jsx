import Layout from '../components/Layout'
import styles from './CalendarPage.module.css'
import { useState } from 'react'

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 15))
  const [viewMode, setViewMode] = useState('month')

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const events = {
    '2024-10-15': [
      { id: 1, title: 'Annual Sports Day', time: '10:00 AM' },
    ],
    '2024-10-12': [
      { id: 2, title: 'Science Fair', time: '09:00 AM' },
    ],
    '2024-10-10': [
      { id: 3, title: 'Drama Club Performance', time: '02:00 PM' },
    ],
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    const days = []

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      days.push(
        <div key={`prev-${day}`} style={{ opacity: 0.5, padding: '12px', minHeight: '100px', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{day}</span>
        </div>
      )
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = events[dateStr] || []
      const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear()

      days.push(
        <div key={dateStr} style={{
          padding: '12px',
          minHeight: '100px',
          backgroundColor: 'var(--bg-white)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'background-color 200ms ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(127, 19, 236, 0.05)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-white)'}
        >
          <div style={{
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: isToday ? '50%' : '0',
            backgroundColor: isToday ? 'var(--accent-purple)' : 'transparent',
            color: isToday ? 'white' : 'var(--text-primary)',
          }}>
            {day}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {dayEvents.slice(0, 2).map((event) => (
              <div key={event.id} style={{
                fontSize: '12px',
                backgroundColor: 'rgba(127, 19, 236, 0.1)',
                color: 'var(--accent-purple)',
                padding: '4px 8px',
                borderRadius: '4px',
                truncate: true,
              }}>
                {event.time && `${event.time} `}{event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div style={{
                fontSize: '12px',
                color: 'var(--accent-purple)',
                fontWeight: 500,
                cursor: 'pointer',
              }}>
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    // Next month's leading days
    const totalCells = firstDay + daysInMonth
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} style={{ opacity: 0.5, padding: '12px', minHeight: '100px', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{day}</span>
        </div>
      )
    }

    return days
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Events Calendar</h1>
          <p className={styles.subtitle}>View and manage all school events in one place.</p>
        </div>

        {/* Calendar Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={previousMonth} style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'var(--text-primary)',
            }}>
              ←
            </button>
            <button onClick={nextMonth} style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'var(--text-primary)',
            }}>
              →
            </button>
            <button onClick={goToToday} style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              Today
            </button>
          </div>

          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: '40px', alignItems: 'center', borderRadius: '4px', backgroundColor: 'rgba(127, 19, 236, 0.05)', padding: '4px' }}>
              {['Month', 'Week', 'Day'].map((mode) => (
                <label key={mode} style={{
                  display: 'flex',
                  cursor: 'pointer',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 12px',
                  borderRadius: '4px',
                  backgroundColor: viewMode === mode ? 'white' : 'transparent',
                  color: viewMode === mode ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 200ms ease',
                }}>
                  <input
                    type="radio"
                    name="viewMode"
                    value={mode}
                    checked={viewMode === mode}
                    onChange={(e) => setViewMode(e.target.value)}
                    style={{ display: 'none' }}
                  />
                  {mode}
                </label>
              ))}
            </div>

            <button style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: 'var(--accent-purple)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              + Add Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{
          marginTop: '16px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid var(--border-light)',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          backgroundColor: 'var(--bg-lighter)',
        }}>
          {/* Weekday Headers */}
          {dayNames.map((day) => (
            <div key={day} style={{
              padding: '12px',
              backgroundColor: 'var(--bg-white)',
              borderBottom: '1px solid var(--border-light)',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--text-primary)',
            }}>
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {renderCalendarDays()}
        </div>
      </div>
    </Layout>
  )
}
