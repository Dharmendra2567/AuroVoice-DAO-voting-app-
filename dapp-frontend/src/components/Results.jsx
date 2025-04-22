import React from "react";
import Card from "./Card";

const Results = ({ results }) => {
  return (
    <Card title="Current Voting Results">
      {results.length === 0 ? (
        <p className="text-gray-500 text-md italic">No votes have been cast yet.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result, index) => {
            const totalVotes = result.votesYes + result.votesNo;
            let winProbability = totalVotes > 0 ? Math.round((result.votesYes / totalVotes) * 100) : 0;
            if (winProbability < 0) winProbability = 0;

            return (
              <li
                key={index}
                className="bg-gradient-to-br from-purple-100 to-white p-4 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-102                                                              transition-all duration-300 flex justify-between items-center"
              >
                <span className="font-semibold text-gray-800">{
                  result.proposal === "" ? "Establishment of a Community-Led Decentralized Learning Platform Offering Free Courses and Skill Development Programs"
                  : result.proposal}</span>
                <span className="text-purple-300 font-bold text-lg">{winProbability}% Win Probability</span>
              </li>
            );
          })}

        </ul>
      )}
    </Card>
  );
};

export default Results;
