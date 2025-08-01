import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Login from "./dashboard/login";
import Signup from "./dashboard/signup"; 
import UsersDashboard from "./dashboard/usersdashboard"; 
import OAuthCallback from "./dashboard/Ouath"; 
import DuplicateDashboard from "./dashboard/duplicatedashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdash" element={<UsersDashboard />} /> {/* Corrected to uppercase */}
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/duplicate-dashboard" element={<DuplicateDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;