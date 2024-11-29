import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css"; // Import the CSS file for styling

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle navbar

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/home", name: "Home", logo: "🏠" },
    { path: "/dictionary", name: "Dictionary", logo: "📖" },
    { path: "/library/sets", name: "Library", logo: "📚" },
    { path: "/stats", name: "Stats", logo: "📊" },
    { path: "/settings", name: "Settings", logo: "⚙️" },
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