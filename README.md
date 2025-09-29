# Problem Tracker – MERN Dashboard

A full-stack web application to **organize coding problems** from LeetCode, Codeforces, and Maang.in.  
This dashboard pairs with the Chrome Extension to form a seamless problem-management ecosystem.

---

## Table of Contents
- [Highlights](#highlights)
- [Features](#features)
- [How it works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Examples](#api-examples)
- [Email Scheduling (Daily Practice Reminders)](#email-scheduling-daily-practice-reminders)
- [Screenshots / Demo](#screenshots--demo)
- [Contributing](#contributing)
- [License](#license)

---

## Highlights
- Browser + web dashboard integration for bookmarking and tracking problems.
- JWT-based authentication, secure storage, and role-aware endpoints.
- **Daily email reminders**: users select number of problems per day, choose tags, and schedule a daily email at their preferred time (timezone-aware).
- Scalable architecture separating frontend, backend, and worker process for scheduled jobs.

---

## Features
- Authentication: register / login with JWT & bcrypt password hashing.
- Problem management: add, edit, delete problems; set tags, platform, difficulty.
- Powerful search & filtering (platform, difficulty, tags).
- Analytics: progress charts, counts by platform/difficulty.
- Chrome Extension sync: save problems from problem pages into your account.
- **Daily Practice Email**: user configures `numberOfProblems`, `tags`, and `timeOfDay` → backend sends curated email at the scheduled time.

---

## How it works
1. Chrome Extension lets users save/bookmark problems with metadata and (optionally) push them to the backend.
2. Backend stores problems and user preferences in MongoDB.
3. Users set daily practice preferences (how many problems, which tags, and the preferred time).
4. A scheduler (Agenda / worker) reads scheduled tasks and triggers email job(s) using Nodemailer. Email contains a list of problems to practice that day.
5. Email recipients click problem links to go directly to the problem or dashboard.

---

## Tech Stack
- **Frontend:** React.js, Axios, Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JWT, bcrypt  
- **Email & Scheduling:** Nodemailer + Agenda (MongoDB-backed job scheduler) or node-cron for non-persistent jobs  
- **Dev Tools:** Postman, Git, VS Code

---

## Setup & Installation

### 1. Clone repo
```bash
git clone https://github.com/Rushi-web446/MERN.git
cd MERN
2. Backend
bash
Copy code
cd backend
npm install
# copy environment variables
cp .env.example .env
# start server
npm run dev      # e.g. nodemon server.js
# start worker for agenda jobs (in a separate terminal)
node worker.js   # or `npm run worker` if script exists
3. Frontend
bash
Copy code
cd frontend
npm install
npm start
Frontend default: http://localhost:3000

Backend default: http://localhost:5000

