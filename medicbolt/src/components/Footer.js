import React from "react";
import { useLocation, link, Link } from "react-router-dom";
import "./Footer.css"; // Import your footer CSS file

function Footer() {
  const location = useLocation();

  // Check if the current page is the product page
  const isProductPage = location.pathname === "/products";

  // Conditionally add a class for styling the footer position
  const footerClass = isProductPage ? "hidden" : "sticky-footer";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={footerClass}>
      <div className="footer-basic">
        <div className="info">
          <h3>MedicBolt</h3>
          <p>Leading provider of medical & laboratory equipment solutions.</p>
        </div>

        <ul className="list-inline">
          <li
            className="list-inline-item"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="list-inline-item "
            onClick={() => scrollToSection("about")}
          >
            About
          </li>
          <li
            className="list-inline-item"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </li>
          <li className="list-inline-item">
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <div className="social">
          <Link to="#">
            <i className="fa-brands fa-instagram fa-lg"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-x-twitter"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-facebook fa-lg"></i>
          </Link>
        </div>
      </div>
      <p
        className="copyright"
        style={{
          backgroundColor: "#e5e5e5",
          width: "100%",
          textAlign: "center",
        }}
      >
        MedicBolt © 2024
      </p>
    </footer>
  );
}

export default Footer;
