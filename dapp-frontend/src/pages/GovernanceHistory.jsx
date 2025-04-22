import React from "react";
import Card from "../components/Card";
import { useVoting } from "../contexts/VotingContext";

const GovernanceHistory = () => {
  const { governanceHistory, loading, error } = useVoting();

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-serif tracking-tight transition-all duration-300">
          Governance History
        </h1>
        <p className="text-lg text-gray-600 animate-pulse">Loading history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-serif tracking-tight">
          Governance History
        </h1>
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-serif tracking-tight">
        Governance History
      </h1>

      {governanceHistory.length === 0 ? (
        <p className="text-gray-500 text-md italic">No governance history yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governanceHistory.map((item, index) => (
            <div
              key={index}
              className="transform hover:scale-[1.02] transition duration-300 ease-in-out shadow-xl rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100"
            >
              <Card
                title={
                  <span className="text-xl font-bold font-sans text-indigo-700">
                    {
                    item.title === "" ? "Establishment of a Community-Led Decentralized Learning Platform Offering Free Courses and Skill Development Programs"
                    : item.title
                    }
                  </span>
                }
                description={
                  <span className="text-base text-gray-700 font-light leading-relaxed font-mono">
                    {item.description}
                  </span>
                }
              >
                <p className="mt-4 font-semibold font-sans">
                  Outcome:{" "}
                  <span className={`uppercase tracking-wide ${item.outcome.toLowerCase().includes('rejected')
                      ? 'text-red-600'
                      : 'text-green-600'
                    }`}>
                    {item.outcome}
                  </span>
                </p>
                {item.timestamp && (
                  <p className="text-sm text-gray-500 mt-1 font-mono">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GovernanceHistory;
