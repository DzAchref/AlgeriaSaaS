'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function ClientsPage() {
  const t = useTranslations('Navigation');
  const [clients, setClients] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('clients');
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;

    const newClient = {
      id: Date.now().toString(),
      name: newClientName,
      email: newClientEmail || 'N/A',
      added: new Date().toISOString().split('T')[0]
    };

    const updated = [newClient, ...clients];
    setClients(updated);
    localStorage.setItem('clients', JSON.stringify(updated));
    
    setNewClientName('');
    setNewClientEmail('');
    setShowAddForm(false);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>{t('clients')}</h2>
          <p>Manage your client database here.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add Client'}
        </button>
      </div>

      {showAddForm && (
        <section className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Client</h3>
          <form style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }} onSubmit={handleAddClient}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Client Name</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={newClientName} onChange={(e) => setNewClientName(e.target.value)} required />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Email Address</label>
              <input type="email" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={newClientEmail} onChange={(e) => setNewClientEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Save</button>
          </form>
        </section>
      )}

      {clients.length > 0 ? (
        <section className="glass-panel" style={{ padding: '1.5rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email Address</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td style={{ fontWeight: 500 }}>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <h3 style={{ marginBottom: '0.5rem' }}>No clients found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't added any clients to your database yet.</p>
        </section>
      )}
    </div>
  );
}
