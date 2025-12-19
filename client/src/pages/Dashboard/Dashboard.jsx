"use client"

import { useState, useEffect } from "react"
import "./Dashboard.css"
import Sidebar from "../../../components/Sidebar/Sidebar"
import NewProjectModal from "../../../components/NewProjectModal/NewProjectModal"

function Dashboard({ onNavigate, onLogout }) {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [recording, setRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)

  // Fetch real projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        const projectList = data.projects || data || []
        setProjects(projectList)
      } catch (err) {
        console.error("Failed to load projects", err)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Listen for file selected from modal
  useEffect(() => {
    const handleFileFromModal = (e) => {
      const { file } = e.detail
      if (file) handleUpload(file)
    }
    window.addEventListener("modalFileSelected", handleFileFromModal)
    return () => window.removeEventListener("modalFileSelected", handleFileFromModal)
  }, [])

  // Real Screen Recording
  const startScreenRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
        audio: true,
      })

      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        const file = new File([blob], `screen-recording-${Date.now()}.webm`, {
          type: "video/webm",
        })
        handleUpload(file)

        // Clean up stream
        stream.getTracks().forEach((track) => track.stop())
      }

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (err) {
      console.error("Screen recording error:", err)
      alert("Screen recording was denied or failed. Please try again.")
    }
  }

  const stopScreenRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop()
      setRecording(false)
      setMediaRecorder(null)
    }
  }

  // File Upload Handler
  const handleUpload = async (file) => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Upload failed")

      setProjects((prev) => [data.project, ...prev])
      onNavigate(`editor/${data.project._id}`)
    } catch (err) {
      alert("Upload failed: " + err.message)
    } finally {
      setUploading(false)
      setShowNewProjectModal(false)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="dashboard">
      <Sidebar
        onNavigate={onNavigate}
        onNewVideo={() => setShowNewProjectModal(true)}
        onLogout={onLogout}
      />

      <main className="dashboard-main">
        <div className="dashboard-hero">
          <div className="hero-decoration">
            <svg viewBox="0 0 200 100" className="decoration-svg">
              <path
                d="M10,50 Q50,20 90,50 T170,50"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#e95cc5", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#7b2cbf", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="dashboard-title">Make something awesome</h1>
          <p className="dashboard-subtitle">Create stunning product videos and docs</p>
        </div>

        <section className="create-section">
          <h2 className="section-title">
            <svg viewBox="0 0 24 24" fill="none" className="section-icon">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Create a new video
          </h2>

          <div className="create-cards">
            {/* Record Screen – REAL SCREEN RECORDING */}
            <div
              className="create-card"
              onClick={recording ? undefined : startScreenRecording}
              style={{ opacity: recording || uploading ? 0.6 : 1, cursor: recording ? "not-allowed" : "pointer" }}
            >
              <div className="card-preview">
                <div className="preview-placeholder">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="10" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Record screen</h3>
                <p className="card-description">Turn a screen-recording into a studio-style video.</p>
              </div>
              {recording && (
                <div className="recording-indicator">● Recording...</div>
              )}
            </div>

            {/* Upload a video */}
            <label className="create-card">
              <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                onChange={(e) => handleUpload(e.target.files[0])}
                disabled={uploading || recording}
              />
              <div className="card-preview">
                <div className="preview-placeholder">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Upload a video</h3>
                <p className="card-description">Upload a screen-recording. Get a studio-style video.</p>
              </div>
            </label>

            {/* Upload a slide deck */}
            <label className="create-card">
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                style={{ display: "none" }}
                onChange={(e) => handleUpload(e.target.files[0])}
                disabled={uploading || recording}
              />
              <div className="card-preview">
                <div className="preview-placeholder">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="4" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">Upload a slide deck</h3>
                <p className="card-description">Turn any PDF or PPT into a narrated video.</p>
              </div>
            </label>
          </div>

          {/* Stop Recording Button */}
          {recording && (
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <button
                onClick={stopScreenRecording}
                style={{
                  padding: "16px 40px",
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255,68,68,0.3)",
                }}
              >
                STOP RECORDING
              </button>
            </div>
          )}

          {/* Upload status */}
          {uploading && (
            <div style={{ textAlign: "center", margin: "20px", color: "#aaa", fontSize: "16px" }}>
              Uploading and processing your file... This may take a moment.
            </div>
          )}
        </section>

        {/* Recent Projects */}
        <section className="recent-section">
          <h2 className="section-title">Recent projects</h2>

          {loading ? (
            <p style={{ textAlign: "center", color: "#999", padding: "40px" }}>
              Loading your projects...
            </p>
          ) : projects.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999", padding: "60px" }}>
              No projects yet. Create one above to get started!
            </p>
          ) : (
            <div className="projects-table">
              <div className="table-header">
                <div className="table-cell">Project</div>
                <div className="table-cell">Creator</div>
                <div className="table-cell">Updated</div>
                <div className="table-cell">Created</div>
              </div>

              {projects.map((project) => (
                <div
                  key={project._id}
                  className="table-row"
                  onClick={() => onNavigate(`editor/${project._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="table-cell">
                    <span className="project-name">
                      {project.title || "Untitled project"}
                    </span>
                  </div>
                  <div className="table-cell">
                    <div className="creator-info">
                      <div className="creator-avatar">H</div>
                      <div>
                        <div className="creator-name">You</div>
                        <div className="creator-email">Personal</div>
                      </div>
                    </div>
                  </div>
                  <div className="table-cell">{formatDate(project.updatedAt)}</div>
                  <div className="table-cell">{formatDate(project.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal onClose={() => setShowNewProjectModal(false)} />
      )}
    </div>
  )
}

export default Dashboard