import React, { useState, useEffect } from 'react';

function LoadingScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Initializing Blockchain Ledger Subsystems...",
    "Connecting Local Node Smart Contract Gateways...",
    "Synchronizing Distributed Cryptographic Ledgers...",
    "Mapping Candidate Identity Structures...",
    "System Verified. Ready."
  ];

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const delay = currentStep === 2 ? 1000 : 600; // Simulate slightly longer lookup for network synchronization
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => onComplete(), 500);
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: '#0A0F1F', zIndex: 9999, display: 'flex',
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      fontFamily: "'Orbitron', sans-serif", color: '#fff'
    }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        border: '3px solid rgba(123, 97, 255, 0.1)', borderTopColor: '#00F5FF',
        animation: 'spin-slow 1s linear infinite', marginBottom: '30px'
      }} />
      
      <div style={{ width: '300px', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{
          width: `${((currentStep + 1) / steps.length) * 100}%`,
          height: '100%', background: 'linear-gradient(90deg, #7B61FF, #00F5FF)',
          transition: 'width 0.4s ease'
        }} />
      </div>

      <p style={{
        fontSize: '13px', letterSpacing: '0.05em', color: '#00F5FF',
        textShadow: '0 0 8px rgba(0, 245, 255, 0.4)', textAlign: 'center', minHeight: '20px'
      }}>
        {steps[currentStep]}
      </p>
    </div>
  );
}

export default LoadingScreen;