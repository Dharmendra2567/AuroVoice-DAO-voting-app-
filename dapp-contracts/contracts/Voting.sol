// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint256 yesCount;
        uint256 noCount;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalSubmitted(uint256 proposalId, string description);
    event VoteCast(address voter, uint256 proposalId, uint8 voteOption);

    function submitProposal(string memory description) public {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            description: description,
            yesCount: 0,
            noCount: 0,
            executed: false
        });
        emit ProposalSubmitted(proposalCount, description);
    }

    function vote(uint256 proposalId, uint8 voteOption) public {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        require(voteOption == 0 || voteOption == 1, "Invalid vote option (0: No, 1: Yes)");

        if (voteOption == 1) {
            proposals[proposalId].yesCount++;
        } else {
            proposals[proposalId].noCount++;
        }
        emit VoteCast(msg.sender, proposalId, voteOption);
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }
}