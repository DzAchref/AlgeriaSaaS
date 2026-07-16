# S2 — POS & Retail 🛒

> Fast, offline-ready point-of-sale for Algerian supérettes, pharmacies, and retail shops.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Phase](https://img.shields.io/badge/phase-2-orange)
![License](https://img.shields.io/badge/license-UNLICENSED-red)

---

## 📋 Description

**@algeria-saas/s2-pos** is a modern POS system designed for Algeria's retail landscape. It supports 80mm thermal receipt printers, barcode scanning, offline-first architecture with PouchDB, and bilingual (Arabic/French) interfaces. Built for supérettes, pharmacies, and small to medium retail shops operating across all 58 wilayas.

## ✨ Core Features

### Point of Sale
- ⚡ **Fast Checkout** — Sub-second item lookup via barcode scan or search
- 🖨️ **80mm Thermal Receipts** — ESC/POS compatible, bilingual (AR/FR) receipts with TVA breakdown
- 📱 **Barcode Scanning** — Camera-based and USB/Bluetooth scanner support via Quagga2
- 💳 **Split Payment** — Cash, card (CIB/Edahabia), QR code, and mixed payment modes
- 🔄 **Offline Mode** — Full PouchDB offline-first with background sync when connectivity resumes
- 🧾 **Z-Report** — End-of-day cash reconciliation with shift summaries

### Inventory Integration
- 📦 **Real-time Stock Deduction** — Automatic inventory updates on each sale
- ⚠️ **Low Stock Alerts** — Configurable thresholds per product
- 🔗 **S4 Sync** — Two-way sync with the Inventory & SCM module

### Compliance & Reporting
- 🏛️ **TVA Compliant** — 19% standard / 9% reduced rate automatic calculation
- 📊 **Sales Analytics** — Hourly, daily, weekly revenue dashboards
- 💱 **DZD Native** — All amounts in Algerian Dinar with proper formatting

### Bilingual Support
- 🇩🇿 **Arabic & French** — Full RTL support, bilingual receipts, bilingual UI
- 🔤 **Dynamic Language Switch** — Real-time toggle between AR/FR

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, Zustand |
| **Backend** | NestJS 10, TypeORM, PostgreSQL |
| **Offline** | PouchDB + CouchDB sync |
| **Receipts** | ESC/POS thermal printing (escpos) |
| **Scanning** | Quagga2 (camera), WebHID (USB scanners) |
| **Cache** | Redis (ioredis) |
| **Queue** | Bull (Redis-backed job queue) |
| **API Docs** | Swagger / OpenAPI 3.0 |

## 📅 Phase & Timeline

| Phase | Milestone | Target |
|-------|-----------|--------|
| **Phase 2** | Core POS checkout + receipts | Month 3-4 |
| **Phase 2** | Offline mode + sync | Month 4-5 |
| **Phase 2** | Split payments + Z-report | Month 5 |
| **Phase 3** | Advanced analytics + multi-store | Month 6-7 |

## 💰 Pricing (DZD)

| Tier | Monthly Price | Features |
|------|--------------|----------|
| **Starter** | 2,900 DA/mo | 1 register, 500 products, basic reports |
| **Pro** | 5,900 DA/mo | 3 registers, unlimited products, Z-reports, offline mode |
| **Enterprise** | 14,900 DA/mo | Unlimited registers, multi-store, API access, priority support |

## 📍 Roadmap Checklist (0→100)

- [x] 0 — Project scaffold & monorepo setup
- [ ] 5 — Database schema: products, sales, payments, registers
- [ ] 10 — Product CRUD API + barcode field
- [ ] 15 — Basic POS UI: product grid, cart, totals
- [ ] 20 — Barcode scanner integration (camera + USB)
- [ ] 25 — Cash payment flow + receipt generation
- [ ] 30 — 80mm thermal printer ESC/POS integration
- [ ] 35 — Bilingual receipts (AR/FR) with TVA breakdown
- [ ] 40 — Split payment (cash + card + QR)
- [ ] 45 — PouchDB offline data layer
- [ ] 50 — Background sync (PouchDB ↔ CouchDB ↔ PostgreSQL)
- [ ] 55 — Z-report: shift open/close, cash reconciliation
- [ ] 60 — Stock deduction on sale + low-stock alerts
- [ ] 65 — S4 Inventory module sync integration
- [ ] 70 — Sales dashboard: hourly/daily/weekly charts
- [ ] 75 — Multi-register support + register assignment
- [ ] 80 — CIB/Edahabia card payment integration
- [ ] 85 — Customer display support (secondary screen)
- [ ] 90 — Multi-store management + central reporting
- [ ] 95 — Performance optimization + load testing
- [ ] 100 — Production hardening, docs, training materials

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📁 Project Structure

```
s2-pos/
├── src/                    # NestJS backend
│   ├── modules/
│   │   ├── products/       # Product catalog
│   │   ├── sales/          # Sale transactions
│   │   ├── payments/       # Payment processing
│   │   ├── receipts/       # Receipt generation & printing
│   │   ├── registers/      # Register management
│   │   └── reports/        # Z-reports & analytics
│   ├── common/             # Shared utilities
│   └── main.ts
├── pages/                  # Next.js frontend
│   ├── pos/                # POS terminal UI
│   ├── reports/            # Reporting dashboards
│   └── settings/           # Configuration
├── components/             # React components
├── lib/                    # Client-side utilities
│   ├── offline/            # PouchDB sync layer
│   └── printer/            # ESC/POS driver
└── public/                 # Static assets
```

---

**Part of the [Algeria SaaS Ecosystem](../../README.md)** — Built for Algerian businesses, by Algerian developers. 🇩🇿
