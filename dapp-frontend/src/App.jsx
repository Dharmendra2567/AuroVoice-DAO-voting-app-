import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GovernanceHistory from "./pages/GovernanceHistory";
import NotFound from "./pages/NotFound";

import { VotingProvider } from "./contexts/VotingContext";

const App = () => {
  return (
    <Router>
      <VotingProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-100 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<GovernanceHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </VotingProvider>
    </Router>
  );
};

export default App;
