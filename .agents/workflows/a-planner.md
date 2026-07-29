---
description: "Bridge workflow to delegate tasks to the planner subagent"
---

# Bridge Workflow: /a-planner

This workflow delegates tasks directly to the `planner` subagent located at [agent.md](file:///.agents/plugin/ecc/agents/planner/agent.md).

## Subagent Delegation Instructions

When triggered via `/a-planner`:
1. Invoke subagent `planner` with context and relevant task parameters.
2. Follow all guidelines specified in [agent.md](file:///.agents/plugin/ecc/agents/planner/agent.md).
3. Return execution results to the primary workflow controller.
