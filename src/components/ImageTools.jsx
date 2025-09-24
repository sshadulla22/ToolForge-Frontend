import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function ImageTools() {
  const [file, setFile] = useState(null);
  const [subtool, setSubtool] = useState("Compress Image");
  const [targetSize, setTargetSize] = useState(100);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [format, setFormat] = useState("JPEG");
  const [watermarkText, setWatermarkText] = useState("Sample Stock Image");
  const [opacity, setOpacity] = useState(100);
  const [fontSize, setFontSize] = useState(30);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return alert("Please upload an image!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    let url = "";
    switch (subtool) {
      case "Compress Image":
        formData.append("target_size", targetSize);
        url = "https://api.tooconvert.in/compress-image/";
        break;
      case "Resize Image":
        formData.append("width", width);
        formData.append("height", height);
        url = "https://api.tooconvert.in/resize-image/";
        break;
      case "Convert Format":
        formData.append("format", format);
        url = "https://api.tooconvert.in/convert-format/";
        break;
      case "Add Watermark":
        formData.append("text", watermarkText);
        formData.append("opacity", opacity);
        formData.append("font_size", fontSize);
        url = "https://api.tooconvert.in/watermark/";
        break;
      default:
        return alert("Invalid tool selected!");
    }

    try {
      const res = await axios.post(url, formData, { responseType: "blob" });

      // Create downloadable blob
      const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
      setProcessedImage(blobUrl);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while processing the image!");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      border: "1px solid #ffffff33",
      borderRadius: "12px",
      padding: "2rem",
      backgroundColor: "#1a1a1a",
      marginBottom: "1.5rem",
      color: "#f5f5f5",
    },
    select: {
      width: "100%",
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
      border: "1px solid #ffffffff",
      backgroundColor: "#1a1818ff",
      color: "#f5f5f5",
    },
    input: {
      width: "100%",
      padding: 12,
      margin: "5px 0 15px 0",
      borderRadius: 6,
      border: "1px solid #ffffff33",
      backgroundColor: "#000000ff",
      color: "#f5f5f5",
      fontSize: 16,
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: 8,
      backgroundColor: "#2563eb",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 600,
      width: "100%",
      marginTop: "0.5rem",
    },
    dropInput: {
      width: "100%",
      margin: "5px 0 15px 0",
      border: "2px dashed #404040",
      borderRadius: "12px",
      padding: "3rem 2rem",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: "#000000ff",
      marginBottom: "1.5rem",
      boxSizing: "border-box",
    },
    imagePreview: {
      maxWidth: "100%",
      maxHeight: "300px",
      display: "block",
      margin: "1rem auto",
      borderRadius: "8px",
    },
    infoText: {
      textAlign: "center",
      marginBottom: "1rem",
    },
  };

  const fileSizeKB = file ? (file.size / 1024).toFixed(2) : 0;

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem" }}>
        Image Tools
      </h2>

      <select style={styles.select} value={subtool} onChange={(e) => setSubtool(e.target.value)}>
        <option>Compress Image</option>
        <option>Resize Image</option>
        <option>Convert Format</option>
        <option>Add Watermark</option>
      </select>

      <div style={styles.dropInput} onClick={() => document.getElementById("fileInput").click()}>
        <FontAwesomeIcon icon={faUpload} size="2x" color="#3b82f6" />
        <p>Drop your image here or <span style={{ color: "#3b82f6", fontWeight: "bold" }}>Upload</span></p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {file && (
        <div style={styles.infoText}>
          <strong>Uploaded:</strong> {file.name} ({fileSizeKB} KB)
          <img src={URL.createObjectURL(file)} alt="Uploaded" style={styles.imagePreview} />
        </div>
      )}

      {subtool === "Compress Image" && (
        <div>
          <label>Target size (KB):</label>
          <input type="number" style={styles.input} value={targetSize} onChange={(e) => setTargetSize(e.target.value)} />
        </div>
      )}

      {subtool === "Resize Image" && (
        <div>
          <label>Width (px):</label>
          <input type="number" style={styles.input} value={width} onChange={(e) => setWidth(e.target.value)} />
          <label>Height (px):</label>
          <input type="number" style={styles.input} value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      )}

      {subtool === "Convert Format" && (
        <div>
          <label>Format:</label>
          <select style={styles.select} value={format} onChange={(e) => setFormat(e.target.value)}>
            <option>JPEG</option>
            <option>PNG</option>
            <option>WEBP</option>
            <option>TIFF</option>
          </select>
        </div>
      )}

      {subtool === "Add Watermark" && (
        <div>
          <label>Text:</label>
          <input type="text" style={styles.input} value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
          <label>Opacity (%):</label>
          <input type="number" style={styles.input} value={opacity} onChange={(e) => setOpacity(e.target.value)} />
          <label>Font Size (px):</label>
          <input type="number" style={styles.input} value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
        </div>
      )}

      <button style={styles.button} onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {processedImage && (
        <div style={styles.infoText}>
          <strong>Processed Image:</strong>
          <img src={processedImage} alt="Processed" style={styles.imagePreview} />
          <a href={processedImage} download="processed_image.jpg" style={{ color: "#3b82f6", fontWeight: "bold" }}>Download</a>
        </div>
      )}
    </div>
  );
}

export default ImageTools;
