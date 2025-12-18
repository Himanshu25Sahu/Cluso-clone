"use client"
import { useState } from "react"
import "./LandingPage.css"

function LandingPage({ onNavigate }) {
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000) // Auto-hide after 3s
  }

  const handleStubClick = (e, feature) => {
    e.preventDefault()
    showToast(`${feature} feature is in development 🚀`)
  }

  return (
    <div className="landing-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="landing-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Clueso</span>
          </div>

          <div className="landing-nav-links">
            <a href="#product" className="nav-link" onClick={(e) => handleStubClick(e, "Product")}>
              Product ▼
            </a>
            <a href="#resources" className="nav-link" onClick={(e) => handleStubClick(e, "Resources")}>
              Resources ▼
            </a>
            <a href="#pricing" className="nav-link" onClick={(e) => handleStubClick(e, "Pricing")}>
              Pricing
            </a>
            <a href="#careers" className="nav-link" onClick={(e) => handleStubClick(e, "Careers")}>
              Careers
            </a>
          </div>

          <div className="landing-nav-actions">
            <button className="btn-sign-in" onClick={() => onNavigate("login")}>
              Sign In
            </button>
            <button className="btn-start-trial" onClick={() => onNavigate("register")}>
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Product videos
            <br />
            <span className="hero-subtitle">in minutes with AI</span>
          </h1>
          <p className="hero-description">Transform raw screen recordings into stunning videos & documentation.</p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => onNavigate("register")}>
              Start Free Trial
            </button>
            <button className="btn-hero-secondary" onClick={(e) => handleStubClick(e, "Book a Demo")}>
              Book a Demo
            </button>
          </div>
        </div>

        <div className="hero-demo">
          <img src="/images/image.png" alt="Demo" className="demo-image" />
        </div>
      </section>
    </div>
  )
}

export default LandingPage