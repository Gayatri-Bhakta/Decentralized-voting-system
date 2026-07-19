import React from 'react';

function ConnectPage({ onConnect, status, isDark }) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', padding: '0 20px',
      textAlign: 'center', position: 'relative', zIndex: 1, color: isDark ? '#fff' : '#0f172a'
    }}>
      <div style={{
        background: isDark ? 'rgba(17, 24, 39, 0.4)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        padding: '50px 40px', borderRadius: '24px', maxWidth: '600px',
        boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.3)' : '0 15px 35px rgba(0,0,0,0.05)'
      }} className="glass-panel">
        <span style={{
          fontSize: '11px', letterSpacing: '0.15em', fontWeight: 'bold',
          color: isDark ? '#00F5FF' : '#7B61FF', textTransform: 'uppercase',
          background: isDark ? 'rgba(0, 245, 255, 0.08)' : 'rgba(123, 97, 255, 0.08)',
          padding: '6px 16px', borderRadius: '30px', border: `1px solid ${isDark ? 'rgba(0, 245, 255, 0.2)' : 'rgba(123, 97, 255, 0.2)'}`
        }}>
          NATIVE ETHEREUM CORE NODE PROTOCOL
        </span>
        
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '3rem', fontWeight: 900,
          margin: '25px 0 10px 0', letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #fff 30%, #a855f7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: isDark ? 'transparent' : 'inherit'
        }}>
          🛡 VOTE.CHAIN
        </h1>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: isDark ? '#9ca3af' : '#475569', margin: '0 0 20px 0' }}>
          Secure • Transparent • Tamper-Proof Voting
        </h2>
        
        <p style={{ fontSize: '15px', opacity: 0.7, lineHeight: '1.6', margin: '0 auto 35px auto', maxWidth: '480px' }}>
          Eliminating election fraud through decentralized, immutable, and transparent blockchain voting infrastructures.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={onConnect}
            style={{
              padding: '14px 35px', background: 'linear-gradient(135deg, #7B61FF 0%, #00F5FF 100%)',
              color: '#fff', fontWeight: 'bold', fontSize: '15px', border: 'none',
              borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 20px rgba(123, 97, 255, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Connect MetaMask Ledger
          </button>
        </div>

        <p style={{ marginTop: '25px', color: isDark ? '#00F5FF' : '#7B61FF', fontSize: '12px', fontFamily: 'monospace' }}>
          Node Connectivity Monitor: {status}
        </p>
      </div>
    </div>
  );
}

export default ConnectPage;