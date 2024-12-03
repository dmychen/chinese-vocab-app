import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css"; // Import the CSS file for styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle navbar

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/home", name: "Home", logo: "主" },
    { path: "/dictionary/search", name: "Dictionary", logo: "詞" },
    { path: "/library/sets", name: "Library", logo: "藏" },
    { path: "/stats", name: "Stats", logo: "報" },
    { path: "/settings", name: "Settings", logo: "設" },
  ];

  return (
    <div className={`navbar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleNavbar}>
        {isOpen ? "←" : "→"}
      </button>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.name} className="nav-item">
            <NavLink 
              to={item.path} 
              className="nav-link"
            >
              <span className="nav-logo">{item.logo}</span>
              {isOpen && <span className="nav-name">{item.name}</span>}
            </NavLink>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;