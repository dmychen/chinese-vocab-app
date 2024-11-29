import { Outlet } from "react-router-dom";
import "./Root.css"

import Header from "./Header";
import Navbar from "./Navbar";

function Root() {
    return (
      <div className="app-layout">
        <Header />
        <main className="main">
          <Navbar />
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }
  
export default Root;