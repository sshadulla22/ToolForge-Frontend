import React, { useRef, useState } from "react";
import axios from "axios";

const converters = [
  { title: "PDF → DOCX", apiUrl: "https://toolforge-backend-1.onrender.com/convert/pdf-to-docx", accept: ".pdf", outputExt: ".docx" },
  { title: "DOCX → PDF", apiUrl: "https://toolforge-backend-1.onrender.com/convert/docx-to-pdf", accept: ".docx", outputExt: ".pdf" },
  { title: "PDF → Image", apiUrl: "https://toolforge-backend-1.onrender.com/convert/pdf-to-image", accept: ".pdf", outputExt: ".jpg" },
  { title: "Image → PDF", apiUrl: "https://toolforge-backend-1.onrender.com/convert/image-to-pdf", accept: "image/*", outputExt: ".pdf" },
  { title: "PPT → PDF", apiUrl: "https://toolforge-backend-1.onrender.com/convert/ppt-to-pdf", accept: ".ppt,.pptx", outputExt: ".pdf" },
  { title: "Excel → PDF", apiUrl: "https://toolforge-backend-1.onrender.com/convert/excel-to-pdf", accept: ".xls,.xlsx", outputExt: ".pdf" },
];

export default function FileConverterDashboard() {
  const [activeConverter, setActiveConverter] = useState(null);

  return (
    <div style={styles.dashboard}>
      {activeConverter ? (
        <ConverterCard {...activeConverter} goBack={() => setActiveConverter(null)} />
      ) : (
        converters.map(conv => (
          <div key={conv.title} style={styles.card} onClick={() => setActiveConverter(conv)}>
            <h3>{conv.title}</h3>
            <p>Click to upload & convert</p>
          </div>
        ))
      )}
    </div>
  );
}

function ConverterCard({ title, apiUrl, accept, outputExt, goBack }) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");

  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setFileName(file.name);
      setError("");
      
      // Basic file validation
      const maxSize = 50 * 1024 * 1024; // 50MB limit
      if (file.size > maxSize) {
        setError("File too large. Maximum size is 50MB.");
        return;
      }
    }
  };

  const handleConvert = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select a file first");
    
    if (error) return;

    setLoading(true);
    setError("");
    setProgress("Uploading file...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      setProgress("Converting file...");

      const response = await axios.post(apiUrl, formData, {
        responseType: "blob",
        timeout: 120000, // 2 minute timeout
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(`Uploading... ${percentCompleted}%`);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setProgress("Processing download...");

      // Handle server redirect (307/308)
      if (response.status === 307 || response.status === 308) {
        const redirectedUrl = response.headers.location;
        if (!redirectedUrl) throw new Error("Redirect failed, no location header");

        const redirectedResponse = await axios.post(redirectedUrl, formData, {
          responseType: "blob",
          timeout: 120000,
        });

        downloadBlob(redirectedResponse.data, file.name, outputExt, redirectedResponse.headers["content-type"]);
      } else {
        downloadBlob(response.data, file.name, outputExt, response.headers["content-type"]);
      }
      
      setProgress("Conversion completed!");
      setTimeout(() => setProgress(""), 3000);
      
    } catch (err) {
      console.error("Conversion failed:", err);
      
      let errorMessage = "Conversion failed. ";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage += "Request timed out. The server might be busy.";
      } else if (err.response) {
        // Server responded with error status
        if (err.response.status === 413) {
          errorMessage += "File too large for server.";
        } else if (err.response.status >= 500) {
          errorMessage += "Server error. Please try again later.";
        } else if (err.response.status === 400) {
          errorMessage += "Invalid file format or corrupted file.";
        } else {
          errorMessage += `Server error (${err.response.status}).`;
        }
      } else if (err.request) {
        errorMessage += "Network error. Check your connection.";
      } else {
        errorMessage += err.message || "Unknown error occurred.";
      }
      
      setError(errorMessage);
      setProgress("");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to download a blob
  const downloadBlob = (data, originalName, outputExt, contentType) => {
    const blob = new Blob([data], { type: contentType || "application/octet-stream" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    const downloadName = outputExt ? originalName.replace(/\.[^.]+$/, outputExt) : originalName;
    link.setAttribute("download", downloadName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <input 
        type="file" 
        ref={fileInputRef} 
        accept={accept} 
        onChange={handleFileSelect} 
        style={styles.input} 
      />
      {fileName && <p style={styles.fileName}>Selected: {fileName}</p>}
      {progress && <p style={styles.progress}>{progress}</p>}
      {error && <p style={styles.error}>{error}</p>}
      <button 
        onClick={handleConvert} 
        disabled={loading || !fileName || !!error} 
        style={{
          ...styles.button,
          opacity: (loading || !fileName || !!error) ? 0.6 : 1,
          cursor: (loading || !fileName || !!error) ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? "Processing..." : "Convert"}
      </button>
      <button onClick={goBack} style={styles.backButton}>Back</button>
    </div>
  );
}

const styles = {
  dashboard: { 
    display: "flex", 
    flexWrap: "wrap", 
    gap: "1rem", 
    padding: "3rem 2rem", 
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#0f0f0f"
  },
  card: { 
    border: "1px solid #333", 
    background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)", 
    borderRadius: "15px", 
    padding: "2rem", 
    color: "#fff", 
    textAlign: "center", 
    flex: "1 1 calc(33.333% - 1rem)", 
    maxWidth: "calc(33.333% - 1rem)", 
    cursor: "pointer", 
    minWidth: "280px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  input: { 
    width: "100%", 
    margin: "5px 0 15px 0", 
    border: "2px dashed #404040", 
    borderRadius: "12px", 
    padding: "2rem", 
    textAlign: "center", 
    cursor: "pointer", 
    backgroundColor: "#111", 
    marginBottom: "1.5rem", 
    boxSizing: "border-box",
    color: "#ccc",
    transition: "border-color 0.2s ease"
  },
  button: { 
    marginTop: "1rem", 
    padding: "0.8rem 1.5rem", 
    border: "none", 
    borderRadius: "8px", 
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
    color: "#fff", 
    cursor: "pointer", 
    fontWeight: "600", 
    fontSize: "1rem", 
    transition: "all 0.3s ease", 
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
  },
  backButton: { 
    marginTop: "0.5rem", 
    padding: "0.6rem 1.2rem", 
    border: "none", 
    borderRadius: "8px", 
    background: "linear-gradient(135deg, #555 0%, #666 100%)", 
    color: "#fff", 
    cursor: "pointer", 
    fontWeight: "600", 
    fontSize: "0.95rem", 
    transition: "all 0.3s ease", 
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
  },
  fileName: {
    color: "#4ade80",
    fontSize: "0.9rem",
    marginBottom: "0.5rem"
  },
  progress: {
    color: "#60a5fa",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginBottom: "0.5rem"
  },
  error: {
    color: "#ef4444",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: "6px"
  }
};
