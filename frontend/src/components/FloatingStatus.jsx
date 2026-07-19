import React from 'react';

export function FloatingStatus({ isConnected, statusMessage }) {
  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 8000,
      background: 'rgba(10, 15, 31, 0.85)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px 20px',
      width: '240px', fontFamily: 'sans-serif', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontFamily: 'sans-serif', fontSize: '11px', color: '#9ca3af', letterSpacing: '0.05em' }}>SYSTEM STATE</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Contract Node</span> <span style={{ color: '#00F5FF', fontWeight: 600 }}>● Online</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Wallet Client</span> <span style={{ color: isConnected ? '#10b981' : '#ef4444', fontWeight: 600 }}>{isConnected ? '● Secure' : '○ Locked'}</span>
        </div>
      </div>
    </div>
  );
}