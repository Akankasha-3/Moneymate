import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import UsersDashboard from "./dashboard/usersdashboard"; // Corrected capitalization
// import Login from "./components/login"; // Added import (adjust path if needed)
// import Signup from "./components/signup"; // Added import (adjust path if needed)

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<About />} />
        
        <Route path="/userdash" element={<UsersDashboard />} /> {/* Corrected to uppercase */}
      </Routes>
    </Router>
  );
};

export default App;