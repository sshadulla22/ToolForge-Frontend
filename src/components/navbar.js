import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook,faComment,faTerminal } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function Navbar() {

// Function to show the feedback form
const showFeedbackForm = () => {
  Swal.fire({
    title: "Feedback",
    html: `
      <input type="text" id="name" class="my-input" placeholder="Your Name">
      <input type="email" id="email" class="my-input" placeholder="Your Email">
      <textarea id="feedback" class="my-input" placeholder="Your Feedback"></textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-confirm",
      cancelButton: "my-cancel",
    },
    preConfirm: () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const feedback = document.getElementById("feedback").value;

      if (!name || !email || !feedback) {
        Swal.showValidationMessage("Please fill all fields");
      }

      return { name, email, feedback };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Feedback data:", result.value);
      Swal.fire(
        "Thank You!",
        `Feedback submitted by ${result.value.name}`,
        "success"
      );
    }
  });
};


// Function to show the contact form
const showContactForm = () => {
  Swal.fire({
    title: "Contact Us",
    html: `
      <input type="text" id="contact-name" class="my-input" placeholder="Your Name">
      <input type="email" id="contact-email" class="my-input" placeholder="Your Email">
      <textarea id="contact-message" class="my-textarea" placeholder="Your Message"></textarea>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Send Message",
    cancelButtonText: "Cancel",
    customClass: {
      popup: "my-popup",
      title: "my-title",
      confirmButton: "my-confirm",
      cancelButton: "my-cancel",
    },
    preConfirm: () => {
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (!name || !email || !message) {
        Swal.showValidationMessage("⚠️ Please fill out all fields.");
      }

      return { name, email, message };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Contact data:", result.value);
      Swal.fire(
        "✅ Message Sent!",
        `Thanks, <b>${result.value.name}</b>. We'll get back to you soon.`,
        "success"
      );
    }
  });
};


  

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <a onClick={showFeedbackForm}  style={styles.link}>  <FontAwesomeIcon icon={faAddressBook} style={{ marginRight: "4px" }} />Feedback</a>
        </li>
        <li style={styles.navItem}>
          <a onClick={showContactForm}  style={styles.link}><FontAwesomeIcon icon={faComment} style={{ marginRight: "4px" }} />Contact</a>
        </li>
         <li style={styles.navItem}>
          <a href="#about" style={styles.link}><FontAwesomeIcon  icon={faTerminal} style={{ marginRight: "4px" }}   />Soon</a>
        </li>
       {/* <li style={styles.navItem}>
          <a href="#contact" style={styles.link}>Contact</a>
        </li> */}
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    color: "#fff",
    position: "relative",
    top: -50,
    zIndex: 1000,
    padding: "1rem",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: "0.8rem 1.5rem",
    border: "1px solid white",
    borderRadius: "8px",
    backgroundColor: "black",
  },
  navItem: {},
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease",
  },
  
};



