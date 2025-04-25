import React, { createContext, useEffect, useState, useContext } from "react";
import { getVotingContract } from "../blockchain";

const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [proposalItems, setProposalItems] = useState([]);
  const [nextProposalId, setNextProposalId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [governanceHistory, setGovernanceHistory] = useState([]);


const loadGovernanceHistory = async () => {
  try {
    setLoading(true);
    const votingContract = await getVotingContract();
    const countBN = await votingContract.proposalCount();
    const count = parseInt(countBN.toString());
    const history = [];

    for (let i = 1; i <= count; i++) {
      const proposal = await votingContract.proposals(i);
      const yesCount = parseInt(proposal.yesCount.toString());
      const noCount = parseInt(proposal.noCount.toString());
      const totalVotes = yesCount + noCount;
      const percentageYes = totalVotes > 0 ? Math.round((yesCount / totalVotes) * 100) : 0;
      
      history.push({
        id: i.toString(),
        title: proposal.description,
        description: `Voting ended with ${yesCount} Yes and ${noCount} No votes`,
        outcome: percentageYes >= 50 ? `Approved (${percentageYes}% Yes)` : `Rejected (${percentageYes}% Yes)`,
        timestamp: new Date().toISOString() 
      });
    }

    setGovernanceHistory(history);
  } catch (err) {
    console.error("Error loading governance history:", err);
    setError("Failed to load governance history");
  } finally {
    setLoading(false);
  }
};


  const connectWallet = async () => {
    try {
      //it check whther ethereum wallet is installed or not at clients brower side
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        await loadBlockchainData();
      } else {
        setError("Please install MetaMask to use this dApp!");
      }
    } catch (err) {
      console.error("MetaMask connection error:", err);
      setError("Failed to connect to MetaMask");
    }
  };
 

  const handleVoteSubmitted = async (vote) => {
    try {
      if (!account) {
        alert("Please connect your wallet");
        return;
      }

      setLoading(true);
      const votingContract = await getVotingContract();
      const tx = await votingContract.vote(vote.proposalId, vote.vote === "yes" ? 1 : 0);
      await tx.wait();
      await loadBlockchainData();
    } catch (err) {
      console.error("Vote error:", err);
      alert("Error submitting vote.");
    } finally {
      setLoading(false);
    }
  };
  const handleProposalSubmitted = async (proposalTitle) => {
    try {
      if (!account) {
        alert("Please connect your wallet");
        return;
      }
  
      setLoading(true);
      const votingContract = await getVotingContract();
      const tx = await votingContract.submitProposal(proposalTitle);
      await tx.wait();
  
      const newProposalIdBN = await votingContract.proposalCount();
      const newProposalId = parseInt(newProposalIdBN.toString()) ;
      const proposal = await votingContract.proposals(newProposalId);
  
      const newProposal = {
        id: newProposalId.toString(),
        title: proposal.description,
        yesCount: parseInt(proposal.yesCount.toString()),
        noCount: parseInt(proposal.noCount.toString()),
      };
  
      setProposalItems((prev) => [...prev, newProposal]);
      setNextProposalId((prev) => prev + 1);
  
    } catch (err) {
      console.error("Proposal submission error:", err);
      alert("Error submitting proposal.");
    } finally {
      setLoading(false);
    }
  };
  
  const loadBlockchainData = async () => {
    try {
      setLoading(true);
      setError(null);
      const votingContract = await getVotingContract();
      const countBN = await votingContract.proposalCount();
      const count = parseInt(countBN.toString());
      const proposals = [];
  
      for (let i = 1; i <= count; i++) {
        const proposal = await votingContract.proposals(i);
        proposals.push({
          id: i.toString(),
          title: proposal.description,
          yesCount: parseInt(proposal.yesCount.toString()),
          noCount: parseInt(proposal.noCount.toString()),
        });
      }
  
      console.log("✅ Loaded proposals:", proposals);
  
      setProposalItems(proposals); 
      setNextProposalId(count);
      await loadGovernanceHistory();
    } catch (err) {
      console.error("Error loading blockchain data:", err);
      setError("Failed to load blockchain data");
    } finally {
      setLoading(false);
    }
  };
  
  const disconnectWallet = async () => {
    try {
      if (account !== null) {  // Compare against null, not "null"
        setAccount(null);
        setProposalItems([]);  // Clear proposals
        setGovernanceHistory([]);  // Clear history
        setNextProposalId(0);  // Reset proposal counter
        console.log("Account disconnected successfully");
      }
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  useEffect(() => {
    // connectWallet();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          loadBlockchainData();
        } else {
          setAccount(null);
          setProposalItems([]);
          setNextProposalId(0);
        }
      });

      window.ethereum.on("chainChanged", () => {
        loadBlockchainData();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  return (
    <VotingContext.Provider
      value={{
        account,
        proposalItems,
        loading,
        error,
        governanceHistory,
        connectWallet,
        disconnectWallet,
        handleVoteSubmitted,
        handleProposalSubmitted,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext);
