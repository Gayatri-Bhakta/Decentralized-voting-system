import React from 'react';

export function CandidateModal({ isOpen, candidate, onClose, isDark }) {
  if (!isOpen || !candidate) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(5, 10, 25, 0.85)', zIndex: 9000, display: 'flex',
      justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        background: isDark ? 'linear-gradient(180deg, #111827 0%, #0A0F1F 100%)' : '#fff',
        border: '1px solid rgba(0, 245, 255, 0.2)', borderRadius: '20px', padding: '40px',
        width: '90%', maxWidth: '540px', color: isDark ? '#fff' : '#0f172a',
        fontFamily: "'Poppins', sans-serif", position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'inherit', fontSize: '24px', cursor: 'pointer', opacity: 0.6 }}>×</button>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #7B61FF, #00F5FF)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '28px' }}>👤</div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: "'Orbitron', sans-serif", color: '#00F5FF', background: 'rgba(0,245,255,0.08)', padding: '3px 8px', borderRadius: '4px' }}>VERIFIED NOMINEE</span>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '24px', margin: '5px 0 0 0' }}>{candidate.name}</h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          <div>
            <span style={{ fontSize: '11px', opacity: 0.5, textTransform: 'uppercase' }}>Campaign Framework Bio</span>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8, lineHeight: '1.5' }}>
              Advancing decentralized performance infrastructure optimizations, supporting zero-knowledge privacy layers, and securing scalable, open-source protocol consensus layers across public systems.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '10px', marginTop: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', opacity: 0.5, display: 'block' }}>BLOCKCHAIN SIGNATURE</span>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#7B61FF' }}>ed25519_sig_v2_{candidate.id}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', opacity: 0.5, display: 'block' }}>TOTAL BALLOTS SECURED</span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, color: '#00F5FF' }}>{candidate.votes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}