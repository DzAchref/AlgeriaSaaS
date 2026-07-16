# Algeria SaaS Ecosystem — Bilingual Development Guidelines

## Overview

Every UI in the Algeria SaaS Ecosystem MUST support:
- **French (fr-DZ)**: Left-to-Right (LTR) — primary business language
- **Arabic (ar-DZ)**: Right-to-Left (RTL) — national language

No English-only UI may be shipped.

## Implementation Rules

### 1. Text Direction

```tsx
// Always set dir attribute based on locale
<html dir={locale === 'ar-DZ' ? 'rtl' : 'ltr'} lang={locale === 'ar-DZ' ? 'ar' : 'fr'}>
```

### 2. CSS Logical Properties

Use CSS logical properties instead of physical ones:

```css
/* ❌ DON'T — breaks in RTL */
margin-left: 1rem;
padding-right: 2rem;
text-align: left;
float: left;

/* ✅ DO — works in both LTR and RTL */
margin-inline-start: 1rem;
padding-inline-end: 2rem;
text-align: start;
float: inline-start;
```

### 3. Fonts

```css
/* French */
font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;

/* Arabic */
font-family: 'Noto Sans Arabic', 'Segoe UI', system-ui, sans-serif;
```

Import both from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 4. Translation Files

All UI strings must be in translation files:

```
src/messages/
  fr-DZ.json   # French translations
  ar-DZ.json   # Arabic translations
```

### 5. Currency Formatting

```typescript
// French: 1.500,00 د.ج
// Arabic: ١٬٥٠٠٫٠٠ د.ج
new Intl.NumberFormat(locale, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(amount);
```

### 6. Date Formatting

```typescript
// French: 5 juillet 2026
// Arabic: ٥ يوليو ٢٠٢٦
new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(date);
```

### 7. Invoice/Document Fields

All business documents must include both French and Arabic fields:
- Company name / اسم الشركة
- Invoice number / رقم الفاتورة
- Total HT / المجموع بدون ضريبة
- TVA / الرسم على القيمة المضافة
- Total TTC / المجموع مع الضريبة

### 8. Icons & Arrows

Use mirrored icons in RTL mode. Arrows pointing "forward" should flip direction.

```css
[dir="rtl"] .icon-arrow {
  transform: scaleX(-1);
}
```

## Testing Checklist

- [ ] All text displays correctly in both FR and AR
- [ ] Layout flows correctly in RTL (no broken alignments)
- [ ] Numbers and currency format correctly per locale
- [ ] Dates display in correct locale format
- [ ] Icons and arrows mirror appropriately
- [ ] PDF documents render correctly in both languages
- [ ] Forms validate in both languages
- [ ] Error messages display in the user's locale
