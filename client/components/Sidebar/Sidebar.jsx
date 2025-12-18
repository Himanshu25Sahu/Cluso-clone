"use client"
import "./Sidebar.css"

function Sidebar({ onNavigate, onNewVideo }) {
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
        <a href="#home" className="nav-item active">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Home</span>
        </a>

        <a href="#projects" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>All Projects</span>
        </a>

        <a href="#templates" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Video Templates</span>
        </a>

        <a href="#auto-update" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span>Auto-update</span>
        </a>

        <a href="#team" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Team</span>
        </a>

        <a href="#analytics" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 17V9M13 17v-6M8 17v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Analytics</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <a href="#settings" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span>Settings</span>
        </a>

        <a href="#trash" className="nav-item">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Trash</span>
        </a>

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
          <button className="user-menu">⋮</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
