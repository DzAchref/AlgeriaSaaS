import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '../navigation';

export default function Topbar() {
  const t = useTranslations('Index');

  return (
    <header className="topbar animate-fade-in">
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <input type="text" placeholder="Search invoices, clients..." className="search-bar" />
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link href="/invoices/new" className="btn-primary" style={{ textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          {t('create_invoice')}
        </Link>
      </div>
    </header>
  );
}
