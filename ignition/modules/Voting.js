import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Default mock election arguments
const CANDIDATES = ["Alice Nominee", "Bob Nominee", "Charlie Nominee"];
const DURATION_MINUTES = 60; // 1-hour voting window

export default buildModule("VotingModule", (m) => {
  // Updated "Voting" to "DecentralizedVoting" to match your contract file!
  const voting = m.contract("DecentralizedVoting", [CANDIDATES, DURATION_MINUTES]);

  return { voting };
});