import { useTranslations } from 'next-intl';
import { Link } from '../../navigation';

export default function LandingPage() {
  const t = useTranslations('Index');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, background: 'linear-gradient(to right, var(--primary), #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AutoSaaS
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem' }}>Login / Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ padding: '6rem 5%', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }} className="animate-fade-in">
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 500 }}>
          🇩🇿 100% Compliant with Algeria DGI
        </div>
        <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Stop wasting time on <span style={{ color: 'var(--primary)' }}>Excel invoices.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Generate beautiful, legal, DGI-compliant invoices in 30 seconds. Automate your TVA, Timbre, and Client Management instantly.
        </p>
        <Link href="/login" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block' }}>Get Started Today</Link>
      </header>

      {/* Pricing Section */}
      <section style={{ padding: '5rem 5%', background: 'var(--surface)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Pay annually via CCP, BaridiMob, or Bank Transfer.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Tier 1 */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Perfect for freelancers</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>1,500 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>DA/mo</span></div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Billed 18,000 DA annually</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Up to 20 invoices/month</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Manage 10 clients</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Basic DGI templates</li>
            </ul>
            <Link href="/login" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Get Started</Link>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', borderColor: 'var(--primary)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>MOST POPULAR</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro (PME)</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>For growing agencies & SMEs</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>3,500 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>DA/mo</span></div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Billed 42,000 DA annually</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', fontWeight: 600 }}>✓ Unlimited Invoices</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Unlimited Clients</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Auto TVA & Tax Math</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Dashboard Analytics</li>
            </ul>
            <Link href="/login" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>Get Started</Link>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Agency</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>For Expert Comptables</p>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>9,900 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>DA/mo</span></div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Billed 118,800 DA annually</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Everything in Pro</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', fontWeight: 600 }}>✓ Multi-company management</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Custom branding</li>
              <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>✓ Priority Support</li>
            </ul>
            <Link href="/login" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Contact Sales</Link>
          </div>

        </div>
      </section>
      
      <footer style={{ padding: '3rem 5%', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>© 2026 AutoSaaS. Built for Algerian Businesses.</p>
      </footer>
    </div>
  );
}
