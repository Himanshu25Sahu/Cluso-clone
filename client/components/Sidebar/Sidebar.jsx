"use client"
import { useState } from "react"
import "./Sidebar.css"

function Sidebar({ onNavigate, onNewVideo, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleNavClick = (e, feature) => {
    e.preventDefault()
    
    // Only Home goes to dashboard – others are stubbed
    if (feature === "home") {
      onNavigate("dashboard")
      return
    }

    // Show toast-like feedback for unimplemented features
    // You can replace this with a real toast library later
    const toast = document.createElement("div")
    toast.textContent = `${feature} feature coming soon 🚀`
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `
    document.body.appendChild(toast)
    setTimeout(() => document.body.removeChild(toast), 3000)
  }

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      })
      onNavigate("landing");
    } catch (err) {
      // Even if backend fails, clear frontend state
      console.log("Logout request failed, clearing session anyway")
       onNavigate("landing");
    }
    
    onLogout?.() // Clear user and go to landing
    setShowUserMenu(false)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon-sidebar">
            <svg viewBox="0 0 24 24" fill="none">
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
        <button className="collapse-btn">←</button>
      </div>

      <button className="btn-new-video" onClick={onNewVideo}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        New video
      </button>

      <div className="sidebar-search">
        <svg viewBox="0 0 24 24" fill="none" className="search-icon">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input type="text" placeholder="Search..." />
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active" onClick={(e) => handleNavClick(e, "Home")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Home</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "All Projects")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>All Projects</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "Video Templates")}>
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Video Templates</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "Auto-update")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span>Auto-update</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "Team")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Team</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "Analytics")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 17V9M13 17v-6M8 17v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Analytics</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={(e) => handleNavClick(e, "Settings")}>
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Settings</span>
        </button>

        <button className="nav-item" onClick={(e) => handleNavClick(e, "Trash")}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Trash</span>
        </button>

        <div className="trial-banner">
          <svg viewBox="0 0 24 24" fill="none" className="trial-icon">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <div className="trial-content">
            <div className="trial-title">Your trial expires in 4 days</div>
            <button className="trial-upgrade">Upgrade your plan</button>
          </div>
        </div>

        <div className="user-profile">
          <div className="user-avatar">H</div>
          <div className="user-info">
            <div className="user-name">Himanshu's Team</div>
            <div className="user-email">sahuhimanshu2884@...</div>
          </div>
          <button 
            className="user-menu" 
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            ⋮
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar