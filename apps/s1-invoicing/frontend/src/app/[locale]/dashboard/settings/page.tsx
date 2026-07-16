'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const t = useTranslations('Navigation');
  
  const [profile, setProfile] = useState({ name: '', address: '', email: '', phone: '' });
  const [fiscal, setFiscal] = useState({ nif: '', rc: '', nis: '', ai: '' });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const savedProfile = localStorage.getItem('companyProfile');
    const savedFiscal = localStorage.getItem('companyFiscal');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedFiscal) setFiscal(JSON.parse(savedFiscal));
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyProfile', JSON.stringify(profile));
    showSuccess();
  };

  const handleSaveFiscal = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyFiscal', JSON.stringify(fiscal));
    showSuccess();
  };

  const showSuccess = () => {
    setSaveStatus('Settings Saved Successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2>{t('settings')}</h2>
          <p>Configure your company details and invoicing preferences.</p>
        </div>
        {saveStatus && <span style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }} className="animate-fade-in">{saveStatus}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>Company Profile</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSaveProfile}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Company Name</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} placeholder="AutoSaaS SPA" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Address</label>
              <textarea className="search-bar" style={{ width: '100%', borderRadius: '8px', minHeight: '80px', padding: '1rem' }} value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} placeholder="123 Business Avenue, Algiers"></textarea>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Email</label>
                <input type="email" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} placeholder="contact@autosaas.dz" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Phone</label>
                <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="+213 550 00 00 00" />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Profile</button>
          </form>
        </section>

        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem' }}>Fiscal IDs (Algeria DGI)</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSaveFiscal}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>NIF (Numéro d'Identification Fiscale)</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={fiscal.nif} onChange={(e) => setFiscal({...fiscal, nif: e.target.value})} placeholder="00000000000000" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>RC (Registre de Commerce)</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={fiscal.rc} onChange={(e) => setFiscal({...fiscal, rc: e.target.value})} placeholder="16/00-0000000A20" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>NIS (Numéro d'Identification Statistique)</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={fiscal.nis} onChange={(e) => setFiscal({...fiscal, nis: e.target.value})} placeholder="00000000000000" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>AI (Article d'Imposition)</label>
              <input type="text" className="search-bar" style={{ width: '100%', borderRadius: '8px' }} value={fiscal.ai} onChange={(e) => setFiscal({...fiscal, ai: e.target.value})} placeholder="16000000000" />
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>Save Fiscal Data</button>
          </form>
        </section>
      </div>
    </div>
  );
}
