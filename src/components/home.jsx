import React from "react";
import StepsHorizontal from "./steps";
import UserFlow from "./userflow";
import Footer from "./footer";
import { Link } from 'react-router-dom'; 
import UnauthenticatedNavbar from "./unauthnavbar"; 

function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
    <UnauthenticatedNavbar />

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;