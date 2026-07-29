---
description: "Bridge workflow to delegate tasks to the refactor-cleaner subagent"
---

# Bridge Workflow: /a-refactor-cleaner

This workflow delegates tasks directly to the `refactor-cleaner` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/refactor-cleaner/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-refactor-cleaner`:
1. Invoke subagent `refactor-cleaner` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/refactor-cleaner/agent.md).
3. Return execution results to the primary workflow controller.
