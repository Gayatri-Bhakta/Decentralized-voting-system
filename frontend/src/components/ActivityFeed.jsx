import React from 'react';

function ActivityFeed({ feed, isDark }) {
  return (
    <div style={{
      background: isDark ? '#111827' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      borderRadius: '16px', padding: '25px', fontFamily: "'Poppins', sans-serif"
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontFamily: "'Orbitron', sans-serif", fontSize: '16px', color: isDark ? '#fff' : '#0f172a' }}>
        ⛓ Block Registry Live Activity Feed
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '320px', overflowY: 'auto', paddingRight: '5px' }}>
        {feed.length === 0 ? (
          <p style={{ fontSize: '13px', opacity: 0.5, fontStyle: 'italic', margin: 0 }}>Awaiting node data propagation loops...</p>
        ) : (
          feed.map(log => (
            <div key={log.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
              borderLeft: `3px solid ${log.type === 'vote' ? '#00F5FF' : '#7B61FF'}`, borderRadius: '0 8px 8px 0'
            }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 500, color: isDark ? '#fff' : '#0f172a', display: 'block' }}>{log.message}</span>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.5 }}>Addr: {log.address.slice(0, 8)}...{log.address.slice(-6)}</span>
              </div>
              <span style={{ fontSize: '11px', opacity: 0.4, fontFamily: 'monospace' }}>{log.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivityFeed;