import React, { useState } from "react";
import Card from "./Card";

const ProposalForm = ({ onProposalSubmitted }) => {
  const [proposalText, setProposalText] = useState("");

  const handleSubmit = () => {
    if (proposalText.trim()) {
      onProposalSubmitted(proposalText);
      alert(`Confirm Your Proposal: ${proposalText}`);
      setProposalText("");
    } else {
      alert("Proposal is empty.Please write proposal");
    }
  };

  return (
    <Card title="Submit a New Proposal" description="Add Description of your proposal">
      <div className="flex flex-col md:flex-row gap-8 items-stretch transition-all duration-500">
        {/* Left Column: Info Text */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-300 via-white to-green-50 p-6 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Got an Idea?</h2>
          <p className="text-gray-600 text-base">
            Share your proposal with us. Describe your innovative solution or idea. We value every contribution and look forward to reviewing your input!
          </p>
        </div>

        {/* Right Column: Proposal Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
          <label htmlFor="proposalText" className="block text-gray-700 text-sm font-bold mb-2">
            Proposal Details:
          </label>
          <textarea
            id="proposalText"
            className="shadow-inner appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 focus:shadow-outline transition-all duration-300"
            value={proposalText}
            onChange={(e) => setProposalText(e.target.value)}
            placeholder="Describe your proposal..."
            rows="5"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProposalForm;
