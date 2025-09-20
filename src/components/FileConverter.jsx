import React, { useRef, useState } from "react";

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

  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    if (file) setFileName(file.name);
  };

  const handleConvert = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select a file first");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        redirect: 'manual', // Handle redirects manually
        signal: controller.signal,
        headers: {
          'Accept': '*/*'
        }
      });

      clearTimeout(timeoutId);

      // Handle server redirect (307/308)
      if (response.status === 307 || response.status === 308) {
        const redirectedUrl = response.headers.get('location');
        if (!redirectedUrl) throw new Error("Redirect failed, no location header");

        const redirectedResponse = await fetch(redirectedUrl, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });

        if (!redirectedResponse.ok) {
          throw new Error(`HTTP ${redirectedResponse.status}: ${redirectedResponse.statusText}`);
        }

        const blob = await redirectedResponse.blob();
        downloadBlob(blob, file.name, outputExt, redirectedResponse.headers.get("content-type"));
      } else if (response.ok) {
        const blob = await response.blob();
        downloadBlob(blob, file.name, outputExt, response.headers.get("content-type"));
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

    } catch (err) {
      console.error("Conversion failed:", err);
      
      let errorMessage = "Conversion failed. ";
      
      if (err.name === 'AbortError') {
        errorMessage += "Request timed out. Please try again.";
      } else if (err.message.includes('413')) {
        errorMessage += "File too large.";
      } else if (err.message.includes('500') || err.message.includes('502') || err.message.includes('503')) {
        errorMessage += "Server error. Please try again later.";
      } else if (err.message.includes('400')) {
        errorMessage += "Invalid file format.";
      } else if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
        errorMessage += "Network error. Check your connection.";
      } else {
        errorMessage += "Please try again.";
      }
      
      alert(errorMessage);
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
      <input type="file" ref={fileInputRef} accept={accept} onChange={handleFileSelect} style={styles.input} />
      {fileName && <p>Selected: {fileName}</p>}
      <button onClick={handleConvert} disabled={loading} style={styles.button}>
        {loading ? "Processing..." : "Convert"}
      </button>
      <button onClick={goBack} style={styles.backButton}>Back</button>
    </div>
  );
}

const styles = {
  dashboard: { display: "flex", flexWrap: "wrap", gap: "1rem", padding: "3rem 2rem", justifyContent: "center" },
  card: { border: "1px solid white", background: "#1a1a1a", borderRadius: "10px", padding: "2rem", color: "#fff", textAlign: "center", flex: "1 1 calc(33.333% - 1rem)", maxWidth: "calc(33.333% - 1rem)", cursor: "pointer", minWidth: "200px" },
  input: { width: "100%", margin: "5px 0 15px 0", border: "2px dashed #404040", borderRadius: "12px", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", backgroundColor: "#000000ff", marginBottom: "1.5rem", boxSizing: "border-box" },
  button: { marginTop: "1rem", padding: "0.8rem 1.5rem", border: "none", borderRadius: "8px", background: "#2563eb", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "1rem", transition: "all 0.3s ease", boxShadow: "0 4px 6px rgba(0,0,0,0.2)" },
  backButton: { marginTop: "0.5rem", padding: "0.6rem 1.2rem", border: "none", borderRadius: "8px", background: "#555", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem", transition: "all 0.3s ease", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }
};
