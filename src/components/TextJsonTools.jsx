import React, { useState } from "react";
import axios from "axios";

export default function TextJsonTools() {
  const [jsonText, setJsonText] = useState("");
  const [formatted, setFormatted] = useState("");

  const handleFormatJson = async () => {
    if (!jsonText) return alert("Enter JSON text to format");

    try {
      const response = await axios.post(
        "https://toolforge-backend-1.onrender.com/format-json/",
        { json_text: jsonText },
        { headers: { "Content-Type": "application/json" } }
      );

      setFormatted(response.data.formatted);
    } catch (err) {
      console.error(err);
      alert("Server error! Please try again.");
    }
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#f5f5f5",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      margin: "10px 0 20px 0",
      borderRadius: "5px",
      border: "1px solid #ffffffff",
      backgroundColor: "#000000ff",
      color: "#f5f5f5",
      boxSizing: "border-box",
      fontFamily: "monospace",
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "5px",
      backgroundColor:"#3b82f6",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    heading: {
      marginBottom: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: 700, marginBottom: "2rem" }}>
        JSON Formatter
      </h2>

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        rows={10}
        placeholder="Enter your JSON here..."
        style={styles.textarea}
      ></textarea>

      <button onClick={handleFormatJson} style={styles.button}>
        Format JSON
      </button>

      <textarea
        value={formatted}
        readOnly
        rows={10}
        placeholder="Formatted JSON will appear here..."
        style={styles.textarea}
      ></textarea>
    </div>
  );
}
