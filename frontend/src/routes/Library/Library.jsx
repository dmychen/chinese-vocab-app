import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Library.css"; // Styling

// Display Flashcard Sets, Vocabulary Words, Characters, and Sentences
function Library() {
  const [selectedTab, setSelectedTab] = useState("flashcards");

  return (
    <div className="page">
      <header className="title">Your Library</header>

      {/* Tab Navbar */}
      <TabNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Render the content based on the selected tab */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

// Route to each of the following tabs
function TabNavbar({ selectedTab, setSelectedTab }) {
  return (
    <ul className="tabs">
      <li className={`tab ${selectedTab === "flashcards" ? "selected" : ""}`} onClick={() => setSelectedTab("flashcards")} >
        <Link to={`sets`}>Flashcard Sets</Link>
      </li>
      <li className={`tab ${selectedTab === "vocabulary" ? "selected" : ""}`} onClick={() => setSelectedTab("vocabulary")} >
        <Link to={`vocabulary`}>Vocabulary</Link>
      </li>
      <li className={`tab ${selectedTab === "characters" ? "selected" : ""}`} onClick={() => setSelectedTab("characters")} >
        <Link to={`characters`}>Characters</Link>
      </li>
      <li className={`tab ${selectedTab === "sentences" ? "selected" : ""}`} onClick={() => setSelectedTab("sentences")} >
        <Link to={`sentences`}>Sentences</Link>
      </li>
    </ul>
  );
}


export default Library;