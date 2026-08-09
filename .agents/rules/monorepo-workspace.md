# Monorepo Workspace Guidelines

## Core Invariants
- Enforce strict package boundary isolation, shared workspace dependencies, and pnpm/npm workspace resolution.
- Prevent cross-package internal leakage and enforce clean build DAG order.
