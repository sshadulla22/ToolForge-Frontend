import React, { useState } from "react";
import "./TopBar.css";
import logo from "../Group 16.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src={logo} height="45"/>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {/* <li><a href="#">Pages</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Blocks</a></li>
          <li><a href="#">Docs</a></li> */}
        </ul>

        <button className="get-started">Get Started</button>

        // {/* Toggle Button */}
        // <button className="menu-toggle" onClick={() => setOpen(!open)}>
        //   {open ? <FontAwesomeIcon icon={faXmark} />  : <FontAwesomeIcon icon={faBars} />}
        // </button>
      </div>
    </nav>
  );
}

