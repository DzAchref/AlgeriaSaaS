# Algeria SaaS Ecosystem — Architecture Overview

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     CLIENT APPLICATIONS                          │
│  Next.js 14 + Tailwind + next-intl (Arabic RTL / French LTR)   │
│                                                                  │
│  S1 Invoicing │ S2 POS │ S3 HR │ S4 Inventory │ ... │ S12 BI  │
└──────────────────────────┬───────────────────────────────────────┘
                           │ REST API / WebSocket
┌──────────────────────────┴───────────────────────────────────────┐
│                     API GATEWAY (future)                         │
│              Rate limiting, Auth validation, Routing             │
└──────────────────────────┬───────────────────────────────────────┘
                           │
┌──────────────────────────┴───────────────────────────────────────┐
│                    LAYER 0 — SHARED CORE                        │
│                                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ Payment Hub  │ │ Identity &   │ │ Notification │            │
│  │ Port: 3001   │ │ Auth         │ │ Hub          │            │
│  │              │ │ Port: 3002   │ │ Port: 3003   │            │
│  │ • Chargily   │ │              │ │              │            │
│  │ • SATIM/CIB  │ │ • Multi-     │ │ • WhatsApp   │            │
│  │ • Edahabia   │ │   tenant JWT │ │ • SMS        │            │
│  │ • BaridiMob  │ │ • RC/NIF/NIS │ │ • Email      │            │
│  │ • Ledger     │ │ • RBAC       │ │ • Broadcast  │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│  ┌──────────────────────────────────────────────┐               │
│  │ Compliance Engine — Port: 3004               │               │
│  │ THE MOAT                                      │               │
│  │ • TVA (19%/9%)    • Fiscal Stamp              │               │
│  │ • IRG Brackets    • CNAS Rates                │               │
│  │ • Invoice Rules   • E-invoicing XML (2027)    │               │
│  │ • ANPDP Consent   • G50 Export                │               │
│  └──────────────────────────────────────────────┘               │
└──────────────────────────┬───────────────────────────────────────┘
                           │
┌──────────────────────────┴───────────────────────────────────────┐
│                    DATA LAYER                                    │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────┐                       │
│  │ PostgreSQL 16    │    │ Redis 7      │                       │
│  │ • Multi-schema   │    │ • Sessions   │                       │
│  │ • UUID-OSSP      │    │ • Idempotency│                       │
│  │ • PostGIS (geo)  │    │ • Queues     │                       │
│  └──────────────────┘    └──────────────┘                       │
└──────────────────────────────────────────────────────────────────┘
```

## Port Assignments

| Service | Port | Description |
|---------|------|-------------|
| Payment Hub | 3001 | Payment provider abstraction |
| Identity & Auth | 3002 | Multi-tenant auth + RBAC |
| Notification Hub | 3003 | WhatsApp/SMS/Email |
| Compliance Engine | 3004 | Tax & regulatory rules |
| S1 Invoicing (API) | 4001 | Invoicing backend |
| S1 Invoicing (Web) | 5001 | Invoicing frontend |
| S2 POS (API) | 4002 | POS backend |
| S3 HR (API) | 4003 | HR & Payroll backend |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache & queues |
| pgAdmin | 5050 | DB management UI |

## Design Principles

1. **Shared Core First**: Every SaaS consumes Layer 0 services. No module re-implements payments, auth, or compliance.
2. **Bilingual by Default**: Arabic RTL + French LTR on every UI. No English-only screens ship.
3. **Algeria-Native**: DZD currency, 58 wilayas, RC/NIF/NIS/AI business IDs, SATIM/Chargily payments.
4. **Cross-Sell Moat**: A pharmacy using POS can add Inventory + Accounting + BI without re-onboarding.
5. **Offline-Ready**: POS and field apps (Delivery, Agritech, BTP) support offline mode with PouchDB sync.

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + Tailwind + next-intl |
| Backend | NestJS (Node 20) |
| Database | PostgreSQL 16 + Redis 7 |
| Mobile | React Native / PWA |
| Geo | PostGIS + OSRM |
| CI/CD | GitHub Actions |
| Containers | Docker + k3s |
| Payments | Chargily Pay v2, SATIM, BaridiMob |
| Notifications | WhatsApp Business API, SMS, Email |
