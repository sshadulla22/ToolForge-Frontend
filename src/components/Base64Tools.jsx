import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function Base64Tools() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");

  const handleEncode = async () => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    else formData.append("text", text);

    const response = await axios.post(
      "https://toolforge-backend-1.onrender.com",
      formData
    );
    setEncoded(response.data.base64);
  };

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
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    margin: "10px 0 20px 0",
    borderRadius: 5,
    border: "1px solid #ffffffff",
    backgroundColor: "#000000ff",
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

      {/* Encode Button */}
      <button onClick={handleEncode} style={buttonStyle}>
        Encode
      </button>

      {/* Output */}
      {encoded && (
        <textarea
          value={encoded}
          readOnly
          rows={10}
          style={inputStyle}
        />
      )}
    </div>
  );
}
