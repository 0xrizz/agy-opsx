## ADDED Requirements

### Requirement: Hub-and-Spoke Subdomain Middleware Routing
The Next.js edge middleware SHALL inspect incoming HTTP hostnames, clean port and IPv6 formats, resolve subdomain aliases, and route requests to the designated route group (`(hub)`, `(spokes)`, or `dashboard`) while setting middleware tracing headers.

#### Scenario: Hub Domain Request Routing
- **WHEN** an HTTP request is made to host "dayaberkah.id" or "www.dayaberkah.id"
- **THEN** the middleware SHALL return `NextResponse.next()` targeting the `/(hub)` transparent route group
- **AND** the response header `x-middleware-subdomain` SHALL be set to "hub"
- **AND** direct requests to spoke sub-paths (e.g. `dayaberkah.id/pju`) SHALL return HTTP 404.

#### Scenario: Spoke Subdomain Request Routing and Alias Resolution
- **WHEN** an HTTP request is made to host "solarcell.dayaberkah.id" or "solarpanel.dayaberkah.id"
- **THEN** `resolveSubdomainAlias` SHALL resolve "solarcell" to canonical spoke "solarpanel"
- **AND** the middleware SHALL rewrite the request URL to `/(spokes)/solarpanel`
- **AND** the response header `x-middleware-subdomain` SHALL be set to "solarpanel".

#### Scenario: Dashboard Subdomain Routing and Auth Guard
- **WHEN** an unauthenticated HTTP request is made to "dashboard.dayaberkah.id/tracking"
- **THEN** the middleware SHALL verify the presence of session tokens (`authjs.session-token` or `__Secure-next-auth.session-token`)
- **AND** if no valid session token is found, the request SHALL be redirected to "/login" with HTTP 302.

### Requirement: Legacy 301 Redirect Engine
The platform SHALL intercept requests matching legacy WordPress URLs stored in the `RedirectMap` database model and issue HTTP 301 permanent redirects without loading Prisma binaries inside Edge Middleware.

#### Scenario: Legacy URL Lookup and Redirection
- **WHEN** a request arrives for a registered legacy path (e.g., "/id/pju-solar-cell-60w")
- **THEN** `lookupRedirect` SHALL perform an LRU cache check and loopback fetch to `/api/redirects/lookup`
- **AND** if a matching target URL is found, the middleware SHALL issue an HTTP 301 permanent redirect to the target URL
- **AND** asynchronously increment the `hitCount` for that legacy record.

### Requirement: Multi-Segment RFQ Submission & Cart Persistence
The system SHALL support multi-product RFQ cart persistence in client localStorage (`dbsn-rfq-cart`) and enqueue asynchronous notification jobs upon submission, triggering a fallback WhatsApp flow on server/DB failure.

#### Scenario: Client RFQ Cart Operations
- **WHEN** a user adds or updates products in the RFQ cart
- **THEN** `rfq-cart-store.ts` SHALL validate quantities using Zod schemas
- **AND** persist state in client localStorage under key "dbsn-rfq-cart".

#### Scenario: Enqueuing RFQ Notifications
- **WHEN** an RFQ form is validly submitted to `/api/rfq`
- **THEN** a `Lead` record SHALL be created in Neon Postgres with status `RECEIVED`
- **AND** `NotificationJob` records for `EMAIL_ACK`, `EMAIL_INTERNAL`, and `TELEGRAM` SHALL be enqueued with status `PENDING`
- **AND** failed jobs SHALL retry up to 3 times before transitioning to `FAILED`.

#### Scenario: WhatsApp Submission Fallback
- **WHEN** `/api/rfq` encounters a database connection error or 500 failure
- **THEN** the API SHALL construct a pre-filled WhatsApp API URL containing cart items and contact info
- **AND** return `{ success: false, fallbackTriggered: true, fallbackWaUrl: "https://wa.me/..." }` to allow uninterrupted customer inquiry via WhatsApp.

### Requirement: Auth.js v5 Client Row-Level Data Isolation
The dashboard API layer SHALL enforce role-based access controls and restrict `CLIENT` users to data matching their authorized `trackingScopeIds`.

#### Scenario: Client Scoped Tracking Data Query
- **WHEN** an authenticated user with role `CLIENT` queries `/api/dashboard/tracking`
- **THEN** the API SHALL extract `user.trackingScopeIds` from the active JWT session
- **AND** apply a SQL query filter `WHERE project_id IN (trackingScopeIds)`
- **AND** return HTTP 403 Forbidden if the user attempts to query unauthorized project IDs.

### Requirement: Cloudflare Pages Edge Deployment Protocol
The build system SHALL compile Next.js 16.2.6 outputs using `@cloudflare/next-on-pages` and deploy static/edge assets to Cloudflare Pages.

#### Scenario: Automated Edge Build Execution
- **WHEN** `pnpm pages:build` is executed
- **THEN** `clean:pages` SHALL remove previous `.next` and `.vercel/output` build artifacts
- **AND** `prisma generate` SHALL generate the Prisma client with Neon serverless driver adapters
- **AND** `node scripts/pages-build.js` SHALL compile the output to `.vercel/output/static`.
