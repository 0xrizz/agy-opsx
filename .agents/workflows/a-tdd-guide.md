---
description: "Bridge workflow to delegate tasks to the tdd-guide subagent"
---

# Bridge Workflow: /a-tdd-guide

This workflow delegates tasks directly to the `tdd-guide` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/tdd-guide/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-tdd-guide`:
1. Invoke subagent `tdd-guide` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/tdd-guide/agent.md).
3. Return execution results to the primary workflow controller.
