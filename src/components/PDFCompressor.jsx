import React, { useRef, useState } from "react";
import axios from "axios";
import "./PDFCompressor.css"; // Import the CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function PDFCompressor() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("medium");

  const handleFileSelect = () => {
    const file = fileInputRef.current.files[0];
    if (file) setFileName(file.name);
  };

  const handleCompress = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return alert("Please select a PDF first");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("level", level);

      const response = await axios.post(
        "https://api.tooconvert.in/compress-pdf/",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `compressed_${file.name}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Compression failed:", err);
      alert("PDF compression failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compressor-container">
<h2 style={{
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "White",
  }}>
    PDF Compressor
  </h2>
      <div className="file-input-wrapper" onClick={() => fileInputRef.current.click()}>
        <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
         <p style={{ marginTop: "0.5rem" }}>
        Drop a PDF or <span style={{ fontWeight: "bold",color:"#3b82f6" }}>Upload</span>
      </p>
        <input
        
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={handleFileSelect}
        />
        <p>{fileName ? `Selected: ${fileName}` : ""}</p>
      </div>

      <div className="level-select">
        <label>Compression Level:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="high">High Compression</option>
          <option value="medium">Medium Compression</option>
          <option value="low">Low Compression</option>
        </select>
      </div>

      <button onClick={handleCompress} disabled={loading}>
        {loading ? "Compressing..." : "Compress PDF"}
      </button>
    </div>
  );
}
