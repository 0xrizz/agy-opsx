---
description: "Bridge workflow to delegate tasks to the docs-lookup subagent"
---

# Bridge Workflow: /a-docs-lookup

This workflow delegates tasks directly to the `docs-lookup` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/docs-lookup/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-docs-lookup`:
1. Invoke subagent `docs-lookup` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/docs-lookup/agent.md).
3. Return execution results to the primary workflow controller.
