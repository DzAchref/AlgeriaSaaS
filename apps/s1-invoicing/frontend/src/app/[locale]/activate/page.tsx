'use client';

import { useState } from 'react';
import { useRouter } from '../../../navigation';
import { useSession } from 'next-auth/react';

export default function ActivatePage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.success) {
        await update(); // Refresh session so isActivated becomes true
        router.push('/dashboard');
      } else {
        setError(data.error || 'Invalid code');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2rem', color: 'var(--text-main)' }}>Activate Account</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Welcome, {session?.user?.name || session?.user?.email}! Please enter your single-use Access Code to activate your account.
        </p>
        
        <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="e.g. AUTOSAAS-XXXX" 
            style={{ width: '100%', borderRadius: '8px', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
            required
          />
          {error && <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Activate & Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
