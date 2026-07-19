import React, { useEffect } from 'react';

export function ToastNotification({ toasts, removeToast }) {
  return (
    <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 10000, display: 'flex', flexDirection: 'column', gap: '12px', width: '320px' }}>
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} removeToast={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  const isSuccess = toast.type === 'success';
  return (
    <div className="toast-entry" style={{
      background: 'rgba(17, 24, 39, 0.9)', backdropFilter: 'blur(12px)',
      border: `1px solid ${isSuccess ? '#10b981' : '#ef4444'}`, borderRadius: '10px',
      padding: '16px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', gap: '12px'
    }}>
      <span style={{ fontSize: '18px' }}>{isSuccess ? '⚡' : '❌'}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>{toast.message}</p>
      </div>
      <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.5, cursor: 'pointer' }}>×</button>
    </div>
  );
}