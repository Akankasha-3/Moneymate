import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import DuplicateDashboard from "./dashboard/duplicatedashboard";

const App = () => {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        {/*
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/userdash" element={<UsersDashboard />} /> {/* Corrected to uppercase */}
        {/* <Route path="/oauth-callback" element={<OAuthCallback />} /> */}
        <Route path="/duplicate-dashboard" element={<DuplicateDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;