## Context

The DBSN Centralized Digital Ecosystem migrates three legacy WordPress domains into a consolidated Next.js 16.2.6 (React 19.2.4) multi-tenant hub-and-spoke web application. The platform serves 5 hostnames across 3 distinct route groups (`(hub)`, `(spokes)`, `dashboard`).

### Key Constraints & Technical Boundaries
- **Hosting Environment**: Cloudflare Pages (Unified Staging & Production per ADR-0001) using `nodejs_compat` compatibility flag in `wrangler.jsonc`.
- **Edge Runtime Limits**: Cloudflare Workers V8 Edge Runtime enforces a **1 MB compressed bundle size limit**. Heavy Node.js native binaries or direct Prisma ORM imports in `src/middleware.ts` exceed this threshold and fail edge deployment.
- **Database Architecture**: Neon Postgres serverless database accessed via `@prisma/adapter-neon` and `@neondatabase/serverless` WebSocket driver adapters.
- **Content vs. Transactional Data**: Sanity CMS (`@sanity/client` 7.22.0, `next-sanity` 12.4.5) handles product/portfolio content federation via GROQ queries; Neon Postgres via Prisma 6.19.3 handles transactional CRM leads, users, redirects, and job queues.
- **Authentication & RBAC**: Auth.js v5 (`next-auth` 5.0.0-beta.31) with JWT session cookies (`authjs.session-token`) and client row-level data isolation via `trackingScopeIds`.

---

## Goals / Non-Goals

### Goals
- Implement edge middleware subdomain routing for 5 hostnames without code forks.
- Maintain Cloudflare Edge compatibility by decoupling Prisma ORM from middleware via an internal HTTP loopback fetch (`/api/redirects/lookup`).
- Provide B2B/B2G multi-product RFQ cart persistence (`dbsn-rfq-cart`) and resilient asynchronous notification queue (`NotificationJob`) with WhatsApp fallback.
- Enforce client row-level data isolation via `tracking_scope_ids` array matching in Auth.js v5 JWT sessions.
- Deploy to Cloudflare Pages cleanly using explicit `pnpm pages:build && pnpm pages:deploy` scripts (ADR-0002).
- Stage all target repo (`website/`) changes as patch files in `frameworks/openspec/harness/patches/`.

### Non-Goals
- Modifying legacy WordPress infrastructure or databases (legacy sites are decommissioned and redirected).
- Building direct real-time ERP integration (handled asynchronously via lead export/webhooks).

---

## Technical Architecture & Data Flow

```
                                Cloudflare Pages Edge Infrastructure (nodejs_compat)
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│  HTTP Hostname Request ──▶ Edge Middleware (src/middleware.ts)                                  │
│                                │                                                                │
│                                ├──▶ Subdomain / Spoke Resolution                                │
│                                │                                                                │
│                                ├──▶ Loopback Fetch (/api/redirects/lookup) ──▶ Neon Postgres    │
│                                │    (Decoupled from Prisma ORM)                 (RedirectMap)   │
│                                │                                                                │
│                                └──▶ Route Group Selection                                       │
│                                     ├── (hub) -> dayaberkah.id                                  │
│                                     ├── (spokes)/[spoke] -> pju, solarpanel, penangkalpetir, ...│
│                                     └── dashboard -> dashboard.dayaberkah.id                    │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Data Layer & Integrations                                                                      │
│                                                                                                 │
│  Sanity CMS (GROQ Queries) ──▶ Product & Portfolio Content Federation                           │
│  Neon Postgres (Prisma) ─────▶ Transactional Leads, Users, Scoped Access, Notification Jobs     │
│  Auth.js v5 (JWT Session) ───▶ Scoped Client Access Guard & RBAC                                │
│  Resend + Telegram ──────────▶ Asynchronous RFQ Notifications                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Models & Schema Design (`prisma/schema.prisma`)

1. **`Lead` (`leads`)**: Core CRM model capturing B2B/B2G RFQ submissions, UTM source tracking tags, contact info, status flags, and `trackingProjectId`.
2. **`User` (`users`)**: Auth.js user records storing hashed passwords, role (`ADMIN`, `VIEWER`, `CLIENT`), and `trackingScopeIds` (JSON array) for client row-level access control.
3. **`RedirectMap` (`redirect_map`)**: Maps legacy URLs to canonical spoke target URLs and tracks `hitCount`.
4. **`NotificationJob` (`notification_jobs`)**: Asynchronous queue storing job type (`EMAIL_ACK`, `EMAIL_INTERNAL`, `TELEGRAM`), JSON payload, status (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`), and retry attempt metadata.
5. **Auth.js Core Models**: `Account`, `Session`, `VerificationToken`.

---

## Architectural Decision Matrix

| Decision | Selected Option | Rationale | Alternatives Considered |
| :--- | :--- | :--- | :--- |
| **Hosting Platform** | Cloudflare Pages with `nodejs_compat` (ADR-0001) | Avoids Vercel Free concurrency/bandwidth caps; unifies DNS, CDN, and Edge deployment. | Vercel, AWS Amplify, Docker on VPS. |
| **Edge Redirect Lookup** | Loopback `fetch()` to `/api/redirects/lookup` | Direct Prisma import inside `middleware.ts` bloats Worker bundle beyond 1 MB limit. | Bundling Prisma into middleware (failed build size limit). |
| **Edge DB Binding** | `@prisma/adapter-neon` + `@neondatabase/serverless` | Native TCP drivers fail on V8 edge runtime; WebSocket adapters enable seamless serverless querying. | Native PG driver, HTTP REST wrapper. |
| **Content Federation** | Sanity CMS GROQ Queries | Separates product marketing content from transactional DB; provides decoupled spoke content feeds. | Storing content in Postgres, Headless WordPress. |
| **Auth & Data Isolation** | Auth.js v5 JWT Session + `trackingScopeIds` RLS | Enforces RBAC (`ADMIN`, `VIEWER`, `CLIENT`) and client row-level isolation without complex DB RLS setup. | Custom JWT auth, Postgres native RLS. |
| **Target Modification** | Patch Staging (`harness/patches/*.patch`) | Strictly enforces READ-ONLY boundary on `d:/CLAUDE-PROJECT/website` target repo per project rules. | Direct write to target repo. |

---

## Non-Destructive Rollback & Recovery Architecture

1. **Staging & Preview Isolation**: Deployments use Cloudflare Pages branch previews (`<branch>.dayaberkah.pages.dev`) before pushing to production (`dayaberkah.id`).
2. **Database Migration Rollback**: Prisma migrations are non-destructive (additive schema changes only). Legacy URL redirects in `RedirectMap` can be toggled without schema mutation.
3. **Emergency RFQ Fallback**: If backend services or database connections degrade, `/api/rfq` catches failures and instantly provides a pre-filled WhatsApp fallback URL, ensuring zero inquiry loss.
4. **Patch Rollback**: All code changes are staged as patch files under `harness/patches/`, permitting instantaneous revert or patch re-application.

---

## Risks & Mitigations

- **[Risk: Edge Dev Loopback Deadlock]** → Single-threaded dev server can deadlock when middleware executes loopback `fetch()`.  
  *Mitigation*: Implement an `AbortController` with a 2000ms timeout in `lookupRedirect` to fail fast during local development.
- **[Risk: Spoke Subdomain Collision]** → Git branch names on Cloudflare Pages might collide with spoke names.  
  *Mitigation*: Disambiguation logic in `src/lib/utils/pages-host.ts` prioritizes explicit spoke whitelist over branch names.
