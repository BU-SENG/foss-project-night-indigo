import Layout from '../components/Layout'
import styles from './SettingsPage.module.css'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Personal Information')
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    eventReminders: true,
    newEventAlerts: false,
  })

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        fullName: parsedUser.fullName || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
      })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggle = (setting) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSavePersonalInfo = () => {
    if (user) {
      const updatedUser = { ...user, ...formData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      alert('Profile updated successfully!')
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Configure system settings and preferences.</p>
        </div>

        {/* Settings Container */}
        <div style={{
          backgroundColor: 'var(--bg-white)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            paddingLeft: '32px',
            gap: '32px',
          }}>
            {['Personal Information', 'Notifications', 'Security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: activeTab === tab ? 'var(--accent-purple)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab ? '3px solid var(--accent-purple)' : '3px solid transparent',
                  transition: 'all 200ms ease',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '32px' }}>
            {/* Personal Information Tab */}
            {activeTab === 'Personal Information' && (
              <div style={{ maxWidth: '600px' }}>
                {/* Profile Picture Section */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '24px',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '24px',
                }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      backgroundImage: user?.profilePictureUrl ? `url("${user.profilePictureUrl}")` : 'none',
                      backgroundColor: user?.profilePictureUrl ? 'transparent' : '#e5e7eb',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                    }}>
                      {!user?.profilePictureUrl && '👤'}
                    </div>
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}>
                        Profile Picture
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                      }}>
                        {user?.fullName || 'Update your profile'}
                      </p>
                    </div>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: 'rgba(127, 19, 236, 0.1)',
                    color: 'var(--accent-purple)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    Upload New
                  </button>
                </div>

                {/* Form Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        backgroundColor: 'var(--bg-white)',
                        fontFamily: 'var(--font-base)',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'var(--bg-lighter)',
                        cursor: 'not-allowed',
                        fontFamily: 'var(--font-base)',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / 2' }}>
                    <label style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        backgroundColor: 'var(--bg-white)',
                        fontFamily: 'var(--font-base)',
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)',
                }}>
                  <button style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-white)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePersonalInfo}
                    style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: 'var(--accent-purple)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'Notifications' && (
              <div style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email notifications for important events' },
                    { key: 'eventReminders', label: 'Event Reminders', description: 'Get reminders before upcoming events' },
                    { key: 'newEventAlerts', label: 'New Event Alerts', description: 'Be notified when new events are created' },
                  ].map((setting) => (
                    <div key={setting.key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--border-light)',
                    }}>
                      <div>
                        <p style={{
                          margin: 0,
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: '4px',
                        }}>
                          {setting.label}
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: '13px',
                          color: 'var(--text-secondary)',
                        }}>
                          {setting.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle(setting.key)}
                        style={{
                          width: '50px',
                          height: '28px',
                          borderRadius: '14px',
                          border: 'none',
                          backgroundColor: notificationSettings[setting.key] ? 'var(--accent-purple)' : 'var(--border-light)',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'background-color 200ms ease',
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'white',
                          top: '2px',
                          left: notificationSettings[setting.key] ? '24px' : '2px',
                          transition: 'left 200ms ease',
                        }} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                  <button style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'var(--bg-white)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    Cancel
                  </button>
                  <button style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: 'var(--accent-purple)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'Security' && (
              <div style={{ maxWidth: '600px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--border-light)',
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                    }}>
                      Change Password
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}>
                      Update your password regularly to keep your account secure.
                    </p>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: 'var(--accent-purple)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      Change Password
                    </button>
                  </div>

                  <div style={{
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--border-light)',
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                    }}>
                      Two-Factor Authentication
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}>
                      Enable two-factor authentication for enhanced security.
                    </p>
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
                      Enable 2FA
                    </button>
                  </div>

                  <div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                    }}>
                      Active Sessions
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      marginBottom: '12px',
                    }}>
                      Sign out of all your active sessions across devices.
                    </p>
                    <button style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: 'var(--bg-white)',
                      color: 'var(--error-red)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      Sign Out All Sessions
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
