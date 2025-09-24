import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Base64Tools() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");

  // ---------- Encode ----------
  const handleEncode = async () => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    try {
      const response = await axios.post(
        "https://api.tooconvert.in/base64-encode/",
        formData
      );
      setEncoded(response.data.base64);
    } catch (error) {
      console.error("Encoding failed:", error);
      alert("Error encoding file/text. Please try again.");
    }
  };

  // ---------- Decode ----------
  const handleDecode = async () => {
    if (!encoded) {
      alert("Please enter a Base64 string first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("encoded", encoded);

      const response = await axios.post(
        "https://api.tooconvert.in/base64-decode/",
        formData,
        { responseType: "blob" }
      );

      // Download decoded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "decoded.bin");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Decoding failed:", error);
      alert("Error decoding Base64. Please try again.");
    }
  };

  // ---------- Styles ----------
  const dropStyle = {
    width: "100%",
    margin: "10px 0 15px 0",
    border: "2px dashed #404040",
    borderRadius: "12px",
    padding: "3rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#1a1a1a",
    color: "#f5f5f5",
    marginBottom: "1.5rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: 5,
    backgroundColor: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "10px",
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    margin: "10px 0 20px 0",
    borderRadius: 5,
    border: "1px solid #ffffff",
    backgroundColor: "#000000",
    color: "#f5f5f5",
    boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#f5f5f5" }}>
      <h2>Base64 Encode / Decode</h2>

      {/* File Upload */}
      <div style={dropStyle}>
        <label style={{ cursor: "pointer", display: "block" }}>
          <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
          <p>
            Drop a file or{" "}
            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>Upload</span>
          </p>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

      {/* Or Text Input */}
      <textarea
        placeholder="Or enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={inputStyle}
        rows={5}
      />

      {/* Buttons */}
      <div>
        <button onClick={handleEncode} style={buttonStyle}>
          Encode
        </button>
        <button onClick={handleDecode} style={buttonStyle}>
          Decode
        </button>
      </div>

      {/* Output */}
      {encoded && (
        <textarea
          value={encoded}
          readOnly
          rows={10}
          style={inputStyle}
          placeholder="Base64 output will appear here..."
        />
      )}
    </div>
  );
}
