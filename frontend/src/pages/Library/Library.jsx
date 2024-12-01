import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Library.css"; // Styling

// Display Flashcard Sets, Vocabulary Words, Characters, and Sentences
function Library() {
  return (
    <div className="page">
      <header className="title">Your Library</header>
      <TabNavbar /> {/* Tab Navbar */}
      <Outlet /> {/* Render the content based on the selected tab */}
    </div>
  );
}

// Route to each of the following tabs
function TabNavbar() {
  return (
    <ul className="tabs">
      <li className="tab">
        <NavLink 
          to="sets" 
          className="tab-link"
        >
          Flashcard Sets
        </NavLink>
      </li>
      <li className="tab">
        <NavLink 
          to="vocabulary" 
          className="tab-link"
        >
          Vocabulary
        </NavLink>
      </li>
      <li className="tab">
        <NavLink 
          to="characters" 
          className="tab-link"
        >
          Characters
        </NavLink>
      </li>
      <li className="tab">
        <NavLink 
          to="sentences" 
          className="tab-link"
        >
          Sentences
        </NavLink>
      </li>
    </ul>
  );
}


export default Library;