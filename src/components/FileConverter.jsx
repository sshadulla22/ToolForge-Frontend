import React, { useRef, useState } from "react";

const converters = [
  { title: "PDF → DOCX", apiUrl: "https://api.tooconvert.in/convert/pdf-to-docx", accept: ".pdf", outputExt: ".docx" },
  { title: "DOCX → PDF", apiUrl: "https://api.tooconvert.in/convert/docx-to-pdf", accept: ".docx", outputExt: ".pdf" },
  { title: "PDF → Image", apiUrl: "https://api.tooconvert.in/convert/pdf-to-image", accept: ".pdf", outputExt: ".jpg" },
  { title: "Image → PDF", apiUrl: "https://api.tooconvert.in/convert/image-to-pdf", accept: "image/*", outputExt: ".pdf" },
  { title: "PPT → PDF", apiUrl: "https://api.tooconvert.in/convert/ppt-to-pdf", accept: ".ppt,.pptx", outputExt: ".pdf" },
  { title: "Excel → PDF", apiUrl: "https://api.tooconvert.in/convert/excel-to-pdf", accept: ".xls,.xlsx", outputExt: ".pdf" },
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
    setFileName(file ? file.name : "");
  };

  const handleConvert = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select a file first");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout

      let response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: { 'Accept': '*/*' },
      });

      clearTimeout(timeoutId);

      // Handle redirects (307 / 308)
      if (response.status === 307 || response.status === 308) {
        const redirectUrl = response.headers.get("location");
        if (!redirectUrl) throw new Error("Redirect failed: no location header");
        response = await fetch(redirectUrl, { method: 'POST', body: formData, signal: controller.signal });
      }

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errMsg = '';
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          errMsg = data.detail || JSON.stringify(data);
        } else {
          errMsg = await response.text();
        }
        throw new Error(errMsg || `HTTP ${response.status}`);
      }

      const blob = await response.blob();
      downloadBlob(blob, file.name, outputExt, response.headers.get("content-type"));
    } catch (err) {
      console.error("Conversion failed:", err);
      let msg = "Conversion failed. ";
      if (err.name === 'AbortError') msg += "Request timed out.";
      else msg += err.message;
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const downloadBlob = (data, originalName, outputExt, contentType) => {
    const blob = new Blob([data], { type: contentType || "application/octet-stream" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    const downloadName = outputExt ? originalName.replace(/\.[^.]+$/, outputExt) : originalName;
    link.href = blobUrl;
    link.setAttribute("download", downloadName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div style={{ ...styles.card, cursor: "default" }}>
      <h3>{title}</h3>
      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileSelect}
        style={styles.input}
      />
      {fileName && <p>Selected: {fileName}</p>}
      <button onClick={handleConvert} disabled={loading} style={styles.button}>
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
  },
  card: {
    border: "1px solid #fff",
    background: "#1a1a1a",
    borderRadius: "10px",
    padding: "2rem",
    color: "#fff",
    textAlign: "center",
    flex: "1 1 calc(33.333% - 1rem)",
    maxWidth: "calc(33.333% - 1rem)",
    minWidth: "200px",
    transition: "all 0.3s ease",
  },
  input: {
    width: "100%",
    margin: "5px 0 15px 0",
    border: "2px dashed #404040",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#000000ff",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  },
  backButton: {
    marginTop: "0.5rem",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "8px",
    background: "#555",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
  },
};
