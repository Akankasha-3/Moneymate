import React from "react";
import image from "./download.png";
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

      {/* Hero Section */}
      <main className="container mx-auto px-6 mt-24 flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="max-w-xl space-y-6 lg:ml-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-700 leading-tight">
            Finance Tracker
          </h2>
          <h3 className="text-4xl lg:text-5xl font-semibold text-gray-700 leading-tight">
            by Moneycontrol
          </h3>
          <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed">
            Gain control over your finances by leveraging the Account Aggregator ecosystem.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
            Get Started Now
          </button>
        </div>
        <div className="relative mt-10 lg:mt-0">
          <img
            src={image}
            alt="Finance Illustration"
            className="w-full lg:w-[500px] z-10 relative"
          />
          <img
            src="http://1.bp.blogspot.com/_8qm63ccsf7k/TEGOQGUNJ2I/AAAAAAAAABQ/xHUBYsOsO2Y/s1600/indian+rupee+symbol.JPG"
            alt="Rupee Symbol"
            className="absolute top-10 left-[-100px] w-[200px] opacity-60 z-0 hidden lg:block"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 mt-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-16 text-blue-800">
            Features and Benefits
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Track Bank Accounts",
                description: "View balances across bank accounts. Add the accounts you want to track and get a consolidated view.",
                image: "https://via.placeholder.com/600/77B5FE/FFFFFF?text=Bank+Accounts",
              },
              {
                title: "Secure Data Sharing",
                description: "Share financial data securely via Account Aggregators with consent-driven access.",
                image: "https://via.placeholder.com/600/2ECC71/FFFFFF?text=Data+Sharing",
              },
              {
                title: "One Dashboard",
                description: "Manage all your financial assets in one place—bank accounts, loans, and more.",
                image: "https://via.placeholder.com/600/3498DB/FFFFFF?text=One+Dashboard",
              },
              {
                title: "Real-Time Updates",
                description: "Get up-to-date transaction history and balance information across accounts.",
                image: "https://via.placeholder.com/600/9B59B6/FFFFFF?text=Real-Time",
              },
              {
                title: "Easy Budgeting",
                description: "Use insights from your accounts to set monthly budgets and control spending.",
                image: "https://via.placeholder.com/600/F1C40F/FFFFFF?text=Budgeting",
              },
              {
                title: "Personalized Insights",
                description: "Receive tailored financial tips and insights based on your account activity.",
                image: "https://via.placeholder.com/600/E74C3C/FFFFFF?text=Insights",
              },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl flex flex-col">
                <div className="relative h-48">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">{card.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{card.description}</p>
                </div>
                <div className="p-6 border-t border-gray-200">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-2 py-16">
        <StepsHorizontal />
      </div>

      <div>
        <UserFlow />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;