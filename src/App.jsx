import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import EventAttendancePage from './pages/EventAttendancePage'
import CalendarPage from './pages/CalendarPage'
import ReportsPage from './pages/ReportsPage'
import NotificationsPage from './pages/NotificationsPage'
import SettingsPage from './pages/SettingsPage'
import AddEventPage from './pages/AddEventPage'
import EditEventPage from './pages/EditEventPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/attendance" element={<EventAttendancePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/add-event" element={<AddEventPage />} /> 
        <Route path="/edit-event" element={<EditEventPage />} />  
      </Routes>
    </Router>
  )
}
