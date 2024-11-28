import { Outlet } from "react-router-dom";
import "./Root.css"

import Header from "./Header";
import Navbar from "./Navbar";

function Root() {
    return (
      <div className="app-layout">
          <Header />
          <Navbar />
          <div className="content">
            <Outlet />
          </div>
        </div>
    );
  }
  
export default Root;