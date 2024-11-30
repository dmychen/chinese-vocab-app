import React from "react";
import "./Dictionary.css";
import { Outlet } from "react-router-dom";


/*
Dictionary page
*/
function Dictionary() {
  return (
    <div className="page">
      <header className="title">Vocab Search</header>

      <Outlet />
    </div>
  );
}

export default Dictionary;
