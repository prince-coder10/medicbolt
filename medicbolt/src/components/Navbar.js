import { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const navStyle = {
    color: location.pathname === "/" ? "white" : "black",
  };
  const navStyle2 = {
    color: location.pathname === "/" ? "white" : "white",
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setClick(false); // Close the menu after navigation on mobile
    }
  };

  return (
    <nav className="navbar">
      <div className="logo__cont">
        <img src="./medicbolt.png" alt="logo" />
        <p className="nav__header" style={navStyle}>
          MedicBolt
        </p>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={`fas ${click ? "fa-times" : "fa-bars"} ${navStyle}`} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <Link to="/" className="link">
          <li style={navStyle}>Home</li>
        </Link>
        <li
          style={navStyle}
          className="link"
          onClick={() => scrollToSection("about")}
        >
          About
        </li>
        <li
          style={navStyle}
          className="link"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </li>
        <Link to="/products" className="link">
          <li style={navStyle}>Products</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
