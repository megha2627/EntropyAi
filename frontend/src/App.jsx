import React from "react";
import EntropyAILanding from "./components/EntropyAILanding";
import EntropyAIServices from "./components/EntropyAIServices";
import EntropyAIApp from "./components/EntropyAIApp";
import { Route, Routes } from "react-router-dom";
import PricingSection from "./components/PricingSection";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import LoginSignup from "./components/LoginSignup";
import Footer from "./components/Footer";
import FreeTrialForm from "./components/FreeTrialForm";
import Analytics from "./components/Analytics";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <Navbar />

      {/* Main content grows to take all space between navbar and footer */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<EntropyAILanding />} />
          <Route path="/services" element={<EntropyAIServices />} />
          <Route path="/chatbot" element={<EntropyAIApp />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/get-started" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/trial" element={<FreeTrialForm />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
