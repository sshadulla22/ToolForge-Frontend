import React, { useRef, useState } from "react";
import axios from "axios";

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

      const response = await axios.post("https://toolforge-backend-1.onrender.com/compress-pdf/", formData, {
        responseType: "blob",
      });

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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>PDF Compressor</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        onChange={handleFileSelect}
        style={{ display: "block", margin: "1rem auto", padding: "1rem", border: "2px dashed #ccc", borderRadius: "10px" }}
      />
      {fileName && <p>Selected: {fileName}</p>}

      <label>
        Compression Level:{" "}
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="high">High Compression</option>
          <option value="medium">Medium Compression</option>
          <option value="low">Low Compression</option>
        </select>
      </label>

      <br />
      <button
        onClick={handleCompress}
        disabled={loading}
        style={{ marginTop: "1rem", padding: "0.8rem 2rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </button>
    </div>
  );
}
