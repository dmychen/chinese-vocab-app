import React from "react";
import "./Dictionary.css";
import { Outlet } from "react-router-dom";


/*
Dictionary page
*/
function Dictionary() {
  return (
    <div className="page">
      <h1 className="title">Vocab Search</h1>

      <Outlet />
    </div>
  );
}

export default Dictionary;
