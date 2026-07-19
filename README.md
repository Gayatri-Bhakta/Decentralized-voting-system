<h1>Security-Hardened Decentralized Voting System</h1>

A production-ready decentralized voting platform built with Solidity, Hardhat, React, Vite, and Ethers.js, providing transparent, secure, and tamper-proof elections powered by blockchain technology.

Overview

Traditional voting systems suffer from issues such as:
Lack of transparency
Centralized control
Vote manipulation
Limited auditability

This project addresses these challenges using blockchain technology.

Every vote is:<br>
✅ Immutable<br>
✅ Cryptographically secured<br>
✅ Publicly verifiable<br>
✅ Recorded on-chain<br>
✅ Instantly reflected in the dashboard<br>

The application combines an immutable Solidity smart contract with a modern React frontend to deliver a seamless decentralized voting experience.

🛠️ Tech Stack & Requirements

💻 System Prerequisites<br>
Ensure the following base software environments are installed globally on your machine before initializing the workspace:
**Node.js (v18.0.0 or higher):** Core runtime environment. [Download Node.js](https://nodejs.org/)
**npm:** Node Package Manager (bundled directly with Node.js)
**MetaMask Browser Extension:** Crypto wallet extension used to sign transactions and route network calls. [Get MetaMask](https://metamask.io/)

📦 Project Dependencies (`requirements.txt`)<br>
The application infrastructure relies on the following engineering frameworks:
**Hardhat:** EVM development environment used to compile smart contracts, run test hooks, and deploy local blockchain nodes.
**Ethers.js (v6):** Web3 provider library bridging the frontend UI with browser wallets and ledger RPC nodes.
**React & React-Dom:** UI rendering engine powering the modular dashboard components.
**Vite:** High-performance frontend build tool and local development cluster server.


Architecture

                User
                 │
                 ▼
        React Frontend (Vite)
                 │
                 ▼
         MetaMask Wallet
                 │
                 ▼
      Hardhat Local Blockchain
                 │
                 ▼
     Solidity Smart Contract
                 │
                 ▼
      Blockchain State & Events


🚀 Run Locally

1. Install dependencies
npm install
npx hardhat compile

2. Start the local blockchain
npx hardhat node
Keep this terminal running.

3. Deploy the smart contract
Open another terminal:
npx hardhat ignition deploy ./ignition/modules/Voting.js --network localhost

Copy the deployed contract address and update it inside:
frontend/src/App.jsx

4. Start the frontend
cd frontend
npm install
npm run dev

Open:
http://localhost:5173

🦊 MetaMask Network
Setting	            Value
Network Name	    Hardhat Localhost
RPC URL	          http://127.0.0.1:8545
Chain ID	        31337
Currency Symbol	  ETH

Import one of the test accounts displayed in the Hardhat terminal.

🧪 Testing
npx hardhat test
🛠️ Troubleshooting

When restarting the Hardhat blockchain, MetaMask may show an Internal JSON-RPC Error.

Go to: <br>
MetaMask → Settings → Advanced → Clear activity tab data

🔮 Future Improvements<br>

Sepolia testnet deployment<br>
Multiple elections<br>
Zero-knowledge voting<br>
Election analytics<br>
IPFS candidate data<br>
Improved smart contract testing<br>
