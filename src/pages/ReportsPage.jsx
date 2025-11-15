import Layout from '../components/Layout'
import styles from './ReportsPage.module.css'
import { useState } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('Attendance Summary')
  const [eventCategory, setEventCategory] = useState('All Categories')
  const [dateRange, setDateRange] = useState('Last 30 Days')

  const reportData = [
    { event: 'Annual Sports Day', date: 'Oct 15, 2024', organizer: 'Mr. John Smith', category: 'Sports', attendees: 250 },
    { event: 'Science Fair', date: 'Oct 12, 2024', organizer: 'Ms. Emily White', category: 'Academics', attendees: 120 },
    { event: 'Drama Club Performance', date: 'Oct 10, 2024', organizer: 'Mrs. Davis', category: 'Arts & Culture', attendees: 85 },
    { event: 'Inter-School Debate', date: 'Oct 05, 2024', organizer: 'Mr. Robert Brown', category: 'Academics', attendees: 64 },
  ]

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
            {/* Report Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
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
                <option>Attendance Summary</option>
                <option>Event Popularity</option>
                <option>Participation by Grade</option>
              </select>
            </div>

            {/* Event Category */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>Event Category</label>
              <select
                value={eventCategory}
                onChange={(e) => setEventCategory(e.target.value)}
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
                <option>All Categories</option>
                <option>Sports</option>
                <option>Academics</option>
                <option>Arts & Culture</option>
              </select>
            </div>

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
              <button style={{
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
              <button style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-white)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
              }}>
                Export
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
                1,428
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
                Annual Sports Day
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
                82%
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
                    ATTENDEES
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
                      {row.attendees}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              Showing 1 to 4 of 25 results
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-white)',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--text-primary)',
              }}>
                Previous
              </button>
              <button style={{
                padding: '8px 12px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-white)',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--text-primary)',
              }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
