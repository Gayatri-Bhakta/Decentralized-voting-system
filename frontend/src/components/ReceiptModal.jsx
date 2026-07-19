import React, { useEffect } from 'react';

function ReceiptModal({ isOpen, txHash, blockNumber, candidateName, onClose, isDark }) {
  useEffect(() => {
    if (isOpen) {
      // CSS Injection for modal open scaling
      const styleSheet = document.createElement("style");
      styleSheet.innerText = `
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-animate { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `;
      document.head.appendChild(styleSheet);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(3, 7, 18, 0.85)', zIndex: 5000, display: 'flex',
      justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)'
    }}>
      <div className="modal-animate" style={{
        background: isDark ? '#111827' : '#ffffff',
        border: `1px solid ${isDark ? '#00F5FF' : '#7B61FF'}`,
        borderRadius: '16px', padding: '35px', width: '90%', maxWidth: '480px',
        boxShadow: isDark ? '0 0 40px rgba(0, 245, 255, 0.15)' : '0 10px 30px rgba(0,0,0,0.1)',
        color: isDark ? '#fff' : '#0f172a', fontFamily: "'Poppins', sans-serif"
      }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
            border: '2px solid #10b981', display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontSize: '24px', margin: '0 auto 15px auto'
          }}>✓</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '20px', margin: 0, color: isDark ? '#00F5FF' : '#7B61FF' }}>
            Ballot Finalized Natively
          </h2>
          <p style={{ fontSize: '13px', opacity: 0.7, margin: '5px 0 0 0' }}>Cryptographic verification block established</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', padding: '20px', borderRadius: '10px', fontSize: '13px' }}>
          <div>
            <span style={{ opacity: 0.6, display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Ballot Selection</span>
            <span style={{ fontWeight: 600, color: '#10b981' }}>{candidateName}</span>
          </div>
          <div>
            <span style={{ opacity: 0.6, display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Transaction Hash</span>
            <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{txHash || "0x5c42a2...462e"}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ opacity: 0.6, display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Block Height</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{blockNumber || "31337"}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ opacity: 0.6, display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Signature Protocol</span>
              <span style={{ color: '#7B61FF', fontWeight: 600 }}>ECDSA Secp256k1</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            width: '100%', padding: '12px', background: 'linear-gradient(135deg, #7B61FF 0%, #00F5FF 100%)',
            color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontWeight: 600, marginTop: '25px', fontSize: '14px'
          }}
        >
          Acknowledge & Sync Feed
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;