"use client"

import { useState } from "react"
import "./App.css"
import LandingPage from "./pages/LandingPage/LandingPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Dashboard from "./pages/Dashboard/Dashboard"

function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [currentUser, setCurrentUser] = useState(null)

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentPage("landing")
    // Optional: call /auth/logout if needed
  }

  const renderPage = () => {
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