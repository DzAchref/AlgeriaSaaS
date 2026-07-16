'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '../../../../../../navigation';
import { useState } from 'react';

export default function NewInvoicePage() {
  const t = useTranslations('Index');
  const router = useRouter();

  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount || !date) {
      alert("Please fill in Client Name, Date, and Unit Price.");
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      const invoiceNum = `FAC/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}`;
      const newInvoice = {
        id: invoiceNum,
        client: clientName,
        date: date,
        amount: parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' د.ج',
        status: 'Pending'
      };

      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      localStorage.setItem('invoices', JSON.stringify([newInvoice, ...existingInvoices]));

      router.push('/invoices');
    }, 800);
  };

  // Load company profile for the print header
  const companyProfile = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('companyProfile') || '{"name": "Your Company", "address": "Address here"}') : null;
  const companyFiscal = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('companyFiscal') || '{"nif": "000", "rc": "000"}') : null;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }} className="no-print">
        <h2>{t('create_invoice')}</h2>
        <p>Fill out the details to generate a new DGI compliant invoice.</p>
      </div>

      <section className="glass-panel invoice-sheet" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Print Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--surface-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{companyProfile?.name || 'AutoSaaS SPA'}</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{companyProfile?.address || 'Algiers, Algeria'}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              NIF: {companyFiscal?.nif} | RC: {companyFiscal?.rc}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>INVOICE</h1>
            <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>Date: {date || 'YYYY-MM-DD'}</p>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSave}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Client Name</label>
              <input type="text" className="search-bar" style={{ width: '100%' }} placeholder="e.g. Sonatrach SPA" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Client NIF / RC</label>
              <input type="text" className="search-bar" style={{ width: '100%' }} placeholder="Tax ID Number" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Invoice Date</label>
              <input type="date" className="search-bar" style={{ width: '100%' }} value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Due Date</label>
              <input type="date" className="search-bar" style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Line Items</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <input type="text" className="search-bar" style={{ width: '100%' }} placeholder="Description" />
              <input type="number" className="search-bar" style={{ width: '100%' }} placeholder="Qty" defaultValue={1} />
              <input type="number" className="search-bar" style={{ width: '100%' }} placeholder="Unit Price (HT)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="button" className="btn-primary" style={{ background: 'var(--surface-hover)', color: 'var(--text-main)', boxShadow: 'none' }}>
              + Add Item
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <Link href="/invoices" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--surface-border)', boxShadow: 'none', textDecoration: 'none' }}>Cancel</Link>
            <button type="button" className="btn-primary" style={{ background: 'var(--surface-border)', color: 'var(--text-main)', boxShadow: 'none' }} onClick={() => window.print()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print
            </button>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Generate & Save Invoice'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
