---
description: "Bridge workflow to delegate tasks to the a11y-architect subagent"
---

# Bridge Workflow: /a-a11y-architect

This workflow delegates tasks directly to the `a11y-architect` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/a11y-architect/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-a11y-architect`:
1. Invoke subagent `a11y-architect` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/a11y-architect/agent.md).
3. Return execution results to the primary workflow controller.
