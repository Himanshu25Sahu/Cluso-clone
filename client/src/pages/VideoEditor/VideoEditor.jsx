"use client"

import { useState, useEffect } from "react"
import "./VideoEditor.css"

function VideoEditor({ projectId, onNavigate }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")

  // Fetch project when component loads or projectId changes
  useEffect(() => {
    if (!projectId) {
      setError("No project ID provided")
      setLoading(false)
      return
    }

    const fetchProject = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`, {
          credentials: "include",
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || "Failed to load project")
        }

        setProject(data.project || data) // Adjust based on your API response structure
      } catch (err) {
        setError(err.message)
        console.error("Error loading project:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  // Generate insights / script
  const handleGenerateSpeech = async () => {
    if (!projectId) return

    setGenerating(true)
    setError("")

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}/insights`, {
        method: "GET", // or POST if your API requires it
        credentials: "include",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate insights")
      }

      // Update project with new script/status
      setProject(data.project || data)
      alert("Script generated successfully!")
    } catch (err) {
      setError("Generation failed: " + err.message)
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return <div className="video-editor">Loading project...</div>
  }

  if (error && !project) {
    return <div className="video-editor">Error: {error}</div>
  }

  if (!project) {
    return <div className="video-editor">Project not found</div>
  }

  return (
    <div className="video-editor">
      <header className="editor-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => onNavigate("dashboard")}>
            ←
          </button>
          <div className="project-info">
            <svg viewBox="0 0 24 24" fill="none" className="logo-small">
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="project-name">{project.title || "Untitled"}</span>
          </div>
        </div>

        <div className="header-center">
          <button className="tab-btn active">Video</button>
          <button className="tab-btn">Article</button>
        </div>

        <div className="header-right">
          <button className="header-btn">Translate</button>
          <button className="header-btn primary">Share</button>
        </div>
      </header>

      <div className="editor-layout">
        <aside className="editor-sidebar">
          <div className="sidebar-content">
            <div className="script-panel">
              <div className="panel-header">
                <button
                  className="btn-generate"
                  onClick={handleGenerateSpeech}
                  disabled={generating}
                >
                  {generating ? "Generating..." : "Generate Speech"}
                </button>
                <button className="btn-ai">AI Rewrite</button>
              </div>

              <div className="script-display" style={{ padding: "20px", background: "#111", borderRadius: "8px", minHeight: "300px" }}>
                {project.script ? (
                  <pre style={{ whiteSpace: "pre-wrap", color: "#eee", fontFamily: "inherit" }}>
                    {project.script}
                  </pre>
                ) : (
                  <p style={{ color: "#888", fontStyle: "italic" }}>
                    Click "Generate Speech" to create a script from your uploaded file.
                  </p>
                )}
              </div>

              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>
          </div>
        </aside>

        <main className="editor-main">
          <div className="canvas-container">
            <div className="canvas">
              {project.fileType === "video" ? (
                <video controls style={{ width: "100%", maxHeight: "80vh" }}>
                  <source src={`${import.meta.env.VITE_BACKEND_URL}${project.filePath}`} type={project.mimeType} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={`${import.meta.env.VITE_BACKEND_URL}${project.filePath}`}
                  style={{ width: "100%", height: "80vh", border: "none" }}
                  title="Uploaded Document"
                />
              )}

              {!project.filePath && (
                <div className="canvas-helper">
                  No file uploaded yet. Upload a video or slide deck to begin.
                </div>
              )}
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-track">
              <div className="timeline-clip">
                <span>1</span>
                <span>Slide</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default VideoEditor