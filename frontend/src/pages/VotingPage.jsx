import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AnimatedCounter, ParticipationGauge } from '../components/DashboardMetrics';
import { CandidateModal } from '../components/CandidateModal';
import { ElectionTimer } from '../components/ElectionTimer';

function VotingPage({ chartData, statusMessage, handleVote, targetWhitelist, setTargetWhitelist, handleWhitelist, currentAccount, isDark, feed, triggerToast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const totalVotes = chartData.reduce((acc, curr) => acc + curr.votes, 0);
  const totalRegisteredVoters = 4; 
  const participationRate = totalRegisteredVoters > 0 ? ((totalVotes / totalRegisteredVoters) * 100) : 0;

  const filteredCandidates = chartData
    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "votes-high") return b.votes - a.votes;
      if (sortOrder === "votes-low") return a.votes - b.votes;
      if (sortOrder === "alpha") return a.name.localeCompare(b.name);
      return 0;
    });

  const exportResultsCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Candidate ID,Candidate Name,Votes Confirmed\n";
    chartData.forEach(c => { csvContent += `${c.id},${c.name},${c.votes}\n`; });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `VOTECHAIN_LEDGER_REPORT_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Election Dataset Report Exported Successfully (.CSV)", "success");
  };

  const theme = {
    cardBg: isDark ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
    border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)',
    text: isDark ? '#fff' : '#0f172a',
    subtext: isDark ? '#9ca3af' : '#475569'
  };

  return (
    <div style={{ padding: '30px 40px', position: 'relative', zIndex: 1, color: theme.text, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
      
      {/* ANCHOR TARGET FOR NAVBAR HOME LINK */}
      <div id="home" style={{ position: 'absolute', top: 0 }} />

      {/* FEATURE 1 — LIVE ELECTION STATUS PANEL */}
      <div className="glass-surface" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px 30px', background: theme.cardBg, borderColor: theme.border, flexWrap: 'wrap', gap: '15px' }}>
        <ElectionTimer />
        <button onClick={exportResultsCSV} className="btn-neon-glow" style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #7B61FF 0%, #00F5FF 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>
          💾 Export Data (.CSV)
        </button>
      </div>

      {/* FEATURE 13 — ANIMATED METRICS COUNTERS GRID PANEL */}
      <section id="dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px', position: 'relative' }}>
        {[
          { label: "Total Ballots Cast", val: totalVotes, desc: "On-chain block tallies", icon: "🗳️" },
          { label: "Registered Voters", val: totalRegisteredVoters, desc: "Authorized access signatures", icon: "🔑" },
          { label: "Consensus Node Count", val: chartData.length, desc: "Active candidate array items", icon: "📡" }
        ].map((card, idx) => (
          <div key={idx} className="glass-surface" style={{ padding: '25px', background: theme.cardBg, borderColor: theme.border, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '20px', right: '25px', fontSize: '24px', opacity: 0.15 }}>{card.icon}</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.subtext, fontWeight: 600, fontFamily: "'Orbitron', sans-serif" }}>{card.label}</span>
            <h2 style={{ fontSize: '32px', margin: '8px 0 4px 0', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, color: '#fff' }}>
              <AnimatedCounter value={card.val} />
            </h2>
            <span style={{ fontSize: '11px', color: theme.subtext }}>{card.desc}</span>
          </div>
        ))}
        <div className="glass-surface" style={{ padding: '10px 25px', background: theme.cardBg, borderColor: theme.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ParticipationGauge rate={participationRate} />
        </div>
      </section>

      {/* FEATURE 3 — WALLET INFORMATION STRIP */}
      <section style={{ marginBottom: '30px' }}>
        <div className="glass-surface" style={{ padding: '15px 30px', background: 'linear-gradient(135deg, rgba(123,97,255,0.03) 0%, rgba(0,245,255,0.02) 100%)', borderColor: theme.border, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
          <div>
            <h4 style={{ margin: '0', fontFamily: 'monospace', fontSize: '14px', color: '#00F5FF' }}>📍 {currentAccount}</h4>
          </div>
          <div style={{ display: 'flex', gap: '25px', fontSize: '12px' }}>
            <div><span style={{ opacity: 0.5 }}>Network:</span> <strong style={{ color: '#fff' }}>Hardhat Localhost (8545)</strong></div>
            <div><span style={{ opacity: 0.5 }}>Chain ID:</span> <strong style={{ color: '#fff', fontFamily: 'monospace' }}>31337</strong></div>
            <div><span style={{ opacity: 0.5 }}>Status:</span> <strong style={{ color: '#10b981' }}>🟢 Connected</strong></div>
          </div>
        </div>
      </section>

      {/* RECHARTS — GRAPHICAL ANALYTICS SECTION */}
      <section id="analytics" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.1fr', gap: '25px', marginBottom: '40px' }}>
        <div className="glass-surface" style={{ padding: '25px', background: theme.cardBg, borderColor: theme.border }}>
          <h3 style={{ margin: '0 0 20px 0', fontFamily: "'Orbitron', sans-serif", fontSize: '12px', color: theme.subtext, letterSpacing: '0.05em' }}>📊 LIVE BALLOT DISTRIBUTION</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -30, top: 10 }}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.01)' }} />
                <Bar dataKey="votes" fill="#7B61FF" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7B61FF' : '#00F5FF'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-surface" style={{ padding: '25px', background: theme.cardBg, borderColor: theme.border, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 10px 0', fontFamily: "'Orbitron', sans-serif", fontSize: '12px', color: theme.subtext, letterSpacing: '0.05em' }}>🍩 RECKONING INDICES</h3>
          <div style={{ width: '100%', height: '180px', margin: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="votes" nameKey="name" cx="50%" cy="50%" innerRadius={48} outerRadius={68} paddingAngle={5}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#7B61FF' : '#FF4D9D'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* FEATURE 11 — DYNAMIC SEARCH CONTROL & ARRAY FILTERS */}
      <section style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontFamily: "'Orbitron', sans-serif", fontSize: '15px', letterSpacing: '0.05em', color: '#fff' }}>🗳️ BALLOT CHANNEL TERMINALS</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" placeholder="Search candidate profile..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '13px', outline: 'none', minWidth: '220px' }}
            />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '13px', cursor: 'pointer', outline: 'none' }}>
              <option value="default">Default Sorting</option>
              <option value="votes-high">Most Votes</option>
              <option value="votes-low">Least Votes</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* FEATURE 4 & 5 — CANDIDATE PROFILE MATRIX */}
      <section id="candidates" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '40px', scrollMarginTop: '100px' }}>
        {filteredCandidates.map(candidate => {
          const pct = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0;
          return (
            <div key={candidate.id} className="glass-surface cyber-3d-lift" style={{ padding: '30px', background: theme.cardBg, borderColor: theme.border }}>
              
              <div onClick={() => setSelectedCandidate(candidate)} style={{ cursor: 'pointer' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: '#00F5FF', background: 'rgba(0,245,255,0.06)', padding: '4px 10px', borderRadius: '4px' }}>
                  NOMINEE MODULE #0{candidate.id}
                </span>
                <h4 style={{ fontSize: '20px', margin: '14px 0 5px 0', fontWeight: 700, color: '#fff', fontFamily: "'Orbitron', sans-serif" }}>{candidate.name}</h4>
              </div>

              {/* FEATURE 5 — ADVANCED SHIMMER PROGRESS BARS */}
              <div style={{ margin: '20px 0 25px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontFamily: "'Orbitron', sans-serif" }}>
                  <span style={{ opacity: 0.5 }}>Tally Weight</span>
                  <span style={{ color: '#00F5FF', fontWeight: 600 }}>{candidate.votes} Ballots ({pct}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="progress-shimmer-bar" style={{ width: `${pct}%`, height: '100%', borderRadius: '4px', transition: 'width 0.8s ease-in-out' }} />
                </div>
              </div>

              <button onClick={() => handleVote(candidate.id, candidate.name)} className="btn-neon-glow" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #7B61FF 0%, #00F5FF 100%)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>
                Cast Cryptographic Vote
              </button>
            </div>
          );
        })}
      </section>

      {/* STREAMLINED SINGLE ADMIN CONTROL CARD */}
      <section id="security" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
        <div className="glass-surface" style={{ padding: '30px', background: theme.cardBg, borderColor: theme.border }}>
          <h3 style={{ margin: '0 0 6px 0', fontFamily: "'Orbitron', sans-serif", fontSize: '15px', color: '#fff' }}>🔐 Key Verification Authorization Desk</h3>
          <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
            <input type="text" placeholder="Authorize public HEX address key (0x...)" value={targetWhitelist} onChange={(e) => setTargetWhitelist(e.target.value)}
              style={{ flex: '1', padding: '14px 16px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }} />
            <button onClick={handleWhitelist} className="btn-neon-glow" style={{ padding: '0 25px', background: '#fff', color: '#0A0F1F', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
              Grant Clearance
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE 2 — REAL-TIME TRANSACTION FEED LOG LEDGER */}
      <section id="activity" className="glass-surface" style={{ padding: '30px', background: theme.cardBg, borderColor: theme.border, marginBottom: '20px', scrollMarginTop: '100px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontFamily: "'Orbitron', sans-serif", fontSize: '15px', color: '#fff', letterSpacing: '0.05em' }}>⛓️ REAL-TIME BLOCKCHAIN TRANSACTION RECENT FEED LOG</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '280px', overflowY: 'auto', paddingRight: '5px' }}>
          {feed.length === 0 ? (
            <p style={{ fontSize: '13px', opacity: 0.4, fontStyle: 'italic', margin: 0 }}>Awaiting incoming network blocks stream metrics propagation loops...</p>
          ) : (
            feed.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', background: 'rgba(255,255,255,0.01)', borderLeft: `4px solid ${log.type === 'vote' ? '#FF4D9D' : '#00F5FF'}`, borderRadius: '0 6px 6px 0' }}>
                <div>
                  <strong style={{ fontSize: '13px', display: 'block', color: '#fff' }}>✓ {log.message} confirmed</strong>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.5 }}>Block Signature: {log.hash} | Target Height Index: #{log.block}</span>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.4 }}>{log.time}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* FEATURE 4 — PROFILE INTERCEPTOR LIGHTBOX */}
      <CandidateModal isOpen={!!selectedCandidate} candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} isDark={isDark} />

      {/* FEATURE 15 — PROFESSIONAL FOOTER BRAND BLOCK */}
      <footer id="about" style={{ marginTop: '100px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', gap: '20px', fontSize: '12px', opacity: 0.5, flexWrap: 'wrap' }}>
        <div>
          <h5 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', margin: '0 0 4px 0', color: '#00F5FF', fontWeight: 900 }}>🛡️ VOTE.CHAIN</h5>
          <p style={{ margin: 0 }}>Secure Decentralized Corporate Voting Infrastructure Core Protocol Platform.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 4px 0' }}>Architecture Layers: <strong>React • Solidity • Hardhat • MetaMask • Ethereum</strong></p>
          <p style={{ margin: 0 }}>Developed By: <strong>Gayatri Bhakta</strong> • © 2026 All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default VotingPage;