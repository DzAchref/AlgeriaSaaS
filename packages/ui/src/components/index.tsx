import React from 'react';

// ============================================
// Algeria SaaS — Shared UI Components
// RTL-Ready, Bilingual (Arabic/French)
// ============================================

// ---- Layout Components ----

interface DirectionalLayoutProps {
  locale: 'fr-DZ' | 'ar-DZ';
  children: React.ReactNode;
  className?: string;
}

/**
 * Root layout wrapper that sets text direction (RTL/LTR) based on locale
 */
export const DirectionalLayout: React.FC<DirectionalLayoutProps> = ({ locale, children, className }) => {
  const dir = locale === 'ar-DZ' ? 'rtl' : 'ltr';
  const lang = locale === 'ar-DZ' ? 'ar' : 'fr';

  return (
    <div dir={dir} lang={lang} className={`directional-layout ${className || ''}`}>
      {children}
    </div>
  );
};

// ---- Button Component ----

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const baseClass = 'saas-btn';
  const classes = [baseClass, `${baseClass}--${variant}`, `${baseClass}--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className="saas-btn__spinner" /> : children}
    </button>
  );
};

// ---- Input Component ----

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelAr?: string;
  locale?: 'fr-DZ' | 'ar-DZ';
  error?: string;
  errorAr?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  labelAr,
  locale = 'fr-DZ',
  error,
  errorAr,
  helperText,
  className,
  id,
  ...props
}) => {
  const displayLabel = locale === 'ar-DZ' && labelAr ? labelAr : label;
  const displayError = locale === 'ar-DZ' && errorAr ? errorAr : error;
  const inputId = id || `input-${label?.replace(/\s/g, '-').toLowerCase()}`;

  return (
    <div className={`saas-input-group ${error ? 'saas-input-group--error' : ''} ${className || ''}`}>
      {displayLabel && (
        <label htmlFor={inputId} className="saas-input-group__label">
          {displayLabel}
        </label>
      )}
      <input id={inputId} className="saas-input-group__input" {...props} />
      {displayError && <span className="saas-input-group__error">{displayError}</span>}
      {helperText && !displayError && (
        <span className="saas-input-group__helper">{helperText}</span>
      )}
    </div>
  );
};

// ---- Card Component ----

interface CardProps {
  title?: string;
  titleAr?: string;
  locale?: 'fr-DZ' | 'ar-DZ';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  titleAr,
  locale = 'fr-DZ',
  children,
  className,
  onClick,
}) => {
  const displayTitle = locale === 'ar-DZ' && titleAr ? titleAr : title;

  return (
    <div
      className={`saas-card ${onClick ? 'saas-card--clickable' : ''} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {displayTitle && <h3 className="saas-card__title">{displayTitle}</h3>}
      <div className="saas-card__content">{children}</div>
    </div>
  );
};

// ---- Amount Display (DZD) ----

interface AmountProps {
  value: number;
  locale?: 'fr-DZ' | 'ar-DZ';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Amount: React.FC<AmountProps> = ({ value, locale = 'fr-DZ', size = 'md', className }) => {
  const formatted = new Intl.NumberFormat(locale === 'ar-DZ' ? 'ar-DZ' : 'fr-DZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const symbol = 'د.ج';

  return (
    <span className={`saas-amount saas-amount--${size} ${className || ''}`}>
      {locale === 'ar-DZ' ? `${formatted} ${symbol}` : `${formatted} ${symbol}`}
    </span>
  );
};

// ---- Badge Component ----

interface BadgeProps {
  text: string;
  textAr?: string;
  locale?: 'fr-DZ' | 'ar-DZ';
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  textAr,
  locale = 'fr-DZ',
  variant = 'neutral',
  className,
}) => {
  const displayText = locale === 'ar-DZ' && textAr ? textAr : text;

  return (
    <span className={`saas-badge saas-badge--${variant} ${className || ''}`}>
      {displayText}
    </span>
  );
};

// ---- Locale Switcher ----

interface LocaleSwitcherProps {
  currentLocale: 'fr-DZ' | 'ar-DZ';
  onLocaleChange: (locale: 'fr-DZ' | 'ar-DZ') => void;
  className?: string;
}

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  currentLocale,
  onLocaleChange,
  className,
}) => {
  return (
    <div className={`saas-locale-switcher ${className || ''}`}>
      <button
        className={`saas-locale-switcher__btn ${currentLocale === 'fr-DZ' ? 'saas-locale-switcher__btn--active' : ''}`}
        onClick={() => onLocaleChange('fr-DZ')}
        aria-label="Switch to French"
      >
        FR
      </button>
      <button
        className={`saas-locale-switcher__btn ${currentLocale === 'ar-DZ' ? 'saas-locale-switcher__btn--active' : ''}`}
        onClick={() => onLocaleChange('ar-DZ')}
        aria-label="التبديل إلى العربية"
      >
        عربي
      </button>
    </div>
  );
};

// ---- Table Component ----

interface Column<T> {
  key: string;
  header: string;
  headerAr?: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  locale?: 'fr-DZ' | 'ar-DZ';
  emptyMessage?: string;
  emptyMessageAr?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  locale = 'fr-DZ',
  emptyMessage = 'Aucune donnée',
  emptyMessageAr = 'لا توجد بيانات',
  className,
}: TableProps<T>) {
  const displayEmpty = locale === 'ar-DZ' ? emptyMessageAr : emptyMessage;

  return (
    <div className={`saas-table-wrapper ${className || ''}`}>
      <table className="saas-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                {locale === 'ar-DZ' && col.headerAr ? col.headerAr : col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="saas-table__empty">
                {displayEmpty}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
