import Layout from '../components/Layout'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const features = [
    {
      icon: 'how_to_reg',
      title: 'Automated Registration',
      description: 'Simplify sign-ups with customizable online forms and instant confirmations, eliminating manual data entry.'
    },
    {
      icon: 'event_available',
      title: 'Centralized Scheduling',
      description: 'Manage all event timelines, venues, and resources in one shared, easy-to-access calendar.'
    },
    {
      icon: 'campaign',
      title: 'Automated Notifications',
      description: 'Keep everyone informed with automated reminders, updates, and post-event communications.'
    },
    {
      icon: 'reduce_capacity',
      title: 'Reduced Admin Workload',
      description: 'Automate repetitive tasks, freeing up valuable staff time to focus on creating memorable events.'
    },
    {
      icon: 'forum',
      title: 'Improved Communication',
      description: 'Bridge the gap between staff, students, and parents with a single source of event information.'
    },
    {
      icon: 'analytics',
      title: 'Better Participation Tracking',
      description: 'Gain insights with real-time attendance data and generate post-event reports effortlessly.'
    },
  ]

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span>Smart School</span>
                <span className={styles.heroPurple}>Event Management System</span>
              </h1>

              <p className={styles.heroDescription}>
                A structured, all-in-one solution for planning, organizing, and managing school events.
                Streamline your process, reduce administrative workload, and enhance communication for everyone involved.
              </p>

              <div className={styles.heroButtons}>
                <a href="#features" className={styles.primaryButton}>
                  Discover Features
                </a>
                <a href="#contact" className={styles.secondaryButton}>
                  Request a Demo
                </a>
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.imageWrapper}>
                <div
                  className={styles.imageBg}
                  style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVt88BinzfrzJxmzdHkfKdI7O0-7nGAhWlaDQCtnr5ED6clxVXsFd-Mh2ZVZpMmz0BRuHdhECWR2CZiWV48Rg2J32xTHiOhEYRfC-Zn6TtuC8yr7JqdXZuFThGUy_IXthE6Y7maeSDeUyAp2xo7L5Vs0HZqeQq9siu3xJYTAwXtZx31PPvAnxlXX-Qk1Hdl60j6uGI1mMAEKOflAAp6jlpMKZJsprwnM-NbdJjoRfZ0h1cViaafrOeFllZMEOW1qoOkCwkpfcQ8Ho")'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className={`${styles.section} ${styles.featuresSection}`}>
        <div className={styles.container}>
          <div className={styles.featuresContent}>
            <h2 className={styles.featuresTitle}>
              Transforming Event Management for Schools
            </h2>
            <p className={styles.featuresDescription}>
              Our system is packed with features designed to simplify event coordination and boost participation.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={styles.section}>
        <div className={styles.container} style={{ maxWidth: '48rem' }}>
          <h2 className={styles.contactTitle}>
            Ready to Elevate Your School's Events?
          </h2>

          <p className={styles.contactDescription}>
            Let's connect. Fill out the form below for a personalized demo and discover how our system
            can be tailored to your institution's needs.
          </p>

          <form className={styles.contactForm}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  placeholder="jane.doe@school.edu"
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>School Name</label>
              <input
                type="text"
                placeholder="Springfield Elementary"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Message</label>
              <textarea
                placeholder="Tell us about your event management challenges..."
                className={styles.formTextarea}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Request
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.footerIcon}
            >
              <path
                d="M12 2L1 9l4 2.18v6.32L12 22l7-4.5V11.18L23 9 12 2zm0 2.47L19.5 9l-2.31 1.22L12 7.63 6.81 10.22 4.5 9 12 4.47zM17 11.64v3.86l-5 2.73-5-2.73v-3.86l5 2.73 5-2.73z"
              ></path>
            </svg>

            <p className={styles.footerText}>
              © 2024 Smart School Event System. All rights reserved.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                ></path>
              </svg>
            </a>

            <a href="#" className={styles.footerLink}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                ></path>
              </svg>
            </a>

            <a href="#" className={styles.footerLink}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
