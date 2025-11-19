# 🎓 School Event Management System

A digital platform designed to streamline the management of school events, student participation, and administrative oversight. This system replaces manual event registration processes with a secure, fast, and trackable digital workflow.

The platform consists of:

- A **frontend built with HTML & CSS**
- A **robust Node.js + Express backend API**
- A **MongoDB database for storing users, events, approvals, and attendance data**
---
## Features
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

## Tech Stack
| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT) |
| **Environment Management** | dotenv |
| **Development Tools** | Nodemon, Git & GitHub |

## 📂 Project Structure
\---foss-project-night-indigo
/public

/school-event-backend
  /middleware
  /models
  /routes
  /Scripts
  server.js
  package.json
  package-lock.json
  nodemon.json
  .env

/src
  /assets
  /components
  /pages
  /styles
  App.css
  App.jsx
  index.css
  main.jsx

index.html
package.json
package-lock.json
eslint.config.js
.gitignore
README.md

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

## Contributors
* **ALUKO OLAMIDE PRINCESS, 22/0189**
* **ALABI OLADIPO ORISTEETEMI, 22/0025**
* **ALABI EYITAYO ENEKOLE, 22/0243**
* **AKINRINADE EMINIOLUWA AKINJIDE, 22/0245**
* **AKUBUIRO UCHENNA IKECHUKWU, 22/0222**
* **ANABRABA DEIN EMMANUEL, 22/0209**

---

## 📬 Support

For inquiries or improvements, open an issue or submit a pull request.

---
