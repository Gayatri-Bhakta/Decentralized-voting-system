import React, { useState, useEffect } from 'react';

export function ElectionTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 12, minutes: 15, seconds: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (num) => String(num).padStart(2, '0');

  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontFamily: "'Orbitron', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span className="pulse-node" style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700, letterSpacing: '0.05em' }}>ELECTION ACTIVE</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#fff' }}>
        {[`${format(timeLeft.days)}d`, `${format(timeLeft.hours)}h`, `${format(timeLeft.minutes)}m`, `${format(timeLeft.seconds)}s`].map((t, i) => (
          <span key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', fontWeight: 700 }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}