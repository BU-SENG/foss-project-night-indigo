import Layout from '../components/Layout';
import styles from './CalendarPage.module.css';
import { useState, useEffect } from 'react';


export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [events, setEvents] = useState({}); // store events by date

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events'); // GET all events
        const data = await res.json();
        if (data.data) {
          const eventsByDate = {};
          data.data.forEach(event => {
            const dateStr = new Date(event.date).toISOString().split('T')[0];
            if (!eventsByDate[dateStr]) eventsByDate[dateStr] = [];
            eventsByDate[dateStr].push(event);
          });
          setEvents(eventsByDate);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const previousWeek = () => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  const nextWeek = () => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  const previousDay = () => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));
  const nextDay = () => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
  const goToToday = () => setCurrentDate(new Date());

  // Get the start of the week (Sunday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    return new Date(d.setDate(d.getDate() - day));
  };

  // Get week days
  const getWeekDays = (date) => {
    const start = getWeekStart(date);
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(start.getTime() + i * 24 * 60 * 60 * 1000));
    }
    return days;
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(<div key={`prev-${day}`} style={{ opacity: 0.5, padding: '12px', minHeight: '100px', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{day}</span>
      </div>);
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events[dateStr] || [];
      const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

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
            {dayEvents.slice(0, 2).map(event => (
              <div key={event._id} style={{
                fontSize: '12px',
                backgroundColor: 'rgba(127, 19, 236, 0.1)',
                color: 'var(--accent-purple)',
                padding: '4px 8px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {event.startTime && `${event.startTime} `}{event.title}
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
      );
    }

    // Next month's leading days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
      days.push(<div key={`next-${day}`} style={{ opacity: 0.5, padding: '12px', minHeight: '100px', backgroundColor: 'var(--bg-white)', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{day}</span>
      </div>);
    }

    return days;
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        backgroundColor: 'var(--border-light)',
      }}>
        {weekDays.map((day, idx) => {
          const dateStr = day.toISOString().split('T')[0];
          const dayEvents = events[dateStr] || [];
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div key={idx} style={{
              backgroundColor: 'var(--bg-white)',
              padding: '16px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '12px',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: isToday ? 'var(--accent-purple)' : 'transparent',
                color: isToday ? 'white' : 'var(--text-primary)',
                textAlign: 'center',
              }}>
                {dayNames[day.getDay()]} {day.getDate()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dayEvents.map(event => (
                  <div key={event._id} style={{
                    fontSize: '12px',
                    backgroundColor: 'rgba(127, 19, 236, 0.1)',
                    color: 'var(--accent-purple)',
                    padding: '8px',
                    borderRadius: '4px',
                    borderLeft: '3px solid var(--accent-purple)',
                  }}>
                    <div style={{ fontWeight: 600 }}>{event.startTime || 'All day'}</div>
                    <div style={{ marginTop: '4px' }}>{event.title}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayEvents = events[dateStr] || [];

    return (
      <div style={{
        backgroundColor: 'var(--bg-white)',
        borderRadius: '4px',
        border: '1px solid var(--border-light)',
        padding: '32px',
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '24px',
          color: 'var(--text-primary)',
        }}>
          {dayNames[currentDate.getDay()]}, {monthNames[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}
        </div>

        {dayEvents.length === 0 ? (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: '16px' }}>No events scheduled for this day.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {dayEvents.map(event => (
              <div key={event._id} style={{
                backgroundColor: 'rgba(127, 19, 236, 0.05)',
                border: '1px solid rgba(127, 19, 236, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--accent-purple)',
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                }}>
                  <strong>Time:</strong> {event.startTime || 'All day'} - {event.endTime || 'TBD'}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                }}>
                  <strong>Location:</strong> {event.location || 'TBD'}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                }}>
                  <strong>Description:</strong> {event.description || 'No description'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Events Calendar</h1>
          <p className={styles.subtitle}>View all school events in one place.</p>
        </div>

        {/* Calendar Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {viewMode === 'month' && (
              <>
                <button onClick={previousMonth} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>←</button>
                <button onClick={nextMonth} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>→</button>
              </>
            )}
            {viewMode === 'week' && (
              <>
                <button onClick={previousWeek} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>←</button>
                <button onClick={nextWeek} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>→</button>
              </>
            )}
            {viewMode === 'day' && (
              <>
                <button onClick={previousDay} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>←</button>
                <button onClick={nextDay} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '24px', color: 'var(--text-primary)' }}>→</button>
              </>
            )}
            <button onClick={goToToday} style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--border-light)', background: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Today</button>
          </div>

          <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {viewMode === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            {viewMode === 'week' && `Week of ${monthNames[getWeekStart(currentDate).getMonth()]} ${getWeekStart(currentDate).getDate()}`}
            {viewMode === 'day' && `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: '40px', alignItems: 'center', borderRadius: '4px', backgroundColor: 'rgba(127, 19, 236, 0.05)', padding: '4px' }}>
              {['Month', 'Week', 'Day'].map(mode => (
                <label key={mode} style={{
                  display: 'flex',
                  cursor: 'pointer',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 12px',
                  borderRadius: '4px',
                  backgroundColor: viewMode === mode.toLowerCase() ? 'white' : 'transparent',
                  color: viewMode === mode.toLowerCase() ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 200ms ease',
                }}>
                  <input type="radio" name="viewMode" value={mode.toLowerCase()} checked={viewMode === mode.toLowerCase()} onChange={(e) => setViewMode(e.target.value)} style={{ display: 'none' }} />
                  {mode}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        {viewMode === 'month' && (
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
            {dayNames.map(day => (
              <div key={day} style={{
                padding: '12px',
                backgroundColor: 'var(--bg-white)',
                borderBottom: '1px solid var(--border-light)',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--text-primary)',
              }}>{day}</div>
            ))}

            {/* Calendar Days */}
            {renderMonthView()}
          </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div style={{ marginTop: '16px' }}>
            {renderWeekView()}
          </div>
        )}

        {/* Day View */}
        {viewMode === 'day' && (
          <div style={{ marginTop: '16px' }}>
            {renderDayView()}
          </div>
        )}
      </div>
    </Layout>
  );
}
