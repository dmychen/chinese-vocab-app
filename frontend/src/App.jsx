import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import Library from "./pages/Library";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Practice from "./pages/Practice"

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/library" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/practice/:id" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;