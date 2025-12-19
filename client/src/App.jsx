"use client"

import { useState,useEffect } from "react"
import "./App.css"
import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import VideoEditor from "./pages/VideoEditor/VideoEditor"

function App() {
  const [currentPage, setCurrentPage] = useState("landing") // e.g., "landing", "dashboard", "editor/abc123"
  const [currentUser, setCurrentUser] = useState(null)

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    // Optional: go to dashboard after login
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentPage("landing")
    // Optional: fetch("/auth/logout", { credentials: "include" })
  }

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
        credentials: "include",
      })
      const data = await res.json()
      if (data.success) {
        setCurrentUser(data.user)
        setCurrentPage("dashboard")
      }
    } catch (err) {
      // not logged in
    }
  }
  checkAuth()
}, [])

  const renderPage = () => {
    // Handle dynamic editor route: "editor/:id"
    if (currentPage.startsWith("editor/")) {
      const projectId = currentPage.split("/")[1] // Extract ID after "editor/"
      return <VideoEditor projectId={projectId} onNavigate={handleNavigate} />
    }

    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />
      case "login":
        return <LoginPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
      case "register":
        return <RegisterPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
      case "dashboard":
        return <Dashboard user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
      default:
        return <LandingPage onNavigate={handleNavigate} />
    }
  }

  return <div className="app">{renderPage()}</div>
}

export default App