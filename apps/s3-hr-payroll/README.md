# S3 — HR & Payroll 👥

> CNAS/IRG-compliant payroll, employee management & leave tracking for Algerian businesses.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Phase](https://img.shields.io/badge/phase-2-orange)
![License](https://img.shields.io/badge/license-UNLICENSED-red)

---

## 📋 Description

**@algeria-saas/s3-hr-payroll** handles the full employee lifecycle for Algerian companies — from onboarding with NIN/CNAS registration through monthly payroll with automatic CNAS contributions and IRG (income tax) calculations. Generates bilingual bulletins de paie, manages CDI/CDD contracts, tracks leave balances, and exports G50 declarations for tax filing.

## ✨ Core Features

### Payroll Engine
- 💰 **CNAS Calculations** — Automatic employee (9%) and employer (26%) CNAS contribution computation
- 🏦 **IRG Withholding** — Progressive IRG tax brackets per Algerian tax code (barème IRG)
- 📄 **Bulletins de Paie** — Bilingual (AR/FR) PDF pay slips with full breakdown
- 💱 **DZD Native** — All calculations in Algerian Dinar with centime precision (Decimal.js)
- 📅 **Multi-period** — Monthly, bi-monthly, and custom pay periods

### Employee Management
- 🪪 **Employee Records** — NIN (Numéro d'Identification Nationale), CNAS number, bank RIB
- 📝 **Contracts** — CDI (permanent), CDD (fixed-term), seasonal, internship contract types
- 🏢 **Organization Chart** — Department/team hierarchy with reporting lines
- 📂 **Document Management** — Store diplomas, certificates, ID copies securely

### Leave & Attendance
- 🏖️ **Leave Management** — Annual (30 days), sick, maternity (14 weeks), paternity, special leave
- 📊 **Leave Balances** — Real-time accrual tracking with carryover rules
- ✅ **Approval Workflows** — Multi-level leave approval chains
- 🕐 **Attendance Tracking** — Clock in/out with optional biometric integration

### Tax & Compliance
- 📋 **G50 Export** — Monthly G50 declaration generation for tax filing (DGI format)
- 🏛️ **CNAS Declarations** — Quarterly CNAS contribution declarations
- 📊 **Annual Summary** — Yearly employee tax certificates (certificat de revenus)
- ⚖️ **Labor Law Compliance** — Algerian labor code rules (Loi 90-11) built in

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, Zustand |
| **Backend** | NestJS 10, TypeORM, PostgreSQL |
| **Payroll Engine** | Decimal.js (precise DZD arithmetic) |
| **PDF Generation** | Puppeteer + @react-pdf/renderer |
| **Excel Export** | ExcelJS (G50, CNAS declarations) |
| **Cache** | Redis (ioredis) |
| **Scheduler** | @nestjs/schedule (payroll runs) |
| **API Docs** | Swagger / OpenAPI 3.0 |

## 📅 Phase & Timeline

| Phase | Milestone | Target |
|-------|-----------|--------|
| **Phase 2** | Employee CRUD + contracts | Month 3-4 |
| **Phase 2** | Payroll engine (CNAS + IRG) | Month 4-5 |
| **Phase 2** | Bulletin de paie PDF | Month 5 |
| **Phase 3** | Leave management + G50 export | Month 6-7 |
| **Phase 3** | Advanced reporting + analytics | Month 7-8 |

## 💰 Pricing (DZD)

| Tier | Monthly Price | Features |
|------|--------------|----------|
| **Starter** | 3,900 DA/mo | Up to 10 employees, basic payroll, pay slips |
| **Pro** | 7,900 DA/mo | Up to 50 employees, leave mgmt, G50 export, contracts |
| **Enterprise** | 19,900 DA/mo | Unlimited employees, multi-company, API, custom reports |

## 📍 Roadmap Checklist (0→100)

- [x] 0 — Project scaffold & monorepo setup
- [ ] 5 — Database schema: employees, contracts, payroll_runs, pay_slips
- [ ] 10 — Employee CRUD with NIN, CNAS, bank RIB fields
- [ ] 15 — Contract management (CDI/CDD/seasonal)
- [ ] 20 — Organization chart: departments, teams, positions
- [ ] 25 — CNAS contribution calculation engine (9% + 26%)
- [ ] 30 — IRG tax bracket engine (barème progressif)
- [ ] 35 — Payroll run: gross → net pipeline with all deductions
- [ ] 40 — Bulletin de paie PDF generation (bilingual AR/FR)
- [ ] 45 — Leave types configuration + balance accrual
- [ ] 50 — Leave request + multi-level approval workflow
- [ ] 55 — G50 monthly declaration export (Excel/PDF)
- [ ] 60 — CNAS quarterly declaration export
- [ ] 65 — Attendance tracking (clock in/out)
- [ ] 70 — Overtime calculation + prime management
- [ ] 75 — Annual tax certificates generation
- [ ] 80 — Bank file generation (virement de masse)
- [ ] 85 — Multi-company payroll support
- [ ] 90 — Employee self-service portal (pay slips, leave requests)
- [ ] 95 — Analytics: payroll cost trends, headcount, turnover
- [ ] 100 — Production hardening, compliance audit, docs

## 🚀 Getting Started

```bash
npm install
npm run dev
npm run build
npm test
```

## 📁 Project Structure

```
s3-hr-payroll/
├── src/                    # NestJS backend
│   ├── modules/
│   │   ├── employees/      # Employee records
│   │   ├── contracts/      # CDI/CDD contracts
│   │   ├── payroll/        # Payroll engine
│   │   ├── leave/          # Leave management
│   │   ├── attendance/     # Clock in/out
│   │   └── declarations/   # G50, CNAS exports
│   ├── common/
│   │   ├── tax/            # IRG brackets, CNAS rates
│   │   └── pdf/            # PDF generation
│   └── main.ts
├── pages/                  # Next.js frontend
│   ├── employees/
│   ├── payroll/
│   ├── leave/
│   └── reports/
└── components/
```

---

**Part of the [Algeria SaaS Ecosystem](../../README.md)** — Built for Algerian businesses, by Algerian developers. 🇩🇿
