# Prisma & Neon Edge Guidelines

## Core Invariants
- Use `@neondatabase/serverless` driver adapter with Prisma client on edge runtimes.
- Enforce connection pooling boundaries and zero-downtime database migrations.
