'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../../../navigation';
import { useEffect, useState } from 'react';

const DUMMY_INVOICES = [
  { id: 'FAC/2026/000142', client: 'Sonatrach SPA', date: '2026-07-05', amount: '450,000.00 د.ج', status: 'Paid' },
  { id: 'FAC/2026/000143', client: 'Cevital Group', date: '2026-07-06', amount: '825,500.00 د.ج', status: 'Pending' },
  { id: 'FAC/2026/000144', client: 'Ooredoo Algérie', date: '2026-07-06', amount: '212,000.00 د.ج', status: 'Pending' },
];

export default function InvoicesPage() {
  const t = useTranslations('Index');
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    // Load invoices from localStorage
    const saved = localStorage.getItem('invoices');
    if (saved) {
      const parsed = JSON.parse(saved);
      // If we have saved invoices, show them all (we could merge with dummy if we wanted)
      setInvoices(parsed.length > 0 ? parsed : DUMMY_INVOICES);
    } else {
      // First load, populate local storage with dummy data
      localStorage.setItem('invoices', JSON.stringify(DUMMY_INVOICES));
      setInvoices(DUMMY_INVOICES);
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>All Invoices</h2>
        <Link href="/invoices/new" className="btn-primary" style={{ textDecoration: 'none' }}>
          {t('create_invoice')}
        </Link>
      </div>

      <section className="glass-panel" style={{ padding: '1.5rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount (TTC)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
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
                <td>
                  <Link href={`/invoices/edit/${inv.id}`} className="btn-primary" style={{padding: '0.25rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none'}}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
