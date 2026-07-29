---
description: "Bridge workflow to delegate tasks to the code-explorer subagent"
---

# Bridge Workflow: /a-code-explorer

This workflow delegates tasks directly to the `code-explorer` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/code-explorer/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-code-explorer`:
1. Invoke subagent `code-explorer` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/code-explorer/agent.md).
3. Return execution results to the primary workflow controller.
