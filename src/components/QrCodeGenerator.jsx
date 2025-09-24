import React, { useState } from "react";
import axios from "axios";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) return alert("Enter a URL or text to generate QR Code");

    setLoading(true);
    setQrUrl(null);

    try {
      const formData = new URLSearchParams();
      formData.append("text", text);

      const response = await axios.post(
        "https://api.tooconvert.in/generate-qr/",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "image/png" }));
      setQrUrl(url);
    } catch (err) {
      console.error("QR Generation Error:", err);
      alert("Error generating QR code!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const styles = {
    container: { padding: 20, fontFamily: "Arial, sans-serif", color: "#f5f5f5", textAlign: "center" },
    input: { width: "100%", padding: 12, margin: "10px 0 20px 0", borderRadius: 5, border: "1px solid #000", backgroundColor: "#2b2b2b", color: "#f5f5f5" },
    button: { padding: "12px 24px", border: "none", borderRadius: 5, backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer", fontWeight: "bold", margin: "10px 5px" },
    heading: { marginBottom: 15 },
    qrPreview: { marginTop: 20, maxWidth: 300, maxHeight: 300 },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>QR Code Generator</h2>
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
        {qrUrl && <button onClick={handleDownload} style={styles.button}>Download QR</button>}
      </div>

      {qrUrl && <img src={qrUrl} alt="QR Code" style={styles.qrPreview} />}
    </div>
  );
}
