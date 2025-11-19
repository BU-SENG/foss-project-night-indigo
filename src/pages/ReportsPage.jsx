import Layout from '../components/Layout'
import styles from './ReportsPage.module.css'
import { useState, useEffect } from 'react'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('This Month')
  const [events, setEvents] = useState([])
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalAttendance: 0,
    mostPopularEvent: 'N/A',
    participationRate: 0
  })

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

  // Calculate analytics based on filters
  const calculateStats = async (eventsData) => {
    if (eventsData.length === 0) {
      setStats({
        totalAttendance: 0,
        mostPopularEvent: 'N/A',
        participationRate: 0
      })
      setReportData([])
      return
    }

    // Filter events by date range
    const filteredEvents = filterEventsByDateRange(eventsData)

    if (filteredEvents.length === 0) {
      setStats({
        totalAttendance: 0,
        mostPopularEvent: 'N/A',
        participationRate: 0
      })
      setReportData([])
      return
    }

    // Fetch attendance stats for each event
    let totalCheckedIn = 0
    let totalRegistered = 0
    let mostPopularEventName = 'N/A'
    let maxCheckedIn = 0

    const reportDataArray = []

    for (const event of filteredEvents) {
      try {
        const res = await fetch(`http://localhost:5000/attendance/${event._id}/stats`)
        const data = await res.json()

        const eventStats = data.stats || {
          registered: 0,
          checkedIn: 0,
          absent: 0
        }

        totalCheckedIn += eventStats.checkedIn
        totalRegistered += eventStats.registered

        // Track most popular event
        if (eventStats.checkedIn > maxCheckedIn) {
          maxCheckedIn = eventStats.checkedIn
          mostPopularEventName = event.title || 'N/A'
        }

        // Format report data
        reportDataArray.push({
          event: event.title,
          date: new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          organizer: event.organizer || 'Not Specified',
          category: event.category || 'General',
          attendees: eventStats.checkedIn,
          totalSlots: eventStats.registered,
          absent: eventStats.absent
        })
      } catch (err) {
        console.error(`Error fetching stats for event ${event._id}:`, err)
      }
    }

    // Calculate average participation rate
    const participationRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0

    setStats({
      totalAttendance: totalCheckedIn,
      mostPopularEvent: mostPopularEventName,
      participationRate: participationRate
    })

    setReportData(reportDataArray)
  }

  // Filter events by date range
  const filterEventsByDateRange = (eventsData) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return eventsData.filter(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((today - eventDate) / (1000 * 60 * 60 * 24))

      if (dateRange === 'This Month') {
        return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
      } else if (dateRange === 'Last Month') {
        const lastMonth = new Date(today)
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        return eventDate.getMonth() === lastMonth.getMonth() && eventDate.getFullYear() === lastMonth.getFullYear()
      } else if (dateRange === 'Last 30 Days') {
        return daysDiff >= -30 && daysDiff <= 0
      } else if (dateRange === 'Custom Range') {
        return true // For custom range, would need additional date inputs
      }
      return true
    })
  }

  // Handle generate report button
  const handleGenerateReport = () => {
    setLoading(true)
    calculateStats(events)
    setLoading(false)
  }

  // Auto-generate report when page loads or filters change
  useEffect(() => {
    calculateStats(events)
  }, [events, dateRange])

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reports & Analytics</h1>
          <p className={styles.subtitle}>Generate and view event reports and analytics.</p>
        </div>

        {/* Filter Section */}
        <div style={{
          backgroundColor: 'var(--bg-white)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          border: '1px solid var(--border-light)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'end',
          }}>
            {/* Date Range */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>Filter by Date</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-white)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-base)',
                }}
              >
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleGenerateReport}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'var(--accent-purple)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Total Attendance */}
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 19, 236, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)',
              fontSize: '28px',
              flexShrink: 0,
            }}>
              👥
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>
                Total Attendance this Month
              </p>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {stats.totalAttendance}
              </p>
            </div>
          </div>

          {/* Most Popular Event */}
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 19, 236, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)',
              fontSize: '28px',
              flexShrink: 0,
            }}>
              🏆
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>
                Most Popular Event
              </p>
              <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {stats.mostPopularEvent}
              </p>
            </div>
          </div>

          {/* Participation Rate */}
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            border: '1px solid var(--border-light)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(127, 19, 236, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)',
              fontSize: '28px',
              flexShrink: 0,
            }}>
              📊
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, marginBottom: '4px' }}>
                Average Participation Rate
              </p>
              <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {stats.participationRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div style={{
          backgroundColor: 'var(--bg-white)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Detailed Event Report
            </h3>
          </div>
          {reportData.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                No events found for the selected filters. Click "Generate Report" to load data.
              </p>
            </div>
          ) : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-lighter)' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                        EVENT NAME
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                        DATE
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                        ORGANIZER
                      </th>
                      <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                        CATEGORY
                      </th>
                      <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                        ATTENDANCE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? 'var(--bg-white)' : 'var(--bg-lighter)' }}>
                        <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, borderBottom: '1px solid var(--border-light)' }}>
                          {row.event}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                          {row.date}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                          {row.organizer}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-light)' }}>
                          {row.category}
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500, textAlign: 'right', borderBottom: '1px solid var(--border-light)' }}>
                          {row.attendees}/{row.totalSlots}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
                  Showing {reportData.length} of {reportData.length} results
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
