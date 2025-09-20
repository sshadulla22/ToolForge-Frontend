import React, { useState } from "react";
import axios from "axios";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState(null); // URL for preview
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text) return alert("Enter a URL or text to generate QR Code");

    setLoading(true);
    setQrUrl(null);

    const formData = new URLSearchParams();
    formData.append("text", text);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-qr/",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setQrUrl(url); // show QR code on page
    } catch (err) {
      console.error(err);
      alert("Error generating QR code!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.setAttribute("download", "qrcode.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#f5f5f5",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0 20px 0",
      borderRadius: "5px",
      border: "1px solid #000000ff",
      backgroundColor: "#2b2b2b",
      color: "#f5f5f5",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#3b82f6",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
      margin: "10px 5px",
    },
    heading: {
      marginBottom: "15px",
    },
    qrPreview: {
      marginTop: "20px",
      maxWidth: "300px",
      maxHeight: "300px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>QR Code Generator</h2>
      <p>Enter a URL or text below to generate a QR code.</p>
      <input
        type="text"
        placeholder="Enter URL or text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <div>
        <button onClick={handleGenerate} style={styles.button} disabled={loading}>
          {loading ? "Generating..." : "Generate QR"}
        </button>
        {qrUrl && (
          <button onClick={handleDownload} style={styles.button}>
            Download QR
          </button>
        )}
      </div>

      {qrUrl && <img src={qrUrl} alt="QR Code" style={styles.qrPreview} />}
    </div>
  );
}
