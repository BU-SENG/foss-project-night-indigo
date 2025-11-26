# 🎓 School Event Management System

> A digital platform that enables seamless creation, management, and participation in school events.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-BuildTool-purple?logo=vite)](https://vitejs.dev/)

A digital platform designed to streamline the management of school events, student participation, and administrative oversight. This system replaces manual event registration processes with a secure, fast, and trackable digital workflow.

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Licence](#-licence)
- [Acknowledgements](#-acknowledgements)
- [Contributors](#-contributors)
---

## 📌 About the Project
- A simple interface for students to **view event details**
- A platform for admins to **create, update, and delete events**
- A dynamic event workflow integrated with a **MongoDB database**
- Secure user access and **role-based features**

The platform consists of:

- A **frontend built with React**
- A **robust Node.js + Express backend API**
- A **MongoDB database for storing users, events, approvals, and attendance data**

---

## Key Features

### Core functionality
- 🏫 Create and publish events  
- 🗂️ Categorize & manage events from admin panel  
- 🎫 Upload event banners and media  
- 📆 Student event viewing & participation support  
- 🔐 Secure authentication system  
- 📱 Fully responsive UI

### Student Features

- View available school events
- Register for events
- Manage personal event schedule
- View event details, venue, and time
- Receive real-time status updates

### Admin & Event Coordinator Features

- Create, update, and delete events
- Add event descriptions, venue, and date
- View registered students
- Manage attendance

### Security Features

- Secure login with role-based access
- Only authorized admins can modify events
- Activity logs and audit tracking

---

## Tech Stack
| Layer | Technology |
|-------|-------------|
| **Frontend** | React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT) |
| **Environment Management** | dotenv |
| **Development Tools** | Nodemon, Git & GitHub |

---

## 📂 Project Structure

```
foss-project-night-indigo/
├── public/
│ ├── vite.svg
│ └── index.html
│
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── school-event-backend/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── scripts/
│ ├── server.js
│ ├── package.json
│ ├── nodemon.json
│ └── .env (Not included in Git)
│
├── .gitignore
├── package.json
└── README.md
```

## Local Development

### 1. Clone the repository
```bash
git clone https://github.com/BU-SENG/foss-project-night-indigo.git
cd foss-project-night-indigo
```

### 2. **Install dependencies**
```bash
npm install
```
### 3. **Create environment variables**
Create a ```.env ```file 
```bash
PORT=4000
MONGODB_URI=your-mongodb-uri-here
JWT_SECRET=your-secret-key
```
### 4. **Start the development server**
```bash
npm run dev
```
The app will be running at:
```
Local:   http://localhost:5175/
```
### API Testing
You may test using : 
- Thunder Client (VSCode)
- Curl
- Postman

### API Documentation (Backend)
Authentication Routes
| Method | Endpoint | Description |         
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Authenticate user and return token |

Event Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| POST | `/api/events` | Create new event (Admin only) |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Remove event |

Many of these routes require authentication with `JWT Authorization: Bearer <token>`

---

## 🏗️Architecture
This project follows a layered architecture to separate concerns and make the system easier to maintain and scale:

- Frontend: Built with React, providing a responsive and interactive user interface.
- Backend: Developed using Express.js, handling API endpoints, business logic, and server-side processing.
- Database: MongoDB stores all event, user, and school data, providing flexible and scalable data management.

The layered architecture ensures a clear separation between presentation, business logic, and data storage, making development and testing more efficient.

---
## 🎯 Application Features

### 1. **Authentication System**
- Email & password registration and login
- Secure password hashing
- JWT-based session management
- Role-based access control (Student / Admin)
- Protected API routes accessible only after login

### 2. **Event Dashboard**
- Overview of upcoming and ongoing events
- Event filtering by date, type, or venue
- Highlighted featured events
- Quick navigation buttons
- Fully responsive UI for web & mobile

### 3. **Event Management**
- Create Events — Title, date, time, description, venue
- Edit Events — Update event information anytime
- Delete Events — Controlled removal of outdated events
- View Event Details — Full information page for participants

### 4. **Student Event Participation**
- Register for events with one click
- View personal event history and status
- Cancel registration before deadline
- Real-time approval/notification updates
- Attendance tracking (admin-managed)

### 5. **System Settings**
- User profile management (name & student details)
- Admin tools for access & control
- Logout and session security features
- Dark / light mode (Optional enhancement)

### 6. **Database & Storage**

- MongoDB collection support:
  Users
  Events
  Registrations
- Data validation using Mongoose
- Secure reference linking between collections

---

## 📝 License

This project is licensed under the **MIT License**, so you can use, modify, and distribute it freely.

## 🙏Acknowledgments

- **OpenAI** for inspiration and AI guidance
- **GitHub** for hosting and version control
- **Stack** Overflow for community support
- **Unsplash** for free images used in demos

## 🗺️ Roadmap
- Improve performance and optimize loading times
- Mobile-friendly UI
- Dark mode support
- More integrations with popular tools

  
## Contributors
* **ALUKO OLAMIDE PRINCESS, 22/0189**
* **ALABI OLADIPO ORISTEETEMI, 22/0025**
* **ALABI EYITAYO ENEKOLE, 22/0243**
* **AKINRINADE EMINIOLUWA AKINJIDE, 22/0245**
* **AKUBUIRO UCHENNA IKECHUKWU, 22/0222**
* **ANABRABA DEIN EMMANUEL, 22/0209**

## Support

If you find this project useful, a ⭐ star on GitHub would be greatly appreciated!

---
