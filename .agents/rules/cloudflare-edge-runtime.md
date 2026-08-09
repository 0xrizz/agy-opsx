# Cloudflare Edge Runtime Guidelines

## Core Invariants
- Enforce V8 isolate limits, streaming responses, and Web API compatibility for Cloudflare Workers.
- Prefer KV, D1, and R2 bindings for edge state management.
