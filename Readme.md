# 🎬 Clueso Clone — Video + Docs Studio

> **Assignment Context**
> This project was built as part of the **SDE Internship assignment for Subspace**, where the task was to clone the core functionality and workflows of **Clueso.io**. The goal was to evaluate product understanding, engineering fundamentals, and the ability to deliver a clean, working system with clear documentation.

A professional full-stack clone of **Clueso.io**, built as a job assignment to demonstrate product understanding, system design, and end-to-end execution.

This project recreates Clueso’s core workflows — onboarding, dashboard, content recording/upload, project management, and AI-assisted insights — with a focus on **functionality, clarity, and production-minded architecture**, rather than pixel-perfect UI.

🎥 **Demo Video:** *(link to be added)*
📦 **GitHub Repository:** *https://github.com/Himanshu25Sahu/Cluso-clone*

---

## 🚀 What This Project Demonstrates

* Ability to analyze and reverse-engineer a real-world SaaS product
* End-to-end ownership across frontend, backend, and data flows
* Clean API design, authentication, uploads, and editor experience
* Pragmatic engineering decisions with clearly documented trade-offs

---

## ✨ Core Features

### 🔐 Authentication & Onboarding

* User registration, login, logout, and session validation
* Cookie-based JWT authentication
* Secure cookie handling with environment-aware flags

**Endpoints**

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/logout`
* `GET /auth/me`

---

### 🏠 Landing Page

* Hero section with autoplay demo video
* Clear call-to-action for onboarding

---

### 📊 Dashboard

* Persistent project listing stored in MongoDB
* Create new projects via:

  * Native screen recording
  * Video upload
  * PDF / PPTX upload
* Upload progress indicators and loading states

---

### 🎥 Native Screen Recording

* Implemented using browser-native APIs:

  * `navigator.mediaDevices.getDisplayMedia`
  * `MediaRecorder`
* Generates WebM recordings and uploads them to the backend
* Zero third-party recording dependencies

---

### 📁 File Uploads

* Server-side upload handling using `multer`
* Supported formats:

  * Video (`mp4`, `webm`)
  * Documents (`pdf`, `pptx`)
* Files stored locally and served via Express static middleware
* Project metadata persisted in MongoDB

---

### ✏️ Project Editor

* Fetch project details by ID
* Preview uploaded content:

  * `<video>` playback for videos
  * `<iframe>` preview for PDF / PPTX files
* Script panel for AI-generated insights

---

### 🤖 AI Insights (Mocked)

* Endpoint: `GET /projects/:id/insights`
* Returns generated summaries and suggestions using mocked logic
* Designed as a clean integration point for real AI services

---

### 🧭 Navigation & UX

* Responsive sidebar with navigation and project actions
* Toast-style notifications
* Modal-driven workflows and visual loading feedback

---

## 🧠 Data Model Overview

**Project**

* Owner reference
* File metadata (type, path, mimeType)
* Processing status
* Script / AI-generated text
* Timestamps

The schema is designed to support future extensions such as background processing and collaboration.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Vanilla CSS modules
* Native browser APIs for screen recording

### Backend

* Node.js + Express
* MongoDB with Mongoose
* JWT authentication via HTTP-only cookies
* File handling with `multer`

### Other

* bcrypt (password hashing)
* cors, cookie-parser
* Local disk storage for uploads

---

## 📁 Repository Structure (High Level)

```
client/     → React (Vite) frontend
  ├─ pages/ (Landing, Dashboard, Editor, Auth)
  ├─ components/ (Sidebar, Modals, UI)
  └─ styles/

server/     → Express backend
  ├─ routes/
  ├─ controllers/
  ├─ models/
  └─ uploads/ (static files)

uploads/    → Uploaded media & documents
```

---

## ⚙️ Setup & Run Locally

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or cloud)

---

### Backend Setup

1. Create `.env` in `server/`

```
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
IS_PRODUCTION=false
```

2. Install & run

```bash
cd server
npm install
npm run dev
```

API runs at `http://localhost:5000`

---

### Frontend Setup

1. Create `.env` in `client/`

```
VITE_API_BASE_URL=http://localhost:5000
```

2. Install & run

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🔍 Design Decisions & Trade-offs

* Native screen recording avoids external dependencies and keeps behavior transparent
* Local file storage keeps the demo simple and reproducible
* Cookie-based JWT simplifies session handling in the browser
* AI insights are mocked to demonstrate integration without external APIs

---

## ✅ Implemented vs Mocked

### Implemented

* Authentication flows
* Dashboard and project CRUD
* File uploads (video and documents)
* Native screen recording
* Project editor with preview
* Persistent MongoDB storage

### Mocked / Partial

* AI insights logic
* No background media processing
* No browser extension layer
* Team features, analytics, and SSO are stubbed
* Local storage instead of cloud storage

---

## 🔮 Future Improvements

* Integrate real AI services (LLMs, multimodal pipelines)
* Add background workers for media processing
* Migrate storage to cloud (S3 / Blob) with CDN
* Team collaboration and role-based access
* End-to-end tests and CI pipelines
* Timeline-based video editor and enhanced UX

---

## 📝 Notes for Reviewers

* Start with the **Dashboard** to test screen recording and uploads
* Review `project.controller.js` for upload and AI insight flows
* This submission prioritizes clarity, correctness, and extensibility over production-scale infrastructure

---

## 📌 Final Note

This project focuses on **feature parity, system clarity, and engineering judgment**, mirroring how Clueso functions internally while keeping the scope realistic for an assignment.
