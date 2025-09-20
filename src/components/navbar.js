import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}><a href="#dashboard" style={styles.link}>Dashboard</a></li>
        <li style={styles.navItem}><a href="#convert" style={styles.link}>Converter</a></li>
        <li style={styles.navItem}><a href="#about" style={styles.link}>About</a></li>
        <li style={styles.navItem}><a href="#contact" style={styles.link}>Contact</a></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  navItem: {},
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
  },
};
