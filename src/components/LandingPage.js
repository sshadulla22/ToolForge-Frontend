import React from "react";
import "./LandingPage.css";
import logo from "../Group 16.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFilePdf, faFileWord, faFileImage, faImages, faFilePowerpoint, faFileExcel, 
  faCode, faQrcode, faLock, faTools, faDesktop, faHourglassHalf,
  faBolt, faMobileAlt, faGlobe, faFileCode, faKey, faEnvelope, faPhone,faImage
} from "@fortawesome/free-solid-svg-icons";

const LandingPage = ({ onContinue }) => {
  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">
          <img src={logo} alt="TooConvert Logo" height="50" width="150" /> TooConvert
        </h2>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#popular">Popular</a></li>
          <li><a href="#faq-section">FAQ</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-text">
          <h1>Convert <span className="highlight">Anything</span> Instantly</h1>
          <p>TooConvert is your free online file converter for PDFs, images, and more. Fast, secure, and 100% online.</p>
          <button  className="cta-btn" onClick={onContinue}>Get Started</button>
        </div>
      </section>

      {/* Info Cards Section */}
      <section id="tools" className="info-container">
        <h2 className="section-title">TooConvert – All-in-One Productivity Toolkit</h2>
        <p className="section-subtitle-1">Simplify your workflow with fast, secure, and reliable tools for every need.</p>

        <div className="info-cards">
         {/* PDF Compressor */}
  <div className="cards">
    <FontAwesomeIcon icon={faFilePdf} className="icon" />
    <h3>PDF Compressor</h3>
    <p>Compress your PDF in seconds.</p>
    <p>Compression Levels: Low, Medium, High</p>
  </div>

  {/* Merge PDFs */}
  <div className="cards">
    <FontAwesomeIcon icon={faFilePdf} className="icon" />
    <h3>Merge PDFs</h3>
    <p>Combine multiple PDF files into a single document quickly.</p>
  </div>

  {/* Split PDFs */}
  <div className="cards">
    <FontAwesomeIcon icon={faFilePdf} className="icon" />
    <h3>Split PDFs</h3>
    <p>Split a PDF into separate pages or custom ranges instantly.</p>
  </div>

  {/* Extract Text */}
  <div className="cards">
    <FontAwesomeIcon icon={faFilePdf} className="icon" />
    <h3>Extract Text</h3>
    <p>Extract text content from your PDF easily.</p>
  </div>



          <div className="cards">
            <FontAwesomeIcon icon={faFileWord} className="icon" />
            <h3>PDF → DOCX</h3>
            <p>Convert PDFs into editable Word documents in seconds.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faFilePdf} className="icon" />
            <h3>DOCX → PDF</h3>
            <p>Turn your Word files into polished PDFs effortlessly.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faFileImage} className="icon" />
            <h3>PDF → Image</h3>
            <p>Convert PDF pages into high-quality JPG or PNG images.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faImages} className="icon" />
            <h3>Image → PDF</h3>
            <p>Merge images into a single PDF file with one click.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faFilePowerpoint} className="icon" />
            <h3>PPT → PDF</h3>
            <p>Convert PowerPoint slides into shareable PDF documents.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faFileExcel} className="icon" />
            <h3>Excel → PDF</h3>
            <p>Transform spreadsheets into PDF format quickly.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faCode} className="icon" />
            <h3>Code Compiler</h3>
            <p>Run and test code instantly in multiple languages.</p>
              <p className="coming-soon"> Coming Soon...</p>
               <select 
    style={{
      width: "100%",
      padding: "4px 6px",
      borderRadius: "6px",
      border: "1px solid white",
      background: "#111",
      color: "#fff",
      marginTop: "10px",
      cursor: "pointer"
    }}
  >
    <option>C</option>
    <option>C#</option>
    <option>C++</option>
    <option>Java</option>
    <option>Python</option>
    <option>HTML/CSS/JS</option>

  </select>

          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faQrcode} className="icon" />
            <h3>QR Code Generator</h3>
            <p>Create QR codes for links, text, and contact info easily.</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <h3>Base64 Tools</h3>
            <p>Encode or decode text and files using Base64 securely.</p>
          </div>
        

        <div className="cards">
  <FontAwesomeIcon icon={faTools} className="icon" />
  <h3>Utility Tools</h3>
  <p>Extra productivity utilities to simplify your workflow.</p>
   <p className="coming-soon">
    Coming Soon...
  </p>
  <select 
    style={{
      width: "100%",
      padding: "4px 6px",
      borderRadius: "6px",
      border: "1px solid white",
      background: "#111",
      color: "#fff",
      marginTop: "10px",
      cursor: "pointer"
    }}
  >
    <option>Unit Converter (Length, Weight, Temperature)</option>
    <option>Currency Converter</option>
    <option>Date / Time Formatter</option>
    <option>Random Password Generator</option>
    <option>Lorem Ipsum Generator</option>
  </select>
</div>


          <div className="cards">
            <FontAwesomeIcon icon={faDesktop} className="icon" />
            <h3>Mockup Tool</h3>
            <p>Simply paste the URL to generate the mockup</p>
              <p className="coming-soon"> Coming Soon...</p>
          </div>
          <div className="cards">
            <FontAwesomeIcon icon={faHourglassHalf} className="icon" />
            <h3>Dev Space</h3>
            <p>Space made for DevBros</p>
           <p className="coming-soon"> Coming Soon...</p>
          </div>

           {/* Compress Image */}
  <div className="cards">
    <FontAwesomeIcon icon={faFileImage} className="icon" />
    <h3>Compress Image</h3>
    <p>Reduce image size without losing quality.</p>
  </div>

  {/* Resize Image */}
  <div className="cards">
    <FontAwesomeIcon icon={faImage} className="icon" />
    <h3>Resize Image</h3>
    <p>Resize images to desired dimensions quickly.</p>
  </div>

  {/* Convert Image */}
  <div className="cards">
    <FontAwesomeIcon icon={faFileCode} className="icon" />
    <h3>Convert Image</h3>
    <p>Convert images to PNG, JPG, WEBP, and more.</p>
  </div>

  {/* Add Watermark */}
  <div className="cards">
    <FontAwesomeIcon icon={faLock} className="icon" />
    <h3>Add Watermark</h3>
    <p>Protect images with text or logo watermark.</p>
  </div>
          
        </div>
      </section>

      {/* About & Why Choose Section */}
      <div id="about" className="about-why-container">
        <section className="why-choose">
          <h2 className="section-title">Why Choose TooConvert?</h2>
          <div className="why-cards">
            <div className="why-card"><FontAwesomeIcon icon={faBolt} className="icon" /> Fast & Reliable</div>
            <div className="why-card"><FontAwesomeIcon icon={faLock} className="icon" /> 100% Secure</div>
            <div className="why-card"><FontAwesomeIcon icon={faMobileAlt} className="icon" /> Works on Any Device</div>
            <div className="why-card"><FontAwesomeIcon icon={faGlobe} className="icon" /> Free & Unlimited</div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="section-title">About TooConvert</h2>
          <p className="section-subtitle">
            TooConvert is your all-in-one file conversion and productivity toolkit.
            Convert <strong>PDFs, Word, Excel, PPT, Images, JSON, and more</strong> with just one click.
            Designed for speed, security, and ease of use — no installation needed.
          </p>
        </section>
      </div>

      {/* Popular Conversions */}
      <div id="popular" className="about-why-container">
        <section className="popular-section">
          <h2 className="section-title">Popular Conversions</h2>
          <ul className="popular-list">
            <li><FontAwesomeIcon icon={faFilePdf} /> PDF to DOCX</li>
            <li><FontAwesomeIcon icon={faFileWord} /> Image to PDF</li>
            <li><FontAwesomeIcon icon={faFileExcel} /> Excel to PDF</li>
            <li><FontAwesomeIcon icon={faFilePowerpoint} /> PPT to PDF</li>
            <li><FontAwesomeIcon icon={faFileCode} /> JSON Formatter</li>
            <li><FontAwesomeIcon icon={faKey} /> Base64 Encoder/Decoder</li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq">
            <h3>Is TooConvert free?</h3>
            <p>✅ Yes, all conversions on TooConvert are free and unlimited.</p>
          </div>
          <div className="faq">
            <h3>Are my files safe?</h3>
            <p>✅ Absolutely. Your files are processed securely and never stored.</p>
          </div>
          <div className="faq">
            <h3>Do I need to install software?</h3>
            <p>✅ No installation required. TooConvert works directly in your browser.</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3 className="logo"> <img src={logo} alt="TooConvert Logo" />TooConvert</h3>
            <p>Your all-in-one file conversion and productivity toolkit. Fast, secure, and 100% online.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#tools">Tools</a></li>
              <li><a href="#faq-section">FAQ</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p><FontAwesomeIcon icon={faEnvelope} /> support@tooconvert.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +91 xxx xxx xxxx</p>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} TooConvert. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

