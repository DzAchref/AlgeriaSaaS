'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '../../../../../../../navigation';
import { useState, useEffect } from 'react';

export default function EditInvoicePage({ params }: { params: { id: string[] } }) {
  const t = useTranslations('Index');
  const router = useRouter();

  const invoiceId = params.id.join('/'); // Reconstruct ID from catch-all route

  const [clientName, setClientName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load specific invoice from localStorage
    const saved = localStorage.getItem('invoices');
    if (saved) {
      const invoices = JSON.parse(saved);
      const invoice = invoices.find((inv: any) => inv.id === invoiceId);
      if (invoice) {
        setClientName(invoice.client);
        setDate(invoice.date);
        setAmount(invoice.amount.replace(/[^0-9.-]+/g,"")); // Strip non-numeric characters for input
      }
    }
    setIsLoading(false);
  }, [invoiceId]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount || !date) {
      alert("Please fill in Client Name, Date, and Unit Price.");
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      const updatedInvoice = {
        id: invoiceId,
        client: clientName,
        date: date,
        amount: parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' د.ج',
        status: 'Pending' // Could add a status dropdown, but keeping it simple
      };

      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const updatedInvoices = existingInvoices.map((inv: any) => 
        inv.id === invoiceId ? updatedInvoice : inv
      );
      
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      router.push('/invoices');
    }, 500);
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading invoice...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h2>Edit Invoice: {invoiceId}</h2>
        <p>Modify the details of your DGI compliant invoice.</p>
      </div>

      <section className="glass-panel" style={{ padding: '2rem', maxWidth: '800px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleUpdate}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Client Name</label>
              <input type="text" className="search-bar" style={{ width: '100%' }} value={clientName} onChange={(e) => setClientName(e.target.value)} required />
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
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
            <Link href="/invoices" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--surface-border)', boxShadow: 'none', textDecoration: 'none' }}>Cancel</Link>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? 'Updating...' : 'Update Invoice'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
