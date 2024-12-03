import React from "react";
import "./Dictionary.css";
import { Outlet } from "react-router-dom";
import { DEFAULT_SET_ID } from "../../globals";


/**
 * Dictionary Page
 * 
 * Displays a vocab searcher, with default set DEFAULT_SET_ID
 */
function Dictionary() {
  return (
    <div className="page">
      <h1 className="title">Dictionary</h1>

      <Outlet context={{ defaultSetOnInsert: DEFAULT_SET_ID }} />
    </div>
  );
}

export default Dictionary;
