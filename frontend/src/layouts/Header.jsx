import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';  // Your CSS styling for the header and profile panel

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfilePanel = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleIconClick = () => {
      navigate(`/dictionary/search`);
  }

  return (
    <header className="header">
      <header className="icon" onClick={handleIconClick}>陳</header>
      <button className="profile-btn" onClick={toggleProfilePanel}>
        Profile
      </button>

      {/* Profile Panel */}
      {isProfileOpen && (
        <div className="profile-panel">
          <h2>Profile Details</h2>
          <p>Some profile information here...</p>
          <button onClick={toggleProfilePanel}>Close</button>
        </div>
      )}    
    </header>
  );
}

export default Header;