'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '../../../../navigation';

export default function Home() {
  const t = useTranslations('Index');
  
  const [invoices, setInvoices] = useState<any[]>([]);
  const [stats, setStats] = useState({ ht: 0, tva: 0, ttc: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('invoices');
    if (saved) {
      const parsed = JSON.parse(saved);
      setInvoices(parsed);
      
      // Calculate totals
      let totalHT = 0;
      parsed.forEach((inv: any) => {
        // Strip the currency symbol and commas to get the raw number
        const val = parseFloat(inv.amount.replace(/[^0-9.-]+/g,""));
        if (!isNaN(val)) totalHT += val;
      });
      
      const totalTVA = totalHT * 0.19; // 19% TVA
      const totalTTC = totalHT + totalTVA;
      
      setStats({ ht: totalHT, tva: totalTVA, ttc: totalTTC });
    }
  }, []);

  return (
    <>
      <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
        <h1>{t('description')}</h1>
        <p>Welcome back! Here's your financial overview.</p>
      </div>

      {/* Dashboard Stats */}
      <section className="stats-grid">
        <div className="glass-card animate-fade-in delay-1">
          <div className="stat-label">{t('total_ht')}</div>
          <div className="stat-value">{stats.ht.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style={{fontSize: '1rem', color: 'var(--primary)'}}>د.ج</span></div>
        </div>
        
        <div className="glass-card animate-fade-in delay-2">
          <div className="stat-label">{t('tva')} (19%)</div>
          <div className="stat-value">{stats.tva.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style={{fontSize: '1rem', color: 'var(--primary)'}}>د.ج</span></div>
        </div>
        
        <div className="glass-card animate-fade-in delay-3">
          <div className="stat-label">{t('total_ttc')}</div>
          <div className="stat-value">{stats.ttc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span style={{fontSize: '1rem', color: 'var(--primary)'}}>د.ج</span></div>
        </div>
      </section>

      {/* Recent Invoices Table Area */}
      <section className="glass-panel animate-fade-in delay-3" style={{ padding: '1.5rem', marginTop: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Invoices</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount (TTC)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.slice(0, 5).map((inv) => (
              <tr key={inv.id}>
                <td style={{fontWeight: 500}}>{inv.id}</td>
                <td>{inv.client}</td>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td>
                  <span className={`status-badge status-${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No invoices found. Generate your first invoice!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
