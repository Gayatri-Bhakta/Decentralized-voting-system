// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DecentralizedVoting {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public electionOfficial;
    uint256 public votingEnd;
    uint256 public candidateCount;

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public isWhitelisted;
    mapping(address => bool) public hasVoted;

    // Events allow our React frontend to update the dashboard in REAL TIME
    event VoteCast(uint256 indexed candidateId, uint256 newVoteCount);
    event VoterWhitelisted(address voterAddress);

    modifier onlyOfficial() {
        require(msg.sender == electionOfficial, "Only the election official can perform this action.");
        _;
    }

    modifier votingActive() {
        require(block.timestamp < votingEnd, "Voting window has ended.");
        _;
    }

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        electionOfficial = msg.sender;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidateCount++;
            candidates[candidateCount] = Candidate(candidateCount, _candidateNames[i], 0);
        }
    }

    // Anti-Corruption: Only authorized, identity-verified addresses are added to the ballot system
    function whitelistVoter(address _voter) external onlyOfficial {
        require(!isWhitelisted[_voter], "Voter is already whitelisted.");
        isWhitelisted[_voter] = true;
        emit VoterWhitelisted(_voter);
    }

    // Tamper-Proof: Enforces whitelisting, double-voting prevention, and strict deadlines
    function castVote(uint256 _candidateId) external votingActive {
        require(isWhitelisted[msg.sender], "You are not authorized/whitelisted to vote.");
        require(!hasVoted[msg.sender], "Identity verification failed: You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate chosen.");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        // Emitting the event triggers the real-time updates on our React UI instantly
        emit VoteCast(_candidateId, candidates[_candidateId].voteCount);
    }

    function getCandidate(uint256 _candidateId) external view returns (Candidate memory) {
        return candidates[_candidateId];
    }
}