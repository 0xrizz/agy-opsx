## 1. Edge Middleware & Subdomain Topology Setup

- [ ] 1.1 Verify and configure `cleanHostname`, `isHubDomain`, `isSpokeDomain`, and `resolveSubdomainAlias` in `src/lib/middleware/config.ts` and `src/lib/utils/pages-host.ts`.
- [ ] 1.2 Implement edge middleware routing in `src/middleware.ts` for hostnames across `dayaberkah.id`, `pju.*`, `solarcell.*`/`solarpanel.*`, `alatpetir.*`/`penangkalpetir.*`, `baterai.*`, and `dashboard.*`.
- [ ] 1.3 Configure response headers (`x-middleware-subdomain` and `x-middleware-matched-route`) and enforce 404 blocking for direct spoke paths requested on the Hub domain.
- [ ] 1.4 Verification Step: Run Playwright subdomain routing E2E specs (`pnpm exec playwright test tests/e2e/subdomain-routing.spec.ts`) and verify edge middleware responses.

## 2. Legacy 301 Redirect Engine & Decoupled Edge API

- [ ] 2.1 Implement `RedirectMap` Prisma model queries in `/api/redirects/lookup` endpoint.
- [ ] 2.2 Construct `lookupRedirect` helper in `src/lib/middleware/redirect-engine.ts` using LRU cache (500 entries, 5-minute TTL) and loopback `fetch()` with 2000ms `AbortController` timeout.
- [ ] 2.3 Wire 301 redirection in `src/middleware.ts` before route rewriting and verify asynchronous `hitCount` incrementing.
- [ ] 2.4 Verification Step: Run redirect engine Jest unit tests (`pnpm test src/__tests__/lib/middleware/redirect-engine.test.ts`) and verify no Prisma binaries are loaded into V8 edge middleware.

## 3. Database Schema & Multi-Segment RFQ Cart Queue

- [ ] 3.1 Verify Prisma schema definitions for `Lead`, `User`, `RedirectMap`, `NotificationJob`, `Account`, `Session`, and `VerificationToken`.
- [ ] 3.2 Implement Zustand RFQ cart store (`src/lib/store/rfq-cart-store.ts`) with `dbsn-rfq-cart` localStorage persistence and Zod schema validation.
- [ ] 3.3 Build RFQ submission handler (`/api/rfq`) with `Lead` creation, `NotificationJob` task queueing (`EMAIL_ACK`, `EMAIL_INTERNAL`, `TELEGRAM`), and exponential backoff retry logic.
- [ ] 3.4 Wire emergency WhatsApp fallback URL generation and Telegram dev alerts upon unhandled DB/API exceptions.
- [ ] 3.5 Verification Step: Execute RFQ API Jest unit tests (`pnpm test src/__tests__/api/rfq/route.test.ts`) and verify cart persistence hydration guard (`useRfqCartHydrated`).

## 4. Auth.js v5 Client Row-Level Data Isolation

- [ ] 4.1 Configure Auth.js v5 JWT sessions and authentication guards in `src/lib/auth/auth.config.ts` and `src/lib/auth/auth-guard.ts`.
- [ ] 4.2 Enforce middleware session token verification for `/dashboard` routes, redirecting unauthenticated requests to `/login`.
- [ ] 4.3 Implement row-level security filtering on client tracking endpoints using `User.trackingScopeIds` JSON matching.
- [ ] 4.4 Verification Step: Run password reset and auth API Jest unit tests (`pnpm test src/__tests__/api/auth/password-reset.test.ts`) and verify 403 Forbidden enforcement on out-of-scope client tracking queries.

## 5. Cloudflare Pages Edge Build & Patch Staging Pipeline

- [ ] 5.1 Configure `wrangler.jsonc` / `wrangler.toml` with `nodejs_compat` compatibility flag and build scripts (`pnpm pages:build`, `pnpm pages:deploy`, `clean:pages`).
- [ ] 5.2 Integrate `@prisma/adapter-neon` and `@neondatabase/serverless` WebSocket driver adapters for edge DB connectivity.
- [ ] 5.3 Implement Windows file-locking workaround in `pregenerate` script to clear `node_modules/.prisma` prior to `prisma generate`.
- [ ] 5.4 Stage all proposed codebase modifications for target repo `d:/CLAUDE-PROJECT/website` as unified patch files in `frameworks/openspec/harness/patches/0001-migrate-dbsn-architecture.patch` enforcing READ-ONLY boundary.
- [ ] 5.5 Verification Step: Execute `pnpm pages:build` locally, verify edge bundle output in `.vercel/output/static`, and confirm patch file validity in `harness/patches/`.
