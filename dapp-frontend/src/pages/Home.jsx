import React, { useRef } from "react";
import VotingInterface from "../components/VotingInterface";
import ProposalForm from "../components/ProposalForm";
import Results from "../components/Results";
import ProposalCountDisplay from "../components/ProposalCountDisplay";
import { useVoting } from "../contexts/VotingContext";
import HeaderContent from "../components/header-content/HeaderContent";

const Home = () => {
  const {
    account,
    proposalItems,
    loading,
    error,
    connectWallet,
    handleVoteSubmitted,
    handleProposalSubmitted
  } = useVoting();

  // if (loading) return <div className="text-center p-6">Loading...</div>;

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500">{error}</div>
        <button
          onClick={connectWallet}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }
  const votingRef = useRef(null);

  const scrollToVoting = () => {
    votingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto bg-gray-400">
      <div className=" ">
        <HeaderContent onVoteClicked={scrollToVoting} />
      </div>

     
        <div ref={votingRef} className="mt-5 w-full py-5 px-10">
          <ProposalCountDisplay count={proposalItems.length} />
        <VotingInterface
          proposals={proposalItems}
          onVoteSubmitted={handleVoteSubmitted}
          isConnected={!!account}/>
        </div>
        <div className="mt-1 p-8">
        <ProposalForm
          onProposalSubmitted={handleProposalSubmitted}
          isConnected={!!account}
        />
        </div>

      <div className="mt-2">
        <Results
          results={proposalItems.map((p) => ({
            proposal: p.title,
            votesYes: p.yesCount,
            votesNo: p.noCount,
          }))}
        />
      </div>
    </div>
  );
};

export default Home;
