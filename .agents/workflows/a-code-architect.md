---
description: "Bridge workflow to delegate tasks to the code-architect subagent"
---

# Bridge Workflow: /a-code-architect

This workflow delegates tasks directly to the `code-architect` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/code-architect/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-code-architect`:
1. Invoke subagent `code-architect` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/code-architect/agent.md).
3. Return execution results to the primary workflow controller.
