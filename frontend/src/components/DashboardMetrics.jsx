import React, { useState, useEffect } from 'react';

export function AnimatedCounter({ value, duration = 1000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const endValue = parseFloat(value) || 0;
    if (endValue === 0) return;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPct = Math.min(progress / duration, 1);
      
      // Ease out quad formula
      const easeValue = progressPct * (2 - progressPct);
      setCount(Math.floor(easeValue * endValue));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
}

export function ParticipationGauge({ rate }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={radius} fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
        <circle cx="70" cy="70" r={radius} fill="transparent" stroke="url(#cyanPurpleGrad)" strokeWidth="8" 
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
        <defs>
          <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', fontFamily: "'Orbitron', sans-serif", textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700 }}><AnimatedCounter value={rate} suffix="%" /></h3>
        <span style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Participation</span>
      </div>
    </div>
  );
}