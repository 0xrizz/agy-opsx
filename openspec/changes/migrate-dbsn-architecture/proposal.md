## Why

The DBSN Centralized Digital Ecosystem migration consolidates three legacy WordPress domains into a single unified Next.js 16.2.6 (React 19.2.4) hub-and-spoke architecture. This eliminates multi-site maintenance overhead, standardizes design tokens, federates marketing content via Sanity CMS, establishes structured transactional CRM data handling in Neon Postgres via Prisma 6.19.3, enforces strict client row-level data isolation in Auth.js v5, and ensures high availability and zero lead loss via Cloudflare Pages edge deployment (per ADR-0001 & ADR-0002).

## What Changes

- **Hub-and-Spoke Edge Subdomain Routing**: Edge Middleware (`src/middleware.ts`) intercepts incoming requests and dynamically routes hostnames across 5 domains (`dayaberkah.id`, `pju.*`, `solarcell.*` / `solarpanel.*`, `alatpetir.*` / `penangkalpetir.*`, `baterai.*`, `dashboard.*`) to route groups `(hub)`, `(spokes)`, and `dashboard`.
- **301 Legacy Redirect Engine**: Edge-compatible 301 redirect engine (`src/lib/middleware/redirect-engine.ts`) leveraging `RedirectMap` with LRU caching and loopback fetch to prevent bundling heavy Prisma binaries into V8 Edge Middleware.
- **Multi-Segment RFQ & Cart System**: B2B and B2G RFQ forms integrated with Zustand persistent cart (`dbsn-rfq-cart`), enqueuing background `NotificationJob` tasks (Email ACK, Internal Email, Telegram) with automatic WhatsApp fallback on API/DB failures.
- **Auth.js v5 Client Row-Level Security**: Authentication guard enforcing role-based access (`ADMIN`, `VIEWER`, `CLIENT`) and scoped data isolation filtering client queries against `User.trackingScopeIds`.
- **Unified Cloudflare Pages Edge Deployment**: Standardized edge build pipeline (`pnpm pages:build && pnpm pages:deploy`) compiling to `.vercel/output/static` with `@cloudflare/next-on-pages` and `@prisma/adapter-neon` driver adapters.

## Capabilities

### New Capabilities
- `dbsn-platform`: Unified multi-tenant hub-and-spoke platform incorporating edge subdomain routing, legacy 301 redirect engine, B2B/B2G RFQ cart & notification queues, Auth.js v5 row-level security, and Cloudflare Pages edge deployment.

### Modified Capabilities
- None.

## Impact

- **Affected Route Groups**: `src/app/(hub)`, `src/app/(spokes)/[spoke]`, `src/app/dashboard`.
- **Middleware & Edge Functions**: `src/middleware.ts`, `src/lib/middleware/config.ts`, `src/lib/middleware/redirect-engine.ts`, `src/lib/utils/pages-host.ts`.
- **Database Schema**: `prisma/schema.prisma` (`Lead`, `User`, `RedirectMap`, `NotificationJob`, `Account`, `Session`, `VerificationToken`).
- **Dependencies**: Next.js 16.2.6, React 19.2.4, Tailwind v4, Prisma 6.19.3, `@prisma/adapter-neon`, `@auth/prisma-adapter`, `next-auth` 5.0.0-beta.31, `@sanity/client`, `zustand`, `resend`, `wrangler`.
- **Deployment Pipeline**: Cloudflare Pages (`pnpm pages:build`, `pnpm pages:deploy`, `patch-vercel-builder.js`).
