import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/events', label: 'Events', icon: 'event' },
    { path: '/attendance', label: 'Event Attendance', icon: 'how_to_reg' },
    { path: '/calendar', label: 'Calendar', icon: 'calendar_month' },
    { path: '/reports', label: 'Reports', icon: 'bar_chart' },
    { path: '/notifications', label: 'Notifications', icon: 'notifications', badge: 3 },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={`material-symbols-outlined ${styles.logoIcon}`}>school</span>
        <h1 className={styles.logoText}>Smart School Event System</h1>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
          >
            <span className={`material-symbols-outlined ${styles.navIcon}`}>{item.icon}</span>
            <span className={styles.navText}>{item.label}</span>
            {item.badge && <span className={styles.notificationBadge}>{item.badge}</span>}
          </Link>
        ))}
      </nav>

      <button className={styles.logoutButton}>
        <span className={`material-symbols-outlined ${styles.logoutIcon}`}>logout</span>
        <span>Logout</span>
      </button>
    </aside>
  )
}
