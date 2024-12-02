import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Library.css";

/**
 * Library Page
 * 
 * Displays 4 tabs: Current Sets, Vocabulary, Characters, and Sentences
 * Depending on the selected tab, navigates to their corresponding (sub)pages
 */
function Library() {
  return (
    <div className="page">
      <header className="title">Your Library</header>
      <TabNavbar /> {/* Navigate between the different tabs */}
      <Outlet /> {/* Navigate to a subpage based on the selected tab */}
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