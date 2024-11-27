import React, { useState } from "react";
import FlashcardSets from "../components/library_tabs/FlashcardSets";
import Vocabulary from "../components/library_tabs/Vocabulary";
import Characters from "../components/library_tabs/Characters";
import Sentences from "../components/library_tabs/Sentences";
import TabNavbar from "../components/TabNavbar"; // Import TabNavbar
import "./Library.css"; // Styling

// Display Flashcard Sets, Vocabulary Words, Characters, and Sentences
function Library() {
  const [selectedTab, setSelectedTab] = useState("flashcards");

  // Possible tabs
  const renderContent = () => {
    switch (selectedTab) {
      case "flashcards":
        return <FlashcardSets />;
      case "vocabulary":
          return <Vocabulary />;
      case "characters":
        return <Characters />;
      case "sentences":
        return <Sentences />;
      default:
        return <FlashcardSets />;
    }   
  };  

  return (
    <div className="page">
      <header className="title">Your Library</header>

      {/* Tab Navbar */}
      <TabNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Render the content based on the selected tab */}
      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default Library;