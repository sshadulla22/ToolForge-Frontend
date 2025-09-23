import React, { useState } from "react";
import PdfToDocx from "./components/PdfToDocx";
import PdfTools from "./components/PdfTools";
import ImageTools from "./components/ImageTools";
import TextJsonTools from "./components/TextJsonTools";
import Base64Tools from "./components/Base64Tools";
import QrCode from "./components/QrCodeGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faImage, faCode, faQrcode, faFile,faLaptopCode,faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Navbar from "./components/navbar";
import logo from "../src/Group 16.png"
import CodeCompiler from "./components/CodeCompiler"
import UtilityTools from "./components/UtilityTools"
import TopBar from "../src/components/TopBar"


function App() {
  const [tool, setTool] = useState("PDF→DOCX/Conversion");
  const [showSplash, setShowSplash] = useState(true);

  const handleContinue = () => {
    setShowSplash(false);
  };

  // --- Splash Screen ---
  if (showSplash) {
    return (
      <div className="splash-screen">
        <img src={logo} alt="Khandan Logo" className="splash-logo" />
        <h1 style={styles.title}>Hi Welcome to</h1>
        <h1 style={styles.title}>TooConvert</h1>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    );
  }

  // --- Main App (TooConvert) ---
  const tools = [
    { name: "PDF→DOCX/Conversion", icon: <FontAwesomeIcon icon={faFile} /> },
    { name: "PDF Tools", icon: <FontAwesomeIcon icon={faFilePdf} /> },
    { name: "Image Tools", icon: <FontAwesomeIcon icon={faImage} /> },
    { name: "Text & JSON Tools", icon: <FontAwesomeIcon icon={faCode} /> },
    { name: "Base64 Encoder/Decoder", icon: <FontAwesomeIcon icon={faCode} /> },
    { name: "QR Code Generator", icon: <FontAwesomeIcon icon={faQrcode} /> },
    { name: "Code Compiler", icon: <FontAwesomeIcon icon={faLaptopCode} /> }, ///Under Deveploment
    { name: "Utility Tools", icon: <FontAwesomeIcon icon={faScrewdriverWrench} />}, ///Under Deveploment
  ];

  return (
    <div>
      <TopBar/>
    <div style={styles.container}>
   
      <div style={styles.header}>
        <h1 style={styles.title}>TooConvert</h1>
        <p style={styles.subtitle}>All-in-one productivity toolkit</p>
      </div>
      <div style={styles.toolSelector}>
        {tools.map((t) => (
          <button
            key={t.name}
            style={{
              ...styles.toolButton,
              ...(tool === t.name ? styles.activeButton : {}),
            }}
            onClick={() => setTool(t.name)}
            onMouseEnter={(e) => {
              if (tool !== t.name) {
                e.target.style.backgroundColor = styles.hoverButton.backgroundColor;
                e.target.style.transform = styles.hoverButton.transform;
              }
            }}
            onMouseLeave={(e) => {
              if (tool !== t.name) {
                e.target.style.backgroundColor = styles.toolButton.backgroundColor;
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            
            <span style={styles.toolIcon}>{t.icon}</span>
            <span style={styles.toolName}>{t.name}</span>
          </button>
        ))}
        
      </div>

      <div style={styles.toolContainer}>
        <div style={styles.toolContent}>
          {tool === "PDF→DOCX/Conversion" && <PdfToDocx />}
          {tool === "PDF Tools" && <PdfTools />}
          {tool === "Image Tools" && <ImageTools />}
          {tool === "Text & JSON Tools" && <TextJsonTools />}
          {tool === "Base64 Encoder/Decoder" && <Base64Tools />}
          {tool === "QR Code Generator" && <QrCode />}
          {tool === "Code Compiler" && <CodeCompiler />}
          {tool === "Utility Tools" && <UtilityTools />}

        </div>
        
      </div>
      <Navbar />
    </div>
    </div>
    
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    color: "#ffffff",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#888888",
    margin: 0,
    fontWeight: "400",
  },
  toolSelector: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    maxWidth: "800px",
    margin: "0 auto 3rem auto",
  },
  toolButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#cccccc",
  },
  activeButton: {
    backgroundColor: "#2563eb",
    borderColor: "#3b82f6",
    color: "#ffffff",
    transform: "translateY(-2px)",
    
  },
  hoverButton: {
    backgroundColor: "#262626",
    transform: "translateY(-1px)",
  },
  toolIcon: {
    fontSize: "1.2rem",
  },
  toolName: {
    flex: 1,
  },
  toolContainer: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  toolContent: {
    backgroundColor: "#161616",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    padding: "2rem",
    minHeight: "400px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  },
};

export default App;
