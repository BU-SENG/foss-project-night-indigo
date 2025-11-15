import Layout from '../components/Layout'
import styles from './EventAttendancePage.module.css'

export default function EventAttendancePage() {
  const stats = [
    { label: 'Checked In', value: '125' },
    { label: 'Absent', value: '25' },
    { label: 'Total Registered', value: '150' },
    { label: 'Attendance', value: '83%' },
  ]

  const students = [
    { id: 'S001', name: 'John Smith', status: 'Present', checkInTime: '09:00 AM' },
    { id: 'S002', name: 'Sarah Johnson', status: 'Present', checkInTime: '09:05 AM' },
    { id: 'S003', name: 'Mike Davis', status: 'Absent', checkInTime: '-' },
    { id: 'S004', name: 'Emily Brown', status: 'Present', checkInTime: '09:10 AM' },
  ]

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Event Attendance</h1>
          <p className={styles.subtitle}>Track attendance for school events.</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Student List */}
        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <h2>Student Attendance List</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '8px 16px', borderRadius: '4px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer' }}>
                Export
              </button>
            </div>
          </div>
          {students.map((student, index) => (
            <div key={index} className={styles.listRow}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, margin: 0 }}>{student.name}</p>
                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>ID: {student.id}</p>
              </div>
              <div style={{ minWidth: '120px', textAlign: 'center' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: student.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: student.status === 'Present' ? '#10B981' : '#EF4444',
                }}>
                  {student.status}
                </span>
              </div>
              <div style={{ minWidth: '120px', textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>{student.checkInTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
