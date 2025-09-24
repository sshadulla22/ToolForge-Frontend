import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import PdfToolss from "../components/PDFCompressor";

export default function PdfTools() {
  const [files, setFiles] = useState([]);
  const [splitFile, setSplitFile] = useState(null);
  const [splitPages, setSplitPages] = useState(1);
  const [extractFile, setExtractFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loadingMerge, setLoadingMerge] = useState(false);
  const [loadingSplit, setLoadingSplit] = useState(false);
  const [loadingExtract, setLoadingExtract] = useState(false);

  const handleDownloadBlob = (data, filename) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Merge PDFs
  const handleMerge = async () => {
    if (files.length < 2) return alert("Upload at least 2 PDFs");
    setLoadingMerge(true);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append("files", f));
      const response = await axios.post(
        "https://api.tooconvert.in/merge-pdf/",
        formData,
        { responseType: "blob" }
      );
      handleDownloadBlob(response.data, "merged.pdf");
    } catch (err) {
      console.error(err);
      alert("Error merging PDFs!");
    } finally {
      setLoadingMerge(false);
    }
  };

  // Split PDF
  const handleSplit = async () => {
    if (!splitFile) return alert("Upload a PDF to split");
    setLoadingSplit(true);
    try {
      const formData = new FormData();
      formData.append("file", splitFile);
      formData.append("pages_per_split", splitPages);
      const response = await axios.post(
        "https://api.tooconvert.in/split-pdf/",
        formData,
        { responseType: "blob" }
      );
      handleDownloadBlob(response.data, "split_pdfs.zip");
    } catch (err) {
      console.error(err);
      alert("Error splitting PDF!");
    } finally {
      setLoadingSplit(false);
    }
  };

  // Extract Text
  const handleExtract = async () => {
    if (!extractFile) return alert("Upload a PDF to extract text");
    setLoadingExtract(true);
    try {
      const formData = new FormData();
      formData.append("file", extractFile);
      const response = await axios.post(
        "https://api.tooconvert.in/extract-text/",
        formData
      );
      setExtractedText(response.data.text);
    } catch (err) {
      console.error(err);
      alert("Error extracting text!");
    } finally {
      setLoadingExtract(false);
    }
  };

  // Styles
  const containerStyle = { padding: "1rem", minHeight: "100vh" };
  const cardStyle = {
    border: "1px solid #ffffff33",
    borderRadius: "12px",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#1a1a1a",
    marginBottom: "1.5rem",
  };
  const dropStyle = {
    width: "100%",
    padding: "2rem",
    border: "2px dashed #4b5563",
    borderRadius: "12px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#000000ff",
    marginBottom: "1rem",
  };
  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
    marginTop: "0.5rem",
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    marginBottom: "1rem",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <PdfToolss />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
        {/* Merge PDFs */}
        <div style={cardStyle}>
          <h2>Merge PDFs</h2>
          <div style={dropStyle}>
            <label style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
              <p>Drop at least 2 PDFs or <span style={{ fontWeight: "bold", color: "#3b82f6" }}>Upload</span></p>
              <input
                type="file"
                style={{ display: "none" }}
                multiple
                accept="application/pdf"
                onChange={e => setFiles([...e.target.files])}
              />
            </label>
          </div>
          {files.length > 0 && (
            <ul style={{ color: "#f3f4f6" }}>{files.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
          )}
          <button onClick={handleMerge} style={buttonStyle} disabled={loadingMerge}>
            {loadingMerge ? "Merging..." : "Merge PDFs"}
          </button>
        </div>

        {/* Split PDF */}
        <div style={cardStyle}>
          <h2>Split PDF</h2>
          <div style={dropStyle}>
            <label style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
              <p>Drop a PDF or <span style={{ fontWeight: "bold", color: "#3b82f6" }}>Upload</span></p>
              <input
                type="file"
                style={{ display: "none" }}
                accept="application/pdf"
                onChange={e => setSplitFile(e.target.files[0])}
              />
            </label>
          </div>
          {splitFile && <div style={{ color: "#f3f4f6" }}>{splitFile.name}</div>}
          <input
            type="number"
            min={1}
            value={splitPages}
            onChange={e => setSplitPages(Number(e.target.value))}
            style={inputStyle}
            placeholder="Pages per split"
          />
          <button onClick={handleSplit} style={buttonStyle} disabled={loadingSplit}>
            {loadingSplit ? "Splitting..." : "Split PDF"}
          </button>
        </div>

        {/* Extract Text */}
        <div style={cardStyle}>
          <h2>Extract Text</h2>
          <div style={dropStyle}>
            <label style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
              <p>Drop a PDF or <span style={{ fontWeight: "bold", color: "#3b82f6" }}>Upload</span></p>
              <input
                type="file"
                style={{ display: "none" }}
                accept="application/pdf"
                onChange={e => setExtractFile(e.target.files[0])}
              />
            </label>
          </div>
          {extractFile && <div style={{ color: "#f3f4f6" }}>{extractFile.name}</div>}
          <button onClick={handleExtract} style={buttonStyle} disabled={loadingExtract}>
            {loadingExtract ? "Extracting..." : "Extract Text"}
          </button>
          {extractedText && <textarea value={extractedText} readOnly rows={10} style={inputStyle} placeholder="Extracted text will appear here..." />}
        </div>
      </div>
    </div>
  );
}
