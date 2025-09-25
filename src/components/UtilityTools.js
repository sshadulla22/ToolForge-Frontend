import React, { useState } from "react";
import "../components/UtilityTools.css";

const API_BASE = "http://127.0.0.1:8000";

function UtilityTools() {
  const [selectedTool, setSelectedTool] = useState("unit");

  // Unit Converter
  const [unitValue, setUnitValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [unitResult, setUnitResult] = useState(null);

  const convertUnits = async () => {
    const res = await fetch(`${API_BASE}/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: unitValue, fromUnit, toUnit }),
    });
    const data = await res.json();
    setUnitResult(data.result);
  };

  // Currency Converter
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencyResult, setCurrencyResult] = useState(null);

  const convertCurrency = async () => {
    const res = await fetch(`${API_BASE}/currency`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, fromCurrency, toCurrency }),
    });
    const data = await res.json();
    setCurrencyResult(data.result);
  };

  // Date/Time
  const [dateTime, setDateTime] = useState(null);
  const fetchDateTime = async () => {
    const res = await fetch(`${API_BASE}/datetime`);
    const data = await res.json();
    setDateTime(data);
  };

  // Password
  const [password, setPassword] = useState("");
  const generatePassword = async () => {
    const res = await fetch(`${API_BASE}/password?length=12`);
    const data = await res.json();
    setPassword(data.password);
  };

  // Lorem Ipsum
  const [lorem, setLorem] = useState([]);
  const generateLorem = async () => {
    const res = await fetch(`${API_BASE}/lorem?paragraphs=2`);
    const data = await res.json();
    setLorem(data.lorem);
  };

  // Text Tools
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState("");
  const handleTextTool = (tool) => {
    switch (tool) {
      case "uppercase":
        setTextResult(text.toUpperCase());
        break;
      case "lowercase":
        setTextResult(text.toLowerCase());
        break;
      case "titlecase":
        setTextResult(
          text
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")
        );
        break;
      case "removeSpaces":
        setTextResult(text.replace(/\s+/g, " ").trim());
        break;
      case "wordCount":
        setTextResult(
          `Words: ${text.split(/\s+/).filter(Boolean).length} | Characters: ${text.length}`
        );
        break;
      case "reverse":
        setTextResult(text.split("").reverse().join(""));
        break;
      default:
        setTextResult("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        ⚙️ Utility Tools
      </h2>

      <select
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          width: "100%",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        <option value="unit">Unit Converter</option>
        <option value="currency">Currency Converter</option>
        <option value="datetime">Date/Time Formatter</option>
        <option value="password">Password Generator</option>
        <option value="lorem">Lorem Ipsum Generator</option>
        <option value="uppercase">Text to Uppercase</option>
        <option value="lowercase">Text to Lowercase</option>
        <option value="titlecase">Text to Title Case</option>
        <option value="removeSpaces">Remove Extra Spaces</option>
        <option value="wordCount">Word / Character Counter</option>
        <option value="reverse">Text Reverser</option>
      </select>

      {/* ---------- TOOL CARDS ---------- */}
      <div className="tool-card">
        {selectedTool === "unit" && (
          <div className="card">
            <h3>Unit Converter</h3>
            <div className="input-group">
              <input
                type="number"
                value={unitValue}
                onChange={(e) => setUnitValue(e.target.value)}
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="mile">Mile</option>
              </select>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="mile">Mile</option>
              </select>
            </div>
            <button className="cta-btn" onClick={convertUnits}>
              Convert
            </button>
            {unitResult && <p className="result">Result: {unitResult}</p>}
          </div>
        )}

        {selectedTool === "currency" && (
          <div className="card">
            <h3>Currency Converter</h3>
            <div className="input-group">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </div>
            <button className="cta-btn" onClick={convertCurrency}>
              Convert
            </button>
            {currencyResult && <p className="result">Result: {currencyResult}</p>}
          </div>
        )}

        {selectedTool === "datetime" && (
          <div className="card">
            <h3>Date & Time Formatter</h3>
            <button className="cta-btn" onClick={fetchDateTime}>
              Get Date/Time
            </button>
            {dateTime && (
              <ul className="result-list">
                <li>ISO: {dateTime.iso}</li>
                <li>Date: {dateTime.date}</li>
                <li>Time: {dateTime.time}</li>
                <li>Readable: {dateTime.readable}</li>
              </ul>
            )}
          </div>
        )}

        {selectedTool === "password" && (
          <div className="card">
            <h3>Password Generator</h3>
            <button className="cta-btn" onClick={generatePassword}>
              Generate
            </button>
            {password && <p className="result">{password}</p>}
          </div>
        )}

        {selectedTool === "lorem" && (
          <div className="card">
            <h3>Lorem Ipsum Generator</h3>
            <button className="cta-btn" onClick={generateLorem}>
              Generate
            </button>
            {lorem.length > 0 && (
              <div>{lorem.map((p, i) => (<p key={i}>{p}</p>))}</div>
            )}
          </div>
        )}

        {(selectedTool === "uppercase" ||
          selectedTool === "lowercase" ||
          selectedTool === "titlecase" ||
          selectedTool === "removeSpaces" ||
          selectedTool === "wordCount" ||
          selectedTool === "reverse") && (
          <div className="card">
            <h3>Text Tool</h3>
            <textarea
              rows="5"
              placeholder="Enter text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="cta-btn" onClick={() => handleTextTool(selectedTool)}>
              Apply
            </button>
            {textResult && <p className="result">{textResult}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default UtilityTools;
