import React, { useState, useEffect } from "react";
import Card from "./Card";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const VotingInterface = ({ proposals, onVoteSubmitted, isConnected }) => {
  const [votedProposalId, setVotedProposalId] = useState(null);
  const [vote, setVote] = useState("");
  const [voted, setVoted] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    console.log("🗳️ Proposals in VotingInterface:", proposals);
  }, [proposals]);

  const handleVote = (proposalId, voteValue) => {
    if (!isConnected) {
      alert("Please connect your wallet!");
      return;
    }

    if (proposalId && voteValue) {
      onVoteSubmitted({ proposalId, vote: voteValue });
      setVotedProposalId(proposalId);
      setVote(voteValue);
      setVoted(true);
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    if (voted) {
      const timer = setTimeout(() => {
        setVoted(false);
        setVotedProposalId(null);
        setVote("");
      }, 3000);
      return () => clearTimeout(timer);
    }
    console.log("this is nothing", proposals)

  }, [voted]);

  if (!isConnected) {
    return (
      <Card  title="Vote Now" description="Connect your wallet to vote.">
        <p className="text-gray-500 text-md italic">Please connect your wallet to participate in voting.</p>
      </Card>
    );
  }

  return (
    <Card title="Vote Now" description="Choose a proposal and make your voice heard.">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {proposals && proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-2xl shadow-lg p-6 bg-purple-100 border border-purple-200 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h3 className="text-lg font-semibold text-purple-800 mb-2">{
              proposal.title===""? "Establishment of a Community-Led Decentralized Learning Platform Offering Free Courses and Skill Development Programs"
              : proposal.title}</h3>
              <div className="flex gap-4 mt-4">
                <FaThumbsUp className=" cursor-pointer" /> {proposal.yesCount} &nbsp;
                <FaThumbsDown className=" cursor-pointer" /> {proposal.noCount}
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleVote(proposal.id, "yes")}
                  className={`py-2 px-4 rounded-lg font-bold text-white ${votedProposalId === proposal.id && vote === "yes"
                      ? "bg-green-600"
                      : "bg-green-500 hover:bg-green-700"
                    }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleVote(proposal.id, "no")}
                  className={`py-2 px-4 rounded-lg font-bold text-white ${votedProposalId === proposal.id && vote === "no"
                      ? "bg-red-600"
                      : "bg-red-500 hover:bg-red-700"
                    }`}
                >
                  No
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-2 text-md italic">No proposals available.</p>
        )}
      </div>
    </Card>
  );
};

export default VotingInterface;
