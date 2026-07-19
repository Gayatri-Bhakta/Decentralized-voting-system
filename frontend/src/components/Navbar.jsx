import React from 'react';

function Navbar({ currentAccount, isDark, setIsDark, onDisconnect, onScrollTo }) {
  const theme = {
    bg: isDark ? 'rgba(10, 15, 31, 0.75)' : 'rgba(248, 250, 252, 0.8)',
    border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    text: isDark ? '#fff' : '#0f172a'
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky', top: 0, zIndex: 1000, display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px',
      background: theme.bg, borderBottom: `1px solid ${theme.border}`, borderRadius: '0',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Brand Logo Link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => onScrollTo('home')}>
        <span style={{
          background: 'linear-gradient(135deg, #00F5FF 0%, #7B61FF 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          fontFamily: "'Orbitron', sans-serif", fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-0.02em'
        }}>🛡 VOTE.CHAIN</span>
      </div>

      {/* FIXED CLICK ROUTERS FOR THE WORDS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 500 }}>
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'candidates', label: 'Candidates' },
          { id: 'security', label: 'Security' },
          { id: 'activity', label: 'Ledger' }
        ].map(tab => (
          <span 
            key={tab.id} 
            onClick={() => onScrollTo(tab.id)} // Calls the smooth scroll engine directly
            style={{ 
              color: theme.text, 
              opacity: 0.7, 
              cursor: 'pointer', 
              transition: 'opacity 0.2s',
              paddingBottom: '4px'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.7'}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={() => setIsDark(!isDark)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: theme.text }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {currentAccount && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(0, 245, 255, 0.05)', border: '1px solid #00F5FF', borderRadius: '6px',
              padding: '6px 14px', fontSize: '12px', fontFamily: 'monospace', color: '#00F5FF'
            }}>
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </div>
            <button 
              onClick={onDisconnect}
              style={{
                background: 'rgba(255, 77, 157, 0.1)', border: '1px solid #FF4D9D',
                borderRadius: '6px', color: '#FF4D9D', padding: '6px 12px', fontSize: '12px', cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;