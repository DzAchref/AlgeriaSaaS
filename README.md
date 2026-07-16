# Algeria SaaS Ecosystem

<div align="center">

🇩🇿 **The Complete SaaS Platform for Algerian Businesses** 🇩🇿

*One shared core + 12 vertical SaaS products — built for Algeria*

</div>

---

## 🏗️ Architecture

| Layer | Components | Description |
|-------|-----------|-------------|
| **Layer 0** | Payment Hub, Identity & Auth, Notification Hub, Compliance Engine | Shared infrastructure consumed by all SaaS modules |
| **Phase 1** | Invoicing & Tax, POS & Retail, HR & Payroll | Foundational SaaS (Months 0-6) |
| **Phase 2** | Inventory, Accounting, CRM, Booking | Operational SaaS (Months 6-12) |
| **Phase 3** | Delivery, E-commerce, Agritech, BTP | Sectoral SaaS (Months 12-18) |
| **Phase 4** | BI & Analytics | Intelligence layer (Months 18-24) |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker Desktop

### Setup

```bash
# Clone and install
cd D:\AlgeriaSaaS
pnpm install

# Start databases
docker compose up -d

# Run all services in dev mode
pnpm dev
```

### Port Map

| Service | Port |
|---------|------|
| Payment Hub | 3001 |
| Identity & Auth | 3002 |
| Notification Hub | 3003 |
| Compliance Engine | 3004 |
| S1 Invoicing API | 4001 |
| S1 Invoicing Web | 5001 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| pgAdmin | 5050 |

## 🇩🇿 Algeria-Specific Features

- **Bilingual**: Arabic (RTL) + French (LTR) on every screen
- **Payments**: Chargily Pay, CIB, Edahabia, BaridiMob, CCP
- **Tax Compliance**: TVA 19%/9%, fiscal stamp, DGI e-invoicing (2027)
- **Payroll**: IRG progressive brackets, CNAS 9%+26.5%, SNMG
- **Business IDs**: RC, NIF, NIS, AI validation
- **Currency**: DZD (Dinar Algérien) with proper formatting
- **Geographic**: All 58 wilayas with Arabic/French names

## 📁 Project Structure

```
AlgeriaSaaS/
├── packages/           # Shared libraries
│   ├── shared/         # Types, constants, utilities
│   └── ui/             # React component library
├── core/               # Layer 0 services
│   ├── payment-hub/    # Payment provider abstraction
│   ├── identity/       # Multi-tenant auth + RBAC
│   ├── notifications/  # WhatsApp/SMS/Email
│   └── compliance/     # Tax & regulatory engine
├── apps/               # Vertical SaaS products
│   ├── s1-invoicing/   # Invoicing & Tax Compliance
│   ├── s2-pos/         # POS & Retail
│   └── ...             # S3-S12
├── database/           # Migrations & seeds
├── infra/              # Docker, K8s, CI/CD
└── docs/               # Architecture & guidelines
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + Tailwind + next-intl |
| Backend | NestJS (Node 20) |
| Database | PostgreSQL 16 + Redis 7 |
| Monorepo | pnpm + Turborepo |
| CI/CD | GitHub Actions |
| Containers | Docker + k3s |

## 📄 License

UNLICENSED — Proprietary
