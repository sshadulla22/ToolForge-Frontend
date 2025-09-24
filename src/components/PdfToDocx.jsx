import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FileConverter from "../components/FileConverter";


export default function PdfToDocx() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file");
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a PDF file first");
      return;
    }

    setIsConverting(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://api.tooconvert.in/pdf-to-docx/",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.name.replace('.pdf', '')}.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={styles.container}>
      {/* <FileConverter
  title="PDF → Word"
  apiUrl="http://127.0.0.1:8000/convert/pdf-to-docx"
  accept=".pdf"
  outputExt=".docx"
/>

<FileConverter
  title="Word → PDF"
  apiUrl="http://127.0.0.1:8000/convert/docx-to-pdf"
  accept=".docx"
  outputExt=".pdf"
/>

<FileConverter
  title="PDF → Image (JPG)"
  apiUrl="http://127.0.0.1:8000/convert/pdf-to-image?format=jpg"
  accept=".pdf"
  outputExt=".zip"
/>
<FileConverter
  title="Excel → PDF"
  apiUrl="http://127.0.0.1:8000/convert/excel-to-pdf"
  accept=".xls,.xlsx"
  outputExt=".pdf"
/>
<FileConverter
  title="PPT → PDF"
  apiUrl="http://127.0.0.1:8000/convert/ppt-to-pdf"
  accept=".ppt,.pptx"
  outputExt=".pdf"
/> */}

<FileConverter/>

      <div style={styles.header}>
        <h2 style={styles.title}>📄 PDF to DOCX Converter</h2>
        <p style={styles.description}>
          Convert your PDF files to editable Word documents instantly
        </p>
      </div>

      <div
        style={{
          ...styles.dropzone,
          ...(dragActive ? styles.dropzoneActive : {}),
          ...(file ? styles.dropzoneWithFile : {})
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          style={styles.hiddenInput}
        />
        
        {!file ? (
          <div style={styles.dropzoneContent}>
            <div style={styles.uploadIcon}><FontAwesomeIcon icon={faUpload} size="0x" color ="#3b82f6" /></div>
            <h3 style={styles.dropzoneTitle}>Drop your PDF here</h3>
            <p style={styles.dropzoneText}>or click to browse files</p>
            <div style={styles.supportedFormats}>
              <span style={styles.formatBadge}>PDF</span>
            </div>
          </div>
        ) : (
          <div style={styles.fileInfo}>
            <div style={styles.fileIcon}>📄</div>
            <div style={styles.fileDetails}>
              <div style={styles.fileName}>{file.name}</div>
              <div style={styles.fileSize}>{formatFileSize(file.size)}</div>
            </div>
            <button
              style={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {file && (
        <div style={styles.actions}>
          <button
            style={{
              ...styles.convertButton,
              ...(isConverting ? styles.convertButtonDisabled : {})
            }}
            onClick={handleConvert}
            disabled={isConverting}
          >
            {isConverting ? (
              <>
                <span style={styles.spinner}></span>
                Converting...
              </>
            ) : (
              <>
                <span style={styles.buttonIcon}>🔄</span>
                Convert to DOCX
              </>
            )}
          </button>
        </div>
      )}

      <div style={styles.features}>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>⚡</span>
          <span>Fast conversion</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>🔒</span>
          <span>Secure processing</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>📱</span>
          <span>No size limits</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "0 0 0.5rem 0",
    color: "#ffffff",
  },
  description: {
    color: "#888888",
    margin: 0,
    fontSize: "0.95rem",
  },
  dropzone: {
    border: "2px dashed #404040",
    borderRadius: "12px",
    padding: "3rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#000000ff",
    marginBottom: "1.5rem",
  },
  dropzoneActive: {
    borderColor: "#2563eb",
    backgroundColor: "#1e3a8a",
    transform: "scale(1.02)",
  },
  dropzoneWithFile: {
    borderColor: "#10b981",
    backgroundColor: "#064e3b",
    padding: "1.5rem",
  },
  hiddenInput: {
    display: "none",
  },
  dropzoneContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  uploadIcon: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  dropzoneTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: 0,
    color: "#ffffff",
  },
  dropzoneText: {
    color: "#888888",
    margin: 0,
    fontSize: "0.9rem",
  },
  supportedFormats: {
    marginTop: "1rem",
  },
  formatBadge: {
    backgroundColor: "#374151",
    color: "#d1d5db",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem",
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
  },
  fileIcon: {
    fontSize: "2rem",
  },
  fileDetails: {
    flex: 1,
    textAlign: "left",
  },
  fileName: {
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: "0.25rem",
  },
  fileSize: {
    fontSize: "0.85rem",
    color: "#888888",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  convertButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "0.875rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
  },
  convertButtonDisabled: {
    backgroundColor: "#374151",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  buttonIcon: {
    fontSize: "1.1rem",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #374151",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "2rem",
    flexWrap: "wrap",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#888888",
    fontSize: "0.9rem",
  },
  featureIcon: {
    fontSize: "1.1rem",
  },
};

// Add CSS animation for spinner
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the CSS animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}
