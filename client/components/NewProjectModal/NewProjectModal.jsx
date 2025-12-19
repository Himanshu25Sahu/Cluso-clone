"use client"
import "./NewProjectModal.css"

function NewProjectModal({ onClose }) {
  // This function creates a hidden file input and triggers it based on the selected option
  const handleOptionClick = (acceptTypes) => {
    // Create a temporary hidden file input
    const input = document.createElement("input")
    input.type = "file"
    input.style.display = "none"

    // Set accept attribute based on option
    if (acceptTypes === "video") {
      input.accept = "video/*"
    } else if (acceptTypes === "slides") {
      input.accept = ".pdf,.ppt,.pptx"
    } else if (acceptTypes === "record") {
      input.accept = "video/*"
      // Optional: try to open camera/screen recorder on mobile
      // input.capture = "environment"
    }
    // For "blank" project, no file needed — just close and go to editor later if you want

    // When user selects a file
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        // We'll let Dashboard handle the actual upload via its handleUpload function
        // So we dispatch a custom event that Dashboard can listen to
        window.dispatchEvent(
          new CustomEvent("modalFileSelected", { detail: { file, acceptTypes } })
        )
      }
      onClose() // Always close modal after selection
    }

    // Trigger the file picker
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">New project</h2>
            <p className="modal-subtitle">Clueso creates stunning videos and step-by-step guides</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="project-option" onClick={() => {
            onClose()
            // Optional: go to blank editor if you implement it later
            // onNavigate("editor") // you can add this back if needed
          }}>
            <div className="option-icon primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="option-content">
              <h3 className="option-title">Start blank project</h3>
              <p className="option-description">Create a new project from scratch.</p>
            </div>
          </div>

          <div className="project-option recommended" onClick={() => handleOptionClick("record")}>
            <div className="option-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                <path
                  d="M4 12l4-4 4 4 4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="option-content">
              <h3 className="option-title">Capture screen-recording</h3>
              <p className="option-description">Record any process on your screen.</p>
            </div>
            <span className="recommended-badge">Recommended</span>
          </div>

          <div className="project-option" onClick={() => handleOptionClick("video")}>
            <div className="option-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="currentColor" />
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="option-content">
              <h3 className="option-title">Upload a video</h3>
              <p className="option-description">Upload a screen-recording from your computer.</p>
            </div>
          </div>

          <div className="project-option" onClick={() => handleOptionClick("slides")}>
            <div className="option-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
                <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="option-content">
              <h3 className="option-title">Upload a slide deck</h3>
              <p className="option-description">Turn any PDF or PPT into a narrated video.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProjectModal