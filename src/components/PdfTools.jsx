import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import PdfToolss from "../components/PDFCompressor"

export default function PdfTools() {
  const [files, setFiles] = useState([]);
  const [splitFile, setSplitFile] = useState(null);
  const [splitPages, setSplitPages] = useState(1);
  const [extractFile, setExtractFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  // Merge PDFs
  const handleMerge = async () => {
    if (files.length < 2) return alert("Upload at least 2 PDFs");
    const formData = new FormData();
    files.forEach(f => formData.append("files", f));
    const response = await axios.post("http://127.0.0.1:8000/merge-pdf/", formData, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "merged.pdf");
    document.body.appendChild(link);
    link.click();
  };

  // Split PDF
  const handleSplit = async () => {
    if (!splitFile) return alert("Upload a PDF to split");
    const formData = new FormData();
    formData.append("file", splitFile);
    formData.append("pages_per_split", splitPages);
    const response = await axios.post("http://127.0.0.1:8000/split-pdf/", formData, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "split_pdfs.zip");
    document.body.appendChild(link);
    link.click();
  };

  // Extract Text
  const handleExtract = async () => {
    if (!extractFile) return alert("Upload a PDF to extract text");
    const formData = new FormData();
    formData.append("file", extractFile);
    const response = await axios.post("http://127.0.0.1:8000/extract-text/", formData);
    setExtractedText(response.data.text);
  };

  // Styles
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
  };

  const cardStyle = {
    border: "1px solid #ffffffff",
    borderRadius: "12px",
    padding: "1rem 1rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
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
    <div style={{ padding: "1rem", minHeight: "100vh"}}>
       <PdfToolss/>
      {/* <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>PDF Tools</h1> */}
      <div style={containerStyle}>
       {/* Merge PDFs */}
<div style={cardStyle}>
  <h2 style={{
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px"
  }}>
    Merge PDFs
  </h2>

  <div style={dropStyle}>
    <label style={{ cursor: "pointer", display: "block" }}>
      <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
      <p style={{ marginTop: "0.5rem" }}>
        Drop at least 2 PDFs or <span style={{ fontWeight: "bold",color:"#3b82f6" }}>Upload</span>
      </p>
      <input
        type="file"
        style={{ display: "none" }}
        multiple
        accept="application/pdf"
        onChange={(e) => setFiles([...e.target.files])}
      />
    </label>
  </div>

  {/* Show uploaded files */}
  {files.length > 0 && (
    <div style={{ marginBottom: "1rem", color: "#f3f4f6" }}>
      <strong>Uploaded Files:</strong>
      <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}

  <button onClick={handleMerge} style={buttonStyle}>Merge PDFs</button>
</div>


       {/* Split PDF */}
<div style={cardStyle}>
  <h2 style={{
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px"
  }}>
    SPLIT PDFS
  </h2>

  <div style={dropStyle}>
    <label style={{ cursor: "pointer", display: "block" }}>
      <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
      <p style={{ marginTop: "0.5rem" }}>
        Drop a PDF or <span style={{ fontWeight: "bold", color:"#3b82f6"}}>Upload</span>
      </p>
      <input
        type="file"
        style={{ display: "none" }}
        accept="application/pdf"
        onChange={(e) => setSplitFile(e.target.files[0])}
      />
    </label>
  </div>

  {/* Show uploaded file */}
  {splitFile && (
    <div style={{ marginBottom: "1rem", color: "#f3f4f6" }}>
      <strong>Uploaded File:</strong> {splitFile.name}
    </div>
  )}

  <input
    type="number"
    min={1}
    value={splitPages}
    onChange={(e) => setSplitPages(Number(e.target.value))}
    style={inputStyle}
    placeholder="Pages per split"
  />
  <button onClick={handleSplit} style={buttonStyle}>Split PDF</button>
</div>


        {/* Extract Text */}
        <div style={cardStyle}>
           <h2 style={{
  textAlign: "center",
  fontSize: "1.2rem",
  fontWeight: "700",
  marginBottom: "1rem",
  textTransform: "uppercase",
  letterSpacing: "1px"
}}>
  EXTRACT TEXT
</h2>
          <div style={dropStyle}>
            <label style={{ cursor: "pointer", display: "block" }}>
              <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
              <p style={{ marginTop: "0.5rem" }}>Drop a PDF or <span style={{color:"#3b82f6", fontWeight: "bold" }}>Upload</span></p>
              <input type="file" style={{ display: "none" }} accept="application/pdf" onChange={(e) => setExtractFile(e.target.files[0])} />
            </label>
          </div>
            {/* Show uploaded file */}
  {extractFile && (
    <div style={{ marginBottom: "1rem", color: "#f3f4f6" }}>
      <strong>Uploaded File:</strong> {extractFile.name}
    </div>
  )}
          <button onClick={handleExtract} style={buttonStyle}>Extract Text</button>
          {extractedText && <textarea value={extractedText} readOnly rows={10} style={inputStyle} placeholder="Extracted text will appear here..." />}
        </div>
      </div>

   

    </div>
  );
}
