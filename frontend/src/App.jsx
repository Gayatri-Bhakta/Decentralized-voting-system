import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Global Infrastructure Sub-Modules
import Navbar from './components/Navbar';
import ParticleBg from './components/ParticleBg';
import LoadingScreen from './components/LoadingScreen';
import ReceiptModal from './components/ReceiptModal';
import { ToastNotification } from './components/ToastNotification';
import { FloatingStatus } from './components/FloatingStatus';

// Portal Workspace View Panes
import ConnectPage from './pages/ConnectPage';
import VotingPage from './pages/VotingPage';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  { "inputs": [{ "internalType": "string[]", "name": "_candidateNames", "type": "string[]" }, { "internalType": "uint256", "name": "_durationInMinutes", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "candidateId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newVoteCount", "type": "uint256" }], "name": "VoteCast", "type": "event" },
  { "inputs": [], "name": "candidateCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "candidates", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }], "name": "castVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }], "name": "getCandidate", "outputs": [{ "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" }], "internalType": "struct DecentralizedVoting.Candidate", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_voter", "type": "address" }], "name": "whitelistVoter", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme-matrix') !== 'light');
  const [currentAccount, setCurrentAccount] = useState("");
  const [statusMessage, setStatusMessage] = useState("Handshake initialized...");
  const [chartData, setChartData] = useState([]);
  const [targetWhitelist, setTargetWhitelist] = useState("");
  const [toasts, setToasts] = useState([]);
  const [feed, setFeed] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState({ hash: "", block: "", name: "" });

  const triggerToast = (message, type = 'success') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addLog = (message, type = 'system') => {
    const timeString = new Date().toLocaleTimeString();
    setFeed(prev => [{ id: Date.now(), message, type, hash: "0x" + Math.random().toString(16).slice(2, 10) + "...committed", block: Math.floor(Math.random() * 215 + 7430), time: timeString }, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem('theme-matrix', isDark ? 'dark' : 'light');
  }, [isDark]);

  // REMOVED THE BACKGROUND SILENT eth_accounts LOGIN INTERCEPTOR 
  // This explicitly forces the client to use your connection page view.

  const connectWallet = async () => {
    if (!window.ethereum) {
      triggerToast("MetaMask core architecture missing", "error");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      triggerToast("Wallet Session Signature Connected", "success");
      addLog("Wallet connection established to node parameters", "system");
      await syncLedgerState(provider);
    } catch (err) {
      setStatusMessage("Handshake rejected.");
    }
  };

  const syncLedgerState = async (provider) => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const count = await contract.candidateCount();
      const items = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.getCandidate(i);
        items.push({ id: Number(candidate.id), name: candidate.name, votes: Number(candidate.voteCount) });
      }
      setChartData(items);
      setStatusMessage("Node synchronization complete.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Data compilation error on-chain.");
    }
  };

  useEffect(() => {
    if (!window.ethereum || !currentAccount) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    const handleLiveVote = (candidateId, newVoteCount) => {
      setChartData(prev => prev.map(item => item.id === Number(candidateId) ? { ...item, votes: Number(newVoteCount) } : item));
      triggerToast("On-Chain Ledger State Updated", "success");
    };

    contract.on("VoteCast", handleLiveVote);
    return () => { contract.off("VoteCast", handleLiveVote); };
  }, [currentAccount]);

  const handleWhitelist = async () => {
    if (!targetWhitelist) return;
    try {
      setStatusMessage("Broadcasting identity authorization data packet...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.whitelistVoter(targetWhitelist);
      await tx.wait();
      
      triggerToast("Voter Authorization State Committed Natively", "success");
      addLog("Granted structural access to citizen target wallet key", "system");
      setStatusMessage(`Cleared: ${targetWhitelist}`);
      setTargetWhitelist("");
    } catch (err) {
      triggerToast("Action Denied: Role Authorization Validation Failure", "error");
    }
  };

  const handleVote = async (candidateId, candidateName) => {
    try {
      setStatusMessage("Initiating signature validation parameters...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.castVote(candidateId);
      await tx.wait();
      
      const receipt = await provider.getTransactionReceipt(tx.hash);
      setReceiptData({ hash: tx.hash, block: receipt.blockNumber.toString(), name: candidateName });
      
      setModalOpen(true);
      triggerToast("Ballot Cast Confirmed", "success");
      addLog(`Cryptographic ballot executed successfully for ID 0${candidateId}`, "vote");
      
      await syncLedgerState(provider);
    } catch (err) {
      triggerToast("Ballot Fault: Signature duplicate or key lacks clearance", "error");
    }
  };

  return (
    <div style={{ backgroundColor: isDark ? '#0A0F1F' : '#f8fafc', minHeight: '100vh', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ParticleBg isDark={isDark} />
      <Navbar currentAccount={currentAccount} isDark={isDark} setIsDark={setIsDark} onDisconnect={() => setCurrentAccount("")} onScrollTo={(id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />
      
      {!currentAccount ? (
        <ConnectPage onConnect={connectWallet} status={statusMessage} isDark={isDark} />
      ) : (
        <VotingPage 
          chartData={chartData} statusMessage={statusMessage} handleVote={handleVote}
          targetWhitelist={targetWhitelist} setTargetWhitelist={setTargetWhitelist}
          handleWhitelist={handleWhitelist} currentAccount={currentAccount} isDark={isDark} 
          triggerToast={triggerToast} feed={feed}
        />
      )}

      <FloatingStatus isConnected={!!currentAccount} statusMessage={statusMessage} />
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      <ReceiptModal isOpen={modalOpen} txHash={receiptData.hash} blockNumber={receiptData.block} candidateName={receiptData.name} onClose={() => setModalOpen(false)} isDark={isDark} />
    </div>
  );
}

export default App;