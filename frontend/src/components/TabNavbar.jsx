import React from "react";
import "./TabNavbar.css"; // Styling

function TabNavbar({ selectedTab, setSelectedTab }) {
  return (
    <div className="tabs">
      <div
        className={`tab ${selectedTab === "flashcards" ? "selected" : ""}`}
        onClick={() => setSelectedTab("flashcards")}
      >
        Flashcard Sets
      </div>
      <div
        className={`tab ${selectedTab === "vocabulary" ? "selected" : ""}`}
        onClick={() => setSelectedTab("vocabulary")}
      >
        Vocabulary
      </div>
      <div
        className={`tab ${selectedTab === "characters" ? "selected" : ""}`}
        onClick={() => setSelectedTab("characters")}
      >
        Characters
      </div>
      <div
        className={`tab ${selectedTab === "sentences" ? "selected" : ""}`}
        onClick={() => setSelectedTab("sentences")}
      >
        Sentences
      </div>
    </div>
  );
}

export default TabNavbar;
